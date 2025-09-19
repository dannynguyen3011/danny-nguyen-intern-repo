/**
 * Tests for the reusable Button component
 * Demonstrates testing component variants, props, and user interactions
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {

  // Basic rendering tests
  describe('rendering', () => {
    test('renders button with children', () => {
      render(<Button>Click me</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('renders with default props', () => {
      render(<Button>Default Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
    });
  });

  // Variant testing
  describe('variants', () => {
    const variants = [
      'primary', 'secondary', 'success', 'danger', 
      'warning', 'info', 'outline', 'ghost', 'gradient'
    ];

    variants.forEach(variant => {
      test(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Test Button</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Test Button');
      });
    });

    test('applies correct CSS classes for primary variant', () => {
      render(<Button variant="primary">Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('hover:bg-blue-700');
    });

    test('applies correct CSS classes for outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
      expect(button).toHaveClass('border-2');
      expect(button).toHaveClass('border-blue-600');
    });
  });

  // Size testing
  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large', 'extraLarge'];

    sizes.forEach(size => {
      test(`renders ${size} size correctly`, () => {
        render(<Button size={size}>Size Test</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Size Test');
      });
    });

    test('applies correct CSS classes for small size', () => {
      render(<Button size="small">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('py-1.5');
      expect(button).toHaveClass('text-sm');
    });

    test('applies correct CSS classes for large size', () => {
      render(<Button size="large">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6');
      expect(button).toHaveClass('py-3');
      expect(button).toHaveClass('text-lg');
    });
  });

  // Props testing
  describe('props', () => {
    test('handles onClick prop', async () => {
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Clickable</Button>);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('handles disabled state', () => {
      const handleClick = jest.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('applies fullWidth prop', () => {
      render(<Button fullWidth>Full Width</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    test('handles different button types', () => {
      const { rerender } = render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      
      rerender(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    test('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    test('passes through additional props', () => {
      render(<Button data-testid="custom-button" aria-label="Custom label">Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has button role', () => {
      render(<Button>Accessible Button</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('is keyboard accessible', async () => {
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Keyboard Test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    test('applies focus styles', () => {
      render(<Button>Focus Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
    });

    test('shows disabled state visually', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:opacity-50');
      expect(button).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  // User interaction tests
  describe('user interactions', () => {
    test('handles multiple clicks', async () => {
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Multi Click</Button>);
      
      const button = screen.getByRole('button');
      
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    test('prevents clicks when disabled', async () => {
      const handleClick = jest.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled Click</Button>);
      
      const button = screen.getByRole('button');
      
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('handles mouse events', async () => {
      render(<Button>Hover Test</Button>);
      
      const button = screen.getByRole('button');
      
      await userEvent.hover(button);
      expect(button).toHaveClass('hover:bg-blue-700');
      
      await userEvent.unhover(button);
      // Button should still have hover class (CSS handles the state)
    });
  });

  // Edge cases
  describe('edge cases', () => {
    test('handles empty children', () => {
      render(<Button></Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    test('handles complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('IconText');
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    test('handles invalid variant gracefully', () => {
      // Should not crash with invalid variant
      render(<Button variant="invalid">Invalid Variant</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // Performance tests
  describe('performance', () => {
    test('renders quickly', () => {
      const start = performance.now();
      render(<Button>Performance Test</Button>);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(50);
    });

    test('handles rapid re-renders', () => {
      const { rerender } = render(<Button>Test 1</Button>);
      
      const start = performance.now();
      for (let i = 0; i < 20; i++) {
        rerender(<Button variant="primary">Test {i}</Button>);
      }
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100);
    });
  });

  // Snapshot tests
  describe('snapshots', () => {
    test('matches snapshot for primary button', () => {
      const { container } = render(<Button variant="primary">Primary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot for disabled button', () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
