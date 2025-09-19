import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCounterValue,
  selectCounterHistory,
  selectCounterStats,
  selectCounterTrend,
  selectCounterRange,
  selectLastAction,
  selectTotalClicks
} from '../store/selectors';

/**
 * Dashboard component showing comprehensive counter analytics
 * Uses multiple selectors to display different aspects of the state
 */
const CounterDashboard = () => {
  // Using individual selectors for specific data points
  const value = useSelector(selectCounterValue);
  const history = useSelector(selectCounterHistory);
  const stats = useSelector(selectCounterStats);
  const trend = useSelector(selectCounterTrend);
  const range = useSelector(selectCounterRange);
  const lastAction = useSelector(selectLastAction);
  const totalClicks = useSelector(selectTotalClicks);

  const getTrendColor = () => {
    switch (trend) {
      case 'increasing': return 'text-green-600 bg-green-50';
      case 'decreasing': return 'text-red-600 bg-red-50';
      case 'stable': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getValueColor = () => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📊 Counter Dashboard
        </h2>
        <p className="text-gray-600">
          Real-time analytics powered by Redux selectors
        </p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Current Value */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${getValueColor()}`}>
            {value}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Current Value
          </div>
        </div>

        {/* Total Clicks */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalClicks}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Total Clicks
          </div>
        </div>

        {/* History Length */}
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {history.length}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            History Points
          </div>
        </div>

        {/* Range */}
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {range.range}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Value Range
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📈 Trend Analysis
        </h3>
        <div className={`rounded-lg p-4 ${getTrendColor()}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">
              Current Trend: {trend.replace('-', ' ').toUpperCase()}
            </span>
            <span className="text-2xl">
              {trend === 'increasing' ? '📈' : trend === 'decreasing' ? '📉' : '➡️'}
            </span>
          </div>
          <div className="mt-2 text-sm opacity-80">
            Min: {range.min} | Max: {range.max} | Average Change: {stats.averageChange}
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📋 Recent History
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {history.slice(-10).map((val, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm font-medium ${
                  val === value 
                    ? 'bg-blue-600 text-white' 
                    : val > 0 
                      ? 'bg-green-100 text-green-800' 
                      : val < 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {val}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            Showing last {Math.min(10, history.length)} values
          </div>
        </div>
      </div>

      {/* Action Log */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          ⚡ Last Action
        </h3>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="font-medium text-yellow-800">
            {lastAction || 'No actions yet'}
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            Redux action tracking via selectors
          </div>
        </div>
      </div>

      {/* Selector Info */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="text-xs text-blue-700">
          <strong>🎯 Selector Usage:</strong> This dashboard uses {' '}
          <code className="bg-blue-100 px-1 rounded">selectCounterValue</code>, {' '}
          <code className="bg-blue-100 px-1 rounded">selectCounterHistory</code>, {' '}
          <code className="bg-blue-100 px-1 rounded">selectCounterStats</code>, {' '}
          <code className="bg-blue-100 px-1 rounded">selectCounterTrend</code>, and more!
        </div>
      </div>
    </div>
  );
};

export default CounterDashboard;
