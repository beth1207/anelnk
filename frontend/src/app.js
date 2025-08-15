import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ChatBot from './components/ChatBot/ChatBot';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import CLInterface from './components/CLI/CLInterface';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/cli" element={<CLInterface />} />
          </Routes>
        </div>
        <ChatBot />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;