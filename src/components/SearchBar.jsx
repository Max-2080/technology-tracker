import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange, resultsCount, totalCount }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий по названию или описанию..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <div className="search-stats">
          <span className="results-count">Найдено: {resultsCount}</span>
          <span className="total-count">Всего: {totalCount}</span>
        </div>
      </div>
      {searchQuery && (
        <p className="search-hint">
          🔍 Поиск: "{searchQuery}" • {resultsCount} результатов
        </p>
      )}
    </div>
  );
}

export default SearchBar;