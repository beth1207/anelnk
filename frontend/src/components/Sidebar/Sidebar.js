import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiActivity, FiTerminal, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-8">AI Assistant</h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FiHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FiActivity className="mr-3" />
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/cli" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FiTerminal className="mr-3" />
              CLI Interface
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <Link to="/settings" className="flex items-center p-2 rounded hover:bg-gray-700">
          <FiSettings className="mr-3" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;