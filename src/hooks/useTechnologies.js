import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'in-progress',
    notes: 'Изучаю модули и асинхронность',
    category: 'backend',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'HTML & CSS',
    description: 'Верстка современных интерфейсов',
    status: 'completed',
    notes: 'Прошел курс по адаптивной верстке',
    category: 'frontend',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Express.js',
    description: 'Создание REST API',
    status: 'not-started',
    notes: '',
    category: 'backend',
    priority: 'high'
  },
  {
    id: 5,
    title: 'Git & GitHub',
    description: 'Система контроля версий',
    status: 'completed',
    notes: 'Освоил основные команды и ветвление',
    category: 'tools',
    priority: 'medium'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const addTechnology = (newTech) => {
    const newId = Math.max(...technologies.map(t => t.id)) + 1;
    setTechnologies(prev => [...prev, { ...newTech, id: newId }]);
  };

  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    markAllCompleted,
    resetAllStatuses,
    progress: calculateProgress()
  };
}

export default useTechnologies;