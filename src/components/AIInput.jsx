import React, { useState } from 'react';
import './AIInput.css';

const AIInput = ({ onAddTask }) => {
  const [prompt, setPrompt] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    // Clear previous suggestions when input changes
    if (aiSuggestion) {
      setAiSuggestion(null);
    }
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/ai/suggest-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI suggestion');
      }
      
      const data = await response.json();
      setAiSuggestion(data);
    } catch (err) {
      console.error('Error fetching AI suggestion:', err);
      setError('Unable to get AI suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToTasks = () => {
    if (aiSuggestion) {
      onAddTask(aiSuggestion);
      setAiSuggestion(null);
      setPrompt('');
    }
  };

  return (
    <div className="ai-input-container">
      <h2 className="ai-input-title">AI Task Suggestions</h2>
      <p className="ai-input-description">
        Describe what you need help with, and our AI will suggest a task for you.
      </p>
      
      <form onSubmit={handleSubmit} className="ai-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="e.g., Plan a team meeting for next week"
            className="ai-prompt-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="ai-submit-button"
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                  <path d="M12 8c5.5 0 10 4.5 10 10H2c0-5.5 4.5-10 10-10z" />
                </svg>
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="ai-error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {aiSuggestion && (
        <div className="ai-suggestion-container">
          <div className="ai-suggestion-header">
            <div className="ai-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                <path d="M12 8c5.5 0 10 4.5 10 10H2c0-5.5 4.5-10 10-10z" />
              </svg>
            </div>
            <h3 className="suggestion-title">AI Suggested Task</h3>
          </div>
          
          <div className="suggestion-content">
            <h4 className="suggestion-task-title">{aiSuggestion.title}</h4>
            {aiSuggestion.description && (
              <p className="suggestion-description">{aiSuggestion.description}</p>
            )}
            
            <div className="suggestion-details">
              <div className={`priority-tag priority-${aiSuggestion.priority.toLowerCase()}`}>
                {aiSuggestion.priority}
              </div>
              
              {aiSuggestion.dueDate && (
                <div className="due-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{new Date(aiSuggestion.dueDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="suggestion-actions">
            <button 
              className="action-button modify-button"
              onClick={() => setPrompt(`Modify: ${prompt}`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Modify</span>
            </button>
            <button 
              className="action-button add-button"
              onClick={handleAddToTasks}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add to Tasks</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInput;