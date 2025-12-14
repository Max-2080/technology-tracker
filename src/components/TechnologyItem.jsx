import React from 'react';
import TechnologyNotes from './TechnologyNotes';
import './TechnologyItem.css';

function TechnologyItem({ technology, onStatusChange, onNotesChange }) {
  const getStatusText = (status) => {
    switch(status) {
      case 'not-started': return 'Не начато';
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'not-started': return 'status-not-started';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="technology-item">
      <div className="tech-header">
        <h3 className="tech-title">{technology.title}</h3>
        <div className={`tech-status ${getStatusClass(technology.status)}`}>
          {getStatusText(technology.status)}
        </div>
      </div>
      
      <p className="tech-description">{technology.description}</p>
      
      <TechnologyNotes 
        notes={technology.notes}
        onNotesChange={onNotesChange}
        techId={technology.id}
      />
      
      <div className="tech-actions">
        <button 
          className={`action-btn ${technology.status === 'not-started' ? 'active' : ''}`}
          onClick={() => onStatusChange(technology.id, 'not-started')}
        >
          Не начато
        </button>
        <button 
          className={`action-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
          onClick={() => onStatusChange(technology.id, 'in-progress')}
        >
          В процессе
        </button>
        <button 
          className={`action-btn ${technology.status === 'completed' ? 'active' : ''}`}
          onClick={() => onStatusChange(technology.id, 'completed')}
        >
          Завершено
        </button>
      </div>
    </div>
  );
}

export default TechnologyItem;