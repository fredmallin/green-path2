import { useState } from "react";
import { Leaf, User, Mail, Lock, Phone, MapPin, Home } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

    // VALIDATION
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

    try {
      //  1. CREATE AUTH USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      //  2. STORE EXTRA DATA 
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        farmName: formData.farmName || "",
        location: formData.location || "",
        createdAt: new Date(),
      });

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onSuccess(); // redirect to login/dashboard
      }, 2000);

    } catch (err) {
      setLoading(false);

      // ERROR HANDLING
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Registration failed. Try again.");
      }
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
          <small>Redirecting...</small>
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

          {/* NAME */}
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>Confirm Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone(optional)</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FARM NAME */}
          <div className="form-group">
            <label>Farm Name(optional)</label>
            <div className="input-wrapper">
              <Home className="input-icon" />
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="form-group">
            <label>Location(Optional)</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" />
              <input
                type="text"
                name="location"
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