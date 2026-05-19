import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message);
        return;
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
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
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Please sign in to continue</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="checkbox-group">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            
            <button type="submit" className="btn-submit">
              Sign In
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '14px' }}>
            <span style={{ color: 'var(--color-on-surface-variant)' }}>Don't have an account? </span>
            <Link to="/signup" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '500' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
