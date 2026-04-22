import { useState } from "react";
import { Camera, Upload, Loader2, Sprout } from "lucide-react";


export default function SoilScanner({ onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setScanResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = () => {
    if (!selectedImage) return;

    setIsScanning(true);

    setTimeout(() => {
      const mockResults = [
        {
          id: Date.now().toString(),
          type: "soil",
          date: new Date().toISOString(),
          imageUrl: selectedImage,
          analysis: {
            status: "Good Soil Quality",
            details: [
              "Nitrogen level: Moderate (65%)",
              "Phosphorus: Adequate (72%)",
              "Potassium: Good (80%)",
              "pH Level: 6.5 (Slightly acidic)",
              "Organic matter: 4.2% (Good)",
              "Moisture content: Optimal (45%)"
            ],
            recommendations: [
              "Add organic compost to increase nitrogen levels",
              "Soil is suitable for growing maize, beans, and vegetables",
              "Consider adding lime to balance pH",
              "Good time to plant based on moisture levels"
            ],
            suitableCrops: [
              { name: "Maize", suitability: 95, reason: "Excellent soil match" },
              { name: "Beans", suitability: 90, reason: "Improves soil nitrogen" },
              { name: "Tomatoes", suitability: 88, reason: "Likes slightly acidic soil" }
            ]
          }
        },
        {
          id: Date.now().toString(),
          type: "soil",
          date: new Date().toISOString(),
          imageUrl: selectedImage,
          analysis: {
            status: "Nutrient Deficiency Detected",
            details: [
              "Nitrogen: Low (35%)",
              "Phosphorus: Low (28%)",
              "Potassium: Moderate (55%)",
              "pH: 5.2 (Too acidic)",
              "Organic matter: Low (1.8%)",
              "Moisture: Low (25%)"
            ],
            recommendations: [
              "Apply NPK fertilizer",
              "Add lime to correct pH",
              "Add compost or manure",
              "Increase watering",
              "Use cover crops"
            ],
            suitableCrops: [
              { name: "Beans", suitability: 75, reason: "Fixes nitrogen" },
              { name: "Cassava", suitability: 68, reason: "Drought resistant" }
            ]
          }
        }
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(result);
      onScanComplete(result);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="title">
          <Camera size={18} /> Soil Health Scanner
        </h2>
        <p className="subtitle">
          Upload a soil image for AI analysis
        </p>
      </div>

      <div className="card-body">

        {/* Upload Box */}
        <div className="upload-box">
          {selectedImage ? (
            <div className="preview">
              <img src={selectedImage} alt="soil" />
              <label className="link">
                Change image
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </label>
            </div>
          ) : (
            <label className="upload-label">
              <Upload size={40} />
              <p>Click or drag image here</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          )}
        </div>

        {/* Scan Button */}
        {selectedImage && !scanResult && (
          <button className="btn primary" onClick={handleScan} disabled={isScanning}>
            {isScanning ? (
              <>
                <Loader2 className="spin" size={16} /> Scanning...
              </>
            ) : (
              <>
                <Camera size={16} /> Analyze Soil
              </>
            )}
          </button>
        )}

        {/* Progress */}
        {isScanning && (
          <div className="progress">
            <div className="bar"></div>
            <p>Analyzing soil...</p>
          </div>
        )}

        {/* Results */}
        {scanResult && (
          <div className="results">

            <div className={`alert ${scanResult.analysis.status.includes("Good") ? "good" : "warn"}`}>
              {scanResult.analysis.status}
            </div>

            <h4>Soil Details</h4>
            <ul>
              {scanResult.analysis.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <h4>Recommendations</h4>
            {scanResult.analysis.recommendations.map((r, i) => (
              <div className="rec" key={i}>{r}</div>
            ))}

            <div className="crops">
              <h4>
                <Sprout size={16} /> Suitable Crops
              </h4>

              {scanResult.analysis.suitableCrops.map((c, i) => (
                <div className="crop" key={i}>
                  <div className="crop-head">
                    <strong>{c.name}</strong>
                    <span>{c.suitability}%</span>
                  </div>
                  <p>{c.reason}</p>
                </div>
              ))}
            </div>

            <button
              className="btn outline"
              onClick={() => {
                setSelectedImage(null);
                setScanResult(null);
              }}
            >
              New Scan
            </button>

          </div>
        )}
      </div>
    </div>
  );
}