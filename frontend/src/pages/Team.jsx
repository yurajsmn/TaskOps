import { useState, useEffect } from 'react';
const Team = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    fetch(`/api/auth/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.error('Error fetching users:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update role');
      
      setSuccess(`Role updated successfully for user!`);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (currentUser.role !== 'SuperAdmin') {
    return (
      <div>
        <h2 style={{ color: 'var(--color-on-surface)' }}>Team Members</h2>
        <p style={{ color: 'var(--color-on-surface-variant)' }}>You do not have permission to manage roles. Only Super Admins can manage team roles.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: 'var(--color-on-surface)', marginBottom: '1.5rem' }}>Team Management (Super Admin)</h2>
      {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
      {success && <p style={{ color: 'var(--color-primary)' }}>{success}</p>}
      
      <div style={{ backgroundColor: 'var(--color-surface-container)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-container-high)', borderBottom: '1px solid var(--color-outline)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-on-surface-variant)' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-on-surface-variant)' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-on-surface-variant)' }}>Current Role</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-on-surface-variant)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid var(--color-outline)' }}>
                <td style={{ padding: '1rem', color: 'var(--color-on-surface)' }}>{user.name}</td>
                <td style={{ padding: '1rem', color: 'var(--color-on-surface-variant)' }}>{user.email}</td>
                <td style={{ padding: '1rem', color: 'var(--color-on-surface)' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: 'var(--border-radius-sm)', 
                    fontSize: '12px',
                    backgroundColor: user.role === 'SuperAdmin' ? 'var(--color-primary)' : 'var(--color-surface-container-highest)',
                    color: user.role === 'SuperAdmin' ? 'var(--color-on-primary)' : 'var(--color-on-surface)'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {user.role !== 'SuperAdmin' && (
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--border-radius-sm)',
                        backgroundColor: 'var(--color-surface-container-high)',
                        color: 'var(--color-on-surface)',
                        border: '1px solid var(--color-outline)'
                      }}
                    >
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
