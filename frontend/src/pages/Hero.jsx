import { Leaf, CloudRain, BarChart3, MapPin, Smartphone, LogIn } from "lucide-react";
import "./index.css";

export default function Hero({ onGetStarted, onLogin }) {
  const features = [
    {
      icon: Leaf,
      title: "Soil Analysis",
      description: "Scan soil to detect health and nutrients instantly"
    },
    {
      icon: BarChart3,
      title: "Crop Monitoring",
      description: "Detect plant stress and diseases early"
    },
    {
      icon: CloudRain,
      title: "Climate Data",
      description: "Real-time weather and climate insights"
    },
    {
      icon: MapPin,
      title: "Smart Recommendations",
      description: "Personalized advice for your farm"
    }
  ];

  const problems = [
    "Lack of knowledge about soil health and nutrients",
    "Unpredictable climate changes affecting farming",
    "Planting wrong crops",
    "Limited access to agricultural experts",
    "Low crop yields",
    "Wasted money on wrong fertilizers",
    "Late disease detection"
  ];

  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <img
          className="hero-bg"
          src="https://images.unsplash.com/photo-1627829380497-49c37b769ea6"
          alt=""
        />

        <div className="overlay"></div>

        {/* LOGIN */}
        {onLogin && (
          <button className="login-btn" onClick={onLogin}>
            <LogIn /> Login
          </button>
        )}

        <div className="hero-content">
          <div className="logo">
            <Leaf />
            <h1>Greenpath</h1>
          </div>

          <h2>AI Climate & Soil Intelligence</h2>
          <p>
            Make smarter farming decisions with AI-powered insights
          </p>

          {/* FEATURES */}
          <div className="features">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <f.icon />
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>

          <button className="cta-btn" onClick={onGetStarted}>
            <Smartphone /> Get Started
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <div>
              <h3>Open App</h3>
              <p>Launch Greenpath</p>
            </div>
          </div>

          <div className="step">
            <span>2</span>
            <div>
              <h3>Scan</h3>
              <p>Take a photo of soil or crops</p>
            </div>
          </div>

          <div className="step">
            <span>3</span>
            <div>
              <h3>AI Analysis</h3>
              <p>AI processes your data</p>
            </div>
          </div>

          <div className="step">
            <span>4</span>
            <div>
              <h3>Get Advice</h3>
              <p>Receive recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="problems">
        <h2>Problems We Solve</h2>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <div key={i} className="problem-card">
              ✗ {p}
            </div>
          ))}
        </div>

        <div className="cta-box">
          <h3>Ready to Transform Your Farming?</h3>
          <p>Join farmers using AI to improve yields</p>
          <button onClick={onGetStarted}>Start Free</button>
        </div>
      </section>

    </div>
  );
}