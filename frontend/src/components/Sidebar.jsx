import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">terminal</span>
          </div>
          <div className="sidebar-logo-text">
            <h1>TaskOps</h1>
            <p>Management Portal</p>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">assignment</span>
          <span>Projects</span>
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">view_kanban</span>
          <span>Tasks</span>
        </NavLink>
        {currentUser.role === 'SuperAdmin' && (
          <NavLink to="/team" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="material-symbols-outlined">group</span>
            <span>Team</span>
          </NavLink>
        )}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem' }}>
        <button 
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-surface-container)',
            border: '1px solid var(--color-outline)',
            borderRadius: 'var(--border-radius-md)',
            color: 'var(--color-on-surface)',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
