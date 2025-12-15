// src/pages/Stats.jsx
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import './Stats.css';

function Stats() {
  const { technologies, progress } = useTechnologies();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    byCategory: technologies.reduce((acc, tech) => {
      acc[tech.category] = (acc[tech.category] || 0) + 1;
      return acc;
    }, {}),
    byPriority: technologies.reduce((acc, tech) => {
      acc[tech.priority] = (acc[tech.priority] || 0) + 1;
      return acc;
    }, {})
  };

  const categoryProgress = Object.keys(stats.byCategory).map(category => {
    const categoryTechs = technologies.filter(t => t.category === category);
    const completed = categoryTechs.filter(t => t.status === 'completed').length;
    const total = categoryTechs.length;
    return {
      name: category,
      completed,
      total,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1>📊 Статистика изучения</h1>
        <p>Аналитика вашего прогресса по всем технологиям</p>
      </div>

      <div className="stats-summary">
        <div className="summary-card main-progress">
          <h2>Общий прогресс</h2>
          <ProgressBar
            progress={progress}
            height={30}
            color="#4CAF50"
            animated={true}
          />
          <div className="progress-numbers">
            <div className="progress-stat">
              <span className="stat-value">{progress}%</span>
              <span className="stat-label">Прогресс</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{stats.completed}</span>
              <span className="stat-label">Завершено</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Всего</span>
            </div>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-item completed">
            <div className="item-icon">✅</div>
            <div className="item-content">
              <span className="item-value">{stats.completed}</span>
              <span className="item-label">Завершено</span>
            </div>
          </div>

          <div className="summary-item in-progress">
            <div className="item-icon">🔄</div>
            <div className="item-content">
              <span className="item-value">{stats.inProgress}</span>
              <span className="item-label">В процессе</span>
            </div>
          </div>

          <div className="summary-item not-started">
            <div className="item-icon">⏳</div>
            <div className="item-content">
              <span className="item-value">{stats.notStarted}</span>
              <span className="item-label">Не начато</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-details">
        <div className="detail-card">
          <h3>📈 Прогресс по категориям</h3>
          <div className="categories-progress">
            {categoryProgress.map(cat => (
              <div key={cat.name} className="category-progress">
                <div className="category-header">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-stats">
                    {cat.completed}/{cat.total} ({cat.progress}%)
                  </span>
                </div>
                <ProgressBar
                  progress={cat.progress}
                  height={12}
                  color={
                    cat.name === 'frontend' ? '#2196F3' :
                    cat.name === 'backend' ? '#FF9800' :
                    cat.name === 'database' ? '#9C27B0' :
                    cat.name === 'devops' ? '#00BCD4' :
                    cat.name === 'tools' ? '#795548' : '#607D8B'
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>🏷️ Распределение по категориям</h3>
          <div className="distribution-list">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="distribution-item">
                <span className="dist-name">{category}</span>
                <div className="dist-bar">
                  <div 
                    className="dist-fill"
                    style={{
                      width: `${(count / stats.total) * 100}%`,
                      backgroundColor: 
                        category === 'frontend' ? '#2196F3' :
                        category === 'backend' ? '#FF9800' :
                        category === 'database' ? '#9C27B0' :
                        category === 'devops' ? '#00BCD4' :
                        category === 'tools' ? '#795548' : '#607D8B'
                    }}
                  />
                </div>
                <span className="dist-count">{count} ({Math.round((count / stats.total) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>⚡ Приоритеты изучения</h3>
          <div className="priority-stats">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="priority-item">
                <div className="priority-header">
                  <span className="priority-name">
                    {priority === 'high' ? '🔥 Высокий' :
                     priority === 'medium' ? '⚡ Средний' : '🌱 Низкий'}
                  </span>
                  <span className="priority-count">{count}</span>
                </div>
                <div className="progress-circle">
                  <div 
                    className="circle-fill"
                    style={{
                      background: `conic-gradient(
                        ${priority === 'high' ? '#F44336' :
                          priority === 'medium' ? '#FF9800' : '#4CAF50'} 
                        ${(count / stats.total) * 360}deg, 
                        #f0f0f0 0deg
                      )`
                    }}
                  >
                    <span className="circle-text">{Math.round((count / stats.total) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>📅 Активность</h3>
          <div className="activity-stats">
            <div className="activity-item">
              <span className="activity-label">Средний прогресс:</span>
              <span className="activity-value">{progress}%</span>
            </div>
            <div className="activity-item">
              <span className="activity-label">Завершено за месяц:</span>
              <span className="activity-value">{Math.round(stats.completed * 0.3)}</span>
            </div>
            <div className="activity-item">
              <span className="activity-label">Производительность:</span>
              <span className="activity-value">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-actions">
        <Link to="/technologies" className="btn btn-primary">
          📚 Перейти к технологиям
        </Link>
        <button onClick={() => window.print()} className="btn btn-secondary">
          🖨️ Распечатать статистику
        </button>
      </div>
    </div>
  );
}

export default Stats;