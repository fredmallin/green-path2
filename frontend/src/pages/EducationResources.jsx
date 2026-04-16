import { useState } from "react";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import "./index.css";

export default function EducationResources() {
  const [activeTab, setActiveTab] = useState("articles");

  const resources = {
    articles: [
      {
        title: "Understanding Soil pH and Its Impact on Crops",
        description: "Learn how soil acidity affects nutrient availability",
        duration: "5 min read",
        category: "Soil Health"
      },
      {
        title: "Early Signs of Nitrogen Deficiency",
        description: "Identify nitrogen deficiency early",
        duration: "4 min read",
        category: "Plant Nutrition"
      }
    ],
    videos: [
      {
        title: "How to Test Your Soil",
        description: "Simple soil testing methods",
        duration: "8 min",
        thumbnail: "https://images.unsplash.com/photo-1759772515955-7f18d1508601"
      }
    ],
    guides: [
      {
        title: "Crop Rotation Guide",
        description: "Improve soil health",
        pages: "24 pages"
      }
    ]
  };

  return (
    <div className="edu-container">

      {/* HEADER */}
      <div className="edu-card">
        <h2 className="edu-title">
          <BookOpen /> Learning Resources
        </h2>
        <p className="edu-desc">
          Educational content to help you become a better farmer
        </p>

        {/* TABS */}
        <div className="tabs">
          <button
            className={activeTab === "articles" ? "tab active" : "tab"}
            onClick={() => setActiveTab("articles")}
          >
            <FileText /> Articles
          </button>

          <button
            className={activeTab === "videos" ? "tab active" : "tab"}
            onClick={() => setActiveTab("videos")}
          >
            <Video /> Videos
          </button>

          <button
            className={activeTab === "guides" ? "tab active" : "tab"}
            onClick={() => setActiveTab("guides")}
          >
            <BookOpen /> Guides
          </button>
        </div>

        {/* ARTICLES */}
        {activeTab === "articles" && (
          <div className="tab-content">
            {resources.articles.map((item, i) => (
              <div key={i} className="card-item">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="meta">
                    <span className="tag">{item.category}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
                <ExternalLink className="icon gray" />
              </div>
            ))}
          </div>
        )}

        {/* VIDEOS */}
        {activeTab === "videos" && (
          <div className="tab-content">
            {resources.videos.map((video, i) => (
              <div key={i} className="video-card">
                <div className="video-thumb">
                  <img src={video.thumbnail} alt="" />
                  <div className="overlay">
                    <Video />
                  </div>
                  <span className="duration">{video.duration}</span>
                </div>

                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GUIDES */}
        {activeTab === "guides" && (
          <div className="tab-content">
            {resources.guides.map((g, i) => (
              <div key={i} className="card-item">
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                  <span className="meta">{g.pages}</span>
                </div>
                <button className="btn-outline">Download</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK TIPS */}
      <div className="tips-card">
        <h3>💡 Quick Farming Tips</h3>
        <ul>
          <li>Test your soil every season</li>
          <li>Inspect crops early morning</li>
          <li>Rotate crops regularly</li>
          <li>Use mulching to retain moisture</li>
        </ul>
      </div>

    </div>
  );
}