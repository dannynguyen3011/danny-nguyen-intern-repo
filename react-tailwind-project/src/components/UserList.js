import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * UserList component - demonstrates API data fetching and state management
 * Features:
 * - Fetches user data from JSONPlaceholder API
 * - Loading states and error handling
 * - Search and filter functionality
 * - Retry mechanism for failed requests
 * - Responsive design with Tailwind CSS
 */
const UserList = ({ 
  apiUrl = 'https://jsonplaceholder.typicode.com/users',
  maxRetries = 3,
  retryDelay = 1000 
}) => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [retryCount, setRetryCount] = useState(0);

  // Fetch users from API with retry logic
  const fetchUsers = useCallback(async (attempt = 0) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setUsers(userData);
      setRetryCount(0);
    } catch (err) {
      console.error('Fetch error:', err);
      
      if (attempt < maxRetries) {
        setRetryCount(attempt + 1);
        setTimeout(() => {
          fetchUsers(attempt + 1);
        }, retryDelay);
      } else {
        setError(`Failed to fetch users: ${err.message}`);
        setRetryCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl, maxRetries, retryDelay]);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manual retry function
  const handleRetry = () => {
    fetchUsers();
  };

  // Filter and sort users based on search term and sort option
  const filteredAndSortedUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'username':
          return a.username.localeCompare(b.username);
        case 'id':
          return a.id - b.id;
        default:
          return 0;
      }
    });

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6" data-testid="loading-state">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">
              {retryCount > 0 ? `Loading... (Retry ${retryCount}/${maxRetries})` : 'Loading users...'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6" data-testid="error-state">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6" data-testid="error-message">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              data-testid="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6" data-testid="user-list-container">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          👥 User Directory
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Browse and search through our user database
        </p>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="search-input"
            />
          </div>
          <div className="md:w-48">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="sort-select"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="username">Username</option>
              <option value="id">ID</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedUsers.length} of {users.length} users
          {searchTerm && (
            <span className="ml-2">
              for "<span className="font-medium">{searchTerm}</span>"
            </span>
          )}
        </div>
      </div>

      {/* User Grid */}
      {filteredAndSortedUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center" data-testid="no-results">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
          <p className="text-gray-500">
            {searchTerm 
              ? `No users match your search for "${searchTerm}"`
              : 'No users available'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
              data-testid="clear-search-button"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="users-grid">
          {filteredAndSortedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              data-testid={`user-card-${user.id}`}
            >
              {/* User Avatar */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800" data-testid={`user-name-${user.id}`}>
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500" data-testid={`user-username-${user.id}`}>
                    @{user.username}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-5 h-5 mr-2">📧</span>
                  <span data-testid={`user-email-${user.id}`}>{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-5 h-5 mr-2">📞</span>
                  <span data-testid={`user-phone-${user.id}`}>{user.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-5 h-5 mr-2">🌐</span>
                  <span data-testid={`user-website-${user.id}`}>{user.website}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-5 h-5 mr-2">🏢</span>
                  <span data-testid={`user-company-${user.id}`}>{user.company.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-5 h-5 mr-2">📍</span>
                  <span data-testid={`user-city-${user.id}`}>
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
              </div>

              {/* User Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                  data-testid={`contact-button-${user.id}`}
                >
                  Contact User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleRetry}
          disabled={loading}
          className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-medium"
          data-testid="refresh-button"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

UserList.propTypes = {
  apiUrl: PropTypes.string,
  maxRetries: PropTypes.number,
  retryDelay: PropTypes.number
};

export default UserList;
