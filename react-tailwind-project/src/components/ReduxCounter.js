import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  decrementByAmount,
  setStep, 
  reset, 
  undo,
  setCounterValue
} from '../store/counterSlice';
import {
  selectCounterValue,
  selectCounterStep,
  selectCounterMessage,
  selectCounterEmoji,
  selectCounterCategory,
  selectCanUndo,
  selectCounterStats,
  selectCounterSummary
} from '../store/selectors';
import Button from './Button';

/**
 * Redux-connected Counter component using selectors
 * Demonstrates useSelector with multiple selector patterns
 */
const ReduxCounter = () => {
  const dispatch = useDispatch();
  
  // Using individual selectors
  const value = useSelector(selectCounterValue);
  const step = useSelector(selectCounterStep);
  const message = useSelector(selectCounterMessage);
  const emoji = useSelector(selectCounterEmoji);
  const category = useSelector(selectCounterCategory);
  const canUndo = useSelector(selectCanUndo);
  const stats = useSelector(selectCounterStats);
  
  // Using combined selector for efficiency
  const summary = useSelector(selectCounterSummary);

  const handleStepChange = (newStep) => {
    dispatch(setStep(newStep));
  };

  const handleCustomValue = () => {
    const customValue = prompt('Enter a custom counter value:');
    if (customValue !== null && !isNaN(customValue)) {
      dispatch(setCounterValue(parseInt(customValue)));
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      case 'negative-beginner': return 'bg-yellow-100 text-yellow-800';
      case 'negative-expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Redux Counter {emoji}
        </h2>
        <p className="text-gray-600">
          Powered by Redux selectors and useSelector hook
        </p>
      </div>

      {/* Counter Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          {value}
        </div>
        
        {/* Category Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)} mb-4`}>
          {category.replace('-', ' ').toUpperCase()}
        </div>
        
        {/* Dynamic Message */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-medium">
            {message}
          </p>
        </div>
      </div>

      {/* Step Size Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Step Size: {step}
        </label>
        <div className="flex gap-2 justify-center">
          {[1, 2, 5, 10].map((stepValue) => (
            <Button
              key={stepValue}
              variant={step === stepValue ? 'primary' : 'outline'}
              size="small"
              onClick={() => handleStepChange(stepValue)}
              className="min-w-[3rem]"
            >
              {stepValue}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="success"
          size="large"
          onClick={() => dispatch(increment())}
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">
            ➕ +{step}
          </span>
        </Button>
        
        <Button
          variant="danger"
          size="large"
          onClick={() => dispatch(decrement())}
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">
            ➖ -{step}
          </span>
        </Button>
      </div>

      {/* Advanced Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant="info"
          size="medium"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5 Boost
        </Button>
        
        <Button
          variant="warning"
          size="medium"
          onClick={() => dispatch(decrementByAmount(3))}
        >
          -3 Quick
        </Button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <Button
          variant="secondary"
          size="small"
          onClick={() => dispatch(reset())}
        >
          🔄 Reset
        </Button>
        
        <Button
          variant="outline"
          size="small"
          onClick={() => dispatch(undo())}
          disabled={!canUndo}
        >
          ↩️ Undo
        </Button>
        
        <Button
          variant="ghost"
          size="small"
          onClick={handleCustomValue}
        >
          🎯 Set
        </Button>
      </div>

      {/* Stats Display */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          📊 Redux Stats (via selectors):
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <div><strong>Total Clicks:</strong> {stats.totalClicks}</div>
            <div><strong>History Length:</strong> {stats.historyLength}</div>
          </div>
          <div>
            <div><strong>Current Step:</strong> {stats.currentStep}</div>
            <div><strong>Avg Change:</strong> {stats.averageChange}</div>
          </div>
        </div>
        {stats.lastAction && (
          <div className="mt-2 text-xs text-gray-500">
            <strong>Last Action:</strong> {stats.lastAction}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReduxCounter;
