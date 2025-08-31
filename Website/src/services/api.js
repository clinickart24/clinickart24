import { supabase } from './supabase';

// Products API
export const productsAPI = {
  // Get all published products
  getAll: async (filters = {}) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, user_id)
      `)
      .eq('status', 'published');

    if (filters.category) query = query.eq('category_id', filters.category);
    if (filters.vendor) query = query.eq('vendor_id', filters.vendor);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);
    if (filters.limit) query = query.limit(filters.limit);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Get product by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, contact_info)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get products by category
  getByCategory: async (categoryId, limit = 10) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name)
      `)
      .eq('category_id', categoryId)
      .eq('status', 'published')
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get featured products
  getFeatured: async (limit = 8) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
};

// Categories API
export const categoriesAPI = {
  // Get all active categories
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    return data;
  },

  // Get category by slug
  getBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }
};

// Vendors API
export const vendorsAPI = {
  // Get all approved vendors
  getAll: async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*, users(first_name, last_name, email)')
      .eq('verification_status', 'approved');

    if (error) throw error;
    return data;
  },

  // Get vendor by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*, users(first_name, last_name, email)')
      .eq('id', id)
      .eq('verification_status', 'approved')
      .single();

    if (error) throw error;
    return data;
  }
};

// Orders API
export const ordersAPI = {
  // Create new order
  create: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        order_number: `ORD-${Date.now()}`,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user orders
  getUserOrders: async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        vendors(business_name)
      `)
      .eq('customer_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get order by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        vendors(business_name, contact_info)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

// Blogs API
export const blogsAPI = {
  // Get all published blogs
  getAll: async (limit = 10) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get blog by slug
  getBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }
};

// Banners API
export const bannersAPI = {
  // Get all active banners
  getAll: async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) throw error;
    return data;
  }
};

// File Upload API
export const uploadAPI = {
  // Upload image to Supabase storage
  uploadImage: async (file, bucket = 'product-images') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  }
};