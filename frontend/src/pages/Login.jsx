import { useState } from "react";
import { Leaf, Mail, Lock } from "lucide-react";
import "./index.css";

export function Login({ onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fake login (replace with your real auth)
  const login = async (email, password) => {
    return email === "test@test.com" && password === "123456";
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

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    const success = await login(formData.email, formData.password);

    setLoading(false);

    if (success) {
      onSuccess();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <div className="logo">
            <Leaf className="logo-icon" />
            <h1>Greenpath</h1>
          </div>

          <h2>Welcome Back</h2>
          <p>Login to access your AI farming assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label>Email</label>
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

          <div className="form-group">
            <label>Password</label>
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

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-footer">
            <span>Don't have an account? </span>
            <button type="button" onClick={onSwitchToRegister}>
              Register here
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}