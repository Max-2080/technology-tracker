import './QuickActions.css';

function QuickActions({ technologies, onMarkAllCompleted, onResetAll, onRandomSelect }) {
  // Фильтруем технологии со статусом "not-started"
  const notStartedTechs = technologies.filter(tech => tech.status === 'not-started');
  
  return (
    <div className="quick-actions">
      <h3 className="actions-title">Быстрые действия</h3>
      <div className="actions-buttons">
        <button 
          className="action-btn mark-all-btn"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как изученные"
        >
          ✅ Отметить все как выполненные
        </button>
        
        <button 
          className="action-btn reset-btn"
          onClick={onResetAll}
          title="Сбросить все статусы на 'Не начато'"
        >
          🔄 Сбросить все статусы
        </button>
        
        <button 
          className="action-btn random-btn"
          onClick={onRandomSelect}
          disabled={notStartedTechs.length === 0}
          title={notStartedTechs.length === 0 ? "Все технологии уже начаты или изучены" : "Выбрать случайную не начатую технологию"}
        >
          🎲 Случайный выбор
          <span className="badge">{notStartedTechs.length} доступно</span>
        </button>
      </div>
      
      {notStartedTechs.length === 0 && (
        <div className="warning-message">
          ⚠️ Все технологии уже имеют статус "В процессе" или "Завершено". 
          Невозможно выбрать новую технологию для изучения.
        </div>
      )}
    </div>
  );
}

export default QuickActions;