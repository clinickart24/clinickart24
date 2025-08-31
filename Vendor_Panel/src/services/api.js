import {
  supabase,
  vendorService,
  vendorProductsService,
  vendorOrdersService,
  categoriesService,
  uploadService
} from './supabase';

// Vendor Dashboard API
export const dashboardAPI = {
  // Get vendor analytics
  getAnalytics: async (vendorId) => {
    return await vendorService.getAnalytics(vendorId);
  },

  // Get recent orders
  getRecentOrders: async (vendorId, limit = 5) => {
    return await vendorService.getOrders(vendorId, { limit });
  },

  // Get recent products
  getRecentProducts: async (vendorId, limit = 5) => {
    return await vendorService.getProducts(vendorId, { limit });
  }
};

// Products Management API
export const productsAPI = {
  // Get all vendor products
  getAll: async (vendorId, filters = {}) => {
    return await vendorService.getProducts(vendorId, filters);
  },

  // Get product by ID
  getById: async (id) => {
    return await vendorProductsService.getById(id);
  },

  // Create new product
  create: async (productData) => {
    return await vendorProductsService.create(productData);
  },

  // Update product
  update: async (id, updates) => {
    return await vendorProductsService.update(id, updates);
  },

  // Delete product
  delete: async (id) => {
    return await vendorProductsService.delete(id);
  },

  // Upload product image
  uploadImage: async (file) => {
    return await uploadService.uploadImage(file, 'product-images');
  }
};

// Orders Management API
export const ordersAPI = {
  // Get all vendor orders
  getAll: async (vendorId, filters = {}) => {
    return await vendorService.getOrders(vendorId, filters);
  },

  // Get order by ID
  getById: async (id) => {
    return await vendorOrdersService.getById(id);
  },

  // Update order status
  updateStatus: async (orderId, status, trackingInfo = {}) => {
    return await vendorOrdersService.updateStatus(orderId, status, trackingInfo);
  },

  // Get order statistics
  getStats: async (vendorId) => {
    const orders = await vendorService.getOrders(vendorId);

    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    return stats;
  }
};

// Customers API
export const customersAPI = {
  // Get vendor customers (from orders)
  getAll: async (vendorId) => {
    const orders = await vendorService.getOrders(vendorId);

    // Extract unique customers
    const customersMap = new Map();
    orders.forEach(order => {
      if (order.users && !customersMap.has(order.customer_id)) {
        customersMap.set(order.customer_id, {
          id: order.customer_id,
          ...order.users,
          totalOrders: 1,
          totalSpent: parseFloat(order.total_amount)
        });
      } else if (order.users && customersMap.has(order.customer_id)) {
        const customer = customersMap.get(order.customer_id);
        customer.totalOrders += 1;
        customer.totalSpent += parseFloat(order.total_amount);
      }
    });

    return Array.from(customersMap.values());
  },

  // Get customer details
  getById: async (customerId, vendorId) => {
    const orders = await vendorService.getOrders(vendorId);
    const customerOrders = orders.filter(o => o.customer_id === customerId);

    if (customerOrders.length === 0) return null;

    const customer = customerOrders[0].users;
    return {
      ...customer,
      orders: customerOrders,
      totalOrders: customerOrders.length,
      totalSpent: customerOrders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
    };
  }
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    return await categoriesService.getAll();
  }
};

// Vendor Profile API
export const profileAPI = {
  // Get vendor profile
  get: async (userId) => {
    return await vendorService.getProfile(userId);
  },

  // Update vendor profile
  update: async (vendorId, updates) => {
    return await vendorService.updateProfile(vendorId, updates);
  }
};

// Transactions API
export const transactionsAPI = {
  // Get transaction history
  getHistory: async (vendorId, filters = {}) => {
    const orders = await vendorService.getOrders(vendorId, filters);

    // Convert orders to transaction format
    return orders.map(order => ({
      id: order.id,
      type: 'sale',
      amount: parseFloat(order.total_amount),
      status: order.status,
      customer: order.users,
      date: order.created_at,
      orderNumber: order.order_number
    }));
  },

  // Get refunds
  getRefunds: async (vendorId) => {
    const orders = await vendorService.getOrders(vendorId, { status: 'refunded' });

    return orders.map(order => ({
      id: order.id,
      amount: parseFloat(order.total_amount),
      reason: order.tracking_info?.refund_reason || 'Customer request',
      date: order.updated_at,
      orderNumber: order.order_number,
      customer: order.users
    }));
  }
};

// Invoices API
export const invoicesAPI = {
  // Generate invoice data
  generateInvoice: async (orderId) => {
    const order = await vendorOrdersService.getById(orderId);

    return {
      invoiceNumber: `INV-${order.order_number}`,
      date: new Date().toISOString(),
      order: order,
      customer: order.users,
      items: order.items,
      total: parseFloat(order.total_amount)
    };
  },

  // Get all invoices for vendor
  getAll: async (vendorId) => {
    const orders = await vendorService.getOrders(vendorId, { status: 'completed' });

    return orders.map(order => ({
      id: order.id,
      invoiceNumber: `INV-${order.order_number}`,
      date: order.created_at,
      customer: order.users,
      amount: parseFloat(order.total_amount),
      status: 'paid'
    }));
  }
};

// Real-time subscriptions
export const subscriptionsAPI = {
  // Subscribe to vendor orders
  subscribeToOrders: (vendorId, callback) => {
    return supabase
      .channel('vendor-orders')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `vendor_id=eq.${vendorId}`
      }, callback)
      .subscribe();
  },

  // Subscribe to vendor products
  subscribeToProducts: (vendorId, callback) => {
    return supabase
      .channel('vendor-products')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products',
        filter: `vendor_id=eq.${vendorId}`
      }, callback)
      .subscribe();
  }
};