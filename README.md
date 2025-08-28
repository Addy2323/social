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

## 🚀 Netlify Functions + MongoDB Implementation

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (choose the free M0 tier)
3. Create a database user:
   - Go to Database Access → Add New Database User
   - Choose "Password" authentication
   - Username: `addonet-user` (or your choice)
   - Generate a secure password
   - Grant "Read and write to any database" privileges
4. Configure Network Access:
   - Go to Network Access → Add IP Address
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development
5. Get your connection string:
   - Go to Database → Connect → Connect your application
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 2. Environment Variables Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your MongoDB connection string:
   ```bash
   # MongoDB Atlas Connection
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/addonet?retryWrites=true&w=majority
   
   # JWT Secret (generate a random string)
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   
   # Admin credentials
   ADMIN_EMAIL=admin@addonet.com
   ADMIN_PASSWORD=admin123
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Local Development

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Start the development server:
   ```bash
   netlify dev
   ```

   This will start:
   - Frontend on `http://localhost:8888`
   - Netlify Functions on `http://localhost:8888/.netlify/functions`

### 5. Deployment to Netlify

1. **Connect to Netlify**:
   ```bash
   netlify login
   netlify init
   ```

2. **Set Environment Variables in Netlify**:
   - Go to your Netlify dashboard
   - Navigate to Site settings → Environment variables
   - Add the same variables from your `.env` file:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## 🔑 API Endpoints

### Authentication
- `POST /.netlify/functions/auth-register` - User registration
- `POST /.netlify/functions/auth-login` - User login

### Orders
- `GET /.netlify/functions/orders` - Get user orders (or all for admin)
- `POST /.netlify/functions/orders` - Create new order
- `PUT /.netlify/functions/orders` - Update order status (admin only)

### Transactions
- `GET /.netlify/functions/transactions` - Get user transactions
- `POST /.netlify/functions/transactions` - Create fund request
- `PUT /.netlify/functions/transactions` - Approve/reject transaction (admin only)

### Users (Admin Only)
- `GET /.netlify/functions/users` - Get all users with stats
- `PUT /.netlify/functions/users` - Update user status

## 👤 Default Admin Access

- **Email**: `admin@addonet.com`
- **Password**: `admin123`

## 🔒 Security Features

- **JWT Authentication** with 7-day expiration
- **Password Hashing** with bcrypt (12 rounds)
- **CORS Protection** for API endpoints
- **Input Validation** on all endpoints
- **Admin Role Protection** for sensitive operations

## 📱 Cross-Device Functionality

The new implementation solves the original localStorage issue:

- ✅ **Users register on any device** → Data stored in MongoDB Atlas
- ✅ **Admin sees all users** → Real-time data from database
- ✅ **Orders sync across devices** → Centralized order management
- ✅ **Transactions tracked globally** → Unified fund management

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Verify your connection string is correct
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

2. **Netlify Functions Not Working**:
   - Check if `netlify.toml` is configured correctly
   - Verify environment variables are set in Netlify dashboard
   - Check function logs in Netlify dashboard

3. **CORS Errors**:
   - Ensure all API functions include proper CORS headers
   - Check if the frontend is making requests to the correct endpoints

### Development Tips

- Use `netlify dev` for local development with functions
- Check Netlify function logs for debugging
- Test API endpoints with tools like Postman or curl
- Monitor MongoDB Atlas for database operations

## 📈 Next Steps

1. **Add Email Notifications** for order updates
2. **Implement Payment Gateway** integration
3. **Add Real-time Chat Support**
4. **Create Mobile App** with React Native
5. **Add Analytics Dashboard** for business insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Need Help?** Contact support at admin@addonet.com
