# Clinic Kart - API Specification

## Overview

This document defines the complete API specification for the Clinic Kart multi-panel application, based on the analysis of existing Admin Panel endpoints and requirements from Website and Vendor Panel components.

## Base Configuration

### Supabase Configuration
```javascript
// Environment Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (server-side only)
```

### Authentication Headers
```javascript
// All authenticated requests include:
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Authentication Endpoints

### POST /auth/signup
Register new user account
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "userData": {
    "role": "customer|vendor|admin",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }
}
```

### POST /auth/signin
User login
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### POST /auth/signout
User logout (invalidates JWT)

### POST /auth/refresh
Refresh JWT token
```json
{
  "refreshToken": "refresh_token_here"
}
```

### POST /auth/reset-password
Password reset request
```json
{
  "email": "user@example.com"
}
```

## User Management Endpoints

### GET /api/v1/users
Get all users (Admin only)
- Query params: `page`, `limit`, `search`, `role`
- Response: Paginated user list

### GET /api/v1/users/:id
Get user by ID
- Response: User profile data

### PUT /api/v1/users/:id
Update user profile
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "profile": {
    "address": "123 Main St",
    "city": "New York"
  }
}
```

### DELETE /api/v1/users/:id
Delete user account (Admin only)

## Vendor Management Endpoints

### GET /api/v1/vendors
Get all vendors
- Query params: `page`, `limit`, `search`, `status`
- Response: Paginated vendor list

### GET /api/v1/vendors/:id
Get vendor profile
- Response: Complete vendor information

### POST /api/v1/vendors
Create vendor profile
```json
{
  "businessName": "Medical Supplies Co",
  "businessType": "Medical Equipment",
  "description": "Professional medical equipment supplier",
  "address": {
    "street": "123 Business Ave",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "contact": {
    "phone": "+1234567890",
    "email": "contact@medicalsupplies.com"
  }
}
```

### PUT /api/v1/vendors/:id
Update vendor profile

### PUT /api/v1/vendors/:id/status
Update vendor verification status (Admin only)
```json
{
  "status": "pending|approved|rejected|suspended",
  "reason": "Verification complete"
}
```

### GET /api/v1/vendors/:id/products
Get vendor's products
- Query params: `page`, `limit`, `category`, `status`

### GET /api/v1/vendors/:id/orders
Get vendor's orders
- Query params: `page`, `limit`, `status`, `dateFrom`, `dateTo`

## Product Management Endpoints

### GET /api/v1/products
Get all products
- Query params: `page`, `limit`, `search`, `category`, `vendor`, `status`
- Response: Paginated product list with category and vendor info

### GET /api/v1/products/:id
Get product by ID
- Response: Complete product information with reviews

### POST /api/v1/products
Create new product (Vendor/Admin)
```json
{
  "name": "Digital Thermometer",
  "description": "Professional digital thermometer",
  "price": 29.99,
  "comparePrice": 39.99,
  "categoryId": "uuid",
  "inventory": 100,
  "images": ["url1", "url2"],
  "specifications": {
    "brand": "MedTech",
    "model": "DT-100",
    "warranty": "2 years"
  },
  "status": "draft|published|archived"
}
```

### PUT /api/v1/products/:id
Update product

### DELETE /api/v1/products/:id
Delete product

### POST /api/v1/products/:id/images
Upload product images
- Content-Type: multipart/form-data
- Response: Array of uploaded image URLs

## Category Management Endpoints

### GET /api/v1/categories
Get all categories
- Query params: `parent`, `level`
- Response: Hierarchical category tree

### POST /api/v1/categories
Create category (Admin only)
```json
{
  "name": "Medical Equipment",
  "slug": "medical-equipment",
  "description": "Professional medical equipment",
  "parentId": "uuid_or_null",
  "imageUrl": "category_image_url"
}
```

### PUT /api/v1/categories/:id
Update category (Admin only)

### DELETE /api/v1/categories/:id
Delete category (Admin only)

## Order Management Endpoints

### GET /api/v1/orders
Get orders
- Customer: Own orders only
- Vendor: Orders for their products
- Admin: All orders
- Query params: `page`, `limit`, `status`, `dateFrom`, `dateTo`

### GET /api/v1/orders/:id
Get order details

### POST /api/v1/orders
Create new order
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "card|paypal|bank_transfer"
}
```

### PUT /api/v1/orders/:id/status
Update order status
```json
{
  "status": "pending|confirmed|processing|shipped|delivered|cancelled",
  "trackingNumber": "TRACK123456",
  "notes": "Order shipped via FedEx"
}
```

## Content Management Endpoints

### GET /api/v1/blogs
Get blog posts
- Query params: `page`, `limit`, `published`

### POST /api/v1/blogs
Create blog post (Admin only)
```json
{
  "title": "Latest Medical Equipment Trends",
  "content": "Blog content here...",
  "excerpt": "Short description",
  "featuredImage": "image_url",
  "status": "draft|published",
  "tags": ["medical", "equipment", "trends"]
}
```

### GET /api/v1/banners
Get promotional banners

### POST /api/v1/banners
Create banner (Admin only)
```json
{
  "title": "Summer Sale",
  "description": "Up to 50% off medical supplies",
  "imageUrl": "banner_image_url",
  "linkUrl": "/products/sale",
  "isActive": true,
  "displayOrder": 1
}
```

## Analytics Endpoints

### GET /api/v1/analytics/dashboard
Get dashboard statistics
- Response varies by user role:
  - Customer: Order history, wishlist count
  - Vendor: Sales metrics, product performance
  - Admin: Platform-wide statistics

### GET /api/v1/analytics/sales
Get sales analytics (Vendor/Admin)
- Query params: `period`, `dateFrom`, `dateTo`

### GET /api/v1/analytics/products
Get product performance analytics
- Query params: `vendorId`, `categoryId`, `period`

## File Upload Endpoints

### POST /api/v1/upload/images
Upload images
- Content-Type: multipart/form-data
- Response: Array of uploaded image URLs with metadata

### POST /api/v1/upload/documents
Upload documents (invoices, certificates)
- Content-Type: multipart/form-data
- Response: Document URLs with metadata

## Notification Endpoints

### GET /api/v1/notifications
Get user notifications
- Query params: `page`, `limit`, `read`

### PUT /api/v1/notifications/:id/read
Mark notification as read

### POST /api/v1/notifications
Send notification (Admin only)
```json
{
  "recipientId": "uuid_or_null", // null for broadcast
  "title": "New Order Received",
  "message": "You have a new order #12345",
  "type": "order|system|promotion",
  "actionUrl": "/orders/12345"
}
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

## Rate Limiting

### Limits by Endpoint Type
- Authentication: 5 requests/minute
- Read operations: 100 requests/minute
- Write operations: 30 requests/minute
- File uploads: 10 requests/minute

## Real-time Features (Supabase Subscriptions)

### Order Status Updates
```javascript
// Subscribe to order status changes
supabase
  .channel('orders')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'orders',
    filter: `customer_id=eq.${userId}`
  }, (payload) => {
    // Handle order status update
  })
  .subscribe()
```

### Inventory Updates
```javascript
// Subscribe to product inventory changes
supabase
  .channel('inventory')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'products',
    filter: 'inventory=lt.10'
  }, (payload) => {
    // Handle low inventory alert
  })
  .subscribe()
```

This API specification provides the complete backend interface needed to support all three panels of the Clinic Kart application with proper authentication, authorization, and real-time capabilities.
