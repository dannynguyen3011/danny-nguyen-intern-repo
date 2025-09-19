import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import Button from '../components/Button';

/**
 * Counter page showcasing the Counter component and Button variants
 */
const CounterPage = () => {
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
            🎨 Tailwind CSS Counter
          </h1>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            A beautiful counter component showcasing Tailwind CSS utilities, 
            custom Button component, and interactive states
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-6 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">9</div>
              <div className="text-sm">Button Variants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm">Interactive States</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Tailwind CSS</div>
            </div>
          </div>
        </div>

        {/* Main Counter Component */}
        <div className="mb-12">
          <Counter />
        </div>

        {/* Button Showcase Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              🎯 Button Component Showcase
            </h2>
            
            {/* All Button Variants */}
            <div className="space-y-8">
              {/* Primary Variants */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Primary Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                </div>
              </div>

              {/* Special Variants */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Special Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="gradient">Gradient</Button>
                </div>
              </div>

              {/* Size Variants */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Size Variants</h3>
                <div className="flex flex-wrap items-end gap-3">
                  <Button variant="primary" size="small">Small</Button>
                  <Button variant="primary" size="medium">Medium</Button>
                  <Button variant="primary" size="large">Large</Button>
                  <Button variant="primary" size="extraLarge">Extra Large</Button>
                </div>
              </div>

              {/* State Demonstrations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">State Demonstrations</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Normal State</Button>
                  <Button variant="primary" disabled>Disabled State</Button>
                  <Button variant="success" fullWidth className="mt-3">Full Width Button</Button>
                </div>
              </div>

              {/* Interactive Features Demo */}
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🎮 Interactive Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Hover Effects:</h4>
                    <ul className="space-y-1">
                      <li>• Background color darkens</li>
                      <li>• Shadow increases (hover:shadow-xl)</li>
                      <li>• Smooth transitions (duration-200)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Active Effects:</h4>
                    <ul className="space-y-1">
                      <li>• Scale down (active:scale-95)</li>
                      <li>• Background gets darker</li>
                      <li>• Immediate feedback</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Focus Effects:</h4>
                    <ul className="space-y-1">
                      <li>• Ring outline for accessibility</li>
                      <li>• Color-matched focus rings</li>
                      <li>• Keyboard navigation support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Disabled State:</h4>
                    <ul className="space-y-1">
                      <li>• Reduced opacity (opacity-50)</li>
                      <li>• Cursor changes to not-allowed</li>
                      <li>• No transform effects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Built with ❤️ using Tailwind CSS utilities and React components
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
