import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Based on the original main.js logic
    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Registered:", data);
        alert("Registration successful! Please login.");
        navigate('/login');
      } else {
        alert("Registration failed. Email might already be in use.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="bg-blob blob-1" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0) 70%)' }}></div>
      <div className="bg-blob blob-2" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)' }}></div>
      
      <motion.div 
        className="auth-card glass"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <motion.div 
            className="auth-logo"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            SplitExpense
          </motion.div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join thousands managing expenses effortlessly</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                className="auth-input" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                className="auth-input" 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
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
            style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)' }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus size={18} />
            Get Started
          </motion.button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login"><ArrowLeft size={14} style={{ verticalAlign: 'middle' }} /> Back to Login</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
