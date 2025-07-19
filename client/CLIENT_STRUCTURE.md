# Client-Side Application Structure

## 1. Root Directory Structure
```
client/
├── src/               # Source code
├── public/           # Static files
├── node_modules/     # Dependencies
├── package.json      # Project configuration
├── vite.config.js    # Vite configuration
└── index.html        # Entry HTML file
```

## 2. Source Code Structure (`src/`)

### 2.1 Main Files
- `main.jsx`: Application entry point
- `App.jsx`: Root component
- `index.css`: Global styles

### 2.2 Core Directories

#### A. Pages (`src/pages/`)
Contains all page components:
- `Login.jsx`: Login page
- `Register.jsx`: Registration page
- `Dashboard.jsx`: Main dashboard
- `Attendance.jsx`: Attendance management
- `Profile.jsx`: User profile
- `Events.jsx`: Events management
- `Notes.jsx`: Notes management

#### B. Components (`src/components/`)
Reusable UI components:
- `Navbar.jsx`: Navigation bar
- `Sidebar.jsx`: Side navigation
- `AttendanceCard.jsx`: Attendance display
- `EventCard.jsx`: Event display
- `NoteCard.jsx`: Note display
- `ProfileCard.jsx`: Profile display
- `Loading.jsx`: Loading spinner
- `Error.jsx`: Error messages

#### C. Context (`src/context/`)
State management:
- `AuthContext.jsx`: Authentication state
- `UserContext.jsx`: User data state
- `ThemeContext.jsx`: Theme preferences

#### D. Utils (`src/utils/`)
Helper functions:
- `api.js`: API calls
- `validation.js`: Form validation
- `helpers.js`: Utility functions
- `constants.js`: Constants

#### E. Assets (`src/assets/`)
Static resources:
- Images
- Icons
- Styles
- Fonts

## 3. Component Structure

### 3.1 Page Components
```jsx
// Example: Attendance.jsx
import React from 'react';
import { AttendanceCard } from '../components';
import { useAuth } from '../context';

const Attendance = () => {
  const { user } = useAuth();
  
  return (
    <div className="attendance-page">
      <h1>Attendance</h1>
      <AttendanceCard />
    </div>
  );
};
```

### 3.2 Reusable Components
```jsx
// Example: AttendanceCard.jsx
import React from 'react';
import { useAttendance } from '../hooks';

const AttendanceCard = () => {
  const { attendance, loading } = useAttendance();
  
  return (
    <div className="attendance-card">
      {/* Component content */}
    </div>
  );
};
```

## 4. State Management

### 4.1 Context Usage
```jsx
// Example: AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 5. API Integration

### 5.1 API Calls
```javascript
// Example: api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true
});

export const markAttendance = async (data) => {
  try {
    const response = await api.post('/attendance/mark', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

## 6. Styling

### 6.1 CSS Structure
- Global styles in `index.css`
- Component-specific styles
- Responsive design
- Theme support

## 7. Features

### 7.1 Authentication
- Login/Register
- Password reset
- Session management
- Protected routes

### 7.2 Attendance Management
- Mark attendance
- View attendance history
- Generate reports
- Section-wise view

### 7.3 Profile Management
- View profile
- Update information
- Change password
- Upload photos

### 7.4 Event Management
- Create events
- View events
- Update events
- Delete events

### 7.5 Notes Management
- Create notes
- View notes
- Update notes
- Delete notes

## 8. Best Practices

### 8.1 Code Organization
- Component-based architecture
- Separation of concerns
- Reusable components
- Clean code structure

### 8.2 Performance
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

### 8.3 Security
- Input validation
- XSS protection
- CSRF protection
- Secure authentication

### 8.4 Error Handling
- Global error boundary
- API error handling
- User feedback
- Error logging

## 9. Development Tools

### 9.1 Build Tools
- Vite for development
- ESLint for linting
- Prettier for formatting
- Git for version control

### 9.2 Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance testing 