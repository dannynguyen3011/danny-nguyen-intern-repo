/**
 * React component tests for HelloWorld component
 * Demonstrates React Testing Library patterns and component testing best practices
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloWorld from './HelloWorld';

describe('HelloWorld Component', () => {
  
  // Basic rendering tests
  describe('rendering', () => {
    test('renders with default props', () => {
      render(<HelloWorld />);
      
      expect(screen.getByText('Hello, Focus Bear! 👋')).toBeInTheDocument();
      expect(screen.getByText('Welcome to our React application!')).toBeInTheDocument();
    });

    test('renders with custom name prop', () => {
      render(<HelloWorld name="John Doe" />);
      
      expect(screen.getByText('Hello, John Doe! 👋')).toBeInTheDocument();
      expect(screen.getByText('Welcome to our React application!')).toBeInTheDocument();
    });

    test('renders with empty string name', () => {
      render(<HelloWorld name="" />);
      
      // Should fall back to default
      expect(screen.getByText('Hello, Focus Bear! 👋')).toBeInTheDocument();
    });
  });

  // Props testing
  describe('props handling', () => {
    test('displays the correct name in component details', () => {
      const testName = "Test User";
      render(<HelloWorld name={testName} />);
      
      expect(screen.getByText(`name = "${testName}"`)).toBeInTheDocument();
    });

    test('shows default value in component details when no name provided', () => {
      render(<HelloWorld />);
      
      expect(screen.getByText('name = "Focus Bear"')).toBeInTheDocument();
    });

    test('handles special characters in name', () => {
      const specialName = "João & María";
      render(<HelloWorld name={specialName} />);
      
      expect(screen.getByText(`Hello, ${specialName}! 👋`)).toBeInTheDocument();
    });

    test('handles very long names', () => {
      const longName = "A".repeat(100);
      render(<HelloWorld name={longName} />);
      
      expect(screen.getByText(`Hello, ${longName}! 👋`)).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has proper heading structure', () => {
      render(<HelloWorld name="Test" />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent('Hello, Test! 👋');
    });

    test('has descriptive component details heading', () => {
      render(<HelloWorld />);
      
      const detailsHeading = screen.getByRole('heading', { level: 2 });
      expect(detailsHeading).toBeInTheDocument();
      expect(detailsHeading).toHaveTextContent('🎯 Component Details');
    });
  });

  // CSS classes and styling tests
  describe('styling', () => {
    test('applies correct CSS classes to main container', () => {
      const { container } = render(<HelloWorld />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('bg-gradient-to-r');
      expect(mainDiv).toHaveClass('from-purple-400');
      expect(mainDiv).toHaveClass('via-pink-500');
      expect(mainDiv).toHaveClass('to-red-500');
      expect(mainDiv).toHaveClass('rounded-lg');
      expect(mainDiv).toHaveClass('shadow-lg');
    });

    test('applies correct styling to main heading', () => {
      render(<HelloWorld />);
      const heading = screen.getByRole('heading', { level: 1 });
      
      expect(heading).toHaveClass('text-3xl');
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('text-white');
    });
  });

  // Snapshot testing
  describe('snapshots', () => {
    test('matches snapshot with default props', () => {
      const { container } = render(<HelloWorld />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with custom name', () => {
      const { container } = render(<HelloWorld name="Snapshot Test" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  // Edge cases
  describe('edge cases', () => {
    test('handles null name gracefully', () => {
      render(<HelloWorld name={null} />);
      
      // Should fall back to default
      expect(screen.getByText('Hello, Focus Bear! 👋')).toBeInTheDocument();
    });

    test('handles undefined name gracefully', () => {
      render(<HelloWorld name={undefined} />);
      
      // Should fall back to default
      expect(screen.getByText('Hello, Focus Bear! 👋')).toBeInTheDocument();
    });

    test('handles numeric name', () => {
      render(<HelloWorld name={123} />);
      
      expect(screen.getByText('Hello, 123! 👋')).toBeInTheDocument();
    });

    test('handles boolean name', () => {
      render(<HelloWorld name={true} />);
      
      // Boolean true is truthy, so it should fall back to default
      expect(screen.getByText('Hello, Focus Bear! 👋')).toBeInTheDocument();
    });
  });

  // Content verification
  describe('content verification', () => {
    test('contains all expected text content', () => {
      render(<HelloWorld name="Content Test" />);
      
      expect(screen.getByText('Welcome to our React application!')).toBeInTheDocument();
      expect(screen.getByText('Component Type:')).toBeInTheDocument();
      expect(screen.getByText('Functional Component')).toBeInTheDocument();
      expect(screen.getByText('Props Received:')).toBeInTheDocument();
      expect(screen.getByText('Default Value:')).toBeInTheDocument();
      expect(screen.getByText('"Focus Bear"')).toBeInTheDocument();
    });

    test('displays educational message', () => {
      render(<HelloWorld />);
      
      expect(screen.getByText(/This component demonstrates how props make components reusable and dynamic!/)).toBeInTheDocument();
    });
  });

  // Performance considerations
  describe('performance', () => {
    test('renders quickly with reasonable props', () => {
      const start = performance.now();
      render(<HelloWorld name="Performance Test" />);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100); // Should render in less than 100ms
    });

    test('handles multiple renders efficiently', () => {
      const { rerender } = render(<HelloWorld name="Test 1" />);
      
      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        rerender(<HelloWorld name={`Test ${i}`} />);
      }
      const end = performance.now();
      
      expect(end - start).toBeLessThan(200); // Multiple rerenders should be fast
    });
  });
});
