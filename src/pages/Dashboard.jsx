// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import './Dashboard.css';

function Dashboard() {
  const { technologies, progress } = useTechnologies();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    recent: technologies.slice(0, 5)
  };

  const upcomingTech = technologies
    .filter(t => t.status !== 'completed')
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>📊 Панель управления</h1>
        <p>Обзор вашего прогресса и активностей</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card main-stats">
          <h3>📈 Основная статистика</h3>
          <div className="stats-content">
            <ProgressBar
              progress={progress}
              label="Общий прогресс"
              color="#4CAF50"
              height={25}
              animated={true}
              showPercentage={true}
            />
            
            <div className="stats-numbers">
              <div className="stat-box completed">
                <span className="stat-value">{stats.completed}</span>
                <span className="stat-label">Завершено</span>
              </div>
              <div className="stat-box in-progress">
                <span className="stat-value">{stats.inProgress}</span>
                <span className="stat-label">В процессе</span>
              </div>
              <div className="stat-box not-started">
                <span className="stat-value">{stats.notStarted}</span>
                <span className="stat-label">Не начато</span>
              </div>
              <div className="stat-box total">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Всего</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card quick-actions-card">
          <h3>⚡ Быстрые действия</h3>
          <div className="quick-actions-grid">
            <Link to="/add-technology" className="quick-action add">
              <span className="action-icon">➕</span>
              <span className="action-text">Добавить технологию</span>
            </Link>
            <Link to="/technologies" className="quick-action view">
              <span className="action-icon">📚</span>
              <span className="action-text">Все технологии</span>
            </Link>
            <Link to="/stats" className="quick-action stats">
              <span className="action-icon">📊</span>
              <span className="action-text">Статистика</span>
            </Link>
            <Link to="/settings" className="quick-action settings">
              <span className="action-icon">⚙️</span>
              <span className="action-text">Настройки</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-card upcoming-tech">
          <div className="card-header">
            <h3>🎯 Предстоящие изучения</h3>
            <Link to="/technologies" className="view-all">Все →</Link>
          </div>
          
          {upcomingTech.length > 0 ? (
            <div className="upcoming-list">
              {upcomingTech.map(tech => (
                <div key={tech.id} className="upcoming-item">
                  <div className="upcoming-info">
                    <h4>{tech.title}</h4>
                    <div className="upcoming-meta">
                      <span className={`priority-badge priority-${tech.priority}`}>
                        {tech.priority === 'high' ? '🔥' :
                         tech.priority === 'medium' ? '⚡' : '🌱'}
                      </span>
                      <span className="category">{tech.category}</span>
                    </div>
                  </div>
                  <Link to={`/technology/${tech.id}`} className="btn-link">
                    →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-upcoming">
              <p>Все технологии завершены! 🎉</p>
              <Link to="/add-technology" className="btn btn-primary">
                Добавить новые
              </Link>
            </div>
          )}
        </div>

        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h3>🔄 Недавняя активность</h3>
            <Link to="/technologies" className="view-all">Все →</Link>
          </div>
          
          {stats.recent.length > 0 ? (
            <div className="activity-list">
              {stats.recent.map(tech => (
                <div key={tech.id} className="activity-item">
                  <div className="activity-icon">
                    {tech.status === 'completed' ? '✅' :
                     tech.status === 'in-progress' ? '🔄' : '⏳'}
                  </div>
                  <div className="activity-content">
                    <h4>{tech.title}</h4>
                    <p>Статус: {tech.status === 'completed' ? 'Завершено' :
                               tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}</p>
                  </div>
                  <span className="activity-time">
                    {new Date().toLocaleDateString('ru-RU')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-activity">
              <p>Активности пока нет</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="motivation-card">
          <h3>💪 Мотивация</h3>
          <p>
            {progress >= 80 ? 'Отличная работа! Вы почти у цели! 🚀' :
             progress >= 50 ? 'Хороший прогресс! Продолжайте в том же духе! 👍' :
             progress >= 20 ? 'Вы на правильном пути! Не останавливайтесь! 💪' :
             'Начните с малого - каждая технология приближает вас к цели! 🌟'}
          </p>
          <div className="motivation-progress">
            <ProgressBar
              progress={progress}
              height={10}
              color={
                progress >= 80 ? '#4CAF50' :
                progress >= 50 ? '#FF9800' :
                progress >= 20 ? '#2196F3' : '#F44336'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;