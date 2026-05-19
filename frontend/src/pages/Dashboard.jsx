import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5001/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => {
        console.error('Error fetching dashboard:', err);
        if (err.message === 'Unauthorized') navigate('/login');
      });
  }, [navigate]);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h2>Overview</h2>
          <p>Real-time performance metrics and priority task flow.</p>
        </div>
      </div>

      {/* High-Level Stats Bento Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="material-symbols-outlined icon-task">task_alt</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Projects</p>
            <p className="stat-value">{data.stats.activeProjects}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="material-symbols-outlined icon-progress">folder_managed</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Completed Tasks</p>
            <p className="stat-value">{data.stats.completedTasks}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="material-symbols-outlined icon-urgent">group</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Team Members</p>
            <p className="stat-value">{data.stats.teamMembers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="material-symbols-outlined icon-velocity">speed</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Upcoming Deadlines</p>
            <p className="stat-value">{data.stats.upcomingDeadlines}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Recent Activity Feed */}
        <div className="dashboard-section activity-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            <div className="activity-timeline"></div>
            {data.recentActivity.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon">
                  <span className="material-symbols-outlined">assignment_ind</span>
                </div>
                <div>
                  <p className="activity-text">
                    <strong>{item.action}</strong> - {item.target}
                  </p>
                  <p className="activity-time">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
