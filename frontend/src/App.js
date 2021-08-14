import React from 'react';

import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Navbar/>
        <LandingPage/>
      </React.StrictMode>
    </div>
  );
}

export default App;