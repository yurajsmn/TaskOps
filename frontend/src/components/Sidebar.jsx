import { NavLink } from 'react-router-dom';

const Sidebar = () => {
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
      </nav>
    </aside>
  );
};

export default Sidebar;
