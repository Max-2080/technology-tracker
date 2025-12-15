import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon
} from '@mui/icons-material';
import SimpleTechCard from './SimpleTechCard';
import { useNotification } from './ui/NotificationProvider';

const TechnologyStack = ({ 
  technologies = [], 
  onStatusChange, 
  onAddTechnology, 
  onDeleteTechnology 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showNotification } = useNotification();
  
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTech, setNewTech] = useState({
    title: '',
    category: 'frontend',
    description: '',
    status: 'not-started'
  });

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setNewTech({
      title: '',
      category: 'frontend',
      description: '',
      status: 'not-started'
    });
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAddSubmit = () => {
    if (!newTech.title.trim()) {
      showNotification('Введите название технологии', 'error');
      return;
    }

    onAddTechnology(newTech);
    handleCloseAddModal();
    showNotification(`Технология "${newTech.title}" добавлена`, 'success');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Удалить технологию "${title}"?`)) {
      onDeleteTechnology(id);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in-progress':
        return <PlayCircleIcon color="warning" />;
      default:
        return <PauseCircleIcon color="action" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const categories = ['frontend', 'backend', 'database', 'ui-library', 'devops', 'other'];

  return (
    <Box>
      {/* Заголовок и кнопка добавления */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        <Typography variant="h4" component="h1">
          Стек технологий
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          sx={{ borderRadius: 2 }}
        >
          Добавить технологию
        </Button>
      </Box>

      {/* Статистика */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Всего технологий
              </Typography>
              <Typography variant="h4">{technologies.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Завершено
              </Typography>
              <Typography variant="h4" color="success.main">
                {technologies.filter(t => t.status === 'completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                В процессе
              </Typography>
              <Typography variant="h4" color="warning.main">
                {technologies.filter(t => t.status === 'in-progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Мобильный вид - карточки */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {technologies.map(tech => (
            <SimpleTechCard
              key={tech.id}
              technology={tech}
              onStatusChange={onStatusChange}
            />
          ))}
          {technologies.length === 0 && (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Нет технологий. Добавьте первую!
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        /* Десктопный вид - таблица */
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5' }}>
                <TableCell>Название</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technologies.map((tech) => (
                <TableRow key={tech.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(tech.status)}
                      <Typography fontWeight="medium">{tech.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tech.category}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {tech.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(tech.status)}
                      color={getStatusColor(tech.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Завершить">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => onStatusChange(tech.id, 'completed')}
                          disabled={tech.status === 'completed'}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Начать/приостановить">
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => onStatusChange(
                            tech.id,
                            tech.status === 'in-progress' ? 'not-started' : 'in-progress'
                          )}
                        >
                          {tech.status === 'in-progress' ? <PauseCircleIcon /> : <PlayCircleIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(tech.id, tech.title)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {technologies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>
                      Нет технологий. Добавьте первую!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Модальное окно добавления */}
      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Добавить новую технологию</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              label="Название технологии"
              fullWidth
              value={newTech.title}
              onChange={(e) => setNewTech({ ...newTech, title: e.target.value })}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={newTech.category}
                label="Категория"
                onChange={(e) => setNewTech({ ...newTech, category: e.target.value })}
              >
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={3}
              value={newTech.description}
              onChange={(e) => setNewTech({ ...newTech, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Начальный статус</InputLabel>
              <Select
                value={newTech.status}
                label="Начальный статус"
                onChange={(e) => setNewTech({ ...newTech, status: e.target.value })}
              >
                <MenuItem value="not-started">Не начато</MenuItem>
                <MenuItem value="in-progress">В процессе</MenuItem>
                <MenuItem value="completed">Завершено</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Button 
            onClick={handleCloseAddModal} 
            fullWidth={isMobile}
            variant="outlined"
          >
            Отмена
          </Button>
          <Button 
            onClick={handleAddSubmit} 
            fullWidth={isMobile}
            variant="contained"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TechnologyStack;