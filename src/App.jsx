import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';
import Statistics from './components/Statistics';

function App() {
  // Начальное состояние технологий
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов, пропсов и состояния. Понимание жизненного цикла компонентов.', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями и условным рендерингом.', 
      status: 'completed' 
    },
    { 
      id: 3, 
      title: 'React Hooks', 
      description: 'Изучение useState, useEffect, useContext и создание кастомных хуков.', 
      status: 'in-progress' 
    },
    { 
      id: 4, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов, изучение Redux и Context API.', 
      status: 'in-progress' 
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Навигация между страницами в React-приложениях.', 
      status: 'not-started' 
    },
    { 
      id: 6, 
      title: 'Testing React Apps', 
      description: 'Написание тестов с использованием Jest и React Testing Library.', 
      status: 'not-started' 
    },
    { 
      id: 7, 
      title: 'Performance Optimization', 
      description: 'Оптимизация производительности React-приложений.', 
      status: 'not-started' 
    },
    { 
      id: 8, 
      title: 'Server-Side Rendering', 
      description: 'Изучение Next.js и принципов SSR для React.', 
      status: 'not-started' 
    }
  ]);

  // Состояние для активного фильтра
  const [activeFilter, setActiveFilter] = useState('all');

  // Функция для изменения статуса технологии
  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для отметки всех как выполненных
  const handleMarkAllCompleted = () => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для сброса всех статусов
  const handleResetAll = () => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Функция для случайного выбора технологии
  const handleRandomSelect = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started');
    if (notStartedTechs.length === 0) return;
    
    const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)];
    
    // Обновляем статус выбранной технологии на "in-progress"
    setTechnologies(prevTechs => 
      prevTechs.map(tech => 
        tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
      )
    );
    
    // Показываем уведомление
    alert(`🎯 Следующая технология для изучения: "${randomTech.title}"`);
  };

  // Фильтрация технологий в зависимости от активного фильтра
  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  // Сохранение прогресса в localStorage
  useEffect(() => {
    localStorage.setItem('technology-tracker-progress', JSON.stringify(technologies));
  }, [technologies]);

  // Загрузка прогресса из localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('technology-tracker-progress');
    if (savedProgress) {
      try {
        setTechnologies(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error);
      }
    }
  }, []);

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      
      <div className="controls-section">
        <QuickActions 
          technologies={technologies}
          onMarkAllCompleted={handleMarkAllCompleted}
          onResetAll={handleResetAll}
          onRandomSelect={handleRandomSelect}
        />
        
        <FilterTabs 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <Statistics technologies={technologies} />
      </div>
      
      <div className="technologies-container">
        <h2 className="section-title">
          {activeFilter === 'all' ? 'Все технологии' : 
           activeFilter === 'completed' ? 'Выполненные технологии' :
           activeFilter === 'in-progress' ? 'Технологии в процессе' :
           'Не начатые технологии'}
        </h2>
        <p className="section-subtitle">
          {filteredTechnologies.length} из {technologies.length} технологий
          {activeFilter !== 'all' && ` (фильтр: ${activeFilter})`}
        </p>
        
        <div className="technologies-grid">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
        
        {filteredTechnologies.length === 0 && (
          <div className="empty-state">
            <p>🤔 По выбранному фильтру ничего не найдено</p>
            <button 
              className="clear-filter-btn"
              onClick={() => setActiveFilter('all')}
            >
              Показать все технологии
            </button>
          </div>
        )}
      </div>
      
      <footer className="app-footer">
        <p>Трекер изучения технологий • React • {new Date().getFullYear()}</p>
        <p className="footer-note">
          Прогресс сохраняется автоматически • Всего изменений: {technologies.length * 3}
        </p>
      </footer>
    </div>
  );
}

export default App;