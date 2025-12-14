import React from 'react';
import TechnologyItem from './TechnologyItem';
import './TechList.css';

function TechList({ technologies, onStatusChange, onNotesChange }) {
  if (technologies.length === 0) {
    return (
      <div className="tech-list empty">
        <p className="empty-message">Технологии не найдены</p>
      </div>
    );
  }

  return (
    <div className="tech-list">
      {technologies.map(tech => (
        <TechnologyItem 
          key={tech.id} 
          technology={tech}
          onStatusChange={onStatusChange}
          onNotesChange={onNotesChange}
        />
      ))}
    </div>
  );
}

export default TechList;