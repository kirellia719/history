import React from 'react';
import './Loading.scss';

const Loading = ({size}) => {
  return (
    <div className="loading-spinner">
      <div className="spinner" style={{width: `${size}px`}}></div>
    </div>
  );
};

export default Loading;
