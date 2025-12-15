import { useState } from 'react';
import './DataImportExport.css';

function DataImportExport({ technologies, onImport }) {
    const [status, setStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Экспорт данных в JSON-файл
    const exportToJSON = () => {
        try {
            if (technologies.length === 0) {
                setStatus('Нет данных для экспорта');
                setTimeout(() => setStatus(''), 3000);
                return;
            }

            // Преобразуем данные в JSON-строку с форматированием
            const dataStr = JSON.stringify(technologies, null, 2);

            // Создаем Blob объект из строки
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            // Создаем временную ссылку для скачивания
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

            // Программно кликаем по ссылке для начала скачивания
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Освобождаем память
            URL.revokeObjectURL(url);

            setStatus(`✅ Экспортировано ${technologies.length} технологий`);
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('❌ Ошибка экспорта данных');
            console.error('Ошибка экспорта:', error);
        }
    };

    // Импорт данных из JSON-файла
    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        // Обработчик завершения чтения файла
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);

                // Проверка что импортированные данные - это массив
                if (!Array.isArray(imported)) {
                    throw new Error('Неверный формат данных');
                }

                // Дополнительная валидация структуры данных
                const validTechnologies = imported.filter(tech => 
                    tech && typeof tech === 'object' && tech.title
                );

                if (validTechnologies.length === 0) {
                    throw new Error('В файле нет валидных данных о технологиях');
                }

                onImport(validTechnologies);
                setStatus(`✅ Импортировано ${validTechnologies.length} технологий`);
                setTimeout(() => setStatus(''), 3000);
            } catch (error) {
                setStatus('❌ Ошибка импорта: неверный формат файла');
                console.error('Ошибка импорта:', error);
            }
        };

        // Запускаем асинхронное чтение файла как текста
        reader.readAsText(file);

        // Сбрасываем значение input для возможности повторного импорта того же файла
        event.target.value = '';
    };

    // Обработчики drag-and-drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            // Используем ту же логику чтения что и в importFromJSON
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (Array.isArray(imported)) {
                        const validTechnologies = imported.filter(tech => 
                            tech && typeof tech === 'object' && tech.title
                        );
                        
                        onImport(validTechnologies);
                        setStatus(`✅ Импортировано ${validTechnologies.length} технологий`);
                        setTimeout(() => setStatus(''), 3000);
                    }
                } catch (error) {
                    setStatus('❌ Ошибка импорта: неверный формат файла');
                }
            };
            reader.readAsText(file);
        } else {
            setStatus('❌ Пожалуйста, выберите JSON-файл');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    // Сохранение в localStorage
    const saveToLocalStorage = () => {
        try {
            localStorage.setItem('technology_tracker_data', JSON.stringify(technologies));
            setStatus('✅ Данные сохранены в localStorage');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('❌ Ошибка сохранения данных');
            console.error('Ошибка сохранения:', error);
        }
    };

    // Загрузка из localStorage
    const loadFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('technology_tracker_data');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    onImport(parsed);
                    setStatus('✅ Данные загружены из localStorage');
                    setTimeout(() => setStatus(''), 3000);
                } else {
                    setStatus('❌ Некорректные данные в localStorage');
                }
            } else {
                setStatus('ℹ️ Нет сохраненных данных в localStorage');
                setTimeout(() => setStatus(''), 3000);
            }
        } catch (error) {
            setStatus('❌ Ошибка загрузки данных из localStorage');
            console.error('Ошибка загрузки:', error);
        }
    };

    // Очистка localStorage
    const clearLocalStorage = () => {
        if (window.confirm('Вы уверены, что хотите удалить все сохраненные данные?')) {
            localStorage.removeItem('technology_tracker_data');
            setStatus('🗑️ Данные удалены из localStorage');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div className="data-import-export">
            <h3>📁 Импорт и экспорт данных</h3>
            
            {/* Статусное сообщение */}
            {status && (
                <div className={`status-message ${status.includes('✅') ? 'success' : status.includes('❌') ? 'error' : 'info'}`}>
                    {status}
                </div>
            )}

            {/* Элементы управления */}
            <div className="controls-grid">
                <button 
                    onClick={exportToJSON} 
                    disabled={technologies.length === 0}
                    className="control-btn export-btn"
                    aria-label="Экспорт данных в JSON файл"
                >
                    📥 Экспорт в JSON
                    <span className="btn-hint">({technologies.length} записей)</span>
                </button>

                <label className="control-btn import-btn">
                    📤 Импорт из JSON
                    <input
                        type="file"
                        accept=".json"
                        onChange={importFromJSON}
                        aria-label="Импорт данных из JSON файла"
                    />
                </label>

                <button 
                    onClick={saveToLocalStorage} 
                    disabled={technologies.length === 0}
                    className="control-btn save-btn"
                    aria-label="Сохранить данные в браузере"
                >
                    💾 Сохранить
                </button>

                <button 
                    onClick={loadFromLocalStorage}
                    className="control-btn load-btn"
                    aria-label="Загрузить данные из браузера"
                >
                    📂 Загрузить
                </button>

                <button 
                    onClick={clearLocalStorage}
                    className="control-btn clear-btn"
                    aria-label="Очистить сохраненные данные"
                >
                    🗑️ Очистить
                </button>
            </div>

            {/* Область drag-and-drop */}
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                aria-label="Перетащите JSON-файл для импорта"
            >
                <div className="drop-zone-content">
                    <div className="drop-icon">📂</div>
                    <p className="drop-text">Перетащите JSON-файл сюда</p>
                    <p className="drop-hint">или нажмите "Импорт из JSON"</p>
                </div>
            </div>

            {/* Информация о формате */}
            <div className="format-info">
                <h4>Формат данных</h4>
                <p>Файл должен содержать массив объектов в формате JSON:</p>
                <pre className="code-example">
{`[
  {
    "title": "React",
    "description": "JavaScript библиотека",
    "category": "frontend",
    "difficulty": "intermediate",
    "resources": ["https://react.dev"]
  }
]`}
                </pre>
            </div>
        </div>
    );
}

export default DataImportExport;