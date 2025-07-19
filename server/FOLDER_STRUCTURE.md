# Folder Structure and Data Overview

## 1. Routes Folder (`/routes`)
Contains all API endpoints for the Attendance Tracker System:
- `authRoutes.js`: Handles user authentication (login, register, verify OTP)
- `studentRouter.js`: Manages student operations (CRUD)
- `attendanceRouter.js`: Handles attendance marking and retrieval
- `facultyRouter.js`: Manages faculty operations
- `eventRouter.js`: Handles event management
- `notesRouter.js`: Manages notes and announcements

## 2. Models Folder (`/models`)
Contains database schemas:

### Student Model (`studentModel.js`) 
```javascript
{
  reggNumber: String,      // Unique registration number
  name: String,           // Student name
  email: String,          // Unique email
  phoneNumber: String,    // Contact number
  parentName: String,     // Parent/Guardian name
  parentNumber: String,   // Parent contact
  section: String,        // Class section
  course: String,         // Course name
  password: String,       // Hashed password
  photo_front: Buffer,    // Front face photo
  photo_left: Buffer,     // Left profile photo
  photo_right: Buffer     // Right profile photo
}
```

### Attendance Model (`attendanceModel.js`)
```javascript
{
  reggNumber: String,     // Student registration number
  name: String,          // Student name
  section: String,       // Class section
  attendance: [{
    date: Date,          // Attendance date
    periods: [{
      period: String,    // Class period (1-6)
      status: String     // Present/Absent
    }]
  }]
}
```

## 3. Controllers Folder (`/controllers`)
Contains business logic for:
- Student management
- Attendance tracking
- Authentication
- Event management
- Notes management

## 4. Middleware Folder (`/middleware`)
Contains custom middleware for:
- Authentication verification
- Request validation
- Error handling
- Role-based access control

## 5. Config Folder (`/config`)
Contains configuration files:
- `mongodb.js`: Database connection settings
- Environment variables configuration

## 6. Uploads Folder (`/uploads`)
Stores:
- Student photos
- Event images
- Notes attachments
- Other uploaded files

## Key Features
1. **Student Management**
   - Registration with OTP verification
   - Profile management with photos
   - Parent contact information

2. **Attendance System**
   - Period-wise attendance tracking
   - Daily attendance records
   - Section-wise organization

3. **Security**
   - Password hashing
   - OTP verification
   - Session management
   - Role-based access

4. **File Management**
   - Photo upload system
   - Document management
   - Static file serving

## Data Flow
1. Client requests → Routes
2. Routes → Controllers
3. Controllers → Models
4. Models → Database
5. Response flows back through the same path 