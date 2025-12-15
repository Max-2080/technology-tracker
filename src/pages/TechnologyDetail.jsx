// src/pages/TechnologyDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find(t => t.id === parseInt(techId));
      setTechnology(tech);
      setEditedNotes(tech?.notes || '');
    }
  }, [techId]);

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem('technologies');
    if (saved && technology) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(tech =>
        tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
      );
      localStorage.setItem('technologies', JSON.stringify(updated));
      setTechnology({ ...technology, status: newStatus });
    }
  };

  const updateNotes = () => {
    const saved = localStorage.getItem('technologies');
    if (saved && technology) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(tech =>
        tech.id === parseInt(techId) ? { ...tech, notes: editedNotes } : tech
      );
      localStorage.setItem('technologies', JSON.stringify(updated));
      setTechnology({ ...technology, notes: editedNotes });
      setIsEditing(false);
    }
  };

  const deleteTechnology = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const saved = localStorage.getItem('technologies');
      if (saved) {
        const technologies = JSON.parse(saved);
        const updated = technologies.filter(t => t.id !== parseInt(techId));
        localStorage.setItem('technologies', JSON.stringify(updated));
        navigate('/technologies');
      }
    }
  };

  if (!technology) {
    return (
      <div className="not-found">
        <h1>🔍 Технология не найдена</h1>
        <p>Технология с ID {techId} не существует или была удалена.</p>
        <Link to="/technologies" className="btn btn-primary">
          ← Вернуться к списку
        </Link>
      </div>
    );
  }

  const getStatusProgress = () => {
    switch(technology.status) {
      case 'not-started': return 0;
      case 'in-progress': return 50;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusColor = () => {
    switch(technology.status) {
      case 'not-started': return '#F44336';
      case 'in-progress': return '#FF9800';
      case 'completed': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="technology-detail-page">
      <div className="detail-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <div className="header-actions">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="btn btn-secondary"
          >
            {isEditing ? '❌ Отмена' : '✏️ Редактировать'}
          </button>
          <button 
            onClick={deleteTechnology} 
            className="btn btn-danger"
          >
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="main-info">
          <div className="tech-header">
            <div className="tech-category-badge">
              {technology.category}
            </div>
            <div className={`priority-badge priority-${technology.priority}`}>
              {technology.priority === 'high' ? '🔥 Высокий приоритет' : 
               technology.priority === 'medium' ? '⚡ Средний приоритет' : '🌱 Низкий приоритет'}
            </div>
          </div>
          
          <h1 className="tech-title">{technology.title}</h1>
          <p className="tech-description">{technology.description}</p>
          
          <div className="status-section">
            <h3>Статус изучения</h3>
            <ProgressBar
              progress={getStatusProgress()}
              label={technology.status === 'completed' ? 'Завершено' : 
                     technology.status === 'in-progress' ? 'В процессе' : 'Не начато'}
              color={getStatusColor()}
              height={25}
              animated={true}
              showPercentage={true}
            />
            
            <div className="status-buttons">
              <button
                onClick={() => updateStatus('not-started')}
                className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
                style={{backgroundColor: '#F44336'}}
              >
                ⏳ Не начато
              </button>
              <button
                onClick={() => updateStatus('in-progress')}
                className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
                style={{backgroundColor: '#FF9800'}}
              >
                🔄 В процессе
              </button>
              <button
                onClick={() => updateStatus('completed')}
                className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
                style={{backgroundColor: '#4CAF50'}}
              >
                ✅ Завершено
              </button>
            </div>
          </div>
        </div>

        <div className="side-info">
          <div className="info-card">
            <h3>📊 Информация</h3>
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{technology.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Категория:</span>
              <span className="info-value">{technology.category}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Приоритет:</span>
              <span className={`info-value priority-${technology.priority}`}>
                {technology.priority}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Дата добавления:</span>
              <span className="info-value">
                {new Date().toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>

          <div className="notes-card">
            <h3>📝 Заметки</h3>
            {isEditing ? (
              <div className="notes-editor">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  placeholder="Добавьте заметки по этой технологии..."
                  rows="6"
                />
                <div className="editor-actions">
                  <button onClick={updateNotes} className="btn btn-primary">
                    💾 Сохранить
                  </button>
                  <button 
                    onClick={() => {
                      setEditedNotes(technology.notes || '');
                      setIsEditing(false);
                    }} 
                    className="btn btn-secondary"
                  >
                    ❌ Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="notes-content">
                {technology.notes ? (
                  <p>{technology.notes}</p>
                ) : (
                  <p className="no-notes">Заметок пока нет</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="related-actions">
        <h3>⚡ Быстрые действия</h3>
        <div className="action-buttons">
          <Link to="/add-technology" className="action-btn add-btn">
            ➕ Добавить новую технологию
          </Link>
          <Link to="/technologies" className="action-btn list-btn">
            📚 К списку технологий
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;