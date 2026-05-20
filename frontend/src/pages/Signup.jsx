import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message);
        return;
      }
      
      // Auto redirect to login upon successful signup
      navigate('/login');
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-background">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
      </div>
      
      <main className="login-main">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <h1>Create Account</h1>
            <p>Join TaskOps Management Portal</p>
          </div>
          
          <form className="login-form" onSubmit={handleSignup}>
            {error && <p style={{ color: 'var(--color-error)', marginBottom: '1rem', fontSize: '14px' }}>{error}</p>}
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>


            
            <button type="submit" className="btn-submit">
              <span>Sign Up</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '14px' }}>
            <span style={{ color: 'var(--color-on-surface-variant)' }}>Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '500' }}>
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
