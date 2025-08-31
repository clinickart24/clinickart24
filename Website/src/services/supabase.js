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
          role: userData.role || 'customer'
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
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }
}

// User service
export const userService = {
  // Get user profile
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Create user profile (called after signup)
  createProfile: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Products service
export const productsService = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, user_id)
      `)
      .eq('status', 'published')

    if (filters.category) query = query.eq('category_id', filters.category)
    if (filters.vendor) query = query.eq('vendor_id', filters.vendor)
    if (filters.search) query = query.ilike('name', `%${filters.search}%`)
    if (filters.limit) query = query.limit(filters.limit)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

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

  create: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single()

    if (error) throw error
    return data
  },

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

  delete: async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
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

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to product changes
  subscribeToProducts: (callback) => {
    return supabase
      .channel('products')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, callback)
      .subscribe()
  },

  // Subscribe to order changes
  subscribeToOrders: (userId, callback) => {
    return supabase
      .channel('orders')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `customer_id=eq.${userId}`
      }, callback)
      .subscribe()
  }
}
