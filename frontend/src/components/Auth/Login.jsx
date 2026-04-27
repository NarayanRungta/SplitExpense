import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Based on the original main.js logic
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.name);
        alert("Login successful");
        // navigate('/dashboard') // Future route
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <motion.div 
        className="auth-card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="auth-header">
          <motion.div 
            className="auth-logo"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            SplitExpense
          </motion.div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Keep your finances in sync with your squad</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a href="#" style={{ fontSize: '12px', marginBottom: '4px' }}>Forgot?</a>
            </div>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                className="auth-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn size={18} />
            Sign In
          </motion.button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one <ArrowRight size={14} style={{ verticalAlign: 'middle' }} /></Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
