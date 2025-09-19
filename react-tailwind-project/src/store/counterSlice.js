import { createSlice } from '@reduxjs/toolkit';

/**
 * Counter slice using Redux Toolkit
 * Manages counter state with actions and reducers
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    step: 1,
    history: [0],
    lastAction: null,
    totalClicks: 0
  },
  reducers: {
    increment: (state) => {
      state.value += state.step;
      state.history.push(state.value);
      state.lastAction = 'increment';
      state.totalClicks += 1;
    },
    decrement: (state) => {
      state.value -= state.step;
      state.history.push(state.value);
      state.lastAction = 'decrement';
      state.totalClicks += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(state.value);
      state.lastAction = `incrementByAmount(${action.payload})`;
      state.totalClicks += 1;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
      state.history.push(state.value);
      state.lastAction = `decrementByAmount(${action.payload})`;
      state.totalClicks += 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
      state.lastAction = `setStep(${action.payload})`;
    },
    reset: (state) => {
      state.value = 0;
      state.step = 1;
      state.history = [0];
      state.lastAction = 'reset';
      state.totalClicks = 0;
    },
    undo: (state) => {
      if (state.history.length > 1) {
        state.history.pop(); // Remove current value
        state.value = state.history[state.history.length - 1];
        state.lastAction = 'undo';
      }
    },
    setCounterValue: (state, action) => {
      state.value = action.payload;
      state.history.push(state.value);
      state.lastAction = `setCounterValue(${action.payload})`;
    }
  }
});

// Export actions
export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  setStep,
  reset,
  undo,
  setCounterValue
} = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
