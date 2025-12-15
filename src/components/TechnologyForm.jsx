import { useState } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend',
        difficulty: 'beginner',
        resources: ''
    });

    const categories = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'language', label: 'Язык программирования' },
        { value: 'database', label: 'База данных' },
        { value: 'tool', label: 'Инструмент' },
        { value: 'framework', label: 'Фреймворк' },
        { value: 'devops', label: 'DevOps' },
        { value: 'other', label: 'Другое' }
    ];

    const difficulties = [
        { value: 'beginner', label: 'Начинающий' },
        { value: 'intermediate', label: 'Средний' },
        { value: 'advanced', label: 'Продвинутый' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Преобразуем строку ресурсов в массив
        const resourcesArray = formData.resources
            .split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0);

        const techData = {
            ...formData,
            resources: resourcesArray
        };

        onSubmit(techData);
        
        // Сброс формы
        setFormData({
            title: '',
            description: '',
            category: 'frontend',
            difficulty: 'beginner',
            resources: ''
        });
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            category: 'frontend',
            difficulty: 'beginner',
            resources: ''
        });
    };

    return (
        <div className="technology-form card">
            <h2>➕ Добавить новую технологию</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название технологии *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Например: React, Node.js, Docker"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Краткое описание технологии..."
                        rows="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category">Категория</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-select"
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="difficulty">Уровень сложности</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="form-select"
                        >
                            {difficulties.map(diff => (
                                <option key={diff.value} value={diff.value}>
                                    {diff.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="resources">Ресурсы для изучения</label>
                    <textarea
                        id="resources"
                        name="resources"
                        value={formData.resources}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Ссылки на ресурсы (каждая с новой строки):&#10;https://react.dev&#10;https://ru.reactjs.org"
                        rows="4"
                    />
                    <small className="form-help">
                        Введите ссылки, разделяя их переносами строк
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                    >
                        Отмена
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-secondary"
                    >
                        Сбросить
                    </button>
                    
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Добавить технологию
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TechnologyForm;