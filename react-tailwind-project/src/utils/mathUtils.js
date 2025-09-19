/**
 * Mathematical utility functions for testing demonstration
 * These functions showcase different testing scenarios and edge cases
 */

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 * @throws {Error} If inputs are not numbers
 */
export const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  if (!isFinite(a) || !isFinite(b)) {
    throw new Error('Arguments must be finite numbers');
  }
  
  return a + b;
};

/**
 * Subtracts second number from first number
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
export const subtract = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  return a - b;
};

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
export const multiply = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  return a * b;
};

/**
 * Divides first number by second number
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Quotient of a divided by b
 * @throws {Error} If divisor is zero
 */
export const divide = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  
  return a / b;
};

/**
 * Calculates the power of a number
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} Base raised to the power of exponent
 */
export const power = (base, exponent) => {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  return Math.pow(base, exponent);
};

/**
 * Calculates the square root of a number
 * @param {number} n - The number
 * @returns {number} Square root of n
 * @throws {Error} If number is negative
 */
export const sqrt = (n) => {
  if (typeof n !== 'number') {
    throw new Error('Argument must be a number');
  }
  
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  
  return Math.sqrt(n);
};

/**
 * Calculates the factorial of a number
 * @param {number} n - The number (must be non-negative integer)
 * @returns {number} Factorial of n
 * @throws {Error} If number is negative or not an integer
 */
export const factorial = (n) => {
  if (typeof n !== 'number') {
    throw new Error('Argument must be a number');
  }
  
  if (n < 0) {
    throw new Error('Cannot calculate factorial of negative number');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('Argument must be an integer');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
};

/**
 * Checks if a number is even
 * @param {number} n - The number to check
 * @returns {boolean} True if number is even, false otherwise
 */
export const isEven = (n) => {
  if (typeof n !== 'number') {
    throw new Error('Argument must be a number');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('Argument must be an integer');
  }
  
  return n % 2 === 0;
};

/**
 * Finds the maximum of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Maximum number in the array
 * @throws {Error} If array is empty or contains non-numbers
 */
export const max = (numbers) => {
  if (!Array.isArray(numbers)) {
    throw new Error('Argument must be an array');
  }
  
  if (numbers.length === 0) {
    throw new Error('Array cannot be empty');
  }
  
  for (let num of numbers) {
    if (typeof num !== 'number') {
      throw new Error('All array elements must be numbers');
    }
  }
  
  return Math.max(...numbers);
};

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average of the numbers
 * @throws {Error} If array is empty or contains non-numbers
 */
export const average = (numbers) => {
  if (!Array.isArray(numbers)) {
    throw new Error('Argument must be an array');
  }
  
  if (numbers.length === 0) {
    throw new Error('Array cannot be empty');
  }
  
  for (let num of numbers) {
    if (typeof num !== 'number') {
      throw new Error('All array elements must be numbers');
    }
  }
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};
