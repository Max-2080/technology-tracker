import { useState, useEffect, useCallback } from 'react';

function TechnologyResources({ techId, techTitle }) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const fetchAdditionalResources = useCallback(async () => {
        if (!expanded) return;

        try {
            setLoading(true);
            setError(null);

            // Имитация запроса к API с задержкой
            await new Promise(resolve => setTimeout(resolve, 800));

            // Мок-данные дополнительных ресурсов
            const mockAdditionalResources = {
                'React': [
                    { name: 'React Router', url: 'https://reactrouter.com' },
                    { name: 'React Query', url: 'https://tanstack.com/query' },
                    { name: 'Next.js', url: 'https://nextjs.org' }
                ],
                'Node.js': [
                    { name: 'NestJS', url: 'https://nestjs.com' },
                    { name: 'Socket.io', url: 'https://socket.io' },
                    { name: 'PM2', url: 'https://pm2.keymetrics.io' }
                ],
                'Typescript': [
                    { name: 'TS Handbook', url: 'https://www.typescriptlang.org/docs' },
                    { name: 'TS Config', url: 'https://www.typescriptlang.org/tsconfig' }
                ]
            };

            const techResources = mockAdditionalResources[techTitle] || [
                { name: 'Официальная документация', url: `https://${techTitle.toLowerCase()}.org` },
                { name: 'MDN Web Docs', url: `https://developer.mozilla.org/en-US/docs/Web/${techTitle}` }
            ];

            setResources(techResources);
        } catch (err) {
            setError('Не удалось загрузить дополнительные ресурсы');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [techTitle, expanded]);

    useEffect(() => {
        fetchAdditionalResources();
    }, [fetchAdditionalResources]);

    return (
        <div className="technology-resources">
            <button
                onClick={() => setExpanded(!expanded)}
                className="btn-resources"
            >
                {expanded ? '▲' : '▼'} Дополнительные ресурсы
            </button>

            {expanded && (
                <div className="resources-content">
                    {loading ? (
                        <p className="loading-text">Загрузка ресурсов...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : (
                        <ul className="resources-list">
                            {resources.map((resource, index) => (
                                <li key={index} className="resource-item">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-link"
                                    >
                                        {resource.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default TechnologyResources;