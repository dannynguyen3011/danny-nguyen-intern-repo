/**
 * Comprehensive tests for MessageDisplay component
 * Demonstrates React Testing Library best practices:
 * - Testing behavior, not implementation
 * - User-centric queries
 * - Realistic user interactions
 * - Accessibility considerations
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MessageDisplay from './MessageDisplay';

describe('MessageDisplay Component', () => {

  // Basic Rendering Tests
  describe('rendering', () => {
    test('renders with default props', () => {
      render(<MessageDisplay />);
      
      // Check for main elements using accessible queries
      expect(screen.getByRole('heading', { name: /message display component/i })).toBeInTheDocument();
      expect(screen.getByText(/welcome to our react testing demo!/i)).toBeInTheDocument();
      expect(screen.getByTestId('message-display')).toBeInTheDocument();
    });

    test('renders with custom initial message', () => {
      const customMessage = "Hello, custom world!";
      render(<MessageDisplay initialMessage={customMessage} />);
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    test('renders all control buttons', () => {
      render(<MessageDisplay />);
      
      // Check for all message type buttons
      expect(screen.getByTestId('welcome-button')).toBeInTheDocument();
      expect(screen.getByTestId('success-button')).toBeInTheDocument();
      expect(screen.getByTestId('warning-button')).toBeInTheDocument();
      expect(screen.getByTestId('info-button')).toBeInTheDocument();
      expect(screen.getByTestId('error-button')).toBeInTheDocument();
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
      
      // Check for action buttons
      expect(screen.getByTestId('toggle-visibility-button')).toBeInTheDocument();
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    test('shows counter when showCounter is true', () => {
      render(<MessageDisplay showCounter={true} />);
      
      expect(screen.getByTestId('click-count')).toBeInTheDocument();
      expect(screen.getByTestId('message-type')).toBeInTheDocument();
      expect(screen.getByTestId('visibility-status')).toBeInTheDocument();
    });

    test('hides counter when showCounter is false', () => {
      render(<MessageDisplay showCounter={false} />);
      
      expect(screen.queryByTestId('click-count')).not.toBeInTheDocument();
      expect(screen.queryByTestId('message-type')).not.toBeInTheDocument();
      expect(screen.queryByTestId('visibility-status')).not.toBeInTheDocument();
    });
  });

  // User Interaction Tests - Button Clicks
  describe('button interactions', () => {
    test('changes message when success button is clicked', async () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      await userEvent.click(successButton);
      
      expect(screen.getByText(/operation completed successfully/i)).toBeInTheDocument();
    });

    test('changes message when warning button is clicked', async () => {
      render(<MessageDisplay />);
      
      const warningButton = screen.getByTestId('warning-button');
      await userEvent.click(warningButton);
      
      expect(screen.getByText(/please review your input carefully/i)).toBeInTheDocument();
    });

    test('changes message when info button is clicked', async () => {
      render(<MessageDisplay />);
      
      const infoButton = screen.getByTestId('info-button');
      await userEvent.click(infoButton);
      
      expect(screen.getByText(/here's some helpful information/i)).toBeInTheDocument();
    });

    test('changes message when error button is clicked', async () => {
      render(<MessageDisplay />);
      
      const errorButton = screen.getByTestId('error-button');
      await userEvent.click(errorButton);
      
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    test('changes message when custom button is clicked', async () => {
      render(<MessageDisplay />);
      
      const customButton = screen.getByTestId('custom-button');
      await userEvent.click(customButton);
      
      expect(screen.getByText(/this is a custom message/i)).toBeInTheDocument();
    });

    test('toggles message visibility when toggle button is clicked', async () => {
      render(<MessageDisplay />);
      
      const toggleButton = screen.getByTestId('toggle-visibility-button');
      
      // Initially visible
      expect(screen.getByTestId('message-display')).toBeInTheDocument();
      expect(screen.queryByTestId('hidden-message')).not.toBeInTheDocument();
      
      // Click to hide
      await userEvent.click(toggleButton);
      
      expect(screen.queryByTestId('message-display')).not.toBeInTheDocument();
      expect(screen.getByTestId('hidden-message')).toBeInTheDocument();
      expect(screen.getByText(/message is hidden/i)).toBeInTheDocument();
      
      // Click to show again
      await userEvent.click(toggleButton);
      
      expect(screen.getByTestId('message-display')).toBeInTheDocument();
      expect(screen.queryByTestId('hidden-message')).not.toBeInTheDocument();
    });

    test('updates button text when toggling visibility', async () => {
      render(<MessageDisplay />);
      
      const toggleButton = screen.getByTestId('toggle-visibility-button');
      
      // Initially shows "Hide Message"
      expect(toggleButton).toHaveTextContent('Hide Message');
      
      // After clicking, shows "Show Message"
      await userEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent('Show Message');
      
      // After clicking again, shows "Hide Message"
      await userEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent('Hide Message');
    });
  });

  // State Management Tests
  describe('state management', () => {
    test('increments click count when buttons are clicked', async () => {
      render(<MessageDisplay />);
      
      const clickCountElement = screen.getByTestId('click-count');
      const successButton = screen.getByTestId('success-button');
      const toggleButton = screen.getByTestId('toggle-visibility-button');
      
      // Initially 0
      expect(clickCountElement).toHaveTextContent('0');
      
      // Click success button
      await userEvent.click(successButton);
      expect(clickCountElement).toHaveTextContent('1');
      
      // Click toggle button
      await userEvent.click(toggleButton);
      expect(clickCountElement).toHaveTextContent('2');
    });

    test('updates message type indicator', async () => {
      render(<MessageDisplay />);
      
      const messageTypeElement = screen.getByTestId('message-type');
      
      // Initially welcome
      expect(messageTypeElement).toHaveTextContent('welcome');
      
      // Click success button
      await userEvent.click(screen.getByTestId('success-button'));
      expect(messageTypeElement).toHaveTextContent('success');
      
      // Click error button
      await userEvent.click(screen.getByTestId('error-button'));
      expect(messageTypeElement).toHaveTextContent('error');
    });

    test('updates visibility status indicator', async () => {
      render(<MessageDisplay />);
      
      const visibilityElement = screen.getByTestId('visibility-status');
      
      // Initially visible
      expect(visibilityElement).toHaveTextContent('Visible');
      
      // Toggle to hidden
      await userEvent.click(screen.getByTestId('toggle-visibility-button'));
      expect(visibilityElement).toHaveTextContent('Hidden');
      
      // Toggle back to visible
      await userEvent.click(screen.getByTestId('toggle-visibility-button'));
      expect(visibilityElement).toHaveTextContent('Visible');
    });

    test('resets all state when reset button is clicked', async () => {
      const initialMessage = "Initial test message";
      render(<MessageDisplay initialMessage={initialMessage} />);
      
      // Make some changes
      await userEvent.click(screen.getByTestId('error-button'));
      await userEvent.click(screen.getByTestId('toggle-visibility-button'));
      
      // Verify changes were made
      expect(screen.getByTestId('click-count')).toHaveTextContent('2');
      expect(screen.getByTestId('message-type')).toHaveTextContent('error');
      expect(screen.getByTestId('visibility-status')).toHaveTextContent('Hidden');
      expect(screen.getByTestId('hidden-message')).toBeInTheDocument();
      
      // Reset
      await userEvent.click(screen.getByTestId('reset-button'));
      
      // Verify everything is reset
      expect(screen.getByText(initialMessage)).toBeInTheDocument();
      expect(screen.getByTestId('click-count')).toHaveTextContent('0');
      expect(screen.getByTestId('message-type')).toHaveTextContent('welcome');
      expect(screen.getByTestId('visibility-status')).toHaveTextContent('Visible');
      expect(screen.getByTestId('message-display')).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe('accessibility', () => {
    test('message area has proper ARIA attributes', () => {
      render(<MessageDisplay />);
      
      const messageDisplay = screen.getByTestId('message-display');
      expect(messageDisplay).toHaveAttribute('role', 'alert');
      expect(messageDisplay).toHaveAttribute('aria-live', 'polite');
    });

    test('buttons are keyboard accessible', async () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      
      // Focus the button
      successButton.focus();
      expect(successButton).toHaveFocus();
      
      // Press Enter
      await userEvent.keyboard('{Enter}');
      expect(screen.getByText(/operation completed successfully/i)).toBeInTheDocument();
    });

    test('has proper heading structure', () => {
      render(<MessageDisplay />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/message display component/i);
    });
  });

  // CSS and Styling Tests
  describe('styling', () => {
    test('applies correct CSS classes for different message types', async () => {
      render(<MessageDisplay />);
      
      // Success message
      await userEvent.click(screen.getByTestId('success-button'));
      let messageDisplay = screen.getByTestId('message-display');
      expect(messageDisplay).toHaveClass('bg-green-100', 'text-green-800');
      
      // Error message
      await userEvent.click(screen.getByTestId('error-button'));
      messageDisplay = screen.getByTestId('message-display');
      expect(messageDisplay).toHaveClass('bg-red-100', 'text-red-800');
      
      // Warning message
      await userEvent.click(screen.getByTestId('warning-button'));
      messageDisplay = screen.getByTestId('message-display');
      expect(messageDisplay).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    test('buttons have hover states', () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      expect(successButton).toHaveClass('hover:bg-green-600');
      
      const toggleButton = screen.getByTestId('toggle-visibility-button');
      expect(toggleButton).toHaveClass('hover:bg-indigo-600');
    });
  });

  // Complex User Workflows
  describe('user workflows', () => {
    test('handles rapid button clicks correctly', async () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      const errorButton = screen.getByTestId('error-button');
      const clickCountElement = screen.getByTestId('click-count');
      
      // Rapid clicks
      await userEvent.click(successButton);
      await userEvent.click(errorButton);
      await userEvent.click(successButton);
      await userEvent.click(errorButton);
      
      expect(clickCountElement).toHaveTextContent('4');
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    test('maintains state consistency during complex interactions', async () => {
      render(<MessageDisplay />);
      
      // Complex workflow
      await userEvent.click(screen.getByTestId('success-button')); // Click 1
      await userEvent.click(screen.getByTestId('toggle-visibility-button')); // Click 2 - hide
      await userEvent.click(screen.getByTestId('error-button')); // Click 3 - change message while hidden
      await userEvent.click(screen.getByTestId('toggle-visibility-button')); // Click 4 - show
      
      // Verify final state
      expect(screen.getByTestId('click-count')).toHaveTextContent('4');
      expect(screen.getByTestId('message-type')).toHaveTextContent('error');
      expect(screen.getByTestId('visibility-status')).toHaveTextContent('Visible');
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  // Edge Cases
  describe('edge cases', () => {
    test('handles empty initial message gracefully', () => {
      render(<MessageDisplay initialMessage="" />);
      
      expect(screen.getByTestId('message-display')).toBeInTheDocument();
      // Should still render the component even with empty message
    });

    test('handles very long messages', () => {
      const longMessage = "A".repeat(1000);
      render(<MessageDisplay initialMessage={longMessage} />);
      
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    test('handles special characters in messages', () => {
      const specialMessage = "🎉 Special chars: @#$%^&*()[]{}|\\:;\"'<>?/";
      render(<MessageDisplay initialMessage={specialMessage} />);
      
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });

  // Performance Tests
  describe('performance', () => {
    test('renders quickly with default props', () => {
      const start = performance.now();
      render(<MessageDisplay />);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100);
    });

    test('handles multiple rapid state updates efficiently', async () => {
      render(<MessageDisplay />);
      
      const start = performance.now();
      
      // Simulate rapid user interactions
      for (let i = 0; i < 10; i++) {
        await userEvent.click(screen.getByTestId('success-button'));
        await userEvent.click(screen.getByTestId('error-button'));
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(1000); // Should complete within 1 second
      expect(screen.getByTestId('click-count')).toHaveTextContent('20');
    });
  });

  // Integration with fireEvent (for comparison)
  describe('fireEvent vs userEvent comparison', () => {
    test('fireEvent click works but is less realistic', () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      fireEvent.click(successButton);
      
      expect(screen.getByText(/operation completed successfully/i)).toBeInTheDocument();
    });

    test('userEvent provides more realistic interaction', async () => {
      render(<MessageDisplay />);
      
      const successButton = screen.getByTestId('success-button');
      
      // userEvent simulates more realistic user behavior
      await userEvent.click(successButton);
      
      expect(screen.getByText(/operation completed successfully/i)).toBeInTheDocument();
    });
  });

  // Snapshot Tests
  describe('snapshots', () => {
    test('matches snapshot with default props', () => {
      const { container } = render(<MessageDisplay />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with custom props', () => {
      const { container } = render(
        <MessageDisplay 
          initialMessage="Custom snapshot message" 
          showCounter={false} 
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
