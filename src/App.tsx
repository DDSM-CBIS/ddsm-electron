import React from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Home from './components/home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
