/**
 * Comprehensive Jest tests for mathUtils functions
 * Demonstrates various testing patterns, edge cases, and best practices
 */

import {
  add,
  subtract,
  multiply,
  divide,
  power,
  sqrt,
  factorial,
  isEven,
  max,
  average
} from './mathUtils';

// Group tests by function using describe blocks
describe('mathUtils', () => {
  
  // Test the add function
  describe('add', () => {
    test('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 15)).toBe(25);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should add negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
      expect(add(-5, 3)).toBe(-2);
      expect(add(5, -3)).toBe(2);
    });

    test('should handle zero correctly', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(5, 0)).toBe(5);
      expect(add(0, -3)).toBe(-3);
    });

    test('should handle decimal numbers', () => {
      expect(add(1.5, 2.5)).toBe(4);
      expect(add(0.1, 0.1)).toBeCloseTo(0.2);
      expect(add(-1.5, 1.5)).toBe(0);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => add(2, '3')).toThrow('Both arguments must be numbers');
      expect(() => add('hello', 'world')).toThrow('Both arguments must be numbers');
      expect(() => add(null, 5)).toThrow('Both arguments must be numbers');
      expect(() => add(undefined, 5)).toThrow('Both arguments must be numbers');
    });

    test('should throw error for infinite numbers', () => {
      expect(() => add(Infinity, 5)).toThrow('Arguments must be finite numbers');
      expect(() => add(5, -Infinity)).toThrow('Arguments must be finite numbers');
      expect(() => add(NaN, 5)).toThrow('Arguments must be finite numbers');
    });
  });

  // Test the subtract function
  describe('subtract', () => {
    test('should subtract numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 15)).toBe(-5);
      expect(subtract(-2, -3)).toBe(1);
      expect(subtract(0, 5)).toBe(-5);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => subtract('5', 3)).toThrow('Both arguments must be numbers');
      expect(() => subtract(5, null)).toThrow('Both arguments must be numbers');
    });
  });

  // Test the multiply function
  describe('multiply', () => {
    test('should multiply numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(2.5, 4)).toBe(10);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => multiply('3', 4)).toThrow('Both arguments must be numbers');
    });
  });

  // Test the divide function
  describe('divide', () => {
    test('should divide numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(15, 3)).toBe(5);
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(7, 2)).toBe(3.5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
      expect(() => divide(-5, 0)).toThrow('Cannot divide by zero');
      expect(() => divide(0, 0)).toThrow('Cannot divide by zero');
    });

    test('should handle zero as dividend', () => {
      expect(divide(0, 5)).toBe(0);
      expect(divide(0, -3)).toBe(-0); // JavaScript returns -0 for 0 / -3
    });

    test('should throw error for non-number inputs', () => {
      expect(() => divide('10', 2)).toThrow('Both arguments must be numbers');
    });
  });

  // Test the power function
  describe('power', () => {
    test('should calculate power correctly', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
      expect(power(2, 0)).toBe(1);
      expect(power(10, 1)).toBe(10);
      expect(power(-2, 2)).toBe(4);
      expect(power(-2, 3)).toBe(-8);
    });

    test('should handle fractional exponents', () => {
      expect(power(4, 0.5)).toBe(2);
      expect(power(8, 1/3)).toBeCloseTo(2);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => power('2', 3)).toThrow('Both arguments must be numbers');
    });
  });

  // Test the sqrt function
  describe('sqrt', () => {
    test('should calculate square root correctly', () => {
      expect(sqrt(4)).toBe(2);
      expect(sqrt(9)).toBe(3);
      expect(sqrt(0)).toBe(0);
      expect(sqrt(1)).toBe(1);
      expect(sqrt(2)).toBeCloseTo(1.414, 3);
    });

    test('should throw error for negative numbers', () => {
      expect(() => sqrt(-1)).toThrow('Cannot calculate square root of negative number');
      expect(() => sqrt(-4)).toThrow('Cannot calculate square root of negative number');
    });

    test('should throw error for non-number inputs', () => {
      expect(() => sqrt('4')).toThrow('Argument must be a number');
    });
  });

  // Test the factorial function
  describe('factorial', () => {
    test('should calculate factorial correctly', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(2)).toBe(2);
      expect(factorial(3)).toBe(6);
      expect(factorial(4)).toBe(24);
      expect(factorial(5)).toBe(120);
    });

    test('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Cannot calculate factorial of negative number');
      expect(() => factorial(-5)).toThrow('Cannot calculate factorial of negative number');
    });

    test('should throw error for non-integers', () => {
      expect(() => factorial(3.5)).toThrow('Argument must be an integer');
      expect(() => factorial(2.1)).toThrow('Argument must be an integer');
    });

    test('should throw error for non-number inputs', () => {
      expect(() => factorial('5')).toThrow('Argument must be a number');
    });
  });

  // Test the isEven function
  describe('isEven', () => {
    test('should identify even numbers correctly', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-2)).toBe(true);
      expect(isEven(100)).toBe(true);
    });

    test('should identify odd numbers correctly', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(-1)).toBe(false);
      expect(isEven(99)).toBe(false);
    });

    test('should throw error for non-integers', () => {
      expect(() => isEven(2.5)).toThrow('Argument must be an integer');
      expect(() => isEven(3.1)).toThrow('Argument must be an integer');
    });

    test('should throw error for non-number inputs', () => {
      expect(() => isEven('2')).toThrow('Argument must be a number');
    });
  });

  // Test the max function
  describe('max', () => {
    test('should find maximum in array of positive numbers', () => {
      expect(max([1, 2, 3, 4, 5])).toBe(5);
      expect(max([10, 5, 8, 3])).toBe(10);
      expect(max([1])).toBe(1);
    });

    test('should find maximum in array with negative numbers', () => {
      expect(max([-1, -2, -3])).toBe(-1);
      expect(max([-5, 2, -1, 8])).toBe(8);
      expect(max([0, -1, -2])).toBe(0);
    });

    test('should handle decimal numbers', () => {
      expect(max([1.5, 2.3, 1.8])).toBe(2.3);
      expect(max([0.1, 0.2, 0.15])).toBe(0.2);
    });

    test('should throw error for empty array', () => {
      expect(() => max([])).toThrow('Array cannot be empty');
    });

    test('should throw error for non-array input', () => {
      expect(() => max('not an array')).toThrow('Argument must be an array');
      expect(() => max(123)).toThrow('Argument must be an array');
    });

    test('should throw error for array with non-numbers', () => {
      expect(() => max([1, 2, 'three'])).toThrow('All array elements must be numbers');
      expect(() => max([1, null, 3])).toThrow('All array elements must be numbers');
    });
  });

  // Test the average function
  describe('average', () => {
    test('should calculate average correctly', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([10, 20, 30])).toBe(20);
      expect(average([5])).toBe(5);
      expect(average([0, 0, 0])).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(average([-1, -2, -3])).toBe(-2);
      expect(average([-5, 5])).toBe(0);
    });

    test('should handle decimal results', () => {
      expect(average([1, 2])).toBe(1.5);
      expect(average([1, 2, 3])).toBeCloseTo(2);
    });

    test('should throw error for empty array', () => {
      expect(() => average([])).toThrow('Array cannot be empty');
    });

    test('should throw error for non-array input', () => {
      expect(() => average('not an array')).toThrow('Argument must be an array');
    });

    test('should throw error for array with non-numbers', () => {
      expect(() => average([1, 2, 'three'])).toThrow('All array elements must be numbers');
    });
  });

  // Integration tests - testing functions together
  describe('integration tests', () => {
    test('should work with functions combined', () => {
      const result1 = add(multiply(2, 3), divide(10, 2));
      expect(result1).toBe(11); // (2*3) + (10/2) = 6 + 5 = 11

      const result2 = subtract(power(3, 2), sqrt(4));
      expect(result2).toBe(7); // 3^2 - sqrt(4) = 9 - 2 = 7
    });

    test('should handle complex calculations', () => {
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((acc, num) => add(acc, num), 0);
      const avg = average(numbers);
      const maximum = max(numbers);
      
      expect(sum).toBe(15);
      expect(avg).toBe(3);
      expect(maximum).toBe(5);
    });
  });

  // Edge cases and boundary testing
  describe('edge cases', () => {
    test('should handle very large numbers', () => {
      const largeNum1 = 999999999;
      const largeNum2 = 1000000001;
      expect(add(largeNum1, largeNum2)).toBe(2000000000);
    });

    test('should handle very small decimal numbers', () => {
      expect(add(0.0001, 0.0002)).toBeCloseTo(0.0003);
      expect(multiply(0.0001, 0.0001)).toBeCloseTo(0.00000001);
    });

    test('should handle negative zero', () => {
      expect(add(0, -0)).toBe(0);
      expect(subtract(0, -0)).toBe(0);
    });
  });

  // Performance tests (simple examples)
  describe('performance considerations', () => {
    test('factorial should complete in reasonable time for moderate inputs', () => {
      const start = performance.now();
      factorial(10);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
    });

    test('average should handle reasonably large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
      const start = performance.now();
      const result = average(largeArray);
      const end = performance.now();
      
      expect(result).toBe(500.5);
      expect(end - start).toBeLessThan(50); // Should complete quickly
    });
  });
});

// Additional test suite for error handling patterns
describe('error handling patterns', () => {
  test('should provide descriptive error messages', () => {
    expect(() => add('hello', 5)).toThrow('Both arguments must be numbers');
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    expect(() => sqrt(-1)).toThrow('Cannot calculate square root of negative number');
  });

  test('should handle type coercion consistently', () => {
    // These should all throw errors, not attempt type coercion
    expect(() => add('5', 3)).toThrow();
    expect(() => multiply(true, 5)).toThrow();
    expect(() => subtract([], 5)).toThrow();
  });
});

// Test data validation
describe('input validation', () => {
  const invalidInputs = [
    null,
    undefined,
    '',
    '0',
    '5',
    true,
    false,
    [],
    {},
    Symbol('test'),
    () => {}
  ];

  invalidInputs.forEach(input => {
    test(`should reject invalid input: ${String(input)} (${typeof input})`, () => {
      expect(() => add(input, 5)).toThrow();
      expect(() => multiply(5, input)).toThrow();
    });
  });
});
