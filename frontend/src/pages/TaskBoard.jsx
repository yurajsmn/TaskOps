import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTaskModal from '../components/CreateTaskModal';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        if (err.message === 'Unauthorized') navigate('/login');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Loading tasks...</p>;

  const columns = ['todo', 'in-progress', 'done'];

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h2>Task Board</h2>
          <p>Manage project tasks</p>
        </div>
        {isAdmin && (
          <button className="btn-create-project" onClick={() => setIsCreateOpen(true)}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>Create Task</span>
          </button>
        )}
      </div>

      <div className="kanban-board">
        {columns.map(col => (
          <div key={col} className="kanban-column">
            <div className="kanban-column-header">
              <h3>{col.replace('-', ' ').toUpperCase()}</h3>
              <span className="task-count">
                {tasks.filter(t => t.status === col).length}
              </span>
            </div>
            
            <div className="kanban-tasks">
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task.id} className="kanban-task-card">
                  <div className="task-badges">
                    <span className={`task-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    {task.project && (
                      <span className="task-badge" style={{ backgroundColor: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)' }}>
                        {task.project.name}
                      </span>
                    )}
                  </div>
                  <h4 className="task-title">{task.title}</h4>
                  <div className="task-footer">
                    <span className="task-assignee">
                      {task.assignee ? task.assignee.name : 'Unassigned'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <CreateTaskModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onTaskCreated={(newTask) => setTasks([...tasks, newTask])}
      />
    </>
  );
};

export default TaskBoard;
