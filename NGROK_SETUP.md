# Ngrok Localhost Deployment Guide

This guide shows how to expose your local development environment to the internet using ngrok.

## Quick Start

### 1. Start Backend Server

```bash
cd backend
npm run start:dev
```

The backend will run on `http://localhost:3001`

### 2. Start Frontend Server

In a new terminal:

```bash
cd ju-activity
npm run dev
```

The frontend will run on `http://localhost:8080`

### 3. Expose Backend with Ngrok

In a new terminal:

**Option A: Random Subdomain (Free Plan) - Recommended**
```bash
ngrok http 3001
```
**Copy the HTTPS URL shown** (e.g., `https://abc123.ngrok-free.app`) - this is your backend public URL.

**Option B: With Custom Subdomain (Requires Paid Plan + Reserved Domain)**
```bash
ngrok http 3001 --domain=ju-activity-backend.ngrok-free.app
```
⚠️ **Note:** Custom domains require paid plan and must be reserved first at https://dashboard.ngrok.com/domains

Backend will be at: Random URL (free) or `https://ju-activity-backend.ngrok-free.app` (custom)

### 4. Expose Frontend with Ngrok

In another new terminal:

**Option A: Random Subdomain (Free Plan) - Recommended**
```bash
ngrok http 8080
```
**Copy the HTTPS URL shown** (e.g., `https://xyz789.ngrok-free.dev`) - this is your frontend public URL.

**Option B: With Custom Subdomain (Requires Paid Plan + Reserved Domain)**
```bash
ngrok http 8080 --domain=ju-activity.ngrok-free.app
```
⚠️ **Note:** Custom domains require paid plan and must be reserved first at https://dashboard.ngrok.com/domains

Frontend will be at: Random URL (free) or `https://ju-activity.ngrok-free.app` (custom)

### 5. Configure Frontend to Use Backend Ngrok URL

Set the environment variable when starting the frontend:

**Option A: Using .env file (Recommended)**

Create `ju-activity/.env`:
```env
# Replace with YOUR actual backend ngrok URL (from step 3)
# Example for free plan (random URL):
VITE_API_URL=https://abc123.ngrok-free.app/api

# Example for paid plan (custom domain):
# VITE_API_URL=https://ju-activity-backend.ngrok-free.app/api
```

**⚠️ Important:** Replace `abc123.ngrok-free.app` with the actual URL shown in your ngrok terminal output!

Then restart the frontend:
```bash
cd ju-activity
npm run dev
```

**Option B: Using environment variable in command**

```bash
cd ju-activity
# PowerShell
$env:VITE_API_URL="https://ju-activity-backend.ngrok-free.app/api"; npm run dev

# Or Bash/Unix
VITE_API_URL="https://ju-activity-backend.ngrok-free.app/api" npm run dev
```

**Option C: Update vite.config.ts temporarily**

Add to `vite.config.ts`:
```typescript
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://your-backend-ngrok-url.ngrok-free.app/api')
  },
  // ... rest of config
}))
```

## Using the Public URLs

With custom subdomains:
- **Frontend:** `https://ju-activity.ngrok-free.app`
- **Backend API:** `https://ju-activity-backend.ngrok-free.app/api`

## Important Notes

1. **Custom Subdomain Requirements:**
   - Custom subdomains like `ju-activity.ngrok-free.app` require a **paid ngrok plan**
   - Free plan uses random subdomains that change on each restart
   - To use custom subdomains, sign up for ngrok at https://ngrok.com/pricing

2. **Free ngrok URLs change on each restart** - Update `VITE_API_URL` if you restart ngrok

3. **Ngrok Free Plan Limitations:**
   - URLs expire after 2 hours
   - Requires ngrok agent sign-in
   - Shows warning page (can be bypassed)
   - Random subdomains only

4. **CORS:** Your backend already has ngrok hostname support in CORS configuration

5. **Persistent URLs:** Custom subdomains stay the same - perfect for development!

## Troubleshooting

### ERR_NGROK_3200: Endpoint is Offline

**Error:** `ERR_NGROK_3200: The endpoint ju-activity-backend.ngrok-free.app is offline`

**Cause:** This means the custom subdomain doesn't exist in your ngrok account. Custom subdomains require:
1. **Paid ngrok plan** (free plan doesn't support custom domains)
2. **Reserved domain** in your ngrok account (must be created first)

**Solution:**

**Option 1: Use Free Plan (Random Subdomains) - Recommended for testing**
```bash
# Use WITHOUT --domain flag
ngrok http 3001
ngrok http 8080
```
Copy the random URLs ngrok provides and use those in your `.env` file.

**Option 2: Reserve Custom Domains (Paid Plan)**
1. Sign up for ngrok paid plan: https://ngrok.com/pricing
2. Reserve your domains at: https://dashboard.ngrok.com/domains
3. Reserve: `ju-activity-backend.ngrok-free.app` and `ju-activity.ngrok-free.app`
4. Then use `--domain` flag in commands

### CORS Errors
If you get CORS errors, make sure:
- Backend CORS includes the ngrok hostname (already configured)
- Frontend uses the backend's ngrok URL (not localhost)

### API Not Found
- Verify backend is running on port 3001
- Check ngrok is pointing to port 3001
- Confirm `VITE_API_URL` includes `/api` suffix
- Check ngrok terminal for the actual assigned URL

### Ngrok Warning Page
Free ngrok shows a warning page. Click "Visit Site" to proceed.

### How to Find Your Ngrok URLs

When you start ngrok, it shows URLs in two ways:

1. **In the terminal output:** Look for lines like:
   ```
   Forwarding  https://abc123.ngrok-free.app -> http://localhost:3001
   ```

2. **Via ngrok web interface:** Ngrok also provides a web UI at `http://127.0.0.1:4040`
   - Open this URL in your browser
   - See all active tunnels and their public URLs

## Quick Scripts (Optional)

You can create helper scripts in your package.json files (see below).
