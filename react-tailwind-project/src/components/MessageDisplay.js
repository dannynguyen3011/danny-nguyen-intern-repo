import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * MessageDisplay component - demonstrates user interaction and state management
 * Features:
 * - Displays a customizable message
 * - Button interactions to change messages
 * - Toggle visibility functionality
 * - Click counter
 */
const MessageDisplay = ({ 
  initialMessage = "Welcome to our React Testing Demo!", 
  showCounter = true 
}) => {
  const [message, setMessage] = useState(initialMessage);
  const [isVisible, setIsVisible] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [currentMessageType, setCurrentMessageType] = useState('welcome');

  // Predefined messages for different scenarios
  const messages = {
    welcome: "Welcome to our React Testing Demo!",
    success: "✅ Operation completed successfully!",
    warning: "⚠️ Please review your input carefully.",
    info: "ℹ️ Here's some helpful information for you.",
    error: "❌ Something went wrong. Please try again.",
    custom: "🎉 This is a custom message!"
  };

  // Handle message change
  const handleChangeMessage = (messageType) => {
    setMessage(messages[messageType] || messages.welcome);
    setCurrentMessageType(messageType);
    setClickCount(prev => prev + 1);
  };

  // Toggle visibility
  const handleToggleVisibility = () => {
    setIsVisible(prev => !prev);
    setClickCount(prev => prev + 1);
  };

  // Reset everything
  const handleReset = () => {
    setMessage(initialMessage);
    setIsVisible(true);
    setClickCount(0);
    setCurrentMessageType('welcome');
  };

  // Get message style based on type
  const getMessageStyle = () => {
    const baseStyle = "p-4 rounded-lg text-center font-medium transition-all duration-300 ";
    
    switch (currentMessageType) {
      case 'success':
        return baseStyle + "bg-green-100 text-green-800 border border-green-200";
      case 'warning':
        return baseStyle + "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case 'info':
        return baseStyle + "bg-blue-100 text-blue-800 border border-blue-200";
      case 'error':
        return baseStyle + "bg-red-100 text-red-800 border border-red-200";
      case 'custom':
        return baseStyle + "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return baseStyle + "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📝 Message Display Component
        </h2>
        <p className="text-gray-600">
          Interactive component for testing user interactions
        </p>
      </div>

      {/* Message Display Area */}
      <div className="mb-6">
        {isVisible ? (
          <div 
            className={getMessageStyle()}
            data-testid="message-display"
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        ) : (
          <div 
            className="p-4 rounded-lg text-center font-medium bg-gray-50 text-gray-500 border border-gray-200"
            data-testid="hidden-message"
          >
            Message is hidden. Click "Toggle Visibility" to show it.
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="space-y-4">
        {/* Message Type Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            onClick={() => handleChangeMessage('welcome')}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
            data-testid="welcome-button"
          >
            Welcome
          </button>
          <button
            onClick={() => handleChangeMessage('success')}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
            data-testid="success-button"
          >
            Success
          </button>
          <button
            onClick={() => handleChangeMessage('warning')}
            className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
            data-testid="warning-button"
          >
            Warning
          </button>
          <button
            onClick={() => handleChangeMessage('info')}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            data-testid="info-button"
          >
            Info
          </button>
          <button
            onClick={() => handleChangeMessage('error')}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            data-testid="error-button"
          >
            Error
          </button>
          <button
            onClick={() => handleChangeMessage('custom')}
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
            data-testid="custom-button"
          >
            Custom
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleToggleVisibility}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
            data-testid="toggle-visibility-button"
          >
            {isVisible ? 'Hide Message' : 'Show Message'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            data-testid="reset-button"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Stats Display */}
      {showCounter && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Interaction Statistics</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-blue-600" data-testid="click-count">
                  {clickCount}
                </p>
                <p className="text-xs text-gray-500">Total Clicks</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600" data-testid="message-type">
                  {currentMessageType}
                </p>
                <p className="text-xs text-gray-500">Message Type</p>
              </div>
              <div>
                <p className="text-lg font-bold text-purple-600" data-testid="visibility-status">
                  {isVisible ? 'Visible' : 'Hidden'}
                </p>
                <p className="text-xs text-gray-500">Visibility</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Component includes ARIA labels and semantic HTML for accessibility
        </p>
      </div>
    </div>
  );
};

MessageDisplay.propTypes = {
  initialMessage: PropTypes.string,
  showCounter: PropTypes.bool
};

export default MessageDisplay;
