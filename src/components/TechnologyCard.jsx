import { useState } from 'react';
import TechnologyResources from './TechnologyResources';
import './TechnologyCard.css';

function TechnologyCard({ technology, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...technology });

    const handleStudyToggle = () => {
        onUpdate(technology.id, { isStudied: !technology.isStudied });
    };

    const handleDelete = () => {
        if (window.confirm(`Удалить технологию "${technology.title}"?`)) {
            onDelete(technology.id);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdate(technology.id, editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...technology });
        setIsEditing(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    return (
        <div className={`technology-card card ${technology.isStudied ? 'studied' : ''}`}>
            <div className="technology-card-header">
                {isEditing ? (
                    <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="edit-input"
                        autoFocus
                    />
                ) : (
                    <h3 className="technology-title">{technology.title}</h3>
                )}
                
                <div className="technology-actions">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="btn-icon save" title="Сохранить">
                                💾
                            </button>
                            <button onClick={handleCancel} className="btn-icon cancel" title="Отмена">
                                ✖
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit} className="btn-icon edit" title="Редактировать">
                                ✏️
                            </button>
                            <button onClick={handleDelete} className="btn-icon delete" title="Удалить">
                                🗑️
                            </button>
                        </>
                    )}
                </div>
            </div>

            <span className={`badge ${technology.category}`}>
                {technology.category}
            </span>

            {isEditing ? (
                <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="edit-textarea"
                    rows="3"
                />
            ) : (
                <p className="technology-description">{technology.description}</p>
            )}

            <div className="technology-details">
                <span className={`technology-difficulty ${technology.difficulty}`}>
                    Сложность: {technology.difficulty === 'beginner' ? 'Начинающий' : 
                              technology.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                </span>
                
                {technology.createdAt && (
                    <span className="technology-date">
                        Добавлено: {formatDate(technology.createdAt)}
                    </span>
                )}
            </div>

            {technology.resources && technology.resources.length > 0 && (
                <div className="technology-resources-list">
                    <h4>Ресурсы:</h4>
                    <ul>
                        {technology.resources.map((resource, index) => (
                            <li key={index}>
                                <a 
                                    href={resource} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    🔗 {resource}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <TechnologyResources 
                techId={technology.id} 
                techTitle={technology.title} 
            />

            <div className="technology-footer">
                <div className="study-toggle">
                    <span className="toggle-label">
                        {technology.isStudied ? 'Изучено ✅' : 'В процессе изучения'}
                    </span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={technology.isStudied}
                            onChange={handleStudyToggle}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="card-actions">
                    <button 
                        onClick={handleStudyToggle}
                        className={`btn btn-small ${technology.isStudied ? 'btn-secondary' : 'btn-success'}`}
                    >
                        {technology.isStudied ? 'Отметить не изученным' : 'Отметить изученным'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TechnologyCard;