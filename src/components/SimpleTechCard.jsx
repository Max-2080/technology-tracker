import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';

const SimpleTechCard = ({ technology, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 400, 
      margin: '0 auto',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6
      }
    }}>
      <CardContent>
        {/* Заголовок карточки */}
        <Typography variant="h6" component="h2" gutterBottom>
          {technology.title}
        </Typography>

        {/* Описание технологии */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>

        {/* Чипы с категорией и статусом */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={technology.category}
            variant="outlined"
            size="small"
            color="primary"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
      </CardContent>

      {/* Кнопки действий */}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        {technology.status !== 'completed' && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onStatusChange(technology.id, 'completed')}
            sx={{ borderRadius: 1 }}
          >
            Завершить
          </Button>
        )}

        <Button
          size="small"
          variant="outlined"
          onClick={() => onStatusChange(
            technology.id,
            technology.status === 'in-progress' ? 'not-started' : 'in-progress'
          )}
          sx={{ borderRadius: 1 }}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SimpleTechCard;