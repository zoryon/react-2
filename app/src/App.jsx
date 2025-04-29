import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';

import './App.css';

import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;