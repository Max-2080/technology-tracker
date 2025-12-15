import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

// Компонент для содержимого вкладок
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

function Dashboard({ technologies = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [tabValue, setTabValue] = useState(0);
  const [notificationCount] = useState(3);

  // Расчет статистики
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const statCards = [
    {
      title: 'Завершено',
      value: stats.completed,
      icon: <CheckCircleIcon color="success" />,
      color: 'success.main'
    },
    {
      title: 'В процессе',
      value: stats.inProgress,
      icon: <ScheduleIcon color="warning" />,
      color: 'warning.main'
    },
    {
      title: 'Не начато',
      value: stats.notStarted,
      icon: <TrendingUpIcon color="info" />,
      color: 'info.main'
    },
    {
      title: 'Всего',
      value: stats.total,
      icon: <CategoryIcon color="primary" />,
      color: 'primary.main'
    }
  ];

  const categories = ['frontend', 'backend', 'database', 'ui-library', 'devops', 'other'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Шапка дашборда */}
      <AppBar 
        position="static" 
        color="default" 
        elevation={1}
        sx={{ borderRadius: 2, mb: 3 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📊 Панель управления технологиями
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Вкладки */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        mb: 3
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          centered={!isMobile}
        >
          <Tab label="Обзор" />
          <Tab label="Статистика" />
          <Tab label="Категории" />
        </Tabs>
      </Box>

      {/* Вкладка Обзор */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Статистические карточки */}
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {card.icon}
                    <Typography color="text.secondary" variant="body2" sx={{ ml: 1 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ color: card.color, fontWeight: 'bold' }}
                  >
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Прогресс бар */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Общий прогресс выполнения
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h4" sx={{ flexShrink: 0 }}>
                    {completionPercentage}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={completionPercentage}
                    sx={{ 
                      flexGrow: 1, 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'
                    }}
                    color={
                      completionPercentage >= 75 ? 'success' :
                      completionPercentage >= 50 ? 'warning' :
                      'primary'
                    }
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {stats.completed} из {stats.total} технологий завершены
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Недавно добавленные технологии */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🆕 Недавно добавленные
                </Typography>
                <List dense>
                  {technologies
                    .slice(0, 5)
                    .map((tech) => (
                      <ListItem key={tech.id}>
                        <ListItemText
                          primary={tech.title}
                          secondary={`${tech.category} • ${tech.status === 'completed' ? '✅' : '🔄'}`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    ))}
                  {technologies.length === 0 && (
                    <ListItem>
                      <ListItemText
                        primary="Нет технологий"
                        secondary="Добавьте первую технологию"
                        primaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Распределение по статусам */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 Распределение по статусам
                </Typography>
                <List dense>
                  {[
                    { status: 'completed', label: 'Завершено', color: 'success.main' },
                    { status: 'in-progress', label: 'В процессе', color: 'warning.main' },
                    { status: 'not-started', label: 'Не начато', color: 'text.secondary' }
                  ].map((item) => {
                    const count = technologies.filter(t => t.status === item.status).length;
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    
                    return (
                      <ListItem key={item.status}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{item.label}</Typography>
                              <Typography fontWeight="bold" sx={{ color: item.color }}>
                                {count} ({percentage}%)
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <LinearProgress
                              variant="determinate"
                              value={percentage}
                              sx={{ 
                                height: 4, 
                                borderRadius: 2,
                                mt: 0.5,
                                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'
                              }}
                              color={
                                item.status === 'completed' ? 'success' :
                                item.status === 'in-progress' ? 'warning' :
                                'inherit'
                              }
                            />
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка Статистика */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              📊 Детальная статистика
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Основные показатели
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Всего технологий" 
                      secondary={stats.total}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Завершено" 
                      secondary={`${stats.completed} (${completionPercentage}%)`}
                      secondaryTypographyProps={{ color: 'success.main' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="В процессе" 
                      secondary={stats.inProgress}
                      secondaryTypographyProps={{ color: 'warning.main' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Не начато" 
                      secondary={stats.notStarted}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Эффективность
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Коэффициент выполнения:
                  </Typography>
                  <Typography variant="h3" sx={{ color: completionPercentage >= 50 ? 'success.main' : 'warning.main' }}>
                    {completionPercentage >= 50 ? '✓' : '⚠'} {completionPercentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {completionPercentage >= 75 
                      ? 'Отличный прогресс!' 
                      : completionPercentage >= 50 
                      ? 'Хороший темп' 
                      : 'Требуется ускорение'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Вкладка Категории */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          🗂️ Распределение по категориям
        </Typography>
        
        <Grid container spacing={3}>
          {categories.map(category => {
            const categoryTechs = technologies.filter(t => t.category === category);
            const count = categoryTechs.length;
            
            if (count === 0) return null;

            const completed = categoryTechs.filter(t => t.status === 'completed').length;
            const categoryPercentage = count > 0 ? Math.round((completed / count) * 100) : 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={category}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                      {category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {count} технологий
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={categoryPercentage}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        my: 1,
                        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'
                      }}
                      color={categoryPercentage >= 50 ? 'success' : 'primary'}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Завершено: {completed} из {count} ({categoryPercentage}%)
                    </Typography>
                    <List dense sx={{ mt: 1 }}>
                      {categoryTechs.slice(0, 3).map(tech => (
                        <ListItem key={tech.id} sx={{ px: 0, py: 0.5 }}>
                          <ListItemText
                            primary={tech.title}
                            secondary={tech.status === 'completed' ? '✅' : '🔄'}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                      {categoryTechs.length > 3 && (
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                          <ListItemText
                            primary={`...и еще ${categoryTechs.length - 3}`}
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              color: 'text.secondary',
                              fontStyle: 'italic'
                            }}
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {technologies.length === 0 && (
          <Card sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Нет данных для отображения
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Добавьте технологии для анализа категорий
            </Typography>
          </Card>
        )}
      </TabPanel>
    </Box>
  );
}

export default Dashboard;