import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState({ name: 'Current User', role: 'Member' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="top-header" style={{ justifyContent: 'flex-end' }}>
      <div className="header-actions">
        <button className="icon-btn" onClick={handleLogout} title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-on-primary-fixed)' }}>person</span>
          </div>
          <div className="user-info">
            <p className="user-name">{user.name}</p>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
