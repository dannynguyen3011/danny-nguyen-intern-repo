import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCounterValue,
  selectCounterMessage,
  selectCounterEmoji,
  selectCounterStatus,
  selectCounterTrend,
  selectCounterRange
} from '../store/selectors';

/**
 * Pure display component that uses selectors to show counter information
 * Demonstrates separation of concerns and reusable display logic
 */
const CounterDisplay = ({ variant = 'default', showDetails = true }) => {
  // Using multiple selectors to get different pieces of state
  const value = useSelector(selectCounterValue);
  const message = useSelector(selectCounterMessage);
  const emoji = useSelector(selectCounterEmoji);
  const status = useSelector(selectCounterStatus);
  const trend = useSelector(selectCounterTrend);
  const range = useSelector(selectCounterRange);

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'bg-white rounded-lg shadow-md p-4';
      case 'minimal':
        return 'bg-gray-50 rounded p-3';
      case 'card':
        return 'bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6';
      default:
        return 'bg-white rounded-lg shadow-md p-6';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'zero': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={getVariantStyles()}>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Counter:</span>
          <span className={`text-xl font-bold ${getStatusColor()}`}>
            {emoji} {value}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={getVariantStyles()}>
        <div className="text-center">
          <div className={`text-3xl font-bold ${getStatusColor()}`}>
            {emoji} {value}
          </div>
          <p className="text-sm text-gray-600 mt-2">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={getVariantStyles()}>
      {/* Main Display */}
      <div className="text-center mb-4">
        <div className={`text-4xl font-bold ${getStatusColor()} mb-2`}>
          {emoji} {value}
        </div>
        <div className="text-sm text-gray-500 uppercase tracking-wide">
          Status: {status}
        </div>
      </div>

      {/* Message */}
      <div className="bg-white/50 rounded-lg p-3 mb-4">
        <p className="text-gray-700 text-center font-medium">
          {message}
        </p>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Trend:</span>
            <span className="font-medium">
              {getTrendIcon()} {trend.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Range:</span>
            <span className="font-medium">
              {range.min} to {range.max} (span: {range.range})
            </span>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            🎯 Powered by Redux selectors
          </div>
        </div>
      )}
    </div>
  );
};

export default CounterDisplay;
