# Quick Start Script for MongoDB Integration

Write-Host "🚀 Parking Management System - MongoDB Setup" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check if MongoDB is running
Write-Host "1. Checking MongoDB status..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service -Name MongoDB -ErrorAction Stop
    if ($mongoService.Status -eq 'Running') {
        Write-Host "   ✓ MongoDB service is running" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ MongoDB service is not running. Starting..." -ForegroundColor Yellow
        Start-Service -Name MongoDB
        Write-Host "   ✓ MongoDB service started" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠ MongoDB service not found. Make sure MongoDB is installed." -ForegroundColor Red
    Write-Host "   Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
}

Write-Host "`n2. Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "server"
if (Test-Path "package.json") {
    npm install
    Write-Host "   ✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Backend package.json not found" -ForegroundColor Red
}

Write-Host "`n3. Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ".."
if (Test-Path "package.json") {
    npm install
    Write-Host "   ✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Frontend package.json not found" -ForegroundColor Red
}

Write-Host "`n4. Switching to MongoDB context..." -ForegroundColor Yellow
Set-Location "context"
if (Test-Path "parkingcontext-mongodb.tsx") {
    if (Test-Path "parkingcontext.tsx") {
        Rename-Item "parkingcontext.tsx" "parkingcontext-localstorage.tsx" -Force
        Write-Host "   ✓ Original context backed up as parkingcontext-localstorage.tsx" -ForegroundColor Green
    }
    Copy-Item "parkingcontext-mongodb.tsx" "parkingcontext.tsx" -Force
    Write-Host "   ✓ MongoDB context activated" -ForegroundColor Green
} else {
    Write-Host "   ⚠ MongoDB context file not found" -ForegroundColor Red
}

Set-Location ".."

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Open a new terminal and run: cd server; npm run dev" -ForegroundColor White
Write-Host "2. Open another terminal and run: npm run dev" -ForegroundColor White
Write-Host "3. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host "4. Use MongoDB Compass to view data at: mongodb://localhost:27017`n" -ForegroundColor White

Write-Host "🔐 Default Login:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123`n" -ForegroundColor White

Write-Host "📖 For detailed instructions, see MONGODB_SETUP.md`n" -ForegroundColor Cyan

Read-Host "Press Enter to exit"
