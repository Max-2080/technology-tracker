import { useState } from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import RoadmapImporter from './components/RoadmapImporter';
import TechnologySearch from './components/TechnologySearch';
import TechnologyCard from './components/TechnologyCard';
import TechnologyForm from './components/TechnologyForm';
import './App.css';

function App() {
    const { technologies, loading, error, refetch, addTechnology, deleteTechnology, updateTechnology } = useTechnologiesApi();
    const [showForm, setShowForm] = useState(false);

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
            <header className="app-header">
                <h1>🧠 Трекер изучения технологий</h1>
                <div className="header-actions">
                    <button onClick={refetch} className="btn btn-secondary">
                        Обновить
                    </button>
                    <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                        {showForm ? '✖ Закрыть форму' : '➕ Добавить технологию'}
                    </button>
                </div>
            </header>

            {error && (
                <div className="app-error card">
                    <p>❌ {error}</p>
                    <button onClick={refetch} className="btn btn-small">
                        Попробовать снова
                    </button>
                </div>
            )}

            <main className="app-main">
                <div className="sidebar">
                    <RoadmapImporter />
                    <TechnologySearch />
                </div>

                <div className="content">
                    {showForm && (
                        <TechnologyForm
                            onSubmit={addTechnology}
                            onCancel={() => setShowForm(false)}
                        />
                    )}

                    <div className="technologies-header">
                        <h2>📚 Список технологий ({technologies.length})</h2>
                        <div className="stats">
                            <span className="stat">
                                Изучено: {technologies.filter(t => t.isStudied).length}
                            </span>
                            <span className="stat">
                                В процессе: {technologies.filter(t => !t.isStudied).length}
                            </span>
                        </div>
                    </div>

                    <div className="technologies-grid">
                        {technologies.map(tech => (
                            <TechnologyCard
                                key={tech.id}
                                technology={tech}
                                onDelete={deleteTechnology}
                                onUpdate={updateTechnology}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <p>© 2024 Трекер изучения технологий. Используется для учебных целей.</p>
            </footer>
        </div>
    );
}

export default App;