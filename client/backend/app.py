from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import numpy as np
import torch
import mediapipe as mp
import tempfile
import os
from torch.serialization import add_safe_globals

# Initialize app
app = Flask(__name__)
# Configure CORS to allow credentials and specify origin
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  # Vite's default development server
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# Load YOLOv5 model with proper configuration
model = torch.hub.load('ultralytics/yolov5', 'custom', 
                      path='models/yolov5s.pt',
                      force_reload=True,
                      trust_repo=True)

# Initialize Mediapipe FaceMesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False)

# Utility functions
def is_eyes_open(landmarks):
    try:
        left_eye_top = landmarks[386]
        left_eye_bottom = landmarks[374]
        return abs(left_eye_bottom.y - left_eye_top.y) > 0.01
    except:
        return False

def get_emotion(landmarks):
    try:
        upper_lip_top = landmarks[13]
        upper_lip_bottom = landmarks[14]
        lower_lip_top = landmarks[17]
        lower_lip_bottom = landmarks[18]
        mouth_open = abs(lower_lip_top.y - upper_lip_bottom.y)
        mouth_curvature = abs(upper_lip_top.x - lower_lip_bottom.x)
        if mouth_open > 0.03 and mouth_curvature > 0.02:
            return "Happy"
        elif mouth_open < 0.02 and mouth_curvature < 0.01:
            return "Sad"
        else:
            return "Neutral"
    except:
        return "Neutral"

# Video processing route
@app.route('/upload', methods=['POST'])
def process_video():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400

        file = request.files['video']
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp:
            file.save(tmp.name)
            video_path = tmp.name

        cap = cv2.VideoCapture(video_path)
        frame_count = 0
        alert_counts, drowsy_counts = [], []
        total_counts, happy_counts, sad_counts = [], [], []

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            results = model(frame)
            people = [d for d in results.xyxy[0] if int(d[5]) == 0]  # class 0 = person

            frame_alert = frame_drowsy = frame_total = frame_happy = frame_sad = 0

            for person in people:
                x1, y1, x2, y2 = map(int, person[:4])
                crop = frame[y1:y2, x1:x2]
                rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
                result = face_mesh.process(rgb)
                if result.multi_face_landmarks:
                    frame_total += 1
                    face = result.multi_face_landmarks[0]
                    if is_eyes_open(face.landmark):
                        frame_alert += 1
                    else:
                        frame_drowsy += 1
                    emotion = get_emotion(face.landmark)
                    if emotion == "Happy":
                        frame_happy += 1
                    elif emotion == "Sad":
                        frame_sad += 1

            if frame_total > 0:
                alert_counts.append(frame_alert)
                drowsy_counts.append(frame_drowsy)
                total_counts.append(frame_total)
                happy_counts.append(frame_happy)
                sad_counts.append(frame_sad)

        cap.release()
        os.remove(video_path)

        # Safe division
        def calc_percent(n, d):
            return round((n / d) * 100, 2) if d else 0

        response = {
            "alertness": calc_percent(sum(alert_counts), sum(total_counts)),
            "drowsiness": calc_percent(sum(drowsy_counts), sum(total_counts)),
            "happy": calc_percent(sum(happy_counts), sum(total_counts)),
            "sad": calc_percent(sum(sad_counts), sum(total_counts))
        }

        print('Video processing complete, sending response:', response) # Log before sending
        
        try:
            response_json_data = jsonify(response).get_data(as_text=True)
            print('Response JSON data string created.', response_json_data)
            
            # Create a Flask Response object explicitly
            response_obj = Response(response_json_data, status=200, mimetype='application/json')
            print('Flask Response object created.')
            return response_obj
            
        except Exception as json_error:
            print(f'Error during jsonify or creating Response object: {str(json_error)}')
            return jsonify({'error': 'Internal server error during response creation'}), 500

    except Exception as e:
        print(f"Error processing video in /upload endpoint: {str(e)}")
        # Attempt to clean up temp file if it exists and the error happened after creation
        if 'video_path' in locals() and os.path.exists(video_path):
            try:
                os.remove(video_path)
                print(f'Cleaned up temporary file: {video_path}')
            except Exception as cleanup_error:
                print(f'Error during temporary file cleanup: {str(cleanup_error)}')
                
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
