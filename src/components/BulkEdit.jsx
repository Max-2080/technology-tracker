import { useState } from 'react';
import './BulkEdit.css';

function BulkEdit({ technologies, onUpdate }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [updates, setUpdates] = useState({
        category: '',
        difficulty: '',
        isStudied: '',
        deadline: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // Обработчик выбора технологии
    const handleSelectTech = (id) => {
        setSelectedTech(prev =>
            prev.includes(id)
                ? prev.filter(techId => techId !== id)
                : [...prev, id]
        );
    };

    // Выделить все технологии
    const handleSelectAll = () => {
        if (selectedTech.length === technologies.length) {
            setSelectedTech([]);
        } else {
            setSelectedTech(technologies.map(tech => tech.id));
        }
    };

    // Обработчик изменения полей обновления
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdates(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Применение обновлений к выбранным технологиям
    const applyUpdates = () => {
        if (selectedTech.length === 0) {
            alert('Выберите хотя бы одну технологию');
            return;
        }

        const updatesToApply = {};
        if (updates.category) updatesToApply.category = updates.category;
        if (updates.difficulty) updatesToApply.difficulty = updates.difficulty;
        if (updates.isStudied !== '') updatesToApply.isStudied = updates.isStudied === 'true';
        if (updates.deadline) updatesToApply.deadline = updates.deadline;

        if (Object.keys(updatesToApply).length === 0) {
            alert('Выберите хотя бы одно поле для обновления');
            return;
        }

        // Применяем обновления к каждой выбранной технологии
        selectedTech.forEach(techId => {
            onUpdate(techId, updatesToApply);
        });

        // Сброс формы
        setSelectedTech([]);
        setUpdates({
            category: '',
            difficulty: '',
            isStudied: '',
            deadline: ''
        });
        setIsEditing(false);

        alert(`Обновлено ${selectedTech.length} технологий`);
    };

    // Категории
    const categories = [
        { value: '', label: 'Не изменять' },
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'database', label: 'База данных' },
        { value: 'devops', label: 'DevOps' },
        { value: 'mobile', label: 'Мобильная разработка' },
        { value: 'language', label: 'Язык программирования' },
        { value: 'tool', label: 'Инструмент' },
        { value: 'other', label: 'Другое' }
    ];

    // Уровни сложности
    const difficulties = [
        { value: '', label: 'Не изменять' },
        { value: 'beginner', label: 'Начальный' },
        { value: 'intermediate', label: 'Средний' },
        { value: 'advanced', label: 'Продвинутый' }
    ];

    // Статусы изучения
    const studyStatuses = [
        { value: '', label: 'Не изменять' },
        { value: 'true', label: 'Изучено' },
        { value: 'false', label: 'Не изучено' }
    ];

    return (
        <div className="bulk-edit">
            <div className="bulk-edit-header">
                <h3>⚡ Массовое редактирование</h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="toggle-btn"
                    aria-expanded={isEditing}
                    aria-controls="bulk-edit-form"
                >
                    {isEditing ? 'Скрыть' : 'Показать'}
                </button>
            </div>

            {isEditing && (
                <div id="bulk-edit-form" className="bulk-edit-form">
                    {/* Информация о выборе */}
                    <div className="selection-info">
                        <div className="selection-stats">
                            <span className="stat">
                                Всего технологий: <strong>{technologies.length}</strong>
                            </span>
                            <span className="stat">
                                Выбрано: <strong>{selectedTech.length}</strong>
                            </span>
                            <button
                                onClick={handleSelectAll}
                                className="select-all-btn"
                                aria-label={selectedTech.length === technologies.length ? 'Снять выделение со всех' : 'Выделить все технологии'}
                            >
                                {selectedTech.length === technologies.length ? 'Снять выделение' : 'Выделить все'}
                            </button>
                        </div>

                        {selectedTech.length > 0 && (
                            <div className="selected-list">
                                <p>Выбраны:</p>
                                <div className="selected-techs">
                                    {technologies
                                        .filter(tech => selectedTech.includes(tech.id))
                                        .map(tech => (
                                            <span key={tech.id} className="tech-tag">
                                                {tech.title}
                                                <button
                                                    onClick={() => handleSelectTech(tech.id)}
                                                    className="remove-tag"
                                                    aria-label={`Убрать ${tech.title} из выбранных`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Форма обновлений */}
                    <div className="updates-form">
                        <h4>Применить изменения ко всем выбранным:</h4>
                        
                        <div className="update-fields">
                            <div className="update-field">
                                <label htmlFor="bulk-category">Категория</label>
                                <select
                                    id="bulk-category"
                                    name="category"
                                    value={updates.category}
                                    onChange={handleUpdateChange}
                                    className="form-select"
                                    aria-label="Выберите новую категорию для выбранных технологий"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="update-field">
                                <label htmlFor="bulk-difficulty">Сложность</label>
                                <select
                                    id="bulk-difficulty"
                                    name="difficulty"
                                    value={updates.difficulty}
                                    onChange={handleUpdateChange}
                                    className="form-select"
                                    aria-label="Выберите новый уровень сложности для выбранных технологий"
                                >
                                    {difficulties.map(diff => (
                                        <option key={diff.value} value={diff.value}>
                                            {diff.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="update-field">
                                <label htmlFor="bulk-studied">Статус изучения</label>
                                <select
                                    id="bulk-studied"
                                    name="isStudied"
                                    value={updates.isStudied}
                                    onChange={handleUpdateChange}
                                    className="form-select"
                                    aria-label="Выберите новый статус изучения для выбранных технологий"
                                >
                                    {studyStatuses.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="update-field">
                                <label htmlFor="bulk-deadline">Дедлайн</label>
                                <input
                                    id="bulk-deadline"
                                    name="deadline"
                                    type="date"
                                    value={updates.deadline}
                                    onChange={handleUpdateChange}
                                    className="form-input"
                                    aria-label="Установить дедлайн для выбранных технологий"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="bulk-actions">
                            <button
                                onClick={() => {
                                    setSelectedTech([]);
                                    setUpdates({
                                        category: '',
                                        difficulty: '',
                                        isStudied: '',
                                        deadline: ''
                                    });
                                }}
                                className="btn btn-secondary"
                                aria-label="Очистить все выбранные технологии и настройки"
                            >
                                Очистить
                            </button>
                            
                            <button
                                onClick={applyUpdates}
                                disabled={selectedTech.length === 0}
                                className="btn btn-primary"
                                aria-label={`Применить изменения к ${selectedTech.length} выбранным технологиям`}
                            >
                                Применить к {selectedTech.length} выбранным
                            </button>
                        </div>
                    </div>

                    {/* Список технологий для выбора */}
                    <div className="tech-list">
                        <h4>Выберите технологии:</h4>
                        <div className="tech-checkboxes">
                            {technologies.map(tech => (
                                <div key={tech.id} className="tech-checkbox-item">
                                    <input
                                        type="checkbox"
                                        id={`tech-${tech.id}`}
                                        checked={selectedTech.includes(tech.id)}
                                        onChange={() => handleSelectTech(tech.id)}
                                        className="tech-checkbox"
                                        aria-label={`Выбрать технологию ${tech.title}`}
                                    />
                                    <label htmlFor={`tech-${tech.id}`} className="tech-label">
                                        <span className="tech-name">{tech.title}</span>
                                        <span className={`tech-category ${tech.category}`}>
                                            {tech.category}
                                        </span>
                                        <span className={`tech-status ${tech.isStudied ? 'studied' : 'not-studied'}`}>
                                            {tech.isStudied ? '✅' : '📚'}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BulkEdit;