import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange, filterOption = 'all' }) => {
  const [sortMethod, setSortMethod] = useState('dueDate');

  // Filter tasks based on the selected filter option
  const filteredTasks = tasks.filter(task => {
    if (filterOption === 'all') return true;
    if (filterOption === 'completed') return task.completed;
    if (filterOption === 'active') return !task.completed;
    if (filterOption === 'overdue') {
      return task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    }
    if (filterOption === 'high') return task.priority.toLowerCase() === 'high';
    if (filterOption === 'medium') return task.priority.toLowerCase() === 'medium';
    if (filterOption === 'low') return task.priority.toLowerCase() === 'low';
    return true;
  });

  // Sort the filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortMethod === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortMethod === 'priority') {
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority.toLowerCase()] - priorities[a.priority.toLowerCase()];
    }
    if (sortMethod === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Handle sort change
  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
  };

  return (
    <div className="task-list-container">
      {tasks.length > 0 ? (
        <>
          <div className="task-list-header">
            <h2>Tasks ({filteredTasks.length})</h2>
            <div className="sort-controls">
              <label htmlFor="sort-method">Sort by:</label>
              <select 
                id="sort-method" 
                value={sortMethod} 
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="task-list">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="no-tasks-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>No tasks match your current filter</p>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h3>No tasks yet</h3>
          <p>Add your first task to get started</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;