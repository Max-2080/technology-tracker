import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function RoadmapImporter() {
    const { addTechnology } = useTechnologiesApi();
    const [importing, setImporting] = useState(false);
    const [roadmapUrl, setRoadmapUrl] = useState('');

    const handleImportRoadmap = async (url) => {
        try {
            setImporting(true);

            // Имитация загрузки дорожной карты из API
            // В реальном проекте здесь будет реальный fetch
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Мок-данные дорожной карты
            const mockRoadmapData = {
                technologies: [
                    {
                        title: 'Vue.js',
                        description: 'Прогрессивный JavaScript-фреймворк',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://vuejs.org']
                    },
                    {
                        title: 'Express.js',
                        description: 'Фреймворк для Node.js',
                        category: 'backend',
                        difficulty: 'intermediate',
                        resources: ['https://expressjs.com']
                    }
                ]
            };

            // Добавляем каждую технологию из дорожной карты
            for (const tech of mockRoadmapData.technologies) {
                await addTechnology(tech);
            }

            alert(`Успешно импортировано ${mockRoadmapData.technologies.length} технологий`);
            setRoadmapUrl('');
        } catch (err) {
            alert(`Ошибка импорта: ${err.message}`);
        } finally {
            setImporting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roadmapUrl.trim()) {
            handleImportRoadmap(roadmapUrl);
        }
    };

    return (
        <div className="roadmap-importer card">
            <h3>📥 Импорт дорожной карты</h3>
            <p className="text-muted">Добавьте технологии из внешнего источника (мок-пример)</p>

            <form onSubmit={handleSubmit} className="import-form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="URL дорожной карты (мок)"
                        value={roadmapUrl}
                        onChange={(e) => setRoadmapUrl(e.target.value)}
                        className="form-input"
                        disabled={importing}
                    />
                    <button
                        type="submit"
                        disabled={importing || !roadmapUrl.trim()}
                        className="btn btn-primary"
                    >
                        {importing ? 'Импорт...' : 'Импорт'}
                    </button>
                </div>
            </form>

            <div className="example-import">
                <p>Или используйте пример:</p>
                <button
                    onClick={() => handleImportRoadmap('https://api.example.com/roadmaps/frontend')}
                    disabled={importing}
                    className="btn btn-secondary"
                >
                    {importing ? 'Импорт...' : 'Импорт пример (Vue + Express)'}
                </button>
            </div>
        </div>
    );
}

export default RoadmapImporter;