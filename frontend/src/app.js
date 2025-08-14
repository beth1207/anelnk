import React from 'react';
import IdeaVisualizer from './components/IdeaVisualizer';
import ProjectManager from './components/ProjectManager';
import OAuthConnect from './components/OAuthConnect';

function App() {
  return (
    <div>
      <h1>AI Assistant Dashboard</h1>
      <OAuthConnect />
      <IdeaVisualizer />
      <ProjectManager />
    </div>
  );
}

export default App;
