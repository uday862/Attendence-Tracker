import express from 'express';
import Notes from '../models/notesModel.js';
import userAuth from '../middleware/userAuth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname, '../uploads/notes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Setting upload destination:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('Checking file type:', file.mimetype);
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});


router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ success: true, message: 'Notes router is working' });
});


router.post('/upload', userAuth, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    if (!req.body.subject || !req.body.section) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newNote = new Notes({
      subject: req.body.subject,
      section: req.body.section,
      pdfUrl: `/uploads/notes/${req.file.filename}`,
      fileName: req.file.originalname,
      uploadedBy: req.user._id
    });

    await newNote.save();
    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { section, subject } = req.query;
    const query = {};
    
    if (section) query.section = section;
    if (subject) query.subject = subject;

    const notes = await Notes.find(query).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Notes.distinct('subject');
    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 