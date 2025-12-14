import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  // Рассчитываем статистику
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  // Процент выполнения
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="header-content">
        <h1 className="header-title">Трекер изучения технологий</h1>
        <p className="header-subtitle">
          Отслеживайте ваш прогресс в изучении современных технологий
        </p>
      </div>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value completed">{completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value in-progress">{inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value not-started">{notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-label">Общий прогресс:</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="main-progress-bar"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="progress-description">
          {completionPercentage === 100 
            ? '🎉 Все технологии изучены! Так держать!' 
            : completionPercentage >= 70 
            ? 'Отличный прогресс! Продолжайте в том же духе!' 
            : completionPercentage >= 30 
            ? 'Хорошее начало! Не останавливайтесь!' 
            : 'Начните изучение первой технологии!'}
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;