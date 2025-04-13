import React, { useState, useEffect, useRef } from 'react';
import './TaskEditorModal.css';

const TaskEditorModal = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const [category, setCategory] = useState(task.category || '');

  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    // Focus the title input when modal opens
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    // Add escape key listener
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onCancel]);

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      dueDate,
      priority,
      category,
      updatedAt: new Date().toISOString()
    };
    onUpdate(updatedTask);
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-edit-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this task"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal, Shopping"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditorModal;