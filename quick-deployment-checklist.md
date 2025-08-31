# Clinic Kart - Quick Deployment Checklist

## 🚀 Complete Deployment in 3 Hours

### ✅ Phase 1: Supabase Setup (30 min)
- [ ] Create Supabase project at https://supabase.com/dashboard
- [ ] Save credentials (URL + Anon Key)
- [ ] Run database schema (copy from deployment guide)
- [ ] Enable Row Level Security policies
- [ ] Configure authentication settings
- [ ] Set up storage buckets

### ✅ Phase 2: Fix Code Issues (45 min)
- [ ] Install Supabase client: `npm install @supabase/supabase-js` (all 3 panels)
- [ ] Create environment files with Supabase credentials
- [ ] **CRITICAL**: Fix authentication in `Website/src/context/AuthContext.jsx` line 60
- [ ] Replace placeholder API services with Supabase integration
- [ ] Create unified `supabase.js` service file (all 3 panels)

### ✅ Phase 3: VPS Preparation (30 min)
- [ ] SSH into Hostinger VPS: `ssh root@your-vps-ip`
- [ ] Install Node.js 18, Nginx, PM2, Git
- [ ] Create directory structure: `/var/www/clinic-kart/{website,admin,vendor}`
- [ ] Set proper permissions

### ✅ Phase 4: Build & Deploy (45 min)
- [ ] Build all 3 applications locally
- [ ] Upload built files to VPS
- [ ] Configure Nginx for 3 subdomains
- [ ] Test basic connectivity

### ✅ Phase 5: Domain & SSL (30 min)
- [ ] Configure DNS A records in Hostinger panel
- [ ] Set up SSL certificates with Let's Encrypt
- [ ] Test HTTPS access for all 3 domains

### ✅ Phase 6: Testing (30 min)
- [ ] Create test admin user in Supabase
- [ ] Test complete user workflow
- [ ] Verify admin panel controls
- [ ] Test vendor registration and management

## 🎯 Critical Success Factors

### 1. Authentication Fix (MUST DO FIRST)
```javascript
// Website/src/context/AuthContext.jsx - Line 60
// CHANGE FROM:
value={{ user, login, logout, loading, isAuthenticated:true }}

// TO:
value={{ user, login, logout, loading, isAuthenticated: !!user }}
```

### 2. Environment Variables (All 3 Panels)
```bash
# Website/.env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Admin_Panel/.env  
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# Vendor_Panel/.env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Domain Structure
```
yourdomain.com           → Main Website (Customers)
admin.yourdomain.com     → Admin Panel (Full Control)
vendor.yourdomain.com    → Vendor Panel (Vendor Management)
```

### 4. Supabase Configuration
- **Authentication**: Email/Password enabled
- **RLS**: Enabled on all tables
- **Storage**: Public bucket for product images
- **Policies**: Role-based access control

## 🔧 Troubleshooting Common Issues

### Issue 1: "Cannot connect to Supabase"
**Solution**: Check environment variables are correctly set and Supabase project is active

### Issue 2: "Authentication not working"
**Solution**: Verify you fixed the hardcoded `isAuthenticated:true` in AuthContext

### Issue 3: "Products not loading"
**Solution**: Check RLS policies allow public access to published products

### Issue 4: "SSL certificate failed"
**Solution**: Ensure DNS records are propagated (wait 24 hours max)

### Issue 5: "Admin panel not accessible"
**Solution**: Check Nginx configuration and subdomain DNS record

## 📱 Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Create admin user account
- [ ] Add initial product categories
- [ ] Upload sample products
- [ ] Test complete purchase workflow
- [ ] Set up basic content (About Us, Terms, etc.)

### Week 1
- [ ] Configure payment gateway integration
- [ ] Set up email notifications
- [ ] Add Google Analytics
- [ ] Optimize images and performance
- [ ] Create vendor onboarding process

### Month 1
- [ ] Add advanced features (reviews, ratings)
- [ ] Implement marketing tools
- [ ] Set up automated backups
- [ ] Monitor performance and optimize
- [ ] Gather user feedback and iterate

## 💰 Cost Breakdown

### Monthly Costs
- **Supabase Pro**: $25/month (includes 8GB database, 100GB bandwidth)
- **Hostinger VPS**: Your existing cost
- **Domain SSL**: Free (Let's Encrypt)
- **Total Additional**: ~$25/month

### One-time Costs
- **Development Time**: ~3 hours (your time)
- **Setup**: Free (following this guide)

## 🎉 Success Metrics

### Technical Metrics
- [ ] All 3 websites load without errors
- [ ] Authentication works across all panels
- [ ] Admin can create/manage products
- [ ] Vendors can register and manage products
- [ ] Customers can browse and purchase
- [ ] Real-time updates working
- [ ] File uploads functional
- [ ] SSL certificates active

### Business Metrics
- [ ] Complete user registration flow
- [ ] Product catalog management
- [ ] Order processing workflow
- [ ] Vendor approval process
- [ ] Payment integration ready
- [ ] Email notifications working
- [ ] Analytics tracking active

## 🆘 Emergency Contacts

### If Something Goes Wrong
1. **Supabase Issues**: Check Supabase status page
2. **VPS Issues**: Contact Hostinger support (24/7)
3. **SSL Issues**: Let's Encrypt community forum
4. **Code Issues**: Refer to `Bug-fixed.md` document

### Backup Plan
- Keep original code as backup
- Supabase has automatic backups
- VPS files backed up daily (if configured)
- Can rollback to previous version anytime

## 🎯 Final Checklist Before Going Live

- [ ] All 3 panels accessible via HTTPS
- [ ] Admin can control everything
- [ ] Vendors can manage their products
- [ ] Customers can browse and purchase
- [ ] Authentication working properly
- [ ] File uploads working
- [ ] Email notifications configured
- [ ] Payment gateway integrated
- [ ] Analytics tracking active
- [ ] Backup system configured
- [ ] Monitoring tools active
- [ ] Documentation updated

**Result**: Professional, production-ready multi-panel e-commerce platform with full admin control and seamless vendor integration!

---

**Next Action**: Start with Phase 1 (Supabase Setup) and follow the detailed guide in `hostinger-vps-deployment-guide.md`
