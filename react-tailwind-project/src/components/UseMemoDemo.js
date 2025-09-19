import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Expensive calculation function that simulates heavy computation
 * @param {number[]} numbers - Array of numbers to process
 * @returns {Object} Calculation result with sum, squares sum, and time taken
 */
const expensiveCalculation = (numbers) => {
  console.log('🔥 Running expensive calculation...');
  const startTime = performance.now();
  
  // Simulate heavy computation with unnecessary loops
  let sum = 0;
  let sumOfSquares = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    // Add some artificial delay to make it actually expensive
    for (let j = 0; j < 1000; j++) {
      // Simulate complex calculation
      Math.sqrt(numbers[i] * j);
    }
    
    sum += numbers[i];
    sumOfSquares += numbers[i] * numbers[i];
  }
  
  const endTime = performance.now();
  const computationTime = Math.round(endTime - startTime);
  
  return {
    sum,
    sumOfSquares,
    computationTime,
    timestamp: new Date().toISOString()
  };
};

/**
 * Component demonstrating useMemo for expensive calculations
 */
const UseMemoDemo = () => {
  const { t } = useTranslation();
  const [listSize, setListSize] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [recomputationCount, setRecomputationCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  
  // Generate array of numbers based on listSize
  const numbers = useMemo(() => {
    console.log('📊 Generating numbers array...');
    return Array.from({ length: listSize }, (_, i) => i + 1);
  }, [listSize]);
  
  // Expensive calculation with useMemo (when enabled)
  const expensiveResult = useMemo(() => {
    if (!useMemoEnabled) {
      // If useMemo is disabled, calculate every time
      const result = expensiveCalculation(numbers);
      setRecomputationCount(prev => prev + 1);
      return result;
    }
    
    // With useMemo, only recalculate when dependencies change
    console.log('🚀 useMemo: Recalculating expensive result...');
    const result = expensiveCalculation(numbers);
    setRecomputationCount(prev => prev + 1);
    return result;
  }, useMemoEnabled ? [numbers] : [numbers, Math.random()]); // Random dependency forces recalculation when disabled
  
  // Calculate display value (this doesn't need useMemo as it's not expensive)
  const displayValue = expensiveResult.sumOfSquares * multiplier;
  
  // Handlers
  const handleListSizeChange = useCallback((event) => {
    setListSize(parseInt(event.target.value));
  }, []);
  
  const handleMultiplierChange = useCallback((event) => {
    setMultiplier(parseFloat(event.target.value));
  }, []);
  
  const handleToggleUseMemo = useCallback(() => {
    setUseMemoEnabled(prev => !prev);
    setRecomputationCount(0); // Reset counter when toggling
  }, []);
  
  const handleReset = useCallback(() => {
    setListSize(100);
    setMultiplier(1);
    setRecomputationCount(0);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t('performance.useMemo.title')}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {t('performance.useMemo.description')}
      </p>
      
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('performance.useMemo.listSize', { count: listSize })}
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            value={listSize}
            onChange={handleListSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10</span>
            <span>{listSize}</span>
            <span>1000</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Multiplier: {multiplier}x
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={multiplier}
            onChange={handleMultiplierChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.1x</span>
            <span>{multiplier}x</span>
            <span>5x</span>
          </div>
        </div>
      </div>
      
      {/* useMemo Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-800">useMemo Status</h3>
          <p className="text-sm text-gray-600">
            {useMemoEnabled 
              ? 'useMemo is ENABLED - calculations cached when dependencies unchanged'
              : 'useMemo is DISABLED - calculations run on every render'
            }
          </p>
        </div>
        <button
          onClick={handleToggleUseMemo}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            useMemoEnabled
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {useMemoEnabled ? 'Disable useMemo' : 'Enable useMemo'}
        </button>
      </div>
      
      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Calculation Results</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Sum of Numbers:</span>
              <span className="ml-2 text-blue-600">{expensiveResult.sum.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-medium">Sum of Squares:</span>
              <span className="ml-2 text-blue-600">{expensiveResult.sumOfSquares.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-medium">Display Value:</span>
              <span className="ml-2 text-blue-600 font-bold">{displayValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Performance Metrics</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Computation Time:</span>
              <span className="ml-2 text-yellow-600">{expensiveResult.computationTime}ms</span>
            </div>
            <div>
              <span className="font-medium">Total Recomputations:</span>
              <span className="ml-2 text-yellow-600 font-bold">{recomputationCount}</span>
            </div>
            <div>
              <span className="font-medium">Last Calculated:</span>
              <span className="ml-2 text-yellow-600">{new Date(expensiveResult.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-purple-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-purple-800 mb-2">🧪 Experiment Instructions</h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Change the <strong>multiplier</strong> - notice calculations don't re-run with useMemo enabled</li>
          <li>• Change the <strong>list size</strong> - calculations re-run because numbers array changes</li>
          <li>• <strong>Disable useMemo</strong> and change multiplier - watch recomputation count increase</li>
          <li>• Open DevTools Console to see when expensive calculations run</li>
        </ul>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          {t('buttons.reset')}
        </button>
        <button
          onClick={() => setMultiplier(Math.random() * 5)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          Random Multiplier
        </button>
      </div>
    </div>
  );
};

export default UseMemoDemo;
