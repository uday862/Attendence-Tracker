import React, { useState } from "react";
import axios from "axios";

function VideoUploader() {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setResults(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    setLoading(true);
    setResults(null);
    setError("");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Error processing video");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "500px",
      margin: "40px auto",
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    input: {
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
    loadingText: {
      color: "#d97706",
      fontWeight: "500",
      marginTop: "16px",
    },
    errorText: {
      color: "#dc2626",
      fontWeight: "500",
      marginTop: "16px",
    },
    resultsBox: {
      marginTop: "24px",
      backgroundColor: "#f3f4f6",
      padding: "16px",
      borderRadius: "6px",
      textAlign: "center",
      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    },
    circleContainer: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      marginTop: "20px",
    },
    circle: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background: "#eee",
      position: "relative",
      margin: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "16px",
    },
    svg: {
      position: "absolute",
      top: 0,
      left: 0,
      transform: "rotate(-90deg)",
    },
    label: {
      marginTop: "10px",
      fontWeight: "500",
    },
  };

  const CircularBar = ({ label, value, color }) => {
    const radius = 45;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div style={{ textAlign: "center" }}>
        <div style={styles.circle}>
          <svg height={radius * 2} width={radius * 2} style={styles.svg}>
            <circle
              stroke="#ddd"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div>{value}%</div>
        </div>
        <div style={styles.label}>{label}</div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={styles.input}
      />
      <br />
      <button
        onClick={handleUpload}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
      >
        Upload & Process
      </button>

      {loading && <p style={styles.loadingText}>Processing video, please wait...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      {results && (
        <div style={styles.resultsBox}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Results
          </h3>
          <div style={styles.circleContainer}>
            <CircularBar label="Alertness" value={results.alertness} color="#22c55e" />
            <CircularBar label="Drowsiness" value={results.drowsiness} color="#f97316" />
            <CircularBar label="Happy" value={results.happy} color="#3b82f6" />
            <CircularBar label="Sad" value={results.sad} color="#ef4444" />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUploader; 