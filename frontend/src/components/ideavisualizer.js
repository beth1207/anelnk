import React, { useState } from 'react';
import axios from 'axios';

function IdeaVisualizer() {
  const [idea, setIdea] = useState('');
  const [plan, setPlan] = useState('');

  const generatePlan = async () => {
    const res = await axios.post('/api/ai/visualize', { idea });
    setPlan(res.data.plan);
  };

  return (
    <div>
      <h2>Visualize Your Idea</h2>
      <textarea value={idea} onChange={e => setIdea(e.target.value)} placeholder="Enter your idea..." />
      <button onClick={generatePlan}>Generate Plan</button>
      <pre>{plan}</pre>
    </div>
  );
}

export default IdeaVisualizer;
