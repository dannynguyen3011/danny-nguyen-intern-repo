import React from 'react';
import { Link } from 'react-router-dom';
import UserList from '../components/UserList';

/**
 * API Testing page to showcase the UserList component
 * Demonstrates API data fetching, error handling, and testing strategies
 */
const ApiTestingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🌐 API Testing Demonstration
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Component showcasing API data fetching, error handling, and comprehensive testing
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
              to="/testing" 
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Testing Demo
            </Link>
            <Link 
              to="/counter" 
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Counter Demo
            </Link>
          </div>
        </div>

        {/* API Testing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-yellow-300">
              🎯 API Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• JSONPlaceholder API integration</li>
              <li>• Loading states and error handling</li>
              <li>• Automatic retry mechanism</li>
              <li>• Search and filter functionality</li>
              <li>• Responsive user cards</li>
              <li>• Real-time data updates</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-green-300">
              ✅ Testing Strategies
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• API call mocking with Jest</li>
              <li>• Asynchronous operation testing</li>
              <li>• Error scenario simulation</li>
              <li>• Retry mechanism validation</li>
              <li>• Loading state verification</li>
              <li>• User interaction testing</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              🔧 Mock Techniques
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• global.fetch mocking</li>
              <li>• Response data simulation</li>
              <li>• Error condition creation</li>
              <li>• Timer manipulation</li>
              <li>• Network timeout simulation</li>
              <li>• Retry behavior testing</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              ⚡ Advanced Testing
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Performance benchmarking</li>
              <li>• Large dataset handling</li>
              <li>• Search performance testing</li>
              <li>• Integration scenarios</li>
              <li>• Accessibility validation</li>
              <li>• Edge case coverage</li>
            </ul>
          </div>
        </div>

        {/* Main Component */}
        <div className="mb-8">
          <UserList />
        </div>

        {/* Testing Information Panel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            🧪 Testing Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-yellow-300 mb-3">API Mocking Strategies</h4>
              <div className="space-y-2 text-sm text-white/90">
                <p><strong>Success Scenarios:</strong> Mock successful API responses with realistic data</p>
                <p><strong>Error Handling:</strong> Simulate network errors, HTTP errors, and timeouts</p>
                <p><strong>Retry Logic:</strong> Test automatic retry mechanisms with controlled timing</p>
                <p><strong>Edge Cases:</strong> Handle empty responses and malformed data</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-green-300 mb-3">Asynchronous Testing</h4>
              <div className="space-y-2 text-sm text-white/90">
                <p><strong>Loading States:</strong> Verify UI during async operations</p>
                <p><strong>Timing Control:</strong> Use fake timers for predictable test execution</p>
                <p><strong>waitFor Patterns:</strong> Properly wait for async state updates</p>
                <p><strong>Race Conditions:</strong> Test concurrent operations safely</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            📝 Key Testing Patterns
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">API Mock Setup</h4>
              <pre className="bg-black/30 text-green-300 p-3 rounded text-xs overflow-x-auto">
{`// Mock successful API response
fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => mockUsers
});

// Mock API error
fetch.mockRejectedValueOnce(
  new Error('Network error')
);`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-300 mb-2">Async Testing Pattern</h4>
              <pre className="bg-black/30 text-green-300 p-3 rounded text-xs overflow-x-auto">
{`// Wait for async operations
await waitFor(() => {
  expect(screen.getByTestId('user-list'))
    .toBeInTheDocument();
});

// Test loading states
expect(screen.getByText('Loading...'))
  .toBeInTheDocument();`}
              </pre>
            </div>
          </div>
        </div>

        {/* Test Commands */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            🖥️ Testing Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Run UserList Tests</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test UserList
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Run API Tests Only</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test -- --testPathPattern="UserList"
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Watch API Tests</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test UserList -- --watch
              </code>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Test with Coverage</h4>
              <code className="bg-black/30 text-green-300 px-3 py-1 rounded text-sm block">
                npm test UserList -- --coverage
              </code>
            </div>
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
                Custom API URL (Will Fail - For Error Testing)
              </h3>
              <UserList 
                apiUrl="https://nonexistent-api.example.com/users"
                maxRetries={1}
                retryDelay={500}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Different Retry Configuration
              </h3>
              <UserList 
                maxRetries={2}
                retryDelay={2000}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            This component demonstrates comprehensive API testing strategies including mocking, error handling, and asynchronous operation testing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiTestingPage;
