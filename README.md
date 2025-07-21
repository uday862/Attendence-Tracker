# 🎯 Attendance Tracker (YOLO + Manual)

An AI-powered attendance management system combining **YOLO-based facial recognition** with **manual entry**. Designed for real-time, touchless attendance tracking in classrooms or workplaces.

> 🔬 Developed as part of a real-time research/societal project at **Keshav Memorial Institute of Technology**, Hyderabad.

## 📦 Project Structure

```bash 
Attendance-Tracker/
├── client/ # React.js frontend
├── backend/ # Flask + OpenCV + YOLOv8
├── server/ # Node.js middleware
```


## 🚀 How to Run the Project


1. **Run the Flask API: yolo model**
   ```bash
   cd client
   cd backend
   python app.py 
   ```

2. **Run the Backend Server:**
3. open another terminal 
   ```bash
   cd server 
   node server.js
   ```

4. **Run the Frontend:**
5. another terminal 
   ```bash
   cd client
   npm run dev 
   ```

6. **Access the Application:**
   ```
   http://localhost:3000/
   ```
 Ensure you have all dependencies installed (npm install, pip install -r requirements.txt) in the respective folders.

🧠 Tech Stack
```bash
Layer	Technology
Frontend	React.js
Middleware	Node.js + Express
Backend (AI)	Python + Flask + OpenCV + YOLOv8
Database	MongoDB
Face Recognition	face_recognition or deepface
```
🛠️ Features
✅ Real-time face detection using YOLOv8
✅ Admin and Teacher dashboards
✅ Manual attendance entry fallback
✅  video upload supported
✅ Attendance data stored securely in MongoDB
✅ Reports exportable in CSV format
✅ WebSocket support for real-time updates

📸 Architecture Overview
User uploads video 

React.js frontend sends video to Node.js

Node.js forwards data to Flask server

YOLOv8 + OpenCV detect and recognize faces

Matches are logged in MongoDB

Live results sent back to React UI via WebSockets

📚 Future Enhancements
📱 Mobile App (Android/iOS)

📊 Advanced Analytics Dashboard

🧠 Student attentiveness detection

👨‍💻 Developers

Uday Kumar - 23BD1A0527

Mani Sai - 23BD1A053R

Manikanta - 23BD1A0538

Rahul Raj - 23BD1A053D

Dhanesh - 23BD1A0531

Mentors:

Mr. Seshu

Ms. Arti

📎 References
YOLOv5 by Ultralytics

OpenCV Docs

Node.js

MongoDB Docs


if any problem please free to text me on gadigeuday111@gmail.com 






