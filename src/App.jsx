import React, { useState, useEffect } from 'react';
import { Container, Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Импорт наших компонентов
import { CustomThemeProvider, useThemeContext } from './components/ui/ThemeContext';
import { NotificationProvider, useNotification } from './components/ui/NotificationProvider';
import TechnologyStack from './components/TechnologyStack';
import Dashboard from './components/Dashboard';

// Компонент для переключения темы (можно вынести отдельно)
function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();
  
  return (
    <IconButton 
      onClick={toggleTheme} 
      color="inherit"
      aria-label={`Переключить на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
      sx={{ ml: 2 }}
    >
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}

// Компонент заголовка приложения
function AppHeader() {
  const { mode } = useThemeContext();
  const [title, setTitle] = useState('Управление технологиями');
  
  // Пример изменения заголовка в зависимости от темы
  useEffect(() => {
    if (mode === 'dark') {
      setTitle('Технологии (Ночной режим)');
    } else {
      setTitle('Управление технологиями');
    }
  }, [mode]);
  
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mr: 2 }}>
          React + Material-UI
        </Typography>
        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
}

// Основное содержимое приложения с переключением вкладок
function AppContent() {
  const [activeTab, setActiveTab] = useState(0);
  const { showNotification } = useNotification();
  
  // Пример данных технологий
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React', category: 'frontend', status: 'completed', description: 'Библиотека для UI' },
    { id: 2, title: 'Node.js', category: 'backend', status: 'in-progress', description: 'Серверная платформа' },
    { id: 3, title: 'MongoDB', category: 'database', status: 'not-started', description: 'NoSQL база данных' },
    { id: 4, title: 'Material-UI', category: 'ui-library', status: 'completed', description: 'Библиотека компонентов' },
    { id: 5, title: 'Express.js', category: 'backend', status: 'in-progress', description: 'Фреймворк для Node.js' },
  ]);
  
  // Обработчик изменения статуса технологии
  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
    
    // Показываем уведомление
    const techName = technologies.find(t => t.id === id)?.title || 'Технология';
    const statusText = {
      'completed': 'завершена',
      'in-progress': 'в процессе',
      'not-started': 'не начата'
    }[newStatus] || 'изменена';
    
    showNotification(`${techName} помечена как ${statusText}`, 'success', 3000);
  };
  
  // Обработчик добавления новой технологии
  const handleAddTechnology = (newTech) => {
    const newId = Math.max(...technologies.map(t => t.id)) + 1;
    const techToAdd = {
      ...newTech,
      id: newId,
      status: newTech.status || 'not-started'
    };
    
    setTechnologies(prev => [...prev, techToAdd]);
    showNotification(`Технология "${newTech.title}" добавлена!`, 'success', 4000);
  };
  
  // Обработчик удаления технологии
  const handleDeleteTechnology = (id) => {
    const techName = technologies.find(t => t.id === id)?.title || 'Технология';
    setTechnologies(prev => prev.filter(tech => tech.id !== id));
    showNotification(`Технология "${techName}" удалена`, 'warning', 3000);
  };
  
  // Тестовые уведомления (можно удалить)
  const testNotifications = () => {
    showNotification('Это информационное уведомление', 'info');
    setTimeout(() => showNotification('Успешное действие выполнено!', 'success'), 1000);
    setTimeout(() => showNotification('Внимание! Проверьте данные', 'warning'), 2000);
    setTimeout(() => showNotification('Ошибка при выполнении', 'error'), 3000);
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <IconButton 
          color="primary" 
          variant="outlined"
          onClick={() => setActiveTab(0)}
          sx={{ 
            border: activeTab === 0 ? '2px solid' : '1px solid',
            borderColor: activeTab === 0 ? 'primary.main' : 'divider'
          }}
        >
          📋 Список
        </IconButton>
        <IconButton 
          color="primary" 
          variant="outlined"
          onClick={() => setActiveTab(1)}
          sx={{ 
            border: activeTab === 1 ? '2px solid' : '1px solid',
            borderColor: activeTab === 1 ? 'primary.main' : 'divider'
          }}
        >
          📊 Дашборд
        </IconButton>
        <IconButton 
          color="secondary" 
          onClick={testNotifications}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          🔔 Тест уведомлений
        </IconButton>
      </Box>
      
      {activeTab === 0 ? (
        <TechnologyStack 
          technologies={technologies}
          onStatusChange={handleStatusChange}
          onAddTechnology={handleAddTechnology}
          onDeleteTechnology={handleDeleteTechnology}
        />
      ) : (
        <Dashboard technologies={technologies} />
      )}
      
      <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Практическое занятие №26: Material-UI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Адаптивный дизайн • Темная/светлая тема • Уведомления
        </Typography>
      </Box>
    </Container>
  );
}

// Обертка для провайдеров
function AppWrapper() {
  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppHeader />
          <AppContent />
        </Box>
      </NotificationProvider>
    </CustomThemeProvider>
  );
}

// Главный экспорт
function App() {
  return <AppWrapper />;
}

export default App;