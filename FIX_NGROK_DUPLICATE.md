# Fix: Same Ngrok URL for Both Ports

## ❌ Problem

You're seeing the same ngrok URL for both backend (3001) and frontend (8080):
```
Forwarding  https://xxx.ngrok-free.dev -> http://localhost:8080
Forwarding  https://xxx.ngrok-free.dev -> http://localhost:3001
```

**Cause:** You're running both ngrok commands in the same terminal/process, or they're conflicting.

## ✅ Solution: Run Two SEPARATE Ngrok Instances

### Option 1: Manual (Two Separate Terminals)

**Stop all current ngrok processes first** (Ctrl+C in all terminals).

Then open **TWO separate terminal windows**:

**Terminal 1 - Backend Ngrok:**
```powershell
ngrok http 3001
```
You'll see: `Forwarding https://abc123.ngrok-free.app -> http://localhost:3001`

**Terminal 2 - Frontend Ngrok:**
```powershell
ngrok http 8080
```
You'll see: `Forwarding https://xyz789.ngrok-free.dev -> http://localhost:8080`

**✅ These will be DIFFERENT URLs!**

---

### Option 2: Use the Script (Automated)

```powershell
.\start-both-ngrok.ps1
```

This opens TWO separate terminal windows automatically, each with its own ngrok instance.

---

### Option 3: One Terminal with Config File (Recommended for Single Terminal)

**Use ngrok's configuration file** to run both tunnels from one command:

**Step 1:** Make sure `ngrok.yml` exists in your project root (already created for you).

**Step 2:** Run both tunnels at once:
```powershell
ngrok start backend frontend
```

Or use the script:
```powershell
.\start-ngrok-single-terminal.ps1
```

**✅ This gives you TWO different URLs in ONE terminal!**

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3001
Forwarding  https://xyz789.ngrok-free.dev -> http://localhost:8080
```

**View both tunnels at:** `http://127.0.0.1:4040`

---

## 🔍 Why This Happens

- **One ngrok process = One tunnel URL**
- Running both commands in the same terminal makes ngrok confused
- You need **separate processes** for separate tunnels

---

## 📝 After Setting Up Correctly

1. **Backend URL** (from Terminal 1): `https://abc123.ngrok-free.app`
2. **Frontend URL** (from Terminal 2): `https://xyz789.ngrok-free.dev`
3. Update `ju-activity/.env`:
   ```env
   VITE_API_URL=https://abc123.ngrok-free.app/api
   ```
4. Restart frontend server
5. Open frontend URL in browser

---

## ⚠️ About the 403 Error

The `403 Forbidden` you're seeing is **normal for ngrok free plan**. It's the warning page. Just click **"Visit Site"** to proceed.

If you want to bypass it, you can:
- Add `ngrok-skip-browser-warning` header
- Or upgrade to paid plan

But for development, just clicking through is fine!
