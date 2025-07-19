# Technical Questions and Answers

## Database and Data Structure

### Q1: How is the attendance data structured in MongoDB?
**A:** The attendance data follows this schema:
```javascript
{
  reggNumber: String,     // Student's unique registration number
  name: String,          // Student's name
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

### Q2: How is data indexing implemented for performance?
**A:** The system uses MongoDB indexes for:
- `reggNumber`: For quick student lookup
- `section`: For section-wise queries
- Compound index on `{reggNumber, date}`: For attendance history
- Text index on `name`: For student search

## Authentication and Security

### Q3: How is JWT authentication implemented?
**A:** The system uses JWT with:
```javascript
// Token Generation
const token = jwt.sign(
  { 
    id: user._id,
    reggNumber: user.reggNumber,
    role: user.role 
  },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
```

### Q4: How is password security handled?
**A:** Passwords are secured using:
1. Bcrypt hashing:
```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```
2. Password validation rules:
   - Minimum 8 characters
   - Must contain numbers and special characters
   - Case-sensitive

## API Implementation

### Q5: How is attendance marking implemented?
**A:** The attendance marking process:
```javascript
// 1. Validate request
if (!Array.isArray(records)) {
  return res.status(400).json({ message: 'Invalid format' });
}

// 2. Process each record
for (const record of records) {
  const attendance = await Attendance.findOne({ 
    reggNumber: record.reggNumber,
    'attendance.date': today 
  });

  // 3. Update or create record
  if (attendance) {
    // Update existing record
  } else {
    // Create new record
  }
}
```

### Q6: How are file uploads handled?
**A:** File uploads use Multer middleware:
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image'));
    }
  }
});
```

## Error Handling

### Q7: How is error handling implemented?
**A:** The system uses a global error handler:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});
```

## Performance Optimization

### Q8: How is database query performance optimized?
**A:** Performance optimizations include:
1. Indexing frequently queried fields
2. Using lean queries for read operations
3. Implementing pagination for large datasets
4. Caching frequently accessed data

### Q9: How is file upload performance handled?
**A:** File upload optimizations:
1. File size limits
2. Image compression
3. Asynchronous processing
4. CDN integration for static files

## Security Measures

### Q10: How is XSS protection implemented?
**A:** XSS protection includes:
1. Input sanitization
2. Content Security Policy headers
3. XSS-Protection headers
4. Proper content-type headers

### Q11: How is CSRF protection implemented?
**A:** CSRF protection measures:
1. Same-origin policy
2. CSRF tokens
3. Secure cookie settings
4. Origin validation

## Testing

### Q12: How are API endpoints tested?
**A:** Testing implementation:
```javascript
describe('Attendance API', () => {
  it('should mark attendance', async () => {
    const response = await request(app)
      .post('/api/attendance/mark')
      .send({
        records: [{
          reggNumber: '2024001',
          status: 'Present'
        }]
      });
    expect(response.status).toBe(200);
  });
});
```

## Deployment

### Q13: How is the application deployed?
**A:** Deployment process:
1. Environment configuration
2. Database setup
3. File system setup
4. SSL configuration
5. PM2 process management

### Q14: How is monitoring implemented?
**A:** Monitoring includes:
1. Error logging
2. Performance metrics
3. User activity tracking
4. System health checks

## Database Operations

### Q15: How are database backups handled?
**A:** Backup strategy:
1. Daily automated backups
2. Point-in-time recovery
3. Backup verification
4. Secure storage

### Q16: How is database scaling handled?
**A:** Scaling implementation:
1. Read replicas
2. Sharding strategy
3. Connection pooling
4. Query optimization 