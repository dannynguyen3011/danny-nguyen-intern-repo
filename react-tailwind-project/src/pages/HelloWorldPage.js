import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HelloWorld from '../components/HelloWorld';

/**
 * HelloWorld page showcasing the HelloWorld component with different props
 */
const HelloWorldPage = () => {
  const [customName, setCustomName] = useState('');
  const [selectedName, setSelectedName] = useState('Focus Bear');

  // Predefined names for demonstration
  const demoNames = [
    'Focus Bear',
    'React Developer',
    'World',
    'JavaScript Ninja',
    'Code Warrior',
    'Tech Enthusiast'
  ];

  const handleCustomNameSubmit = (e) => {
    e.preventDefault();
    if (customName.trim()) {
      setSelectedName(customName.trim());
      setCustomName('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-gray-200 transition-colors group"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Home
          </Link>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            👋 HelloWorld Component Demo
          </h1>
          <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
            A simple functional component demonstrating props usage and dynamic content rendering
          </p>
          
          {/* Component Stats */}
          <div className="flex justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm">Prop</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Functional</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm">Reusable</div>
            </div>
          </div>
        </div>

        {/* Main HelloWorld Component Display */}
        <div className="max-w-2xl mx-auto mb-12">
          <HelloWorld name={selectedName} />
        </div>

        {/* Interactive Controls */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              🎮 Interactive Props Demo
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Predefined Names */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Quick Select Names
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {demoNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedName(name)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedName === name
                          ? 'bg-white text-purple-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Name Input */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Custom Name
                </h3>
                <form onSubmit={handleCustomNameSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Enter a custom name..."
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!customName.trim()}
                    className="w-full py-3 px-6 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Greeting
                  </button>
                </form>
              </div>
            </div>

            {/* Current State Display */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Current Component State:</h4>
              <div className="text-white/80 font-mono text-sm">
                &lt;HelloWorld name="{selectedName}" /&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Educational Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              📚 Component Concepts Demonstrated
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
              <div>
                <h4 className="font-semibold text-white mb-2">Props Usage:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Dynamic content rendering</li>
                  <li>• Default prop values</li>
                  <li>• PropTypes validation</li>
                  <li>• Destructuring in parameters</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Functional Components:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Clean, simple syntax</li>
                  <li>• Easy to test and debug</li>
                  <li>• Hooks compatibility</li>
                  <li>• Performance optimizations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Reusability:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Same component, different data</li>
                  <li>• Configurable behavior</li>
                  <li>• Consistent styling</li>
                  <li>• Maintainable code</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Best Practices:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• PropTypes for type safety</li>
                  <li>• Default props handling</li>
                  <li>• Clear component naming</li>
                  <li>• Single responsibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Built with ❤️ demonstrating React functional components and props
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelloWorldPage;
