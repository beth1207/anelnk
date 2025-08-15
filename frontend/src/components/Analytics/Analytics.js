import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-4">Usage Statistics</h2>
        {analytics && analytics.length > 0 ? (
          <div>
            {analytics.map((item, index) => (
              <div key={index} className="mb-2 p-2 border-b">
                <p>{new Date(item.timestamp).toLocaleString()}</p>
                <p className="font-medium">{item.eventType}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No analytics data available</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;