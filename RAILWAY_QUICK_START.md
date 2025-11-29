# Railway Deployment - Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Deploy Backend

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Click **"Add Service"** → **"Empty Service"**
5. Name it: `portfolio-backend`
6. In service settings:
   - **Root Directory**: `backend`
   - **Build Command**: 
     ```bash
     mkdir -p build && cd build && cmake .. && make
     ```
   - **Start Command**: 
     ```bash
     cd build && ./portfolio-server
     ```
7. Click **"Deploy"** and wait for it to build
8. Once deployed, copy the service URL (e.g., `portfolio-backend-production.up.railway.app`)

### Step 3: Deploy Frontend

1. In the same Railway project, click **"Add Service"** → **"Empty Service"**
2. Name it: `portfolio-frontend`
3. In service settings:
   - **Root Directory**: `frontend`
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```
4. Go to **"Variables"** tab and add:
   - `VITE_API_URL` = `https://your-backend-url.railway.app` (use the URL from Step 2)
5. Click **"Deploy"**

### Step 4: Get Your Domain

1. In the frontend service, go to **"Settings"** → **"Domains"**
2. Click **"Generate Domain"** to get a free Railway domain
3. Or add your custom domain

## ✅ That's It!

Your portfolio is now live! The frontend will automatically connect to your backend.

## 🔧 Troubleshooting

**Backend won't start?**
- Check logs in Railway dashboard
- Ensure PORT environment variable is set (Railway does this automatically)

**Frontend can't reach backend?**
- Verify `VITE_API_URL` is set correctly in frontend service variables
- Make sure backend service is running
- Check that the URL includes `https://`

**Build fails?**
- Check Railway logs for specific errors
- Ensure all dependencies are in `package.json` or `CMakeLists.txt`

## 📝 Notes

- Railway provides $5 free credit per month
- Both services run independently
- Environment variables are set per service
- Logs are available in the Railway dashboard

For detailed instructions, see `RAILWAY_DEPLOYMENT.md`

