import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmdjiqwsebwraqeyqmzn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZGppcXdzZWJ3cmFxZXlxbXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjM0MjAsImV4cCI6MjA3MjE5OTQyMH0.ZeBjbAhSe6X2PaiVPOsiyha0lDhf3jkOSv9x_6w0I7M'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Authentication service
export const authService = {
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role || 'vendor'
        }
      }
    })
    if (error) throw error
    return data
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
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

// Vendor service
export const vendorService = {
  // Get vendor profile
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*, users(*)')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Update vendor profile
  updateProfile: async (vendorId, updates) => {
    const { data, error } = await supabase
      .from('vendors')
      .update(updates)
      .eq('id', vendorId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get vendor products
  getProducts: async (vendorId, filters = {}) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('vendor_id', vendorId)

    if (filters.status) query = query.eq('status', filters.status)
    if (filters.search) query = query.ilike('name', `%${filters.search}%`)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Get vendor orders
  getOrders: async (vendorId, filters = {}) => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        users(first_name, last_name, email)
      `)
      .eq('vendor_id', vendorId)

    if (filters.status) query = query.eq('status', filters.status)
    if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom)
    if (filters.dateTo) query = query.lte('created_at', filters.dateTo)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Get vendor analytics
  getAnalytics: async (vendorId) => {
    // Get total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendorId)

    // Get total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendorId)

    // Get total revenue
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('vendor_id', vendorId)
      .eq('status', 'completed')

    const totalRevenue = revenueData?.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) || 0

    // Get pending orders
    const { count: pendingOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendorId)
      .eq('status', 'pending')

    return {
      totalProducts: totalProducts || 0,
      totalOrders: totalOrders || 0,
      totalRevenue,
      pendingOrders: pendingOrders || 0
    }
  }
}

// Products service for vendors
export const vendorProductsService = {
  // Create product
  create: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        slug: productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        status: 'draft'
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
  },

  // Get product by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }
}

// Orders service for vendors
export const vendorOrdersService = {
  // Update order status
  updateStatus: async (orderId, status, trackingInfo = {}) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status, 
        tracking_info: trackingInfo,
        updated_at: new Date().toISOString() 
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get order details
  getById: async (id) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users(first_name, last_name, email, phone)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }
}

// Categories service
export const categoriesService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) throw error
    return data
  }
}

// File upload service
export const uploadService = {
  uploadImage: async (file, bucket = 'product-images') => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  }
}

// Real-time subscriptions for vendors
export const vendorSubscriptions = {
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
      .subscribe()
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
      .subscribe()
  }
}
