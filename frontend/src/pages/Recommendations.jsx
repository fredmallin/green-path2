import { useState } from "react";
import { Sprout, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";


export default function CropRecommendations() {
  const [activeTab, setActiveTab] = useState("recommended");

  const cropData = {
    recommended: [
      {
        name: "Maize (Corn)",
        season: "March - May",
        yieldPotential: "High",
        soilMatch: "95%",
        image: "https://images.unsplash.com/photo-1629181978962-df12c566b02e",
        benefits: [
          "Well-suited to your soil pH (6.5)",
          "Good rainfall match for season",
          "High market demand"
        ],
        requirements: [
          "Moderate nitrogen needed",
          "Plant after last frost",
          "Requires good drainage"
        ]
      },
      {
        name: "Beans",
        season: "March - June",
        yieldPotential: "Medium-High",
        soilMatch: "90%",
        image: "https://images.unsplash.com/photo-1599907919219-922e2a6949b0",
        benefits: [
          "Fixes nitrogen in soil",
          "Improves soil for next crop",
          "Drought tolerant"
        ],
        requirements: [
          "Minimal fertilizer needed",
          "Warm soil required",
          "Avoid waterlogged areas"
        ]
      }
    ],
    notRecommended: [
      {
        name: "Rice",
        reason: "Requires flooded fields - not suitable for your soil drainage",
        alternative: "Consider beans or maize instead"
      },
      {
        name: "Potatoes",
        reason: "Soil pH too alkaline - potatoes prefer pH 5.0-6.0",
        alternative: "Adjust pH first or choose maize"
      }
    ]
  };

  return (
    <div className="container">
      <div className="card">
        
        <div className="header">
          <h2 className="title">
            <Sprout className="icon green" />
            Crop Recommendations
          </h2>
          <p className="description">
            Based on your soil analysis and local climate data
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "recommended" ? "tab active" : "tab"}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended
          </button>
          <button
            className={activeTab === "avoid" ? "tab active" : "tab"}
            onClick={() => setActiveTab("avoid")}
          >
            Not Recommended
          </button>
        </div>

        {/* Recommended */}
        {activeTab === "recommended" && (
          <div className="content">
            {cropData.recommended.map((crop, index) => (
              <div key={index} className="crop-card">
                <img src={crop.image} alt={crop.name} />

                <div className="crop-info">
                  <div className="crop-header">
                    <div>
                      <h3>{crop.name}</h3>
                      <p>Season: {crop.season}</p>
                    </div>
                    <span className="badge">{crop.soilMatch} Match</span>
                  </div>

                  <div className="yield">
                    <TrendingUp className="icon green" />
                    <span>{crop.yieldPotential} Yield</span>
                  </div>

                  <div className="grid">
                    <div>
                      <p className="sub-title green">Benefits</p>
                      {crop.benefits.map((b, i) => (
                        <div key={i} className="list-item">
                          <CheckCircle className="icon small green" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="sub-title blue">Requirements</p>
                      {crop.requirements.map((r, i) => (
                        <div key={i} className="list-item">
                          <span className="dot">•</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Not Recommended */}
        {activeTab === "avoid" && (
          <div className="content">
            {cropData.notRecommended.map((crop, index) => (
              <div key={index} className="warning-card">
                <AlertCircle className="icon red" />
                <div>
                  <h3>{crop.name}</h3>
                  <p>{crop.reason}</p>
                  <div className="alternative">
                    💡 {crop.alternative}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}