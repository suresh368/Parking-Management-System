# Parking Management System - MongoDB Integration

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

1. **Node.js** (v16 or higher)
2. **MongoDB** (v6 or higher) - You can install MongoDB Community Edition or use MongoDB Compass
3. **MongoDB Compass** (Optional but recommended for GUI)

## 🔧 Installation Steps

### 1. Install MongoDB

**Option A: MongoDB Community Edition**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: Using MongoDB Compass**
- Download MongoDB Compass: https://www.mongodb.com/try/download/compass
- Install and it will include MongoDB locally

### 2. Start MongoDB Service

**Windows:**
```powershell
# MongoDB should start automatically as a service
# To check if it's running:
Get-Service -Name MongoDB

# Or start it manually:
net start MongoDB
```

**Verify MongoDB is running:**
```powershell
mongosh
# If successful, you'll see MongoDB shell prompt
```

### 3. Install Backend Dependencies

```powershell
cd "d:\parking management system\server"
npm install
```

### 4. Install Frontend Dependencies

```powershell
cd "d:\parking management system"
npm install
```

### 5. Configure Environment Variables

The backend uses `.env` file located at `d:\parking management system\server\.env`

**Default configuration:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking_management
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

**For MongoDB Compass connection:**
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- The database `parking_management` will be created automatically

## 🚀 Running the Application

### 1. Start MongoDB (if not running as service)
```powershell
mongod
```

### 2. Start Backend Server
Open a new terminal:
```powershell
cd "d:\parking management system\server"
npm run dev
```

The server will start on http://localhost:5000

### 3. Start Frontend
Open another terminal:
```powershell
cd "d:\parking management system"
npm run dev
```

The frontend will start on http://localhost:5173

### 4. Update Context File (IMPORTANT)

To use MongoDB, you need to switch to the MongoDB context:

**Option A: Rename files**
```powershell
cd "d:\parking management system\context"
# Backup old context
Rename-Item "parkingcontext.tsx" "parkingcontext-old.tsx"
# Use MongoDB context
Rename-Item "parkingcontext-mongodb.tsx" "parkingcontext.tsx"
```

**Option B: Manually replace content**
Copy content from `parkingcontext-mongodb.tsx` to `parkingcontext.tsx`

## 📊 MongoDB Collections

The system creates the following collections:

1. **users** - Stores user credentials and information
   - name, email, password (hashed), createdAt

2. **vehicles** - Stores vehicle entry/exit records
   - vehicleNumber, vehicleType, slotNumber, entryTime, exitTime, duration, charges, status

3. **parkingslots** - Stores parking slot information
   - number, type, isOccupied, vehicleId

## 🗄️ Viewing Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `parking_management`
4. Browse collections: users, vehicles, parkingslots

## 🔍 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/users` - Get all users

### Vehicles
- POST `/api/vehicles/entry` - Register vehicle entry
- POST `/api/vehicles/exit/:id` - Process vehicle exit
- GET `/api/vehicles` - Get all vehicles
- GET `/api/vehicles/active` - Get active vehicles
- GET `/api/vehicles/:id` - Get vehicle by ID

### Parking Slots
- POST `/api/slots/initialize` - Initialize parking slots
- GET `/api/slots` - Get all slots
- GET `/api/slots/available/:type` - Get available slots by type
- GET `/api/slots/stats` - Get slot statistics

## 🔐 Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB service is running
```powershell
net start MongoDB
# Or
mongod
```

### Backend Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change PORT in `.env` file or kill the process:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Frontend API Connection Error
**Solution:** Make sure backend is running on http://localhost:5000

Check `services/api.ts` - API_URL should be `http://localhost:5000/api`

## 📝 Notes

- All passwords are hashed using bcrypt before storing in MongoDB
- JWT tokens are used for authentication
- Data persists in MongoDB (not localStorage)
- The first time you run the backend, it will automatically create the database and collections
- Use MongoDB Compass to visually inspect and manage your data

## 🔄 Switching Back to localStorage

If you want to switch back to localStorage (without MongoDB):

```powershell
cd "d:\parking management system\context"
Rename-Item "parkingcontext.tsx" "parkingcontext-mongodb.tsx"
Rename-Item "parkingcontext-old.tsx" "parkingcontext.tsx"
```

## 📞 Support

For issues or questions:
1. Check MongoDB service is running
2. Verify both backend and frontend servers are running
3. Check browser console for errors
4. Check backend terminal for server errors
