import React, { useState } from 'react';

/**
 * Simple Counter component demonstrating useState hook
 * Shows basic state management with increment functionality
 */
const SimpleCounter = () => {
  // useState hook to manage count state
  const [count, setCount] = useState(0);

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Alternative increment function using functional update
  const incrementCountFunctional = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Function to reset count
  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Simple Counter
      </h2>
      
      {/* Display count dynamically */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {count}
        </div>
        <p className="text-gray-600">Current Count</p>
      </div>

      {/* Increment button */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={incrementCount}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Increment
        </button>
        
        <button
          onClick={incrementCountFunctional}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Increment (Functional)
        </button>
        
        <button
          onClick={resetCount}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Educational note */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This component demonstrates proper state management using useState. 
          Never modify state directly - always use the setter function!
        </p>
      </div>
    </div>
  );
};

export default SimpleCounter;
