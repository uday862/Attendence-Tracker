# Server Documentation

## Overview
This is a Node.js/Express.js backend server for a Attendence  tracker System. The server is built using modern JavaScript (ES modules) and follows a structured MVC (Model-View-Controller) pattern.

## Directory Structure

### Root Files
- `server.js` - Main server file that sets up Express, middleware, and routes
- `index.js` - Entry point of the application
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Dependency lock file

### Core Directories

#### 1. `/routes`
Contains all API route definitions:
- `authRoutes.js` - Authentication related routes
- `userRoutes.js` - User management routes
- `studentRouter.js` - Student management endpoints
- `facultyRouter.js` - Faculty management endpoints
- `attendanceRouter.js` - Attendance tracking endpoints
- `eventRouter.js` - Event management endpoints
- `notesRouter.js` - Notes management endpoints

#### 2. `/models`
Database schema definitions:
- `studentModel.js` - Student data structure
- `facultyModel.js` - Faculty data structure
- `adminModel.js` - Admin data structure
- `attendanceModel.js` - Attendance records structure
- `notesModel.js` - Notes data structure
- `EventModel.js` - Event data structure

#### 3. `/controllers`
Business logic implementation for each route

#### 4. `/middleware`
Custom middleware functions for:
- Authentication
- Authorization
- Request validation
- Error handling

#### 5. `/config`
Configuration files:
- `mongodb.js` - Database connection configuration

#### 6. `/uploads`
Directory for storing uploaded files

## API Endpoints

### Base URL
The server runs on port 4000 by default (configurable via environment variables)

### Available Endpoints
1. `/api/auth` - Authentication endpoints
2. `/api/user` - User management endpoints
3. `/api/students` - Student management endpoints
4. `/api/facultys` - Faculty management endpoints
5. `/api/attendance` - Attendance management endpoints
6. `/api/events` - Event management endpoints
7. `/api/notes` - Notes management endpoints

## Security Features
- CORS protection with specific allowed origins
- Cookie-based authentication
- Environment variable configuration
- Error handling middleware

## Dependencies
- Express.js - Web framework
- MongoDB - Database
- Cors - Cross-origin resource sharing
- Cookie-parser - Cookie parsing middleware
- Dotenv - Environment variable management

## Setup and Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with required environment variables
3. Start the server:
   ```bash
   npm start
   ```

## Error Handling
The server includes global error handling middleware that:
- Logs errors to console
- Returns appropriate error responses
- Maintains consistent error response format

## File Upload
- Static file serving for uploads directory
- File upload handling through Express middleware 