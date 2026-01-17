# Quick Start Guide - Free Ngrok Plan

## ❌ Error Explanation

**Error:** `ERR_NGROK_313 - Only paid plans may create endpoints with custom subdomains`

**Cause:** You're using `--domain=ju-activity.ngrok-free.app` which requires a paid ngrok plan.

**Solution:** Use ngrok WITHOUT the `--domain` flag (free plan uses random subdomains).

---

## ✅ Correct Commands (Free Plan)

### Step 1: Start Backend

**Terminal 1:**
```bash
cd backend
npm run start:dev
```

Backend runs on `http://localhost:3001`

---

### Step 2: Start Frontend

**Terminal 2:**
```bash
cd ju-activity
npm run dev
```

Frontend runs on `http://localhost:8080`

---

### Step 3: Expose Backend with Ngrok (NO --domain flag)

**Terminal 3:**
```bash
ngrok http 3001
```

**✅ Correct!** This will show a random URL like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3001
```

**📋 Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`) - this is your backend public URL.

---

### Step 4: Expose Frontend with Ngrok (NO --domain flag)

**Terminal 4:**
```bash
ngrok http 8080
```

**✅ Correct!** This will show a random URL like:
```
Forwarding  https://xyz789.ngrok-free.dev -> http://localhost:8080
```

**📋 Copy the HTTPS URL** (e.g., `https://xyz789.ngrok-free.dev`) - this is your frontend public URL.

---

### Step 5: Configure Frontend

Create `ju-activity/.env` file:
```env
VITE_API_URL=https://abc123.ngrok-free.app/api
```

**⚠️ Important:** Replace `abc123.ngrok-free.app` with the ACTUAL backend URL from Terminal 3!

Then restart the frontend (Terminal 2):
- Press `Ctrl+C` to stop
- Run `npm run dev` again

---

## 🚀 Access Your App

- **Frontend:** Open the frontend ngrok URL from Terminal 4 in your browser
- **Backend API:** Accessible at `https://your-backend-url.ngrok-free.app/api`

---

## 📝 Notes

1. **Random URLs:** Free plan gives different URLs each time you restart ngrok
2. **Update .env:** If you restart ngrok for backend, update `VITE_API_URL` in `.env`
3. **Ngrok Web UI:** View all tunnels at `http://127.0.0.1:4040`
4. **Warning Page:** Free ngrok shows a warning page - click "Visit Site" to proceed

---

## 🔄 Using the Automated Scripts

### Option 1: Start Both Ngrok Tunnels at Once (Recommended)

**PowerShell:**
```powershell
.\start-both-ngrok.ps1
```

This will open two terminal windows - one for backend ngrok, one for frontend ngrok.

**Bash/Unix:**
```bash
./start-both-ngrok.sh
```

### Option 2: Start Everything (Servers + Ngrok)

**PowerShell:**
```powershell
.\start-ngrok.ps1
```

This starts backend, frontend, and both ngrok tunnels automatically.

Then check the ngrok terminal windows for your actual URLs and update `.env` accordingly.

---

## 💰 Want Custom Domains?

If you want custom domains like `ju-activity.ngrok-free.app`:
1. Upgrade to a paid plan: https://dashboard.ngrok.com/billing/choose-a-plan
2. Reserve your domains at: https://dashboard.ngrok.com/domains
3. Then use: `.\start-ngrok-custom.ps1`

For now, **free plan with random subdomains works perfectly!** 🎉
