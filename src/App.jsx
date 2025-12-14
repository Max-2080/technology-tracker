import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
  // Тестовые данные (массив технологий)
  const [technologies] = useState([
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
      description: 'Оптимизация производительности React   приложений.', 
      status: 'not-started' 
    },
    { 
      id: 8, 
      title: 'Server-Side Rendering', 
      description: 'Изучение Next.js и принципов SSR для React.', 
      status: 'not-started' 
    }
  ]);

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      
      <div className="technologies-container">
        <h2 className="section-title">Дорожная карта технологий</h2>
        <p className="section-subtitle">
          Отметьте изученные технологии и отслеживайте свой прогресс
        </p>
        
        <div className="technologies-grid">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Трекер изучения технологий • React • {new Date().getFullYear()}</p>
        <p className="footer-note">
          Прогресс автоматически обновляется при изменении статуса технологий
        </p>
      </footer>
    </div>
  );
}

export default App;