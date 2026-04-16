import { useState } from "react";
import {
  Leaf,
  ArrowLeft,
  Home,
  Sprout,
  BookOpen,
  Menu,
  X,
  LogOut
} from "lucide-react";

import "./index.css";

import SoilScanner from "./SoilScanner";
import CropScanner from "./CropScanner";
import WeatherWidget from "./WeatherWidget";
import Recommendations from "./Recommendations";
import ScanHistory from "./ScanHistory";
import CropRecommendations from "./CropRecommendations";
import EducationResources from "./EducationResources";
import ScanDetailDialog from "./ScanDetailDialog";
import FarmAssistChat from "./FarmAssistChat";

export default function Dashboard({ onBack, onLogout, user }) {
  const [scanHistory, setScanHistory] = useState([]);
  const [activeSection, setActiveSection] = useState("scanner");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [activeTab, setActiveTab] = useState("soil");

  const handleScanComplete = (result) => {
    setScanHistory([result, ...scanHistory]);
  };

  const handleViewScan = (scan) => {
    setSelectedScan(scan);
  };

  const navigationItems = [
    { id: "scanner", label: "Scanner", icon: Home },
    { id: "crops", label: "Crop Guide", icon: Sprout },
    { id: "education", label: "Learn", icon: BookOpen }
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          
          <div className="logo-section">
            <button className="btn ghost hide-mobile" onClick={onBack}>
              <ArrowLeft /> Back
            </button>

            <Leaf className="logo-icon" />
            <div>
              <h1>Greenpath</h1>
              <p className="subtitle">AI Farming Assistant</p>
            </div>
          </div>

          {/* MOBILE MENU */}
          <button
            className="btn ghost show-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="nav hide-mobile">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={
                  activeSection === item.id
                    ? "btn active"
                    : "btn ghost"
                }
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon /> {item.label}
              </button>
            ))}

            <button className="btn logout" onClick={onLogout}>
              <LogOut /> Logout
            </button>
          </nav>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <div className="mobile-nav">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className="btn ghost full"
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                <item.icon /> {item.label}
              </button>
            ))}

            <button className="btn ghost full" onClick={onBack}>
              <ArrowLeft /> Back
            </button>

            <button className="btn logout full" onClick={onLogout}>
              <LogOut /> Logout
            </button>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="main">
        
        {/* WELCOME */}
        {user && (
          <div className="welcome">
            <h2>Welcome back, {user.name} 👋</h2>
            <p>
              {user.farmName || "Start scanning your crops"}{" "}
              {user.location && `• ${user.location}`}
            </p>
          </div>
        )}

        {/* SCANNER SECTION */}
        {activeSection === "scanner" && (
          <div className="grid">
            
            <div className="left">
              {/* Tabs */}
              <div className="tabs">
                <button
                  className={activeTab === "soil" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("soil")}
                >
                  Soil Scanner
                </button>

                <button
                  className={activeTab === "crop" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("crop")}
                >
                  Crop Scanner
                </button>
              </div>

              {activeTab === "soil" && (
                <SoilScanner onScanComplete={handleScanComplete} />
              )}

              {activeTab === "crop" && (
                <CropScanner onScanComplete={handleScanComplete} />
              )}

              <ScanHistory
                history={scanHistory}
                onViewScan={handleViewScan}
              />
            </div>

            <div className="right">
              <WeatherWidget />
              <Recommendations history={scanHistory} />
            </div>
          </div>
        )}

        {activeSection === "crops" && <CropRecommendations />}
        {activeSection === "education" && <EducationResources />}
      </main>

      {/* MODAL */}
      <ScanDetailDialog
        scan={selectedScan}
        onClose={() => setSelectedScan(null)}
      />

      <FarmAssistChat />
    </div>
  );
}