import './FilterTabs.css';

function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все технологии', icon: '📋' },
    { id: 'not-started', label: 'Не начатые', icon: '📚' },
    { id: 'in-progress', label: 'В процессе', icon: '⏳' },
    { id: 'completed', label: 'Выполненные', icon: '✅' }
  ];

  return (
    <div className="filter-tabs">
      <h3 className="filter-title">Фильтр по статусу</h3>
      <div className="tabs-container">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`tab-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span className="tab-icon">{filter.icon}</span>
            <span className="tab-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;