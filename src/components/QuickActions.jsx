import { useState } from 'react';
import Modal from './Modal/Modal';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  technologies,
  onExport 
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    setExportData(dataStr);
    setShowExportModal(true);
    
    if (onExport) {
      onExport(dataStr);
    }
  };

  const downloadExport = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          ☑ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          ↺ Сбросить все статусы
        </button>
        <button onClick={handleExport} className="btn btn-info">
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal-content">
          <p>Данные успешно подготовлены для экспорта!</p>
          <p>Всего технологий: {technologies.length}</p>
          <p>Завершено: {technologies.filter(t => t.status === 'completed').length}</p>
          <div className="export-buttons">
            <button onClick={downloadExport} className="btn btn-primary">
              📥 Скачать JSON
            </button>
            <button onClick={() => setShowExportModal(false)} className="btn btn-secondary">
              Закрыть
            </button>
          </div>
          <div className="export-preview">
            <small>Предпросмотр:</small>
            <pre>{exportData.substring(0, 200)}...</pre>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;