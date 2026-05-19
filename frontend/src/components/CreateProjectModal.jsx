import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, department, dueDate, status: 'Active', progress: 0, teamCount: 0 })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create project');
      
      onProjectCreated(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ backgroundColor: 'var(--color-surface-container)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', width: '100%', maxWidth: '400px', border: '1px solid var(--color-outline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--color-on-surface)' }}>Create New Project</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'var(--color-error)', fontSize: '14px', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>Project Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-outline)', backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }} />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>Department</label>
            <input type="text" value={department} onChange={e => setDepartment(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-outline)', backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }} />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>Due Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-outline)', backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
