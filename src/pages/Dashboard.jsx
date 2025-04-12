import React, { useState } from 'react';
import './Dashboard.css';

// Navbar Component
const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>TaskMaster AI</h1>
      </div>
      <div className="navbar-menu">
        <div className="user-info">
          <span>Welcome, {username}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

// AI Task Input Component
const AITaskInput = ({ onGenerateTasks }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      onGenerateTasks(prompt);
      setPrompt('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="ai-input-container">
      <h2>AI Task Generator</h2>
      <p>Describe your goals, and let AI generate tasks for you</p>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Plan a birthday party for next weekend"
          rows={4}
        />
        <button 
          type="submit" 
          className="ai-submit-btn"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Tasks'}
        </button>
      </form>
    </div>
  );
};

// Manual Task Input Component
const ManualTaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    onAddTask({
      title: task,
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    });
    
    setTask('');
  };
  
  return (
    <div className="manual-input-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit" disabled={!task.trim()}>Add</button>
      </form>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-priority" data-priority={task.priority}>
          {task.priority}
        </div>
        <button className="delete-task-btn" onClick={() => onDelete(task.id)}>×</button>
      </div>
      <div className="task-body">
        <div className="task-check">
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
        <div className="task-content">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>
      <div className="task-footer">
        <span className="task-date">Added: {formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
};

// Task List Component
const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <p>No tasks yet. Add a task or use the AI generator to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish the draft and send it to the team for review',
      completed: false,
      priority: 'high',
      createdAt: '2023-09-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Schedule team meeting',
      description: 'Coordinate with team members for weekly sync-up',
      completed: true,
      priority: 'medium',
      createdAt: '2023-09-14T14:15:00Z'
    },
    {
      id: 3,
      title: 'Research new technologies',
      description: null,
      completed: false,
      priority: 'low',
      createdAt: '2023-09-13T09:45:00Z'
    }
  ]);
  
  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now()
    };
    setTasks(prevTasks => [taskWithId, ...prevTasks]);
  };
  
  const handleGenerateTasks = (prompt) => {
    // In a real app, this would call an AI API
    // For now, we'll just create a sample task based on the prompt
    const aiGeneratedTasks = [
      {
        id: Date.now(),
        title: `${prompt.split(' ').slice(0, 3).join(' ')}...`,
        description: prompt,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
    ];
    
    setTasks(prevTasks => [...aiGeneratedTasks, ...prevTasks]);
  };
  
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  return (
    <div className="dashboard">
      <Navbar username={username || 'User'} onLogout={onLogout} />
      
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="sidebar-content">
            <AITaskInput onGenerateTasks={handleGenerateTasks} />
            <ManualTaskInput onAddTask={handleAddTask} />
          </div>
        </aside>
        
        <main className="dashboard-main">
          <div className="tasks-header">
            <h2>Your Tasks</h2>
            <div className="tasks-count">
              <span>{tasks.filter(task => !task.completed).length} active</span>
              <span>{tasks.filter(task => task.completed).length} completed</span>
            </div>
          </div>
          
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;