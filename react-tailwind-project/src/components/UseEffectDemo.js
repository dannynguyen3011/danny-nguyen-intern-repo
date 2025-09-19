import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component demonstrating useEffect for lifecycle management and data fetching
 */
const UseEffectDemo = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoFetch, setAutoFetch] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [mountTime, setMountTime] = useState(null);

  // Effect 1: Component Mount/Unmount Lifecycle
  useEffect(() => {
    const mountTimestamp = new Date().toISOString();
    setMountTime(mountTimestamp);
    
    console.log('🟢 UseEffectDemo: Component MOUNTED at', mountTimestamp);
    
    // Cleanup function - runs when component unmounts
    return () => {
      console.log('🔴 UseEffectDemo: Component UNMOUNTING at', new Date().toISOString());
      console.log('🔴 Component was mounted for', Date.now() - new Date(mountTimestamp).getTime(), 'ms');
    };
  }, []); // Empty dependency array - runs once on mount, cleanup on unmount

  // Effect 2: Auto-fetch data when autoFetch is enabled
  useEffect(() => {
    let intervalId;
    
    if (autoFetch) {
      console.log('⏰ Starting auto-fetch interval');
      
      // Fetch immediately when enabled
      fetchData();
      
      // Set up interval for periodic fetching
      intervalId = setInterval(() => {
        console.log('⏰ Auto-fetch triggered by interval');
        fetchData();
      }, 5000); // Fetch every 5 seconds
      
      // Cleanup function - clears interval when effect re-runs or component unmounts
      return () => {
        console.log('⏰ Clearing auto-fetch interval');
        clearInterval(intervalId);
      };
    }
    
    // If autoFetch is disabled, no cleanup needed
    return undefined;
  }, [autoFetch]); // Dependency: autoFetch - effect runs when autoFetch changes

  // Effect 3: Log when fetchCount changes (demonstrating dependency array)
  useEffect(() => {
    if (fetchCount > 0) {
      console.log(`📊 Fetch count updated: ${fetchCount} total fetches`);
    }
  }, [fetchCount]); // Dependency: fetchCount - effect runs when fetchCount changes

  // Effect 4: Window resize listener (demonstrating event listener cleanup)
  useEffect(() => {
    const handleResize = () => {
      console.log(`📐 Window resized to: ${window.innerWidth}x${window.innerHeight}`);
    };

    console.log('👂 Adding resize event listener');
    window.addEventListener('resize', handleResize);

    // Cleanup function - removes event listener
    return () => {
      console.log('👂 Removing resize event listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - add listener on mount, remove on unmount

  // Data fetching function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🌐 Fetching data from API...');
      
      // Simulate API call with random delay
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Fetch random user data from JSONPlaceholder
      const userId = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      
      // Add some additional metadata
      const enrichedData = {
        ...userData,
        fetchedAt: new Date().toISOString(),
        fetchDelay: Math.round(delay),
        fetchNumber: fetchCount + 1
      };
      
      setData(enrichedData);
      setFetchCount(prev => prev + 1);
      
      console.log('✅ Data fetched successfully:', enrichedData);
      
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchCount]);

  // Manual fetch handler
  const handleManualFetch = useCallback(() => {
    console.log('👆 Manual fetch triggered by button click');
    fetchData();
  }, [fetchData]);

  // Toggle auto-fetch
  const handleToggleAutoFetch = useCallback(() => {
    setAutoFetch(prev => {
      const newValue = !prev;
      console.log(`🔄 Auto-fetch ${newValue ? 'ENABLED' : 'DISABLED'}`);
      return newValue;
    });
  }, []);

  // Clear data
  const handleClearData = useCallback(() => {
    console.log('🗑️ Clearing data');
    setData(null);
    setError(null);
    setFetchCount(0);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        useEffect Demo - Lifecycle & Data Fetching
      </h2>
      
      <p className="text-gray-600 mb-6">
        This component demonstrates useEffect for lifecycle management, data fetching, and cleanup functions.
      </p>

      {/* Component Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Component Lifecycle</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div><strong>Mounted at:</strong> {mountTime}</div>
          <div><strong>Total fetches:</strong> {fetchCount}</div>
          <div><strong>Auto-fetch:</strong> {autoFetch ? '✅ Enabled' : '❌ Disabled'}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleManualFetch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold transition-colors"
        >
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
        
        <button
          onClick={handleToggleAutoFetch}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            autoFetch
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {autoFetch ? 'Stop Auto-Fetch' : 'Start Auto-Fetch'}
        </button>
        
        <button
          onClick={handleClearData}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          Clear Data
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
            <span className="text-yellow-700">Loading data...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-green-800 mb-3">Fetched Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-700 mb-2">User Information</h4>
              <div className="space-y-1 text-green-600">
                <div><strong>Name:</strong> {data.name}</div>
                <div><strong>Email:</strong> {data.email}</div>
                <div><strong>Phone:</strong> {data.phone}</div>
                <div><strong>Website:</strong> {data.website}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-700 mb-2">Fetch Metadata</h4>
              <div className="space-y-1 text-green-600">
                <div><strong>Fetch #:</strong> {data.fetchNumber}</div>
                <div><strong>Fetched at:</strong> {new Date(data.fetchedAt).toLocaleTimeString()}</div>
                <div><strong>Delay:</strong> {data.fetchDelay}ms</div>
                <div><strong>User ID:</strong> {data.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">🧪 Experiment Instructions</h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Open DevTools Console to see lifecycle and effect logs</li>
          <li>• Click "Fetch Data" to see manual API calls</li>
          <li>• Enable "Auto-Fetch" to see periodic data fetching</li>
          <li>• Resize the window to see event listener in action</li>
          <li>• Navigate away from this component to see unmount cleanup</li>
          <li>• Notice how cleanup functions prevent memory leaks</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectDemo;
