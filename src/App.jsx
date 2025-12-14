import { useState, useEffect } from 'react';
import './App.css';
import TechList from './TechList';
import SearchBar from './SearchBar';

function App() {
  // Инициализируем начальные технологии с полем notes
  const initialTechnologies = [
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      notes: ''
    },
    {
      id: 2,
      title: 'React State & Props',
      description: 'Работа с состоянием и свойствами',
      status: 'in-progress',
      notes: ''
    },
    {
      id: 3,
      title: 'React Hooks',
      description: 'Использование хуков (useState, useEffect)',
      status: 'completed',
      notes: ''
    },
    {
      id: 4,
      title: 'React Router',
      description: 'Маршрутизация в React-приложениях',
      status: 'not-started',
      notes: ''
    },
    {
      id: 5,
      title: 'API Integration',
      description: 'Работа с внешними API в React',
      status: 'in-progress',
      notes: ''
    }
  ];

  // Загружаем данные из localStorage или используем начальные
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    return saved ? JSON.parse(saved) : initialTechnologies;
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Сохраняем технологии в localStorage при любом изменении
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  // Функция для обновления статуса
  const updateTechnologyStatus = (techId, newStatus) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для обновления заметок
  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Фильтрация технологий по поисковому запросу
  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте прогресс в изучении технологий</p>
      </header>
      
      <main className="app-main">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={filteredTechnologies.length}
          totalCount={technologies.length}
        />
        
        <TechList 
          technologies={filteredTechnologies}
          onStatusChange={updateTechnologyStatus}
          onNotesChange={updateTechnologyNotes}
        />
        
        <div className="app-info">
          <p>Всего технологий: {technologies.length} | Найдено: {filteredTechnologies.length}</p>
          <p className="localstorage-info">
            💾 Данные автоматически сохраняются в localStorage
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;