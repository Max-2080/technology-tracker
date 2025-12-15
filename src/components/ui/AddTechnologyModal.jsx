import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';

const AddTechnologyModal = ({ open, onClose, onSubmit }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [newTech, setNewTech] = useState({
    title: '',
    category: 'frontend',
    description: '',
    status: 'not-started'
  });

  const categories = ['frontend', 'backend', 'database', 'ui-library', 'devops', 'other'];

  const handleChange = (field, value) => {
    setNewTech({ ...newTech, [field]: value });
  };

  const handleSubmit = () => {
    if (!newTech.title.trim()) {
      alert('Введите название технологии');
      return;
    }
    
    onSubmit(newTech);
    handleClose();
  };

  const handleClose = () => {
    setNewTech({
      title: '',
      category: 'frontend',
      description: '',
      status: 'not-started'
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : theme.shape.borderRadius
        }
      }}
    >
      <DialogTitle>➕ Добавить новую технологию</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Название технологии"
            fullWidth
            value={newTech.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            placeholder="Например: React, Node.js, MongoDB"
          />
          
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={newTech.category}
              label="Категория"
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Краткое описание технологии..."
          />
          
          <FormControl fullWidth>
            <InputLabel>Начальный статус</InputLabel>
            <Select
              value={newTech.status}
              label="Начальный статус"
              onChange={(e) => handleChange('status', e.target.value)}
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
        flexDirection: fullScreen ? 'column' : 'row',
        gap: fullScreen ? 1 : 0
      }}>
        <Button 
          onClick={handleClose} 
          fullWidth={fullScreen}
          variant="outlined"
          color="secondary"
        >
          Отмена
        </Button>
        <Button 
          onClick={handleSubmit} 
          fullWidth={fullScreen}
          variant="contained"
          color="primary"
        >
          Добавить технологию
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTechnologyModal;