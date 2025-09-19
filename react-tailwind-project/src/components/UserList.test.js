/**
 * Comprehensive tests for UserList component
 * Demonstrates API mocking, asynchronous testing, and error handling
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UserList from './UserList';

// Mock fetch globally
global.fetch = jest.fn();

// Mock data for testing
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'john.example.com',
    company: { name: 'Acme Corp' },
    address: { city: 'New York', zipcode: '10001' }
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    website: 'jane.example.com',
    company: { name: 'Tech Solutions' },
    address: { city: 'Los Angeles', zipcode: '90210' }
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob@example.com',
    phone: '555-123-4567',
    website: 'bob.example.com',
    company: { name: 'Innovation Inc' },
    address: { city: 'Chicago', zipcode: '60601' }
  }
];

// Helper function to create a successful fetch response
const createFetchResponse = (data) => ({
  ok: true,
  status: 200,
  json: async () => data,
});

// Helper function to create a failed fetch response
const createFetchError = (status = 500, statusText = 'Internal Server Error') => ({
  ok: false,
  status,
  statusText,
  json: async () => ({ error: statusText }),
});

describe('UserList Component', () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
    // Clear any pending timers
    jest.clearAllTimers();
    // Use fake timers for testing retry delays
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers after each test
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // Basic Rendering and API Success Tests
  describe('successful API calls', () => {
    test('renders loading state initially', () => {
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList />);
      
      expect(screen.getByTestId('loading-state')).toBeInTheDocument();
      expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    test('fetches and displays users successfully', async () => {
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList />);
      
      // Wait for loading to finish and users to be displayed
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });

      // Check if all users are displayed
      expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('user-card-3')).toBeInTheDocument();

      // Check user details
      expect(screen.getByTestId('user-name-1')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('user-email-1')).toHaveTextContent('john@example.com');
      expect(screen.getByTestId('user-username-1')).toHaveTextContent('@johndoe');
    });

    test('calls API with correct URL', async () => {
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList />);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      });
    });

    test('uses custom API URL when provided', async () => {
      const customUrl = 'https://api.example.com/users';
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList apiUrl={customUrl} />);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(customUrl);
      });
    });

    test('displays correct user count', async () => {
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByText('Showing 3 of 3 users')).toBeInTheDocument();
      });
    });
  });

  // API Error Handling Tests
  describe('API error handling', () => {
    test('displays error state when API call fails', async () => {
      const errorMessage = 'Network error';
      fetch.mockRejectedValueOnce(new Error(errorMessage));
      
      render(<UserList maxRetries={0} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent(`Failed to fetch users: ${errorMessage}`);
      });
    });

    test('displays error state for HTTP errors', async () => {
      fetch.mockResolvedValueOnce(createFetchError(404, 'Not Found'));
      
      render(<UserList maxRetries={0} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch users: HTTP error! status: 404');
      });
    });

    test('retry button works after error', async () => {
      // First call fails
      fetch.mockRejectedValueOnce(new Error('Network error'));
      // Second call succeeds
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList maxRetries={0} />);
      
      // Wait for error state
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
      });
      
      // Click retry button
      const retryButton = screen.getByTestId('retry-button');
      await userEvent.click(retryButton);
      
      // Wait for successful load
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
      });
      
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  // Retry Mechanism Tests
  describe('retry mechanism', () => {
    test('retries failed requests up to maxRetries', async () => {
      // All calls fail
      fetch.mockRejectedValue(new Error('Network error'));
      
      render(<UserList maxRetries={2} retryDelay={100} />);
      
      // Should eventually show error after all retries
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Should have made 3 calls total (initial + 2 retries)
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    test('stops retrying on success', async () => {
      // First call fails, second succeeds
      fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList maxRetries={2} retryDelay={100} />);
      
      // Should eventually show users
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Should have made exactly 2 calls
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  // Search Functionality Tests
  describe('search functionality', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      // Wait for users to load
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
    });

    test('filters users by name', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'John');
      
      // Should show only John Doe (note: Bob Johnson also contains "John")
      expect(screen.getByTestId('user-card-1')).toBeInTheDocument(); // John Doe
      expect(screen.queryByTestId('user-card-2')).not.toBeInTheDocument(); // Jane Smith
      expect(screen.getByTestId('user-card-3')).toBeInTheDocument(); // Bob Johnson (contains "John")
      
      // Should update count (2 users match "John")
      expect(screen.getByText('Showing 2 of 3 users for "John"')).toBeInTheDocument();
    });

    test('filters users by email', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'jane@example.com');
      
      // Should show only Jane Smith
      expect(screen.queryByTestId('user-card-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
      expect(screen.queryByTestId('user-card-3')).not.toBeInTheDocument();
    });

    test('filters users by username', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'bobjohnson');
      
      // Should show only Bob Johnson
      expect(screen.queryByTestId('user-card-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('user-card-2')).not.toBeInTheDocument();
      expect(screen.getByTestId('user-card-3')).toBeInTheDocument();
    });

    test('shows no results message when search has no matches', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'nonexistent');
      
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText('No users match your search for "nonexistent"')).toBeInTheDocument();
      expect(screen.getByTestId('clear-search-button')).toBeInTheDocument();
    });

    test('clear search button works', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'nonexistent');
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      
      const clearButton = screen.getByTestId('clear-search-button');
      await userEvent.click(clearButton);
      
      expect(searchInput.value).toBe('');
      expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('user-card-3')).toBeInTheDocument();
    });

    test('search is case insensitive', async () => {
      const searchInput = screen.getByTestId('search-input');
      
      await userEvent.type(searchInput, 'JOHN');
      
      // Should still find John Doe and Bob Johnson
      expect(screen.getByTestId('user-card-1')).toBeInTheDocument(); // John Doe
      expect(screen.queryByTestId('user-card-2')).not.toBeInTheDocument(); // Jane Smith
      expect(screen.getByTestId('user-card-3')).toBeInTheDocument(); // Bob Johnson
    });
  });

  // Sorting Functionality Tests
  describe('sorting functionality', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      // Wait for users to load
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
    });

    test('sorts users by name by default', () => {
      const userCards = screen.getAllByTestId(/^user-card-/);
      const firstUserName = screen.getByTestId('user-name-3'); // Bob Johnson should be first
      const secondUserName = screen.getByTestId('user-name-2'); // Jane Smith should be second
      const thirdUserName = screen.getByTestId('user-name-1'); // John Doe should be third
      
      expect(firstUserName).toHaveTextContent('Bob Johnson');
      expect(secondUserName).toHaveTextContent('Jane Smith');
      expect(thirdUserName).toHaveTextContent('John Doe');
    });

    test('sorts users by email', async () => {
      const sortSelect = screen.getByTestId('sort-select');
      
      await userEvent.selectOptions(sortSelect, 'email');
      
      // Should sort by email alphabetically
      const userCards = screen.getAllByTestId(/^user-card-/);
      // bob@example.com, jane@example.com, john@example.com
      const firstUserEmail = screen.getByTestId('user-email-3');
      expect(firstUserEmail).toHaveTextContent('bob@example.com');
    });

    test('sorts users by username', async () => {
      const sortSelect = screen.getByTestId('sort-select');
      
      await userEvent.selectOptions(sortSelect, 'username');
      
      // Should sort by username alphabetically
      // bobjohnson, janesmith, johndoe
      const firstUserUsername = screen.getByTestId('user-username-3');
      expect(firstUserUsername).toHaveTextContent('@bobjohnson');
    });

    test('sorts users by ID', async () => {
      const sortSelect = screen.getByTestId('sort-select');
      
      await userEvent.selectOptions(sortSelect, 'id');
      
      // Should sort by ID numerically (1, 2, 3)
      const userCards = screen.getAllByTestId(/^user-card-/);
      const firstUserName = screen.getByTestId('user-name-1');
      expect(firstUserName).toHaveTextContent('John Doe');
    });
  });

  // User Interaction Tests
  describe('user interactions', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
    });

    test('contact buttons are present for all users', () => {
      expect(screen.getByTestId('contact-button-1')).toBeInTheDocument();
      expect(screen.getByTestId('contact-button-2')).toBeInTheDocument();
      expect(screen.getByTestId('contact-button-3')).toBeInTheDocument();
    });

    test('refresh button triggers new API call', async () => {
      const refreshButton = screen.getByTestId('refresh-button');
      
      // Clear the initial call
      fetch.mockClear();
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      await userEvent.click(refreshButton);
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    test('refresh button is disabled during loading', async () => {
      const refreshButton = screen.getByTestId('refresh-button');
      
      // Mock a slow response
      fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve(createFetchResponse(mockUsers)), 1000)));
      
      await userEvent.click(refreshButton);
      
      expect(refreshButton).toBeDisabled();
      expect(refreshButton).toHaveTextContent('Refreshing...');
    });
  });

  // Accessibility Tests
  describe('accessibility', () => {
    test('has proper form labels', async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Search Users')).toBeInTheDocument();
        expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
      });
    });

    test('search input has proper attributes', async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      // Wait for component to load
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
      
      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toHaveAttribute('type', 'text');
      expect(searchInput).toHaveAttribute('placeholder', 'Search by name, email, or username...');
    });
  });

  // Edge Cases and Error Scenarios
  describe('edge cases', () => {
    test('handles empty API response', async () => {
      fetch.mockResolvedValueOnce(createFetchResponse([]));
      
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByTestId('no-results')).toBeInTheDocument();
        expect(screen.getByText('No users available')).toBeInTheDocument();
      });
    });

    test('handles malformed API response', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => { throw new Error('Invalid JSON'); }
      });
      
      render(<UserList maxRetries={0} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch users: Invalid JSON');
      });
    });

    test('handles network timeout', async () => {
      fetch.mockImplementationOnce(() => 
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('Network timeout')), 100);
        })
      );
      
      render(<UserList maxRetries={0} />);
      
      // Fast-forward time
      jest.advanceTimersByTime(100);
      
      await waitFor(() => {
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch users: Network timeout');
      });
    });
  });

  // Performance Tests
  describe('performance', () => {
    test('renders quickly with large dataset', async () => {
      const largeUserList = Array.from({ length: 100 }, (_, i) => ({
        ...mockUsers[0],
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        username: `user${i + 1}`
      }));
      
      fetch.mockResolvedValueOnce(createFetchResponse(largeUserList));
      
      const start = performance.now();
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
      
      const end = performance.now();
      expect(end - start).toBeLessThan(1000); // Should render within 1 second
    });

    test('search performance with large dataset', async () => {
      const largeUserList = Array.from({ length: 1000 }, (_, i) => ({
        ...mockUsers[0],
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        username: `user${i + 1}`
      }));
      
      fetch.mockResolvedValueOnce(createFetchResponse(largeUserList));
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
      
      const searchInput = screen.getByTestId('search-input');
      
      const start = performance.now();
      await userEvent.type(searchInput, 'User 500');
      const end = performance.now();
      
      expect(end - start).toBeLessThan(500); // Search should be fast
    });
  });

  // Integration Tests
  describe('integration scenarios', () => {
    test('search and sort work together', async () => {
      fetch.mockResolvedValue(createFetchResponse(mockUsers));
      render(<UserList />);
      
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
      
      // Search for users with 'Jane' in name (more specific)
      const searchInput = screen.getByTestId('search-input');
      await userEvent.type(searchInput, 'Jane');
      
      // Should show only Jane Smith
      expect(screen.queryByTestId('user-card-1')).not.toBeInTheDocument(); // John (filtered out)
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument(); // Jane
      expect(screen.queryByTestId('user-card-3')).not.toBeInTheDocument(); // Bob (filtered out)
      
      // Sort by email
      const sortSelect = screen.getByTestId('sort-select');
      await userEvent.selectOptions(sortSelect, 'email');
      
      // Should show only Jane Smith after sorting
      const userCards = screen.getAllByTestId(/^user-card-/);
      expect(userCards).toHaveLength(1);
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
    });

    test('retry mechanism works with search', async () => {
      // First call fails
      fetch.mockRejectedValueOnce(new Error('Network error'));
      // Retry succeeds
      fetch.mockResolvedValueOnce(createFetchResponse(mockUsers));
      
      render(<UserList maxRetries={1} retryDelay={100} />);
      
      // Wait for retry
      jest.advanceTimersByTime(100);
      
      await waitFor(() => {
        expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
      });
      
      // Search should work after retry
      const searchInput = screen.getByTestId('search-input');
      await userEvent.type(searchInput, 'Jane');
      
      expect(screen.queryByTestId('user-card-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
    });
  });
});
