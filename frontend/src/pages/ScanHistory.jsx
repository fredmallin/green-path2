import React from "react";


export function ScanHistory({ history, onViewScan }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Scan History</h2>
        </div>

        <div className="card-content empty">
          <div className="empty-icon"></div>
          <p>No scans yet</p>
          <small>Your scan history will appear here</small>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Scan History</h2>
        <span className="badge secondary">{history.length}</span>
      </div>

      <div className="card-content">
        {history.map((scan) => (
          <div
            key={scan.id}
            className="history-item"
            onClick={() => onViewScan(scan)}
          >
            <img src={scan.imageUrl} alt="scan" className="history-img" />

            <div className="history-info">
              <div className="history-top">
                <span className="icon">
                  {scan.type === "soil" ? "" : ""}
                </span>

                <span className="badge outline">
                  {scan.type === "soil" ? "Soil" : "Crop"}
                </span>

                <span className="time">
                  {formatDate(scan.date)}
                </span>
              </div>

              <p className="status">{scan.analysis.status}</p>

              <p className="desc">
                {scan.analysis.recommendations[0]}
              </p>

              <p className="view">Click to view full details →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}