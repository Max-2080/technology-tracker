// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuickActions from '../components/QuickActions';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

function Home() {
  const { 
    technologies, 
    markAllCompleted, 
    resetAllStatuses,
    progress 
  } = useTechnologies();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const recentTechnologies = technologies.slice(0, 3);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🚀 Добро пожаловать в Трекер Технологий</h1>
        <p className="subtitle">
          Отслеживайте свой прогресс в изучении современных технологий веб-разработки
        </p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Общий прогресс</h3>
            <ProgressBar
              progress={progress}
              height={15}
              color="#4CAF50"
              showPercentage={true}
              animated={true}
            />
            <div className="stat-numbers">
              <span>{stats.completed} / {stats.total} завершено</span>
              <span className="progress-percent">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="mini-stat completed">
            <div className="mini-stat-icon">✅</div>
            <div className="mini-stat-content">
              <span className="mini-stat-value">{stats.completed}</span>
              <span className="mini-stat-label">Завершено</span>
            </div>
          </div>

          <div className="mini-stat in-progress">
            <div className="mini-stat-icon">🔄</div>
            <div className="mini-stat-content">
              <span className="mini-stat-value">{stats.inProgress}</span>
              <span className="mini-stat-label">В процессе</span>
            </div>
          </div>

          <div className="mini-stat not-started">
            <div className="mini-stat-icon">⏳</div>
            <div className="mini-stat-content">
              <span className="mini-stat-value">{stats.notStarted}</span>
              <span className="mini-stat-label">Не начато</span>
            </div>
          </div>
        </div>
      </div>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        technologies={technologies}
      />

      <div className="recent-technologies">
        <div className="section-header">
          <h2>📝 Недавние технологии</h2>
          <Link to="/technologies" className="view-all-link">
            Все технологии →
          </Link>
        </div>

        {recentTechnologies.length > 0 ? (
          <div className="recent-grid">
            {recentTechnologies.map(tech => (
              <div key={tech.id} className="recent-tech-card">
                <div className="recent-tech-header">
                  <span className={`status-badge status-${tech.status}`}>
                    {tech.status === 'completed' ? '✅' : 
                     tech.status === 'in-progress' ? '🔄' : '⏳'}
                  </span>
                  <span className="category-tag">{tech.category}</span>
                </div>
                <h3>{tech.title}</h3>
                <p className="recent-tech-desc">{tech.description}</p>
                <Link to={`/technology/${tech.id}`} className="detail-link">
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Технологий пока нет. Добавьте первую!</p>
            <Link to="/add-technology" className="btn btn-primary">
              ➕ Добавить технологию
            </Link>
          </div>
        )}
      </div>

      <div className="quick-links">
        <h2>⚡ Быстрые ссылки</h2>
        <div className="links-grid">
          <Link to="/add-technology" className="quick-link add-tech">
            <span className="link-icon">➕</span>
            <span className="link-text">Добавить технологию</span>
          </Link>
          <Link to="/technologies" className="quick-link view-tech">
            <span className="link-icon">📚</span>
            <span className="link-text">Все технологии</span>
          </Link>
          <Link to="/stats" className="quick-link stats">
            <span className="link-icon">📊</span>
            <span className="link-text">Статистика</span>
          </Link>
          <Link to="/settings" className="quick-link settings">
            <span className="link-icon">⚙️</span>
            <span className="link-text">Настройки</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;