import express from "express";
import cors from "cors"
import 'dotenv/config';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import studentRouter from "./routes/studentRouter.js";
import facultyRouter from "./routes/facultyRouter.js";
import attendanceRouter from "./routes/attendanceRouter.js";
import eventRouter from "./routes/eventRouter.js";
import notesRouter from "./routes/notesRouter.js";

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']

app.use(express.json())  
app.use(cookieParser())
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//API Endpoints
app.get('/',(req,res)=>res.send("API Working"))
app.use('/api/students',studentRouter)
app.use('/api/facultys',facultyRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/events', eventRouter)
app.use('/api/notes', notesRouter)

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

app.listen(port,()=>console.log(`Server started on PORT:${port}`));