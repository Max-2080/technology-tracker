// src/pages/TechnologyList.jsx
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import './TechnologyList.css';

function TechnologyList() {
  const { technologies, progress } = useTechnologies();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    byCategory: technologies.reduce((acc, tech) => {
      acc[tech.category] = (acc[tech.category] || 0) + 1;
      return acc;
    }, {})
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'not-started': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>📚 Все технологии</h1>
        <div className="header-actions">
          <Link to="/add-technology" className="btn btn-primary">
            ➕ Добавить технологию
          </Link>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <h3>Общая статистика</h3>
          <ProgressBar
            progress={progress}
            label="Общий прогресс"
            color="#4CAF50"
            animated={true}
            height={20}
          />
          <div className="stats-numbers">
            <div className="stat-number">
              <span className="number">{stats.total}</span>
              <span className="label">Всего</span>
            </div>
            <div className="stat-number">
              <span className="number" style={{color: '#4CAF50'}}>{stats.completed}</span>
              <span className="label">Завершено</span>
            </div>
            <div className="stat-number">
              <span className="number" style={{color: '#FF9800'}}>{stats.inProgress}</span>
              <span className="label">В процессе</span>
            </div>
            <div className="stat-number">
              <span className="number" style={{color: '#F44336'}}>{stats.notStarted}</span>
              <span className="label">Не начато</span>
            </div>
          </div>
        </div>

        <div className="categories-summary">
          <h3>По категориям</h3>
          <div className="categories-list">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="technologies-container">
        <div className="filters-section">
          <h3>Фильтры</h3>
          <div className="filter-buttons">
            <button className="filter-btn active">Все ({technologies.length})</button>
            <button className="filter-btn">
              Завершено ({stats.completed})
            </button>
            <button className="filter-btn">
              В процессе ({stats.inProgress})
            </button>
            <button className="filter-btn">
              Не начато ({stats.notStarted})
            </button>
          </div>
        </div>

        <div className="technologies-grid">
          {technologies.map(tech => (
            <div key={tech.id} className="technology-card">
              <div className="card-header">
                <div className="tech-category">{tech.category}</div>
                <div className="tech-priority priority-{tech.priority}">
                  {tech.priority === 'high' ? '🔥 Высокий' : 
                   tech.priority === 'medium' ? '⚡ Средний' : '🌱 Низкий'}
                </div>
              </div>
              
              <h3 className="tech-title">{tech.title}</h3>
              <p className="tech-description">{tech.description}</p>
              
              <div className="tech-status">
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: getStatusColor(tech.status),
                    color: 'white'
                  }}
                >
                  {getStatusIcon(tech.status)} {tech.status === 'completed' ? 'Завершено' : 
                                          tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
                </span>
              </div>
              
              {tech.notes && (
                <div className="tech-notes-preview">
                  <strong>📝 Заметки:</strong> {tech.notes.substring(0, 50)}...
                </div>
              )}
              
              <div className="card-footer">
                <Link to={`/technology/${tech.id}`} className="btn-details">
                  Подробнее →
                </Link>
                <span className="tech-date">
                  Добавлено: {new Date().toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {technologies.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>Технологий пока нет</h3>
            <p>Добавьте первую технологию, чтобы начать отслеживать прогресс</p>
            <Link to="/add-technology" className="btn btn-primary">
              ➕ Добавить технологию
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyList;