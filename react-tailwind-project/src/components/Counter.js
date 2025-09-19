import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

/**
 * Counter component with Tailwind CSS styling
 * Demonstrates various button states and interactions
 */
const Counter = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([0]);

  // Memoized handlers using useCallback
  const increment = useCallback(() => {
    const newCount = count + step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  }, [count, step]);

  const decrement = useCallback(() => {
    const newCount = count - step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  }, [count, step]);

  const reset = useCallback(() => {
    setCount(0);
    setHistory([0]);
  }, []);

  const handleStepChange = useCallback((newStep) => {
    setStep(newStep);
  }, []);

  const undo = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousCount = newHistory[newHistory.length - 1];
      setCount(previousCount);
      setHistory(newHistory);
    }
  }, [history]);

  const canUndo = history.length > 1;
  const isAtZero = count === 0;

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🔢 Interactive Counter
        </h2>
        <p className="text-gray-600">
          Styled with Tailwind CSS & custom Button component
        </p>
      </div>

      {/* Counter Display */}
      <div className="text-center mb-8">
        <div className="relative">
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {count}
          </div>
          <div className="absolute inset-0 text-6xl font-bold text-gray-200 -z-10">
            {count}
          </div>
        </div>
        
        {/* Count Status */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full transition-colors ${
            count > 0 ? 'bg-green-500' : count < 0 ? 'bg-red-500' : 'bg-gray-400'
          }`}></div>
          <span className="text-sm text-gray-600 font-medium">
            {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
          </span>
        </div>

        {/* History Length */}
        <div className="text-xs text-gray-500">
          History: {history.length} step{history.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Step Size Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Step Size: {step}
        </label>
        <div className="flex gap-2 justify-center">
          {[1, 5, 10].map((stepValue) => (
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
          onClick={increment}
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">
            ➕ +{step}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
        
        <Button
          variant="danger"
          size="large"
          onClick={decrement}
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">
            ➖ -{step}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>

      {/* Secondary Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant="warning"
          size="medium"
          onClick={reset}
          disabled={isAtZero}
          className="transition-transform hover:scale-105"
        >
          🔄 Reset
        </Button>
        
        <Button
          variant="info"
          size="medium"
          onClick={undo}
          disabled={!canUndo}
          className="transition-transform hover:scale-105"
        >
          ↩️ Undo
        </Button>
      </div>

      {/* Demonstration Buttons */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 text-center mb-3">
          Button Variants Demo:
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button variant="gradient" size="small">
            Gradient
          </Button>
          <Button variant="ghost" size="small">
            Ghost
          </Button>
          <Button variant="outline" size="small">
            Outline
          </Button>
        </div>

        <Button 
          variant="secondary" 
          size="small" 
          fullWidth
          className="mt-3"
        >
          Full Width Button
        </Button>
      </div>

      {/* Interactive States Demo */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          🎯 Tailwind Interactive States:
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• <span className="font-medium">Hover:</span> Background darkens, shadow increases</div>
          <div>• <span className="font-medium">Active:</span> Scale down (transform), darker background</div>
          <div>• <span className="font-medium">Focus:</span> Ring outline for accessibility</div>
          <div>• <span className="font-medium">Disabled:</span> Reduced opacity, no interactions</div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
