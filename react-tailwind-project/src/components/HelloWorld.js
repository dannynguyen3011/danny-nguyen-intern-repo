import React from 'react';
import PropTypes from 'prop-types';

/**
 * HelloWorld functional component demonstrating basic React component structure
 * Shows how to use props for dynamic content display
 */
const HelloWorld = ({ name = "Focus Bear" }) => {
  // Handle falsy values by falling back to default, but preserve truthy non-strings
  const displayName = name || "Focus Bear";
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-6 text-center">
      {/* Main greeting */}
      <div className="mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello, {displayName}! 👋
          </h1>
        <p className="text-white/90 text-lg">
          Welcome to our React application!
        </p>
      </div>

      {/* Component info */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">
          🎯 Component Details
        </h2>
        <div className="text-white/90 text-sm space-y-1">
          <p><strong>Component Type:</strong> Functional Component</p>
          <p><strong>Props Received:</strong> name = "{displayName}"</p>
          <p><strong>Default Value:</strong> "Focus Bear"</p>
        </div>
      </div>

      {/* Interactive demonstration */}
      <div className="bg-white/10 rounded-lg p-3">
        <p className="text-white/80 text-sm">
          💡 This component demonstrates how props make components reusable and dynamic!
        </p>
      </div>
    </div>
  );
};

// PropTypes for type checking
HelloWorld.propTypes = {
  name: PropTypes.string
};

// Default props (though we're using default parameters above)
HelloWorld.defaultProps = {
  name: "Focus Bear"
};

export default HelloWorld;
