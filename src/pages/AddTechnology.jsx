// src/pages/AddTechnology.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    priority: 'medium',
    status: 'not-started',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Получаем существующие технологии
    const saved = localStorage.getItem('technologies');
    const existing = saved ? JSON.parse(saved) : [];
    
    // Создаем новую технологию
    const newTech = {
      ...formData,
      id: existing.length > 0 ? Math.max(...existing.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };
    
    // Сохраняем в localStorage
    localStorage.setItem('technologies', JSON.stringify([...existing, newTech]));
    
    // Показываем уведомление и перенаправляем
    alert('✅ Технология успешно добавлена!');
    navigate(`/technology/${newTech.id}`);
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>➕ Добавить новую технологию</h1>
        <p>Заполните форму для добавления технологии в трекер</p>
      </div>

      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-section">
          <h3>📝 Основная информация</h3>
          
          <div className="form-group">
            <label htmlFor="title">Название технологии *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: React Hooks, Node.js Express, MongoDB"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опишите что это за технология и что вы планируете изучить..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Категория *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Базы данных</option>
                <option value="devops">DevOps</option>
                <option value="tools">Инструменты</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Приоритет изучения *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="high">🔥 Высокий</option>
                <option value="medium">⚡ Средний</option>
                <option value="low">🌱 Низкий</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>📊 Статус изучения</h3>
          
          <div className="status-options">
            <label className="status-option">
              <input
                type="radio"
                name="status"
                value="not-started"
                checked={formData.status === 'not-started'}
                onChange={handleChange}
              />
              <div className="status-card">
                <span className="status-icon">⏳</span>
                <span className="status-title">Не начато</span>
                <span className="status-desc">Ещё не приступал к изучению</span>
              </div>
            </label>

            <label className="status-option">
              <input
                type="radio"
                name="status"
                value="in-progress"
                checked={formData.status === 'in-progress'}
                onChange={handleChange}
              />
              <div className="status-card">
                <span className="status-icon">🔄</span>
                <span className="status-title">В процессе</span>
                <span className="status-desc">Сейчас активно изучаю</span>
              </div>
            </label>

            <label className="status-option">
              <input
                type="radio"
                name="status"
                value="completed"
                checked={formData.status === 'completed'}
                onChange={handleChange}
              />
              <div className="status-card">
                <span className="status-icon">✅</span>
                <span className="status-title">Завершено</span>
                <span className="status-desc">Успешно изучил технологию</span>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>📝 Дополнительные заметки</h3>
          
          <div className="form-group">
            <label htmlFor="notes">Ваши заметки</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Добавьте любые заметки, ссылки на ресурсы, план изучения..."
              rows="5"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-lg">
            💾 Сохранить технологию
          </button>
          <Link to="/technologies" className="btn btn-secondary">
            ❌ Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;