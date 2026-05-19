import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import AddMemberModal from '../components/AddMemberModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [assignProjectId, setAssignProjectId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${API_BASE_URL}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        if (err.message === 'Unauthorized') navigate('/login');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="loading-state">Loading projects...</div>;
  }

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div className="page-title">
          <h2>Active Projects</h2>
          <p>Manage and monitor your enterprise initiatives across all departments.</p>
        </div>
        {isAdmin && (
          <button className="btn-create-project" onClick={() => setIsCreateOpen(true)}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>Create New Project</span>
          </button>
        )}
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard 
            key={project._id} 
            project={project} 
            isAdmin={isAdmin}
            currentUser={user}
            onAddMember={() => setAssignProjectId(project._id)}
          />
        ))}
      </div>

      <CreateProjectModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onProjectCreated={(newProject) => setProjects([...projects, newProject])}
      />

      <AddMemberModal 
        isOpen={!!assignProjectId} 
        projectId={assignProjectId}
        onClose={() => setAssignProjectId(null)} 
        onMemberAdded={(updatedProject) => {
          setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
        }}
      />
    </>
  );
};

export default Projects;
