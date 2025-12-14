import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
  // Определяем иконку и цвет в зависимости от статуса
  const getStatusInfo = () => {
    switch(status) {
      case 'completed':
        return { icon: '✅', color: 'completed', text: 'Изучено' };
      case 'in-progress':
        return { icon: '⏳', color: 'in-progress', text: 'В процессе' };
      case 'not-started':
        return { icon: '📚', color: 'not-started', text: 'Не начато' };
      default:
        return { icon: '❓', color: 'not-started', text: 'Не определено' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`technology-card ${statusInfo.color}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="status-badge">
          {statusInfo.icon} {statusInfo.text}
        </span>
      </div>
      
      <div className="card-body">
        <p className="card-description">{description}</p>
      </div>
      
      <div className="card-footer">
        <div className="progress-indicator">
          <div 
            className="progress-bar" 
            style={{ 
              width: status === 'completed' ? '100%' : 
                     status === 'in-progress' ? '50%' : '0%' 
            }}
          ></div>
        </div>
        <span className="progress-text">
          {status === 'completed' ? '100%' : 
           status === 'in-progress' ? '50%' : '0%'}
        </span>
      </div>
    </div>
  );
}

export default TechnologyCard;