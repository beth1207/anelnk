import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CLInterface = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);

  const commands = {
    help: 'Available commands: help, clear, ai [prompt], github [command], email [command]',
    clear: () => setOutput([]),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setOutput(prev => [...prev, { type: 'input', text: input }]);
    
    const [command, ...args] = input.split(' ');
    
    if (commands[command]) {
      if (typeof commands[command] === 'function') {
        commands[command]();
      } else {
        setOutput(prev => [...prev, { type: 'output', text: commands[command] }]);
      }
    } else if (command === 'ai') {
      try {
        const prompt = args.join(' ');
        const response = await axios.post('/api/ai/chat', { message: prompt });
        setOutput(prev => [...prev, { type: 'output', text: response.data.response }]);
      } catch (error) {
        setOutput(prev => [...prev, { type: 'error', text: 'AI service error' }]);
      }
    } else {
      setOutput(prev => [...prev, { type: 'error', text: `Command not found: ${command}. Type 'help' for available commands.` }]);
    }

    setInput('');
  };

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  return (
    <div className="bg-black text-green-400 font-mono p-4 h-full overflow-auto">
      <div className="mb-4">
        <div className="mb-2">AI Assistant CLI v1.0</div>
        <div className="mb-2">Type "help" for available commands</div>
      </div>
      
      {output.map((item, index) => (
        <div key={index} className={`mb-2 ${item.type === 'input' ? 'text-white' : item.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {item.type === 'input' && '> '}{item.text}
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-white mr-2">></span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-400 flex-1 border-none outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default CLInterface;