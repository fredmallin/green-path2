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

import SoilScanner from "./SoilScanner";
import CropScanner from "./CropScanner";
import { WeatherWidget } from "../components/WeatherWidget";
import Recommendations from "./Recommendations";
import { ScanHistory } from "./ScanHistory";
import EducationResources from "./EducationResources";
import ScanDetailDialog from "./ScanDetailDialog";
import FarmAssistChat from "./FarmAssistChat";


import { useAuth } from "../contexts/AuthContext";

export default function Dashboard({ onBack, onLogout }) {
  const { user, profile, logout } = useAuth();

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

  const displayName = profile?.name || user?.email;

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

          <button
            className="btn ghost show-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav className="nav hide-mobile">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? "btn active" : "btn ghost"}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon /> {item.label}
              </button>
            ))}

            <button
              className="btn logout"
              onClick={logout}
            >
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

            <button className="btn logout full" onClick={logout}>
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
            <h2>Welcome back, {displayName} 👋</h2>
            <p>
              {profile?.farmName || "Start scanning your crops"}
              {profile?.location && ` • ${profile.location}`}
            </p>
          </div>
        )}

        {/* SCANNER */}
        {activeSection === "scanner" && (
          <div className="grid">

            <div className="left">

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
            </div>

          </div>
        )}

        {activeSection === "crops" && <Recommendations />}
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