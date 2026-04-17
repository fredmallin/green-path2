// Hero.jsx — full corrected component

import { Leaf, CloudRain, BarChart3, MapPin, Smartphone, LogIn } from "lucide-react";

export default function Hero({ onGetStarted, onLogin }) {
  const features = [
    { icon: Leaf, title: "Soil Analysis", description: "Scan soil to detect health and nutrients instantly" },
    { icon: BarChart3, title: "Crop Monitoring", description: "Detect plant stress and diseases early" },
    { icon: CloudRain, title: "Climate Data", description: "Real-time weather and climate insights" },
    { icon: MapPin, title: "Smart Recommendations", description: "Personalized advice for your farm" }
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
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center"
      }}>

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1627829380497-49c37b769ea6?w=1400"
          alt=""
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0
          }}
        />

        {/* Dark overlay */}
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          background: "rgba(0,0,0,0.62)",
          zIndex: 1
        }} />

        {/* Login button */}
        {onLogin && (
          <button
            onClick={onLogin}
            style={{
              position: "absolute",
              top: 20, right: 20,
              zIndex: 10,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontWeight: 600
            }}
          >
            <LogIn size={18} /> Login
          </button>
        )}

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "80px 24px 60px",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto"
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <Leaf size={52} color="#4ade80" strokeWidth={2} />
            <h1 style={{ fontSize: 56, fontWeight: 800, margin: 0, color: "white" }}>Greenpath</h1>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px", color: "white" }}>
            AI Climate and Soil Intelligence for Small Farmers
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", margin: "0 auto 40px", maxWidth: 600 }}>
            Make smarter farming decisions with AI-powered insights on soil health, crop conditions, and climate risks
          </p>

          {/* Feature cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            maxWidth: 820,
            margin: "0 auto 40px"
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 12,
                padding: "24px 20px",
                textAlign: "center"
              }}>
                <f.icon size={32} color="#4ade80" style={{ marginBottom: 10 }} />
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", color: "white" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", margin: 0 }}>{f.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onGetStarted}
            style={{
              padding: "14px 30px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <Smartphone size={18} /> Get Started
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2>How It Works</h2>
        <div className="steps">
          {[
            { n: 1, title: "Open App", desc: "Launch Greenpath" },
            { n: 2, title: "Scan", desc: "Take a photo of soil or crops" },
            { n: 3, title: "AI Analysis", desc: "AI processes your data" },
            { n: 4, title: "Get Advice", desc: "Receive recommendations" }
          ].map(s => (
            <div key={s.n} className="step">
              <span>{s.n}</span>
              <div><h3>{s.title}</h3><p>{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="problems">
        <h2>Problems We Solve</h2>
        <div className="problem-grid">
          {problems.map((p, i) => (
            <div key={i} className="problem-card">✗ {p}</div>
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