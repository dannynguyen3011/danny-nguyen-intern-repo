import { createSelector } from '@reduxjs/toolkit';

/**
 * Redux selectors for accessing counter state
 * Demonstrates different selector patterns and memoization
 */

// Basic selectors - direct state access
export const selectCounterState = (state) => state.counter;
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterStep = (state) => state.counter.step;
export const selectCounterHistory = (state) => state.counter.history;
export const selectLastAction = (state) => state.counter.lastAction;
export const selectTotalClicks = (state) => state.counter.totalClicks;

// Memoized selectors using createSelector
export const selectCounterStatus = createSelector(
  [selectCounterValue],
  (value) => {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'zero';
  }
);

export const selectCounterMessage = createSelector(
  [selectCounterValue],
  (value) => {
    if (value === 0) return "🎯 Starting point - Ready to count!";
    if (value > 0 && value <= 5) return "🌱 Small steps lead to big changes!";
    if (value > 5 && value <= 10) return "🚀 You're gaining momentum!";
    if (value > 10 && value <= 20) return "⭐ Excellent progress!";
    if (value > 20) return "🏆 Counter champion! Amazing work!";
    if (value < 0 && value >= -5) return "🔄 Going backwards, but that's okay!";
    if (value < -5 && value >= -10) return "⚠️ Negative territory - time to bounce back!";
    if (value < -10) return "🆘 Deep negative - let's get back to positive!";
    return "🤔 Interesting counter value!";
  }
);

export const selectCounterEmoji = createSelector(
  [selectCounterValue],
  (value) => {
    if (value === 0) return "🎯";
    if (value > 0 && value <= 5) return "🌱";
    if (value > 5 && value <= 10) return "🚀";
    if (value > 10 && value <= 20) return "⭐";
    if (value > 20) return "🏆";
    if (value < 0 && value >= -5) return "🔄";
    if (value < -5 && value >= -10) return "⚠️";
    if (value < -10) return "🆘";
    return "🤔";
  }
);

export const selectCounterCategory = createSelector(
  [selectCounterValue],
  (value) => {
    if (value === 0) return "neutral";
    if (value > 0 && value <= 10) return "beginner";
    if (value > 10 && value <= 50) return "intermediate";
    if (value > 50) return "expert";
    if (value < 0 && value >= -10) return "negative-beginner";
    if (value < -10) return "negative-expert";
    return "unknown";
  }
);

export const selectCanUndo = createSelector(
  [selectCounterHistory],
  (history) => history.length > 1
);

export const selectHistoryLength = createSelector(
  [selectCounterHistory],
  (history) => history.length
);

export const selectCounterStats = createSelector(
  [selectCounterValue, selectCounterStep, selectTotalClicks, selectHistoryLength, selectLastAction],
  (value, step, totalClicks, historyLength, lastAction) => ({
    currentValue: value,
    currentStep: step,
    totalClicks,
    historyLength,
    lastAction,
    averageChange: historyLength > 1 ? (value / (historyLength - 1)).toFixed(2) : 0
  })
);

// Advanced selectors for complex computations
export const selectCounterTrend = createSelector(
  [selectCounterHistory],
  (history) => {
    if (history.length < 3) return 'insufficient-data';
    
    const recent = history.slice(-3);
    const isIncreasing = recent[1] < recent[2] && recent[0] < recent[1];
    const isDecreasing = recent[1] > recent[2] && recent[0] > recent[1];
    
    if (isIncreasing) return 'increasing';
    if (isDecreasing) return 'decreasing';
    return 'stable';
  }
);

export const selectCounterRange = createSelector(
  [selectCounterHistory],
  (history) => {
    if (history.length === 0) return { min: 0, max: 0, range: 0 };
    
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min;
    
    return { min, max, range };
  }
);

// Parameterized selector factory
export const makeSelectCounterAboveThreshold = () => createSelector(
  [selectCounterValue, (state, threshold) => threshold],
  (value, threshold) => value > threshold
);

// Selector for getting multiple values at once
export const selectCounterSummary = createSelector(
  [
    selectCounterValue,
    selectCounterMessage,
    selectCounterEmoji,
    selectCounterCategory,
    selectCanUndo,
    selectCounterStats
  ],
  (value, message, emoji, category, canUndo, stats) => ({
    value,
    message,
    emoji,
    category,
    canUndo,
    stats
  })
);
