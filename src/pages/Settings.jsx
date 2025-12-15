// src/pages/Settings.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'ru',
    notifications: true,
    autoSave: true,
    defaultCategory: 'frontend',
    defaultPriority: 'medium',
    showCompleted: true,
    exportFormat: 'json'
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('✅ Настройки сохранены!');
  };

  const resetSettings = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все настройки?')) {
      const defaultSettings = {
        theme: 'light',
        language: 'ru',
        notifications: true,
        autoSave: true,
        defaultCategory: 'frontend',
        defaultPriority: 'medium',
        showCompleted: true,
        exportFormat: 'json'
      };
      setSettings(defaultSettings);
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    }
  };

  const exportData = () => {
    const saved = localStorage.getItem('technologies');
    const data = {
      exportedAt: new Date().toISOString(),
      settings: settings,
      technologies: saved ? JSON.parse(saved) : []
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (data.technologies) {
          localStorage.setItem('technologies', JSON.stringify(data.technologies));
        }
        
        if (data.settings) {
          setSettings(data.settings);
          localStorage.setItem('appSettings', JSON.stringify(data.settings));
        }
        
        alert('✅ Данные успешно импортированы!');
        window.location.reload();
      } catch (error) {
        alert('❌ Ошибка при импорте файла. Проверьте формат.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ ВНИМАНИЕ! Это удалит ВСЕ технологии и настройки. Продолжить?')) {
      localStorage.clear();
      alert('🗑️ Все данные очищены');
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Настройки приложения</h1>
        <p>Настройте трекер технологий под свои нужды</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>🎨 Внешний вид</h3>
          
          <div className="form-group">
            <label htmlFor="theme">Тема оформления</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">🌞 Светлая</option>
              <option value="dark">🌙 Тёмная</option>
              <option value="auto">🔄 Авто</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="language">Язык интерфейса</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="ru">🇷🇺 Русский</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔔 Уведомления</h3>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">Включить уведомления</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoSave"
                checked={settings.autoSave}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">Автосохранение</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showCompleted"
                checked={settings.showCompleted}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">Показывать завершённые</span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>⚡ Настройки по умолчанию</h3>
          
          <div className="form-group">
            <label htmlFor="defaultCategory">Категория по умолчанию</label>
            <select
              id="defaultCategory"
              name="defaultCategory"
              value={settings.defaultCategory}
              onChange={handleChange}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Базы данных</option>
              <option value="devops">DevOps</option>
              <option value="tools">Инструменты</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="defaultPriority">Приоритет по умолчанию</label>
            <select
              id="defaultPriority"
              name="defaultPriority"
              value={settings.defaultPriority}
              onChange={handleChange}
            >
              <option value="high">🔥 Высокий</option>
              <option value="medium">⚡ Средний</option>
              <option value="low">🌱 Низкий</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exportFormat">Формат экспорта</label>
            <select
              id="exportFormat"
              name="exportFormat"
              value={settings.exportFormat}
              onChange={handleChange}
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="txt">TXT</option>
            </select>
          </div>
        </div>

        <div className="settings-section data-section">
          <h3>💾 Управление данными</h3>
          
          <div className="data-actions">
            <button onClick={exportData} className="btn btn-primary">
              📤 Экспорт всех данных
            </button>
            
            <label className="btn btn-secondary import-btn">
              📥 Импорт данных
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: 'none' }}
              />
            </label>
            
            <button onClick={clearAllData} className="btn btn-danger">
              🗑️ Очистить все данные
            </button>
          </div>
          
          <div className="data-info">
            <p><strong>Информация о данных:</strong></p>
            <p>• Технологий: {JSON.parse(localStorage.getItem('technologies') || '[]').length}</p>
            <p>• Настройки: {localStorage.getItem('appSettings') ? 'Сохранены' : 'По умолчанию'}</p>
            <p>• Объём: {Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB</p>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={saveSettings} className="btn btn-primary btn-lg">
          💾 Сохранить настройки
        </button>
        <button onClick={resetSettings} className="btn btn-secondary">
          ↩️ Сбросить настройки
        </button>
        <Link to="/" className="btn btn-outline">
          ← На главную
        </Link>
      </div>

      <div className="app-info">
        <h3>ℹ️ О приложении</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Версия:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Разработчик:</span>
            <span className="info-value">Трекер технологий</span>
          </div>
          <div className="info-item">
            <span className="info-label">Лицензия:</span>
            <span className="info-value">MIT</span>
          </div>
          <div className="info-item">
            <span className="info-label">Последнее обновление:</span>
            <span className="info-value">{new Date().toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;