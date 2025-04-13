import React from 'react';
import './AISuggestionCard.css';

const AISuggestionCard = ({ suggestion, onAddToTasks }) => {
  const { title, description, priority, dueDate, category } = suggestion;

  const handleAddToTasks = () => {
    onAddToTasks(suggestion);
  };

  return (
    <div className="ai-suggestion-card">
      <div className="ai-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path>
          <path d="M12 12l10 10-10-10z"></path>
          <path d="M12 12l0 10 0-10z"></path>
          <path d="M12 12l-10 10 10-10z"></path>
        </svg>
        <span>AI Suggestion</span>
      </div>
      
      <div className="ai-suggestion-content">
        <h3 className="ai-suggestion-title">{title}</h3>
        
        {description && (
          <p className="ai-suggestion-description">{description}</p>
        )}
        
        <div className="ai-suggestion-details">
          {priority && (
            <div className={`ai-suggestion-priority priority-${priority.toLowerCase()}`}>
              {priority}
            </div>
          )}
          
          {dueDate && (
            <div className="ai-suggestion-due-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{new Date(dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {category && (
            <div className="ai-suggestion-category">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
              </svg>
              <span>{category}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="ai-suggestion-actions">
        <button className="add-to-tasks-button" onClick={handleAddToTasks}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add to Tasks
        </button>
      </div>
    </div>
  );
};

export default AISuggestionCard;