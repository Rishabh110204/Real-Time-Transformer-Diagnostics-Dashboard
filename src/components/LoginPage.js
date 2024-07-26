import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import HPS_logo from "../assets/HPS_logo.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      onLogin(); // Call onLogin after successful login
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#007da0' }}>
      <div className="login-container" style={{ backgroundColor: '#007da0' }}>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="text-center mb-4">
            <img src={HPS_logo} alt="" className="login-form-container" />
            <div className="welcome">Welcome Back!</div>
            <p className="text-muted">Please enter your details</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label visually-hidden">Email address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label visually-hidden">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
