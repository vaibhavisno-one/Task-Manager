import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', message = '' }) => {
  const sizeClass = `loader-${size}`;

  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`}>
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;