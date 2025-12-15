import { useState } from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import TechnologyFormEnhanced from './components/TechnologyFormEnhanced';
import TechnologySearch from './components/TechnologySearch';
import TechnologyCard from './components/TechnologyCard';
import DataImportExport from './components/DataImportExport';
import BulkEdit from './components/BulkEdit';
import RoadmapImporter from './components/RoadmapImporter';
import './App.css';

function App() {
    const { 
        technologies, 
        loading, 
        error, 
        refetch, 
        addTechnology, 
        deleteTechnology, 
        updateTechnology 
    } = useTechnologiesApi();
    
    const [showForm, setShowForm] = useState(false);
    const [editingTech, setEditingTech] = useState(null);

    // Обработчик сохранения технологии
    const handleSaveTechnology = (techData) => {
        if (editingTech) {
            updateTechnology(editingTech.id, techData);
            setEditingTech(null);
        } else {
            addTechnology(techData);
        }
        setShowForm(false);
    };

    // Обработчик редактирования технологии
    const handleEditTech = (tech) => {
        setEditingTech(tech);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Обработчик отмены формы
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingTech(null);
    };

    // Обработчик импорта данных
    const handleImportData = (importedData) => {
        // Заменяем текущие данные импортированными
        // В реальном приложении здесь была бы логика объединения или замены
        importedData.forEach(tech => {
            if (!technologies.find(t => t.id === tech.id)) {
                addTechnology(tech);
            }
        });
    };

    // Статистика
    const studiedCount = technologies.filter(t => t.isStudied).length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? Math.round((studiedCount / totalCount) * 100) : 0;

    // Технологии с истекшим дедлайном
    const overdueTechs = technologies.filter(tech => {
        if (!tech.deadline) return false;
        const deadlineDate = new Date(tech.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return deadlineDate < today && !tech.isStudied;
    });

    if (loading) {
        return (
            <div className="app-loading">
                <div className="spinner"></div>
                <p>Загрузка технологий...</p>
            </div>
        );
    }

    return (
        <div className="app">
            {/* Заголовок приложения */}
            <header className="app-header">
                <div className="header-content">
                    <h1>
                        <span role="img" aria-label="мозг">🧠</span> Трекер изучения технологий
                    </h1>
                    <div className="header-stats">
                        <div className="stat-item">
                            <span className="stat-label">Изучено:</span>
                            <span className="stat-value studied">{studiedCount}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Всего:</span>
                            <span className="stat-value total">{totalCount}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Прогресс:</span>
                            <span className="stat-value progress">{progressPercentage}%</span>
                        </div>
                    </div>
                </div>
                
                <div className="header-actions">
                    <button 
                        onClick={refetch} 
                        className="btn btn-secondary"
                        aria-label="Обновить список технологий"
                    >
                        🔄 Обновить
                    </button>
                    <button 
                        onClick={() => {
                            setEditingTech(null);
                            setShowForm(!showForm);
                        }} 
                        className="btn btn-primary"
                        aria-label={showForm ? 'Закрыть форму добавления' : 'Добавить новую технологию'}
                    >
                        {showForm ? '✖ Закрыть' : '➕ Добавить'}
                    </button>
                </div>
            </header>

            {/* Область статуса для скринридеров */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {error && `Ошибка: ${error}`}
                {loading && 'Загрузка данных...'}
                {!loading && !error && `Загружено ${technologies.length} технологий`}
            </div>

            {/* Основное содержимое */}
            <main className="app-main">
                {/* Боковая панель */}
                <aside className="sidebar">
                    <DataImportExport 
                        technologies={technologies}
                        onImport={handleImportData}
                    />
                    
                    <RoadmapImporter />
                    
                    <TechnologySearch />
                    
                    <BulkEdit 
                        technologies={technologies}
                        onUpdate={updateTechnology}
                    />
                    
                    {/* Статистика и предупреждения */}
                    {overdueTechs.length > 0 && (
                        <div className="overdue-warning">
                            <h4>⚠️ Просроченные дедлайны</h4>
                            <p>Следующие технологии требуют внимания:</p>
                            <ul className="overdue-list">
                                {overdueTechs.map(tech => (
                                    <li key={tech.id}>
                                        <strong>{tech.title}</strong>
                                        <span>до {new Date(tech.deadline).toLocaleDateString('ru-RU')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                {/* Основной контент */}
                <div className="content">
                    {/* Форма (если открыта) */}
                    {showForm && (
                        <TechnologyFormEnhanced
                            onSave={handleSaveTechnology}
                            onCancel={handleCancelForm}
                            initialData={editingTech || {}}
                        />
                    )}

                    {/* Заголовок и управление списком */}
                    <div className="content-header">
                        <h2>
                            <span role="img" aria-label="книги">📚</span> Мои технологии
                            <span className="count-badge">{technologies.length}</span>
                        </h2>
                        
                        <div className="content-filters">
                            <div className="filter-tabs">
                                <button className="filter-tab active">Все</button>
                                <button className="filter-tab">Изученные ({studiedCount})</button>
                                <button className="filter-tab">В процессе ({totalCount - studiedCount})</button>
                            </div>
                            
                            <div className="sort-controls">
                                <label htmlFor="sort-by">Сортировать:</label>
                                <select id="sort-by" className="sort-select">
                                    <option value="title">По названию</option>
                                    <option value="deadline">По дедлайну</option>
                                    <option value="difficulty">По сложности</option>
                                    <option value="category">По категории</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Список технологий */}
                    {technologies.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📚</div>
                            <h3>Пока нет технологий</h3>
                            <p>Добавьте свою первую технологию для отслеживания прогресса изучения</p>
                            <button 
                                onClick={() => setShowForm(true)} 
                                className="btn btn-primary"
                            >
                                ➕ Добавить первую технологию
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Прогресс бар */}
                            <div className="progress-container">
                                <div className="progress-header">
                                    <span>Общий прогресс изучения</span>
                                    <span>{progressPercentage}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${progressPercentage}%` }}
                                        aria-valuenow={progressPercentage}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        role="progressbar"
                                    ></div>
                                </div>
                                <div className="progress-stats">
                                    <span className="studied-count">
                                        <span className="stat-dot studied"></span>
                                        Изучено: {studiedCount}
                                    </span>
                                    <span className="remaining-count">
                                        <span className="stat-dot remaining"></span>
                                        Осталось: {totalCount - studiedCount}
                                    </span>
                                </div>
                            </div>

                            {/* Сетка карточек */}
                            <div className="technologies-grid">
                                {technologies.map(tech => (
                                    <TechnologyCard
                                        key={tech.id}
                                        technology={tech}
                                        onDelete={deleteTechnology}
                                        onUpdate={updateTechnology}
                                        onEdit={handleEditTech}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Футер */}
            <footer className="app-footer">
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} Трекер изучения технологий</p>
                    <p className="footer-info">
                        Для учебных целей | React | Доступность | Валидация форм
                    </p>
                    <div className="footer-links">
                        <button 
                            className="footer-link"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Вернуться к началу страницы"
                        >
                            ↑ Наверх
                        </button>
                        <span className="footer-separator">•</span>
                        <button 
                            className="footer-link"
                            onClick={() => window.print()}
                            aria-label="Распечатать страницу"
                        >
                            🖨️ Печать
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;