import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReduxCounter from '../components/ReduxCounter';
import CounterDisplay from '../components/CounterDisplay';
import CounterDashboard from '../components/CounterDashboard';
import { selectCounterValue, selectCounterSummary } from '../store/selectors';

/**
 * Redux demonstration page showcasing selectors and useSelector
 * Displays multiple components using the same Redux state
 */
const ReduxPage = () => {
  // Using selectors in the page component
  const currentValue = useSelector(selectCounterValue);
  const summary = useSelector(selectCounterSummary);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8">
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
            🔄 Redux State Management
          </h1>
          <p className="text-xl text-white/80 mb-6 max-w-3xl mx-auto">
            Demonstrating Redux selectors, useSelector hook, and state-driven UI updates
          </p>
          
          {/* Live State Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <div className="text-white/90 text-sm mb-2">
              🎯 Current Redux State:
            </div>
            <div className="text-2xl font-bold text-white">
              {summary.emoji} {currentValue}
            </div>
            <div className="text-white/70 text-sm mt-1">
              {summary.category.replace('-', ' ')} • {summary.stats.totalClicks} clicks
            </div>
          </div>
        </div>

        {/* Main Redux Counter */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Interactive Redux Counter
            </h2>
            <p className="text-white/80">
              Main counter component using multiple selectors
            </p>
          </div>
          <ReduxCounter />
        </div>

        {/* Multiple Display Components */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Multiple Components, Same State
            </h2>
            <p className="text-white/80">
              Different components using selectors to display the same Redux state
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">
                Default Display
              </h3>
              <CounterDisplay variant="default" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">
                Compact Display
              </h3>
              <CounterDisplay variant="compact" showDetails={false} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">
                Card Display
              </h3>
              <CounterDisplay variant="card" />
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Redux Analytics Dashboard
            </h2>
            <p className="text-white/80">
              Comprehensive analytics using advanced selectors
            </p>
          </div>
          <CounterDashboard />
        </div>

        {/* Selector Information */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              🎯 Redux Selectors in Action
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Selectors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Basic Selectors Used
                </h3>
                <div className="space-y-2 text-white/80 text-sm">
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-yellow-300">selectCounterValue</code> → {currentValue}
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-yellow-300">selectCounterMessage</code> → "{summary.message}"
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-yellow-300">selectCounterEmoji</code> → {summary.emoji}
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-yellow-300">selectCounterCategory</code> → {summary.category}
                  </div>
                </div>
              </div>

              {/* Advanced Selectors */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Advanced Selectors
                </h3>
                <div className="space-y-2 text-white/80 text-sm">
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-green-300">selectCounterStats</code> → Complex calculations
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-green-300">selectCounterTrend</code> → Trend analysis
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-green-300">selectCounterRange</code> → Min/max values
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <code className="text-green-300">selectCounterSummary</code> → Combined data
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                🚀 Benefits Demonstrated
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                <div>
                  <h4 className="font-semibold text-white mb-2">Performance:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Memoized selectors prevent unnecessary recalculations</li>
                    <li>• Components only re-render when selected data changes</li>
                    <li>• Efficient state access patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Maintainability:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Centralized state access logic</li>
                    <li>• Reusable selector functions</li>
                    <li>• Easy to test and debug</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Flexibility:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Multiple components use same selectors</li>
                    <li>• Easy to add derived data</li>
                    <li>• Composable selector patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Developer Experience:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Type-safe state access</li>
                    <li>• Clear separation of concerns</li>
                    <li>• Redux DevTools integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Built with ❤️ using Redux Toolkit, React-Redux, and selector patterns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReduxPage;
