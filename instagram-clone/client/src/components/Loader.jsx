import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg'
  };

  return (
    <div className="loader">
      <div className={`spinner-border-instagram ${sizeClass[size]}`}></div>
    </div>
  );
};

export default Loader;