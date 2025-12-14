import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  // Функция для смены статуса
  const handleStatusClick = () => {
    // Определяем следующий статус в цикле
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    // Вызываем функцию из родителя
    onStatusChange(id, nextStatus);
  };

  // Определяем иконку и цвет в зависимости от статуса
  const getStatusInfo = () => {
    switch(status) {
      case 'completed':
        return { icon: '✅', color: 'completed', text: 'Изучено', nextAction: 'Начать заново' };
      case 'in-progress':
        return { icon: '⏳', color: 'in-progress', text: 'В процессе', nextAction: 'Отметить как изученное' };
      case 'not-started':
        return { icon: '📚', color: 'not-started', text: 'Не начато', nextAction: 'Начать изучение' };
      default:
        return { icon: '❓', color: 'not-started', text: 'Не определено', nextAction: 'Начать' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div 
      className={`technology-card ${statusInfo.color}`}
      onClick={handleStatusClick}
      title={`Кликните для смены статуса: ${statusInfo.nextAction}`}
    >
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
        <span className="click-hint">🔁 Кликните для смены статуса</span>
      </div>
    </div>
  );
}

export default TechnologyCard;