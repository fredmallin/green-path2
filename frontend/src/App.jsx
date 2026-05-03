import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [view, setView] = useState("hero");

  //  Wait for Firebase to load auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  //  If logged in → ALWAYS show dashboard
  if (isAuthenticated) {
    return (
      <Dashboard
        onLogout={() => setView("hero")}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {view === "hero" && (
        <Hero
          onGetStarted={() => setView("register")}
          onLogin={() => setView("login")}
        />
      )}

      {view === "register" && (
        <Register
          onSuccess={() => setView("login")}
          onSwitchToLogin={() => setView("login")}
        />
      )}

      {view === "login" && (
        <Login
          onSuccess={() => setView("hero")}
          onSwitchToRegister={() => setView("register")}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}