import React from 'react';
import { Link } from 'react-router-dom';
import MessageDisplay from '../components/MessageDisplay';

/**
 * Testing page to showcase the MessageDisplay component
 * Demonstrates testing concepts and user interactions
 */
const TestingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧪 Testing Demonstration
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Interactive component designed for comprehensive testing
          </p>
          
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              to="/" 
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              ← Home
            </Link>
            <Link 
              to="/counter" 
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Counter Demo
            </Link>
            <Link 
              to="/form" 
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Form Demo
            </Link>
          </div>
        </div>

        {/* Main Component Demo */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              MessageDisplay Component
            </h2>
            <p className="text-white/80">
              Features comprehensive tests for rendering, user interactions, state management, and accessibility
            </p>
          </div>
          
          <MessageDisplay />
        </div>

        {/* Testing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-yellow-300">
              🎯 Testing Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Rendering tests with various props</li>
              <li>• User interaction simulation</li>
              <li>• State management verification</li>
              <li>• Accessibility testing</li>
              <li>• CSS class validation</li>
              <li>• Performance benchmarks</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-green-300">
              ✅ Best Practices
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• User-centric queries (getByRole, getByText)</li>
              <li>• userEvent for realistic interactions</li>
              <li>• Testing behavior, not implementation</li>
              <li>• ARIA attributes and accessibility</li>
              <li>• Comprehensive edge case coverage</li>
              <li>• Performance considerations</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              🔧 Testing Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Jest testing framework</li>
              <li>• React Testing Library</li>
              <li>• @testing-library/user-event</li>
              <li>• @testing-library/jest-dom</li>
              <li>• Snapshot testing</li>
              <li>• Custom test utilities</li>
            </ul>
          </div>
        </div>

        {/* Component Variations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Component Variations for Testing
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                With Counter Disabled
              </h3>
              <MessageDisplay 
                initialMessage="Testing without counter display" 
                showCounter={false} 
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Custom Initial Message
              </h3>
              <MessageDisplay 
                initialMessage="🚀 Custom message for testing different scenarios!" 
                showCounter={true} 
              />
            </div>
          </div>
        </div>

        {/* Testing Commands */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            🖥️ Testing Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Run All Tests</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Run Specific Component</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test MessageDisplay
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Watch Mode</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test -- --watch
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Coverage Report</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test -- --coverage
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            This component demonstrates comprehensive testing strategies for React applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
