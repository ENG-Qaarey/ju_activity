# PowerShell script to start with CUSTOM ngrok domains (requires paid plan)
# Usage: .\start-ngrok-custom.ps1
# 
# IMPORTANT: This requires ngrok paid plan with reserved domains:
# - ju-activity-backend.ngrok-free.app
# - ju-activity.ngrok-free.app

Write-Host "Starting JU Activity Hub with CUSTOM Ngrok Domains..." -ForegroundColor Green
Write-Host "⚠️  This requires ngrok paid plan with reserved domains!" -ForegroundColor Yellow

# Start Backend
Write-Host "`n[1/4] Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run start:dev"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[2/4] Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\ju-activity'; npm run dev"

Start-Sleep -Seconds 3

# Start Backend Ngrok with Custom Domain
Write-Host "[3/4] Starting Ngrok for Backend (port 3001)..." -ForegroundColor Yellow
Write-Host "   Backend will be at: https://ju-activity-backend.ngrok-free.app" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; ngrok http 3001 --domain=ju-activity-backend.ngrok-free.app"

Start-Sleep -Seconds 2

# Start Frontend Ngrok with Custom Domain
Write-Host "[4/4] Starting Ngrok for Frontend (port 8080)..." -ForegroundColor Yellow
Write-Host "   Frontend will be at: https://ju-activity.ngrok-free.app" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; ngrok http 8080 --domain=ju-activity.ngrok-free.app"

Start-Sleep -Seconds 3

Write-Host "`n✅ All services started!" -ForegroundColor Green
Write-Host "`n📝 URLs:" -ForegroundColor Yellow
Write-Host "   Backend: https://ju-activity-backend.ngrok-free.app" -ForegroundColor Cyan
Write-Host "   Frontend: https://ju-activity.ngrok-free.app" -ForegroundColor Cyan
Write-Host "`n   Create ju-activity/.env with:" -ForegroundColor White
Write-Host "   VITE_API_URL=https://ju-activity-backend.ngrok-free.app/api" -ForegroundColor Green
Write-Host "`n   Then restart the frontend server and open the frontend URL!" -ForegroundColor Cyan
