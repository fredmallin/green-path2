import React from "react";
import "./index.css";

export function ScanDetailDialog({ scan, onClose }) {
  if (!scan) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = () => {
    if (scan.analysis.status.includes("Healthy") || scan.analysis.status.includes("Good")) {
      return "status success";
    } else if (scan.analysis.status.includes("Disease")) {
      return "status danger";
    } else {
      return "status warning";
    }
  };

  const getSuitabilityClass = (value) => {
    if (value >= 85) return "badge green";
    if (value >= 70) return "badge yellow";
    return "badge orange";
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        
        {/* Header */}
        <div className="dialog-header">
          <h2>
            {scan.type === "soil" ? "🌱 Soil Scan Details" : "📷 Crop Scan Details"}
          </h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Date */}
        <div className="scan-meta">
          📅 {formatDate(scan.date)}
          <span className="badge outline">
            {scan.type === "soil" ? "Soil Analysis" : "Crop Analysis"}
          </span>
        </div>

        {/* Image */}
        <img
          src={scan.imageUrl}
          alt="scan"
          className="scan-image"
        />

        {/* Status */}
        <div className={getStatusClass()}>
          <h3>{scan.analysis.status}</h3>
        </div>

        {/* Details */}
        <div className="section">
          <h3>{scan.type === "soil" ? "Soil Analysis" : "Crop Analysis"}</h3>
          <ul>
            {scan.analysis.details.map((detail, i) => (
              <li key={i}>• {detail}</li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="section">
          <h3>Recommendations</h3>
          {scan.analysis.recommendations.map((rec, i) => (
            <div key={i} className="recommendation">
              {rec}
            </div>
          ))}
        </div>

        {/* Suitable Crops */}
        {scan.type === "soil" &&
          scan.analysis.suitableCrops &&
          scan.analysis.suitableCrops.length > 0 && (
            <div className="crops">
              <h3>🌿 Suitable Crops</h3>

              {scan.analysis.suitableCrops.map((crop, i) => (
                <div key={i} className="crop-card">
                  <div className="crop-header">
                    <h4>{crop.name}</h4>
                    <span className={getSuitabilityClass(crop.suitability)}>
                      {crop.suitability}% Match
                    </span>
                  </div>
                  <p>{crop.reason}</p>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}