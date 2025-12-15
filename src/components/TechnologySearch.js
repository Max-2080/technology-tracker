import { useState, useEffect, useRef } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function TechnologySearch() {
    const { technologies, loading } = useTechnologiesApi();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTech, setFilteredTech] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    // Функция поиска
    const performSearch = (query) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setSearchLoading(true);

        // Имитация запроса к API с задержкой
        setTimeout(() => {
            const filtered = technologies.filter(tech =>
                tech.title.toLowerCase().includes(query.toLowerCase()) ||
                tech.description.toLowerCase().includes(query.toLowerCase()) ||
                tech.category.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredTech(filtered);
            setSearchLoading(false);
        }, 300);
    };

    // Обработчик изменения поиска с debounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            if (value.trim()) {
                performSearch(value);
            } else {
                setFilteredTech([]);
            }
        }, 500);
    };

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <div className="technology-search card">
            <h3>🔍 Поиск технологий</h3>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск по названию, описанию, категории..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                    disabled={loading}
                />
                {searchLoading && <span className="search-loading">⏳</span>}
            </div>

            {searchTerm.trim() && (
                <div className="search-results">
                    <h4>Результаты поиска ({filteredTech.length})</h4>
                    {filteredTech.length > 0 ? (
                        <ul className="results-list">
                            {filteredTech.map(tech => (
                                <li key={tech.id} className="result-item">
                                    <strong>{tech.title}</strong>
                                    <span className="badge">{tech.category}</span>
                                    <p className="text-small">{tech.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">Технологии не найдены</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TechnologySearch;