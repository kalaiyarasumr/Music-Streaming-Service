import React, { useState } from 'react';
import '../style/style.css';

function TopNav() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('night');
    } else {
      setMode('light');
    }
  };

  return (
    <div className={`${mode}-mode`}>
      <div className='topNav_back'>
        <div className='ms-3 h4 text-white'>Music Streaming Service</div>
        <button onClick={toggleMode} className='ms-auto btn btn-secondary'>
        
        </button>
      </div>
    </div>
  );
}

export default TopNav;
