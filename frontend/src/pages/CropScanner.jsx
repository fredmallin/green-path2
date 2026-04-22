import { useState } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";


export default function CropScanner({ onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!selectedImage) return;

    setIsScanning(true);

    setTimeout(() => {
      const mockResults = [
        {
          id: Date.now().toString(),
          type: "crop",
          date: new Date().toISOString(),
          imageUrl: selectedImage,
          analysis: {
            status: "Healthy Crop",
            details: [
              "Plant health: Excellent (92%)",
              "Leaf color: Normal green",
              "No disease detected"
            ],
            recommendations: [
              "Continue watering",
              "Apply fertilizer in 7 days"
            ]
          }
        },
        {
          id: Date.now().toString(),
          type: "crop",
          date: new Date().toISOString(),
          imageUrl: selectedImage,
          analysis: {
            status: "Disease Detected",
            details: [
              "Leaf spots detected",
              "Yellowing observed",
              "Minor pests present"
            ],
            recommendations: [
              "Apply fungicide",
              "Remove infected leaves"
            ]
          }
        }
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];

      setScanResult(result);
      onScanComplete && onScanComplete(result);
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="scanner-card">
      <div className="scanner-header">
        <h2>
          <Camera className="icon green" /> Crop Health Scanner
        </h2>
        <p>Upload a photo of crop leaves to detect diseases</p>
      </div>

      {/* Upload */}
      <div className="upload-box">
        {selectedImage ? (
          <>
            <img src={selectedImage} alt="crop" />
            <label htmlFor="upload" className="change-text">
              Change image
            </label>
          </>
        ) : (
          <label htmlFor="upload" className="upload-label">
            <Upload className="upload-icon" />
            <p>Click to upload crop image</p>
          </label>
        )}

        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </div>

      {/* Button */}
      {selectedImage && !scanResult && (
        <button onClick={handleScan} className="scan-btn" disabled={isScanning}>
          {isScanning ? (
            <>
              <Loader2 className="spin" /> Analyzing...
            </>
          ) : (
            <>
              <Camera /> Analyze Crop
            </>
          )}
        </button>
      )}

      {/* Progress */}
      {isScanning && (
        <div className="progress-box">
          <div className="progress-bar"></div>
          <p>Analyzing crop...</p>
        </div>
      )}

      {/* Result */}
      {scanResult && (
        <div className="result-box">
          <div className="status">
            <strong>{scanResult.analysis.status}</strong>
          </div>

          <div>
            <h4>Analysis:</h4>
            {scanResult.analysis.details.map((d, i) => (
              <p key={i}>• {d}</p>
            ))}
          </div>

          <div>
            <h4>Recommendations:</h4>
            {scanResult.analysis.recommendations.map((r, i) => (
              <p key={i} className="recommendation">
                {r}
              </p>
            ))}
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setSelectedImage(null);
              setScanResult(null);
            }}
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
}