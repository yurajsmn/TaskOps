import { useState, useEffect } from 'react';

const AddMemberModal = ({ isOpen, onClose, projectId, onMemberAdded }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('token');
      fetch('/api/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUsers(data.filter(u => u.role !== 'Admin')))
      .catch(err => console.error('Error fetching users:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setError('Please select a member');
      return;
    }
    
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/projects/${projectId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: selectedUser })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add member');
      
      onMemberAdded(data);
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
          <h3 style={{ margin: 0, color: 'var(--color-on-surface)' }}>Add Member to Project</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'var(--color-error)', fontSize: '14px', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>Select Member</label>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-outline)', backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }}>
              <option value="">-- Select Member --</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>{loading ? 'Adding...' : 'Add Member'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
