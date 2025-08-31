# Clinic Kart - Hostinger VPS Deployment Guide

## 🎯 Architecture Overview

**Setup**: Supabase (Backend) + Hostinger VPS (Frontend Hosting)
**Result**: 3 seamlessly integrated websites with full admin control

```
Your Domain Structure:
├── yourdomain.com           → Main Website (Customer-facing)
├── admin.yourdomain.com     → Admin Panel (Full Control)
└── vendor.yourdomain.com    → Vendor Panel (Vendor Management)
```

## Phase 1: Supabase Backend Setup (30 minutes)

### Step 1.1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: "clinic-kart-production"
4. Choose region closest to your users
5. Create strong database password
6. Wait for project to initialize (2-3 minutes)

### Step 1.2: Note Your Credentials
```bash
# Save these credentials - you'll need them later
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 1.3: Set Up Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Create new query and paste this schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with role-based access
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('customer', 'vendor', 'admin')) DEFAULT 'customer',
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    profile JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_type TEXT,
    description TEXT,
    verification_status TEXT DEFAULT 'pending',
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    contact_info JSONB DEFAULT '{}',
    address JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    inventory INTEGER DEFAULT 0,
    images TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'draft',
    specifications JSONB DEFAULT '{}',
    seo_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    order_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    items JSONB NOT NULL,
    shipping_address JSONB,
    billing_address JSONB,
    payment_info JSONB DEFAULT '{}',
    tracking_info JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    status TEXT DEFAULT 'draft',
    author_id UUID REFERENCES users(id),
    tags TEXT[] DEFAULT '{}',
    seo_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banners table
CREATE TABLE banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    link_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recipient_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Click "Run" to execute the schema

### Step 1.4: Enable Row Level Security
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public can view published products" ON products
    FOR SELECT USING (status = 'published');

CREATE POLICY "Vendors can manage own products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM vendors 
            WHERE vendors.id = products.vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage everything" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
```

### Step 1.5: Configure Authentication
1. Go to Authentication → Settings
2. Enable Email/Password authentication
3. Set Site URL to your main domain: `https://yourdomain.com`
4. Add redirect URLs:
   - `https://yourdomain.com/**`
   - `https://admin.yourdomain.com/**`
   - `https://vendor.yourdomain.com/**`

### Step 1.6: Set Up Storage
1. Go to Storage → Create Bucket
2. Create bucket: "product-images" (public)
3. Create bucket: "documents" (private)
4. Set up storage policies for file uploads

## Phase 2: Code Updates (45 minutes)

### Step 2.1: Install Supabase Client
```bash
# In each panel directory
cd Website
npm install @supabase/supabase-js

cd ../Admin_Panel
npm install @supabase/supabase-js

cd ../Vendor_Panel
npm install @supabase/supabase-js
```

### Step 2.2: Create Environment Files
```bash
# Website/.env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_NAME=Clinic Kart
VITE_APP_ENV=production

# Admin_Panel/.env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_NAME=Clinic Kart Admin
REACT_APP_ENV=production

# Vendor_Panel/.env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_NAME=Clinic Kart Vendor
VITE_APP_ENV=production
```

### Step 2.3: Create Unified Supabase Service
Create this file in each panel: `src/services/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY

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
```

## Phase 3: Hostinger VPS Setup (30 minutes)

### Step 3.1: Connect to Your VPS
```bash
# SSH into your Hostinger VPS
ssh root@your-vps-ip
```

### Step 3.2: Install Required Software
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install Nginx
apt install nginx -y

# Install PM2 for process management
npm install -g pm2

# Install Git
apt install git -y
```

### Step 3.3: Set Up Directory Structure
```bash
# Create web directories
mkdir -p /var/www/clinic-kart
cd /var/www/clinic-kart

# Create directories for each panel
mkdir website admin vendor

# Set permissions
chown -R www-data:www-data /var/www/clinic-kart
chmod -R 755 /var/www/clinic-kart
```

## Phase 4: Build and Deploy Applications (45 minutes)

### Step 4.1: Fix Critical Authentication Issue First
```bash
# On your local machine, fix the hardcoded authentication
cd "Website/src/context"
```

Edit `AuthContext.jsx` line 60:
```javascript
// CHANGE THIS LINE:
value={{ user, login, logout, loading, isAuthenticated:true }}

// TO THIS:
value={{ user, login, logout, loading, isAuthenticated: !!user }}
```

### Step 4.2: Update API Services
Replace the placeholder services in each panel:

**Website/src/services/api.js:**
```javascript
import { supabase, productsService, authService } from './supabase'

export const api = {
  // Products
  getProducts: (filters) => productsService.getAll(filters),
  getProduct: (id) => productsService.getById(id),

  // Categories
  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    if (error) throw error
    return data
  },

  // Vendors
  getVendors: async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*, users(first_name, last_name)')
      .eq('verification_status', 'approved')
    if (error) throw error
    return data
  },

  // Orders
  createOrder: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        order_number: `ORD-${Date.now()}`
      })
      .select()
      .single()
    if (error) throw error
    return data
  }
}

export { authService }
```

**Admin_Panel/src/services/supabase.js:** (Same as above)
**Vendor_Panel/src/services/api.js:** (Same as above)

### Step 4.3: Update Authentication Context
Replace the AuthContext in all panels with the unified version from Step 2.3.

### Step 4.4: Build Applications Locally
```bash
# Build Website
cd Website
npm install
npm run build

# Build Admin Panel
cd ../Admin_Panel
npm install
npm run build

# Build Vendor Panel
cd ../Vendor_Panel
npm install
npm run build
```

### Step 4.5: Upload to VPS
```bash
# Create deployment script
cat > deploy.sh << 'EOF'
#!/bin/bash

# Upload Website
scp -r Website/dist/* root@your-vps-ip:/var/www/clinic-kart/website/

# Upload Admin Panel
scp -r Admin_Panel/build/* root@your-vps-ip:/var/www/clinic-kart/admin/

# Upload Vendor Panel
scp -r Vendor_Panel/dist/* root@your-vps-ip:/var/www/clinic-kart/vendor/
EOF

chmod +x deploy.sh
./deploy.sh
```

## Phase 5: Domain and SSL Configuration (30 minutes)

### Step 5.1: Configure Nginx
On your VPS, create Nginx configuration:

```bash
# Create main site config
cat > /etc/nginx/sites-available/clinic-kart << 'EOF'
# Main Website
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/clinic-kart/website;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        return 404;
    }
}

# Admin Panel
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /var/www/clinic-kart/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Vendor Panel
server {
    listen 80;
    server_name vendor.yourdomain.com;
    root /var/www/clinic-kart/vendor;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/clinic-kart /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 5.2: Set Up SSL with Let's Encrypt
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificates
certbot --nginx -d yourdomain.com -d www.yourdomain.com
certbot --nginx -d admin.yourdomain.com
certbot --nginx -d vendor.yourdomain.com

# Set up auto-renewal
crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Step 5.3: Configure DNS in Hostinger Panel
1. Go to Hostinger Control Panel → DNS Zone
2. Add these A records:
   - `@` → Your VPS IP
   - `www` → Your VPS IP
   - `admin` → Your VPS IP
   - `vendor` → Your VPS IP

## Phase 6: Testing and Verification (30 minutes)

### Step 6.1: Test Each Panel
```bash
# Test main website
curl -I https://yourdomain.com

# Test admin panel
curl -I https://admin.yourdomain.com

# Test vendor panel
curl -I https://vendor.yourdomain.com
```

### Step 6.2: Create Test Data
1. Go to Supabase Dashboard → Table Editor
2. Insert test data:

```sql
-- Create admin user
INSERT INTO users (email, role, first_name, last_name)
VALUES ('admin@yourdomain.com', 'admin', 'Admin', 'User');

-- Create test category
INSERT INTO categories (name, slug, description)
VALUES ('Medical Equipment', 'medical-equipment', 'Professional medical equipment');

-- Create test vendor
INSERT INTO vendors (user_id, business_name, verification_status)
VALUES ((SELECT id FROM users WHERE email = 'admin@yourdomain.com'), 'Test Medical Supplies', 'approved');
```

### Step 6.3: Test Complete Workflow
1. **Website Test:**
   - Visit https://yourdomain.com
   - Register new customer account
   - Browse products
   - Test shopping cart

2. **Admin Panel Test:**
   - Visit https://admin.yourdomain.com
   - Login with admin credentials
   - Create products
   - Manage vendors
   - View analytics

3. **Vendor Panel Test:**
   - Visit https://vendor.yourdomain.com
   - Register vendor account
   - Add products
   - Manage orders

## Phase 7: Production Optimization (15 minutes)

### Step 7.1: Set Up Monitoring
```bash
# Install monitoring tools
npm install -g pm2
pm2 startup
pm2 save

# Set up log rotation
pm2 install pm2-logrotate
```

### Step 7.2: Configure Firewall
```bash
# Set up UFW firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

### Step 7.3: Set Up Backups
```bash
# Create backup script
cat > /root/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /root/backups/clinic-kart-$DATE.tar.gz /var/www/clinic-kart
find /root/backups -name "clinic-kart-*.tar.gz" -mtime +7 -delete
EOF

chmod +x /root/backup.sh
mkdir -p /root/backups

# Add to crontab
echo "0 2 * * * /root/backup.sh" | crontab -
```

## 🎉 Deployment Complete!

### Your Live URLs:
- **Main Website**: https://yourdomain.com
- **Admin Panel**: https://admin.yourdomain.com
- **Vendor Panel**: https://vendor.yourdomain.com

### Admin Access:
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Database**: Direct access via Supabase
- **File Storage**: Supabase Storage buckets
- **Authentication**: Supabase Auth

### Next Steps:
1. **Customize Design**: Update branding and colors
2. **Add Content**: Products, categories, blog posts
3. **Configure Payments**: Integrate payment gateway
4. **Set Up Analytics**: Google Analytics, etc.
5. **Test Everything**: Complete end-to-end testing

### Support:
- **Supabase Docs**: https://supabase.com/docs
- **Hostinger Support**: Available 24/7
- **SSL Renewal**: Automatic via Let's Encrypt

**Total Setup Time**: ~3 hours
**Monthly Cost**: ~$25 (Supabase Pro) + Your VPS cost
**Result**: Fully functional, production-ready e-commerce platform!
