# SMM Panel - AddoNet

Professional Social Media Marketing Panel built with React, TypeScript, and Tailwind CSS.

## 🚀 Netlify Deployment Guide

### Step 1: Prepare Your Repository

1. **Push to GitHub/GitLab:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

### Step 2: Deploy to Netlify

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect your repository** (GitHub/GitLab)
4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Step 3: Environment Variables

In Netlify dashboard, go to **Site settings > Environment variables** and add:

```
VITE_APP_NAME=SMM Panel - AddoNet
VITE_SUPPORT_EMAIL=myambaado@gmail.com
VITE_SUPPORT_PHONE=+255768828247
VITE_SUPPORT_WHATSAPP=+255768828247
```

### Step 4: Custom Domain (Optional)

1. Go to **Domain settings**
2. Add your custom domain
3. Configure DNS settings as instructed

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Features

- ✅ Instagram Likes & Followers
- ✅ TikTok Likes, Followers & Views
- ✅ YouTube Views
- ✅ Facebook Page Likes
- ✅ Admin Dashboard
- ✅ Transaction Management
- ✅ User Management
- ✅ Support Ticket System
- ✅ Real-time Statistics
- ✅ Mobile Responsive Design

## 💰 Pricing Structure

- **Instagram Likes**: 1k = 5,000 TZS
- **Instagram Followers**: 1k = 20,000 TZS
- **TikTok Services**: Competitive pricing
- **YouTube Views**: Affordable rates

## 📞 Support

- **Email**: myambaado@gmail.com
- **Phone**: +255 768 828 247
- **WhatsApp**: +255 768 828 247

## 🔐 Admin Access

Default admin credentials (⚠️ **Change immediately after deployment**):
- Email: `admin@addonet.com`
- Password: `admin123`

## 🛡️ Security Features

- Input validation
- Error logging
- Data backup system
- Secure headers
- HTTPS enforcement

---

Built with ❤️ by AddoNet
