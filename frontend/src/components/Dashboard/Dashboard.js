import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Assistant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your dashboard widgets here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            Generate Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;