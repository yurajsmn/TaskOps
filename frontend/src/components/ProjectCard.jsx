const ProjectCard = ({ project, isAdmin, onAddMember, currentUser }) => {
  const isCompleted = project.status === 'Completed';
  const isActive = project.status === 'Active';
  
  const statusClass = isActive ? 'active' : isCompleted ? 'completed' : 'on-hold';
  const statusIcon = isCompleted ? 'check_circle' : 'calendar_today';

  return (
    <div className="project-card">
      <div className="card-header">
        <div>
          <span className="department-badge">{project.department}</span>
          <h3 className="project-title">{project.name}</h3>
        </div>
        <span className={`status-badge ${statusClass}`}>
          <span className="dot"></span>
          {project.status}
        </span>
      </div>

      <div className="progress-section">
        <div className="progress-labels">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-value">{project.progress}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="card-footer" style={{ flexWrap: 'wrap', gap: '10px' }}>
        <div className="team-avatars">
          {project.members && project.members.slice(0, 3).map((m, i) => (
            <div key={i} className="avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontSize: '12px' }} title={m.name}>
              {m.name.charAt(0)}
            </div>
          ))}
          {project.teamCount > 3 && (
            <div className="avatar-more">+{project.teamCount - 3}</div>
          )}
          {isAdmin && project.createdBy === currentUser.id && (
            <button onClick={onAddMember} title="Add Member" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px dashed var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '5px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
            </button>
          )}
        </div>
        <div className="due-date">
          <span className="material-symbols-outlined">{statusIcon}</span>
          <span className="due-date-text">{project.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
