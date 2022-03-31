import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Workspaces } from './pages/workspaces/Workspaces';
import { Activities } from './pages/activities/Activities';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspaces/:id" element={<Activities />} />
        <Route path="/" element={<Workspaces />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
