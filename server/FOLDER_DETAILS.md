# Detailed Folder Structure Explanation

## 1. `/routes` Folder
**Purpose**: Defines all API endpoints and request handling logic
**Key Files**:
- `attendanceRouter.js`: Handles attendance-related endpoints
  - POST `/mark`: Mark attendance for students
  - GET `/student/:reggNumber`: Get student attendance
  - GET `/section/:section`: Get section attendance
- `authRoutes.js`: Authentication endpoints
- `studentRouter.js`: Student management endpoints
- `facultyRouter.js`: Faculty management endpoints
- `eventRouter.js`: Event management endpoints
- `notesRouter.js`: Notes management endpoints

**Functionality**:
- Defines API routes
- Implements request validation
- Connects to controllers
- Handles middleware integration
- Manages response formatting

## 2. `/models` Folder
**Purpose**: Defines database schemas and data structures
**Key Files**:
- `attendanceModel.js`: Attendance data structure
  ```javascript
  {
    reggNumber: String,
    name: String,
    section: String,
    attendance: [{
      date: Date,
      periods: [{
        period: String,
        status: String
      }]
    }]
  }
  ```
- `studentModel.js`: Student data structure
- `facultyModel.js`: Faculty data structure
- `adminModel.js`: Admin data structure
- `notesModel.js`: Notes data structure
- `EventModel.js`: Event data structure

**Functionality**:
- Defines data schemas
- Implements data validation
- Manages database relationships
- Handles data types and constraints

## 3. `/controllers` Folder
**Purpose**: Contains business logic for each route
**Key Components**:
- Authentication logic
- Data processing
- Business rules implementation
- Error handling
- Response formatting

**Functionality**:
- Processes incoming requests
- Implements business logic
- Interacts with models
- Handles data validation
- Manages error responses

## 4. `/middleware` Folder
**Purpose**: Contains custom middleware functions
**Key Files**:
- `userAuth.js`: Authentication middleware
- `errorHandler.js`: Error handling middleware
- `validation.js`: Request validation middleware
- `roleCheck.js`: Role-based access control

**Functionality**:
- Request preprocessing
- Authentication verification
- Input validation
- Error handling
- Access control

## 5. `/config` Folder
**Purpose**: Contains configuration files
**Key Files**:
- `mongodb.js`: Database connection settings
- Environment variables
- Application configuration

**Functionality**:
- Database configuration
- Environment setup
- Application settings
- Security configurations

## 6. `/uploads` Folder
**Purpose**: Stores uploaded files
**Contents**:
- Student photos
- Event images
- Notes attachments
- Other uploaded files

**Functionality**:
- File storage
- Static file serving
- File access control
- File type validation

## Root Files

### `server.js`
**Purpose**: Main server file
**Functionality**:
- Express server setup
- Middleware configuration
- Route registration
- Error handling
- Server startup

### `index.js`
**Purpose**: Application entry point
**Functionality**:
- Environment setup
- Database connection
- Server initialization
- Error handling

### `package.json`
**Purpose**: Project configuration
**Contents**:
- Dependencies
- Scripts
- Project metadata
- Configuration settings

## Data Flow
1. **Request Flow**:
   ```
   Client Request → Routes → Middleware → Controllers → Models → Database
   ```

2. **Response Flow**:
   ```
   Database → Models → Controllers → Routes → Client Response
   ```

## Security Implementation
1. **Authentication**:
   - JWT token verification
   - Session management
   - Password hashing

2. **Authorization**:
   - Role-based access
   - Permission checking
   - Resource protection

3. **Data Protection**:
   - Input validation
   - Data sanitization
   - Secure file handling

## Best Practicesespres
1. **Code Organization**:
   - Modular structure
   - Clear separation of concerns
   - Consistent naming conventions

2. **Error Handling**:
   - Global error middleware
   - Try-catch blocks
   - Proper error responses

3. **Security**:
   - Input validation
   - Data sanitization
   - Secure authentication

4. **Performance**:
   - Efficient database queries
   - Proper indexing
   - Optimized file handling 