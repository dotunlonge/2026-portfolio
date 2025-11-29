# Railway Deployment Guide

This guide will help you deploy your C++ backend and React frontend portfolio to Railway.

## Prerequisites

1. A [Railway](https://railway.app) account
2. GitHub repository with your code
3. Railway CLI (optional, but helpful)

## Deployment Options

### Option 1: Deploy Backend and Frontend Separately (Recommended)

This approach gives you more control and allows you to scale each service independently.

#### Step 1: Deploy Backend

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Click **"Add Service"** → **"Empty Service"**
6. Name it `portfolio-backend`
7. In the service settings:
   - **Root Directory**: Set to `backend`
   - **Build Command**: 
     ```bash
     mkdir -p build && cd build && cmake .. && make
     ```
   - **Start Command**: 
     ```bash
     cd build && ./portfolio-server
     ```
8. Add environment variable:
   - `PORT` = `8080` (Railway will provide this, but set it explicitly)
9. Click **"Deploy"**

#### Step 2: Deploy Frontend

1. In the same Railway project, click **"Add Service"** → **"Empty Service"**
2. Name it `portfolio-frontend`
3. In the service settings:
   - **Root Directory**: Set to `frontend`
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     npx serve -s dist -l 3000
     ```
4. Install `serve` package by adding to `package.json`:
   ```json
   "scripts": {
     "start": "serve -s dist -l 3000"
   },
   "dependencies": {
     "serve": "^14.2.0"
   }
   ```
5. Add environment variable:
   - `PORT` = `3000`
   - `VITE_API_URL` = `https://your-backend-service.railway.app` (get this from backend service)
6. Update `vite.config.ts` to use the environment variable for API URL
7. Click **"Deploy"**

#### Step 3: Configure Frontend to Use Backend

1. Get your backend service URL from Railway (e.g., `portfolio-backend-production.up.railway.app`)
2. Update `frontend/vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react(), TanStackRouterVite()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:8080',
           changeOrigin: true,
         },
       },
     },
   })
   ```
3. For production, update API calls to use the backend URL directly

### Option 2: Deploy with Docker (Alternative)

If you prefer Docker deployment:

1. Push your code to GitHub
2. In Railway, create a new project
3. Add two services:
   - Backend: Use `backend/Dockerfile`
   - Frontend: Use `frontend/Dockerfile`
4. Railway will automatically detect and build from Dockerfiles

## Environment Variables

### Backend Service
- `PORT` = `8080` (Railway auto-assigns, but you can set explicitly)

### Frontend Service
- `PORT` = `3000`
- `VITE_API_URL` = Your backend service URL (e.g., `https://portfolio-backend-production.up.railway.app`)

## Updating Frontend to Use Production API

You'll need to update the frontend to use the backend URL in production. Here are two approaches:

### Approach 1: Environment Variable (Recommended)

1. Update `frontend/src/routes/index.tsx` and other API call files:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || '/api'
   
   async function fetchPersonalInfo(): Promise<PersonalInfo> {
     const response = await fetch(`${API_URL}/personal`)
     // ...
   }
   ```

2. Set `VITE_API_URL` in Railway frontend service environment variables

### Approach 2: Build-time Configuration

Update `vite.config.ts` to handle production API URLs properly.

## Custom Domains

1. In Railway, go to your service settings
2. Click **"Settings"** → **"Domains"**
3. Click **"Generate Domain"** or add your custom domain
4. Railway will provide SSL certificates automatically

## Monitoring

- Railway provides logs in the dashboard
- Check service health in the **"Metrics"** tab
- Set up alerts in **"Settings"** → **"Notifications"**

## Troubleshooting

### Backend won't start
- Check that the binary is built correctly
- Verify `PORT` environment variable is set
- Check logs in Railway dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings (already configured in backend)
- Ensure backend service is running

### Build fails
- Check Railway logs for specific errors
- Verify all dependencies are in `package.json` or `CMakeLists.txt`
- Ensure build commands are correct

## Quick Start Commands

If using Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

## Cost Considerations

- Railway offers a free tier with $5 credit/month
- After free tier, pay-as-you-go pricing
- Backend and frontend count as separate services
- Monitor usage in Railway dashboard

## Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

