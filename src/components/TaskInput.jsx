import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onCreate }) => {
  const [taskInput, setTaskInput] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  const [showForm, setShowForm] = useState(false);
  const [titleError, setTitleError] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when title is entered
    if (name === 'title' && value.trim() !== '') {
      setTitleError(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate title
    if (!taskInput.title.trim()) {
      setTitleError(true);
      return;
    }
    
    // Call parent function with form data
    onCreate(taskInput);
    
    // Reset form
    setTaskInput({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    
    // Collapse form
    setShowForm(false);
  };
  
  return (
    <div className="task-input-container">
      <h2 className="task-input-title">Add New Task</h2>
      
      {!showForm ? (
        <button 
          className="create-task-button"
          onClick={() => setShowForm(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskInput.title}
              onChange={handleInputChange}
              className={`form-input ${titleError ? 'error' : ''}`}
              placeholder="Enter task title"
              autoFocus
            />
            {titleError && (
              <div className="error-message">Please enter a task title</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskInput.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Enter task description (optional)"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                value={taskInput.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group half">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={taskInput.dueDate}
                onChange={handleInputChange}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskInput;