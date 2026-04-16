import { useState } from "react";
import { Leaf, User, Mail, Lock, Phone, MapPin, Home } from "lucide-react";
import "./index.css";

export function Register({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    farmName: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fake register (replace with Firebase later)
  const register = async (data) => {
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const success = await register(formData);

    setLoading(false);

    if (success) {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setError("Email already registered.");
    }
  };

  // SUCCESS SCREEN
  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card success-card">
          <div className="success-icon">
            <Leaf />
          </div>
          <h2>Registration Successful!</h2>
          <p>Welcome to Greenpath, {formData.name}!</p>
          <small>Redirecting to login...</small>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <div className="logo">
            <Leaf className="logo-icon" />
            <h1>Greenpath</h1>
          </div>
          <h2>Create Account</h2>
          <p>Join farmers using AI to improve farming</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          {error && <div className="error-box">{error}</div>}

          {/* Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone (Optional)</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input
                type="text"
                name="phone"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Farm Name */}
          <div className="form-group">
            <label>Farm Name (Optional)</label>
            <div className="input-wrapper">
              <Home className="input-icon" />
              <input
                type="text"
                name="farmName"
                placeholder="Green Valley Farm"
                value={formData.farmName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location (Optional)</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" />
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="auth-footer">
            <span>Already have an account? </span>
            <button type="button" onClick={onSwitchToLogin}>
              Login here
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}