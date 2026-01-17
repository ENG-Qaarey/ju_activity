# PowerShell script to start both backend and frontend ngrok tunnels
# Usage: .\start-both-ngrok.ps1

Write-Host "Starting both Ngrok tunnels..." -ForegroundColor Green
Write-Host ""

# Check if backend and frontend servers are running
Write-Host "⚠️  Make sure your servers are running:" -ForegroundColor Yellow
Write-Host "   - Backend: npm run start:dev (port 3001)" -ForegroundColor White
Write-Host "   - Frontend: npm run dev (port 8080)" -ForegroundColor White
Write-Host ""

Start-Sleep -Seconds 2

# Start Backend Ngrok in a new terminal window
Write-Host "[1/2] Starting Backend Ngrok (port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host 'Backend Ngrok Tunnel - Port 3001' -ForegroundColor Cyan; ngrok http 3001"

Start-Sleep -Seconds 1

# Start Frontend Ngrok in a new terminal window
Write-Host "[2/2] Starting Frontend Ngrok (port 8080)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host 'Frontend Ngrok Tunnel - Port 8080' -ForegroundColor Cyan; ngrok http 8080"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ Both ngrok tunnels started!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Check the two terminal windows for your URLs:" -ForegroundColor Yellow
Write-Host "   Terminal 1: Backend URL (e.g., https://abc123.ngrok-free.app)" -ForegroundColor Cyan
Write-Host "   Terminal 2: Frontend URL (e.g., https://xyz789.ngrok-free.dev)" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 TIP: You can also view all tunnels at http://127.0.0.1:4040" -ForegroundColor White
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Copy the BACKEND URL from Terminal 1" -ForegroundColor White
Write-Host "   2. Create ju-activity/.env with: VITE_API_URL=https://backend-url.ngrok-free.app/api" -ForegroundColor White
Write-Host "   3. Restart your frontend server" -ForegroundColor White
Write-Host "   4. Open the frontend URL from Terminal 2 in your browser" -ForegroundColor White
