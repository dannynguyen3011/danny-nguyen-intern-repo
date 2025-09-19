import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import {
  increment as reduxIncrement,
  decrement as reduxDecrement,
  setStep as reduxSetStep,
  reset as reduxReset,
  undo as reduxUndo
} from '../store/counterSlice';
import {
  selectCounterValue,
  selectCounterStep,
  selectCounterHistory,
  selectCanUndo
} from '../store/selectors';

/**
 * Counter component with Tailwind CSS styling
 * Demonstrates various button states and interactions
 * Supports both useState and Redux modes for comparison
 */
const Counter = ({ useRedux = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // useState state (used when useRedux is false)
  const [localCount, setLocalCount] = useState(0);
  const [localStep, setLocalStep] = useState(1);
  const [localHistory, setLocalHistory] = useState([0]);
  
  // Redux state (used when useRedux is true)
  const reduxCount = useSelector(selectCounterValue);
  const reduxStep = useSelector(selectCounterStep);
  const reduxHistory = useSelector(selectCounterHistory);
  const reduxCanUndo = useSelector(selectCanUndo);
  
  // Choose state source based on useRedux prop
  const count = useRedux ? reduxCount : localCount;
  const step = useRedux ? reduxStep : localStep;
  const history = useRedux ? reduxHistory : localHistory;

  // Memoized handlers using useCallback
  const increment = useCallback(() => {
    if (useRedux) {
      dispatch(reduxIncrement());
    } else {
      const newCount = localCount + localStep;
      setLocalCount(newCount);
      setLocalHistory(prev => [...prev, newCount]);
    }
  }, [useRedux, dispatch, localCount, localStep]);

  const decrement = useCallback(() => {
    if (useRedux) {
      dispatch(reduxDecrement());
    } else {
      const newCount = localCount - localStep;
      setLocalCount(newCount);
      setLocalHistory(prev => [...prev, newCount]);
    }
  }, [useRedux, dispatch, localCount, localStep]);

  const reset = useCallback(() => {
    if (useRedux) {
      dispatch(reduxReset());
    } else {
      setLocalCount(0);
      setLocalHistory([0]);
    }
  }, [useRedux, dispatch]);

  const handleStepChange = useCallback((newStep) => {
    if (useRedux) {
      dispatch(reduxSetStep(newStep));
    } else {
      setLocalStep(newStep);
    }
  }, [useRedux, dispatch]);

  const undo = useCallback(() => {
    if (useRedux) {
      dispatch(reduxUndo());
    } else {
      if (localHistory.length > 1) {
        const newHistory = localHistory.slice(0, -1);
        const previousCount = newHistory[newHistory.length - 1];
        setLocalCount(previousCount);
        setLocalHistory(newHistory);
      }
    }
  }, [useRedux, dispatch, localHistory]);

  const canUndo = useRedux ? reduxCanUndo : localHistory.length > 1;
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
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
          useRedux 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {useRedux ? '🔄 Redux Mode' : '⚡ useState Mode'}
        </div>
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
