import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmdjiqwsebwraqeyqmzn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZGppcXdzZWJ3cmFxZXlxbXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjM0MjAsImV4cCI6MjA3MjE5OTQyMH0.ZeBjbAhSe6X2PaiVPOsiyha0lDhf3jkOSv9x_6w0I7M'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Authentication service for admin
export const authService = {
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    
    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()
    
    if (userError) throw userError
    if (userData.role !== 'admin') {
      throw new Error('Access denied. Admin privileges required.')
    }
    
    return data
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }
}

// Users management service
export const usersService = {
  // Get all users with pagination
  getAll: async (page = 1, limit = 10, search = '') => {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)
    if (error) throw error

    return { data, count, totalPages: Math.ceil(count / limit) }
  },

  // Get user by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        vendors(*),
        orders(count)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Update user
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete user
  delete: async (id) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Create admin user
  createAdmin: async (userData) => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      user_metadata: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: 'admin'
      }
    })

    if (error) throw error
    return data
  }
}

// Vendors management service
export const vendorsService = {
  // Get all vendors with pagination
  getAll: async (page = 1, limit = 10, search = '') => {
    let query = supabase
      .from('vendors')
      .select(`
        *,
        users(first_name, last_name, email, phone),
        products(count)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('business_name', `%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)
    if (error) throw error

    return { data, count, totalPages: Math.ceil(count / limit) }
  },

  // Get vendor by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('vendors')
      .select(`
        *,
        users(*),
        products(count),
        orders(count)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Update vendor status
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('vendors')
      .update({ verification_status: status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get vendor products
  getVendorProducts: async (vendorId, page = 1, limit = 10) => {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug)
      `, { count: 'exact' })
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { data, count, totalPages: Math.ceil(count / limit) }
  },

  // Delete vendor
  delete: async (id) => {
    const { error } = await supabase
      .from('vendors')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Products management service
export const productsService = {
  // Get all products with pagination
  getAll: async (page = 1, limit = 10, search = '') => {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, user_id)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)
    if (error) throw error

    return { data, count, totalPages: Math.ceil(count / limit) }
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
      .single()

    if (error) throw error
    return data
  },

  // Create product (admin)
  create: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        slug: productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update product
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete product
  delete: async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Orders management service
export const ordersService = {
  // Get all orders with pagination
  getAll: async (page = 1, limit = 10, search = '') => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        users(first_name, last_name, email),
        vendors(business_name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('order_number', `%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)
    if (error) throw error

    return { data, count, totalPages: Math.ceil(count / limit) }
  },

  // Get order by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users(first_name, last_name, email, phone),
        vendors(business_name, contact_info)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Update order status
  updateStatus: async (id, status, trackingInfo = {}) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status, 
        tracking_info: trackingInfo,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Categories management service
export const categoriesService = {
  // Get all categories
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')

    if (error) throw error
    return data
  },

  // Create category
  create: async (categoryData) => {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        ...categoryData,
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update category
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete category
  delete: async (id) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Dashboard analytics service
export const analyticsService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    // Get total vendors
    const { count: totalVendors } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true })

    // Get total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    // Get total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })

    // Get total revenue
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'completed')

    const totalRevenue = revenueData?.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) || 0

    // Get pending vendor approvals
    const { count: pendingVendors } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true })
      .eq('verification_status', 'pending')

    return {
      totalUsers: totalUsers || 0,
      totalVendors: totalVendors || 0,
      totalProducts: totalProducts || 0,
      totalOrders: totalOrders || 0,
      totalRevenue,
      pendingVendors: pendingVendors || 0
    }
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    const activities = []

    // Recent orders
    const { data: recentOrders } = await supabase
      .from('orders')
      .select('*, users(first_name, last_name)')
      .order('created_at', { ascending: false })
      .limit(5)

    recentOrders?.forEach(order => {
      activities.push({
        type: 'order',
        message: `New order ${order.order_number} from ${order.users.first_name} ${order.users.last_name}`,
        timestamp: order.created_at
      })
    })

    // Recent vendor registrations
    const { data: recentVendors } = await supabase
      .from('vendors')
      .select('*, users(first_name, last_name)')
      .order('created_at', { ascending: false })
      .limit(5)

    recentVendors?.forEach(vendor => {
      activities.push({
        type: 'vendor',
        message: `New vendor registration: ${vendor.business_name}`,
        timestamp: vendor.created_at
      })
    })

    // Sort by timestamp and limit
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
  }
}
