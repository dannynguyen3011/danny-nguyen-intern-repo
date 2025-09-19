import React, { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Child component that receives a function as prop
 * Wrapped with memo to prevent unnecessary re-renders when props haven't changed
 */
const ChildComponent = memo(({ onIncrement, label, renderCount }) => {
  const { t } = useTranslation();
  
  // Track renders of this component
  const currentRenderCount = React.useRef(0);
  currentRenderCount.current += 1;
  
  console.log(`🔄 ChildComponent "${label}" rendered ${currentRenderCount.current} times`);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
      <h4 className="font-semibold text-gray-800 mb-2">{label}</h4>
      <div className="space-y-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Component renders:</span>
          <span className="ml-2 text-red-600 font-bold">{currentRenderCount.current}</span>
        </div>
        <button
          onClick={onIncrement}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          {t('performance.useCallback.increment')}
        </button>
      </div>
    </div>
  );
});

ChildComponent.displayName = 'ChildComponent';

/**
 * Component demonstrating useCallback optimization
 */
const UseCallbackDemo = () => {
  const { t } = useTranslation();
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);
  
  // Function WITHOUT useCallback - creates new function on every render
  const incrementCounter1WithoutCallback = () => {
    console.log('📝 Creating new incrementCounter1 function (without useCallback)');
    setCounter1(prev => prev + 1);
  };
  
  // Function WITH useCallback - memoized, only recreated when dependencies change
  const incrementCounter1WithCallback = useCallback(() => {
    console.log('🔄 Using memoized incrementCounter1 function (with useCallback)');
    setCounter1(prev => prev + 1);
  }, []); // Empty dependency array - function never changes
  
  // Function for counter2 with useCallback
  const incrementCounter2 = useCallback(() => {
    console.log('🔄 Using memoized incrementCounter2 function');
    setCounter2(prev => prev + 1);
  }, []); // Empty dependency array - function never changes
  
  // Choose which function to pass based on toggle
  const incrementCounter1 = useCallbackEnabled 
    ? incrementCounter1WithCallback 
    : incrementCounter1WithoutCallback;
  
  // Handler for unrelated state (always uses useCallback for comparison)
  const incrementUnrelated = useCallback(() => {
    setUnrelatedState(prev => prev + 1);
  }, []);
  
  // Reset handler
  const handleReset = useCallback(() => {
    setCounter1(0);
    setCounter2(0);
    setUnrelatedState(0);
  }, []);
  
  // Toggle useCallback
  const toggleUseCallback = useCallback(() => {
    setUseCallbackEnabled(prev => !prev);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t('performance.useCallback.title')}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {t('performance.useCallback.description')}
      </p>
      
      {/* useCallback Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-800">useCallback Status</h3>
          <p className="text-sm text-gray-600">
            {useCallbackEnabled 
              ? 'useCallback is ENABLED - function reference stable across renders'
              : 'useCallback is DISABLED - new function created on every render'
            }
          </p>
        </div>
        <button
          onClick={toggleUseCallback}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            useCallbackEnabled
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {useCallbackEnabled ? 'Disable useCallback' : 'Enable useCallback'}
        </button>
      </div>
      
      {/* Current Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold text-blue-800">Counter 1</h3>
          <p className="text-2xl font-bold text-blue-600">{counter1}</p>
          <p className="text-xs text-blue-500">
            {useCallbackEnabled ? 'with useCallback' : 'without useCallback'}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold text-green-800">Counter 2</h3>
          <p className="text-2xl font-bold text-green-600">{counter2}</p>
          <p className="text-xs text-green-500">always with useCallback</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold text-purple-800">Unrelated State</h3>
          <p className="text-2xl font-bold text-purple-600">{unrelatedState}</p>
          <p className="text-xs text-purple-500">triggers parent re-renders</p>
        </div>
      </div>
      
      {/* Child Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ChildComponent
          onIncrement={incrementCounter1}
          label={`Child 1 (${useCallbackEnabled ? 'with useCallback' : 'without useCallback'})`}
        />
        <ChildComponent
          onIncrement={incrementCounter2}
          label="Child 2 (always with useCallback)"
        />
      </div>
      
      {/* Instructions */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-yellow-800 mb-2">🧪 Experiment Instructions</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Enable useCallback</strong> and click "Change Unrelated State" - Child 1 won't re-render</li>
          <li>• <strong>Disable useCallback</strong> and click "Change Unrelated State" - Child 1 will re-render</li>
          <li>• Child 2 always uses useCallback, so it never re-renders unnecessarily</li>
          <li>• Open DevTools Console to see function creation and component render logs</li>
          <li>• Use React DevTools Profiler to see render performance</li>
        </ul>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={incrementUnrelated}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        >
          Change Unrelated State ({unrelatedState})
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          {t('buttons.reset')}
        </button>
        <button
          onClick={() => {
            // Force multiple state changes to trigger re-renders
            setUnrelatedState(prev => prev + 1);
            setTimeout(() => setUnrelatedState(prev => prev + 1), 100);
            setTimeout(() => setUnrelatedState(prev => prev + 1), 200);
          }}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
        >
          Trigger Multiple Re-renders
        </button>
      </div>
    </div>
  );
};

export default UseCallbackDemo;
