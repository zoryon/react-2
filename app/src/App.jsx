import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';

import './App.css';

import Home from './pages/Home';
import CreateUserPage from './pages/CreateUserPage';
import UpdateUserPage from './pages/UpdateUserPage';

import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/create" element={<CreateUserPage />} />
        <Route path="/users/update/:id" element={<UpdateUserPage />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;