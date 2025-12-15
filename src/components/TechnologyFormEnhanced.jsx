import { useState, useEffect } from 'react';
import './TechnologyFormEnhanced.css';

function TechnologyFormEnhanced({ onSave, onCancel, initialData = {} }) {
    // состояние формы с начальными значениями или данными для редактирования
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources || ['']
    });

    // состояние для хранения ошибок валидации
    const [errors, setErrors] = useState({});

    // флаг валидности всей формы
    const [isFormValid, setIsFormValid] = useState(false);

    // состояния для отправки формы
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // функция проверки корректности URL
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // функция валидации всей формы
    const validateForm = () => {
        const newErrors = {};

        // валидация названия технологии
        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        // валидация описания
        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Описание не должно превышать 500 символов';
        }

        // валидация дедлайна (не должен быть в прошлом)
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // обнуляем время для сравнения только дат

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        // валидация URL-адресов ресурсов
        formData.resources.forEach((resource, index) => {
            if (resource.trim() && !isValidUrl(resource.trim())) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    // запуск валидации при каждом изменении formData
    useEffect(() => {
        validateForm();
    }, [formData]);

    // обработчик изменения обычных полей (input, select, textarea)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // обработчик изменения конкретного ресурса в массиве
    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({
            ...prev,
            resources: newResources
        }));
    };

    // добавление нового пустого поля для ресурса
    const addResourceField = () => {
        setFormData(prev => ({
            ...prev,
            resources: [...prev.resources, '']
        }));
    };

    // удаление поля ресурса по индексу (минимум одно поле должно остаться)
    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                resources: newResources
            }));
        }
    };

    // обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid && !isSubmitting) {
            setIsSubmitting(true);

            try {
                // очищаем пустые ресурсы перед сохранением
                const cleanedData = {
                    ...formData,
                    resources: formData.resources
                        .map(resource => resource.trim())
                        .filter(resource => resource !== '')
                };

                // Имитация асинхронной отправки
                await new Promise(resolve => setTimeout(resolve, 800));
                
                onSave(cleanedData);
                setSubmitSuccess(true);

                // Сброс формы после успешного сохранения
                if (!initialData.title) {
                    setFormData({
                        title: '',
                        description: '',
                        category: 'frontend',
                        difficulty: 'beginner',
                        deadline: '',
                        resources: ['']
                    });
                }

                // Скрываем сообщение об успехе через 3 секунды
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 3000);

            } catch (error) {
                console.error('Ошибка при сохранении:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // категории технологий
    const categories = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'database', label: 'База данных' },
        { value: 'devops', label: 'DevOps' },
        { value: 'mobile', label: 'Мобильная разработка' },
        { value: 'language', label: 'Язык программирования' },
        { value: 'tool', label: 'Инструмент' },
        { value: 'other', label: 'Другое' }
    ];

    // уровни сложности
    const difficulties = [
        { value: 'beginner', label: 'Начальный' },
        { value: 'intermediate', label: 'Средний' },
        { value: 'advanced', label: 'Продвинутый' }
    ];

    return (
        <div className="technology-form-enhanced">
            {/* область для скринридера - объявляет статус отправки */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && 'Отправка формы...'}
                {submitSuccess && 'Форма успешно сохранена!'}
            </div>

            <form onSubmit={handleSubmit} className="form-card" noValidate>
                <h2>{initialData.title ? '✏️ Редактирование технологии' : '➕ Добавление новой технологии'}</h2>

                {submitSuccess && (
                    <div className="success-message" role="alert">
                        ✅ Технология успешно {initialData.title ? 'обновлена' : 'добавлена'}!
                    </div>
                )}

                {/* поле названия */}
                <div className="form-group">
                    <label htmlFor="title" className="required">
                        Название технологии
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'error' : ''}`}
                        placeholder="Например: React, Node.js, Docker"
                        aria-required="true"
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? 'title-error' : undefined}
                        required
                        autoFocus={!initialData.title}
                    />
                    {errors.title && (
                        <span id="title-error" className="error-message" role="alert">
                            ⚠️ {errors.title}
                        </span>
                    )}
                </div>

                {/* поле описания */}
                <div className="form-group">
                    <label htmlFor="description" className="required">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`form-textarea ${errors.description ? 'error' : ''}`}
                        placeholder="Опишите, что это за технология, для чего используется, какие задачи решает..."
                        aria-required="true"
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                        required
                    />
                    <div className="char-counter">
                        {formData.description.length}/500 символов
                    </div>
                    {errors.description && (
                        <span id="description-error" className="error-message" role="alert">
                            ⚠️ {errors.description}
                        </span>
                    )}
                </div>

                <div className="form-row">
                    {/* выбор категории */}
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

                    {/* выбор сложности */}
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

                {/* дедлайн */}
                <div className="form-group">
                    <label htmlFor="deadline">Дедлайн (необязательно)</label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={`form-input ${errors.deadline ? 'error' : ''}`}
                        aria-invalid={!!errors.deadline}
                        aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.deadline && (
                        <span id="deadline-error" className="error-message" role="alert">
                            ⚠️ {errors.deadline}
                        </span>
                    )}
                </div>

                {/* список ресурсов для изучения */}
                <div className="form-group">
                    <label className="required">
                        Ресурсы для изучения
                        <span className="field-hint">(минимум один URL)</span>
                    </label>
                    
                    {formData.resources.map((resource, index) => (
                        <div key={index} className="resource-field">
                            <div className="resource-input-group">
                                <input
                                    type="url"
                                    value={resource}
                                    onChange={(e) => handleResourceChange(index, e.target.value)}
                                    placeholder="https://example.com"
                                    className={`form-input ${errors[`resource_${index}`] ? 'error' : ''}`}
                                    aria-required={index === 0}
                                    aria-invalid={!!errors[`resource_${index}`]}
                                    aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
                                    required={index === 0}
                                />
                                {formData.resources.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeResourceField(index)}
                                        className="btn-remove-resource"
                                        aria-label={`Удалить ресурс ${index + 1}`}
                                        title="Удалить поле"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            {errors[`resource_${index}`] && (
                                <span id={`resource-${index}-error`} className="error-message" role="alert">
                                    ⚠️ {errors[`resource_${index}`]}
                                </span>
                            )}
                        </div>
                    ))}
                    
                    <button
                        type="button"
                        onClick={addResourceField}
                        className="btn-add-resource"
                        aria-label="Добавить еще одно поле для ресурса"
                    >
                        + Добавить еще один ресурс
                    </button>
                    
                    <p className="form-hint">
                        Укажите ссылки на документацию, курсы, статьи или другие полезные материалы
                    </p>
                </div>

                {/* кнопки действий */}
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                    
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isFormValid || isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-small"></span>
                                Сохранение...
                            </>
                        ) : initialData.title ? 'Обновить' : 'Добавить'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TechnologyFormEnhanced;