# Understanding API Endpoints

## What are Endpoints?
An endpoint is a specific URL (web address) where an API can be accessed. It's like a door to your application that allows different types of requests (GET, POST, PUT, DELETE) to interact with your system.

## Example of Endpoints in Our System

### 1. Authentication Endpoints (`/api/auth`)
```javascript
// Login Endpoint
POST /api/auth/login
Request Body:
{
    "email": "student@example.com",
    "password": "securepassword"
}
Response:
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "name": "John Doe",
        "email": "student@example.com"
    }
}

// Register Endpoint
POST /api/auth/register
Request Body:
{
    "name": "John Doe",
    "email": "student@example.com",
    "password": "securepassword",
    "reggNumber": "2024001"
}
```

### 2. Student Endpoints (`/api/students`)
```javascript
// Get Student Details
GET /api/students/2024001
Response:
{
    "reggNumber": "2024001",
    "name": "John Doe",
    "email": "student@example.com",
    "section": "A",
    "course": "Computer Science"
}

// Update Student Profile
PUT /api/students/2024001
Request Body:
{
    "phoneNumber": "1234567890",
    "parentName": "Jane Doe"
}
```

### 3. Attendance Endpoints (`/api/attendance`)
```javascript
// Mark Attendance
POST /api/attendance/mark
Request Body:
{
    "reggNumber": "2024001",
    "date": "2024-03-20",
    "periods": [
        {
            "period": "Class 1",
            "status": "Present"
        }
    ]
}

// Get Attendance Report
GET /api/attendance/report/2024001
Response:
{
    "student": "John Doe",
    "attendance": [
        {
            "date": "2024-03-20",
            "periods": [
                {
                    "period": "Class 1",
                    "status": "Present"
                }
            ]
        }
    ]
}
```

## Common HTTP Methods Used in Endpoints

1. **GET**
   - Used to retrieve data
   - Example: Getting student details, attendance reports
   - No request body needed
   - Data sent through URL parameters

2. **POST**
   - Used to create new data
   - Example: Creating new student, marking attendance
   - Requires request body
   - Data sent in JSON format

3. **PUT**
   - Used to update existing data
   - Example: Updating student profile
   - Requires request body
   - Data sent in JSON format

4. **DELETE**
   - Used to remove data
   - Example: Removing a student record
   - No request body needed
   - Usually uses URL parameters

## How to Use Endpoints

### Example: Marking Attendance
```javascript
// Using fetch in JavaScript
fetch('/api/attendance/mark', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here'
    },
    body: JSON.stringify({
        reggNumber: "2024001",
        date: "2024-03-20",
        periods: [
            {
                period: "Class 1",
                status: "Present"
            }
        ]
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Example: Getting Student Details
```javascript
// Using fetch in JavaScript
fetch('/api/students/2024001', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer your_token_here'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Security in Endpoints

1. **Authentication**
   - Most endpoints require authentication
   - JWT token must be included in headers
   - Format: `Authorization: Bearer your_token_here`

2. **Authorization**
   - Different roles have different access levels
   - Students can only access their own data
   - Faculty can access their section's data
   - Admin has full access

3. **Input Validation**
   - All input data is validated
   - Prevents malicious data
   - Ensures data format is correct

## Best Practices for Using Endpoints

1. **Always Include Authentication**
   - Add token to request headers
   - Handle token expiration

2. **Handle Errors**
   - Check for error responses
   - Implement proper error handling
   - Show user-friendly messages

3. **Validate Data**
   - Check data before sending
   - Ensure required fields are present
   - Format data correctly

4. **Use Proper HTTP Methods**
   - GET for retrieving data
   - POST for creating data
   - PUT for updating data
   - DELETE for removing data 