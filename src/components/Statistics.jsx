import './Statistics.css';

function Statistics({ technologies }) {
  // Рассчитываем статистику
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPercentage = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const notStartedPercentage = total > 0 ? Math.round((notStarted / total) * 100) : 0;

  // Находим самую популярную категорию (статус)
  const getMostPopularStatus = () => {
    const statusCounts = { completed, 'in-progress': inProgress, 'not-started': notStarted };
    const maxStatus = Object.keys(statusCounts).reduce((a, b) => 
      statusCounts[a] > statusCounts[b] ? a : b
    );
    
    switch(maxStatus) {
      case 'completed': return { text: 'Изученные технологии', icon: '🏆', color: '#4CAF50' };
      case 'in-progress': return { text: 'Технологии в процессе', icon: '🚀', color: '#FF9800' };
      case 'not-started': return { text: 'Не начатые технологии', icon: '🎯', color: '#9E9E9E' };
      default: return { text: 'Равномерное распределение', icon: '⚖️', color: '#666' };
    }
  };

  const popularStatus = getMostPopularStatus();

  return (
    <div className="statistics">
      <h3 className="stats-title">Детальная статистика</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-item completed-stat">
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Изучено</div>
          <div className="stat-percentage">{completionPercentage}%</div>
        </div>
        
        <div className="stat-item inprogress-stat">
          <div className="stat-value">{inProgress}</div>
          <div className="stat-label">В процессе</div>
          <div className="stat-percentage">{inProgressPercentage}%</div>
        </div>
        
        <div className="stat-item notstarted-stat">
          <div className="stat-value">{notStarted}</div>
          <div className="stat-label">Не начато</div>
          <div className="stat-percentage">{notStartedPercentage}%</div>
        </div>
      </div>
      
      <div className="progress-bars">
        <div className="progress-item">
          <div className="progress-label">Изучено</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar completed" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="progress-value">{completionPercentage}%</div>
        </div>
        
        <div className="progress-item">
          <div className="progress-label">В процессе</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar in-progress" 
              style={{ width: `${inProgressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-value">{inProgressPercentage}%</div>
        </div>
        
        <div className="progress-item">
          <div className="progress-label">Не начато</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar not-started" 
              style={{ width: `${notStartedPercentage}%` }}
            ></div>
          </div>
          <div className="progress-value">{notStartedPercentage}%</div>
        </div>
      </div>
      
      <div className="popular-status">
        <span className="popular-icon" style={{ color: popularStatus.color }}>
          {popularStatus.icon}
        </span>
        <span className="popular-text">
          Самая популярная категория: <strong>{popularStatus.text}</strong>
        </span>
      </div>
    </div>
  );
}

export default Statistics;