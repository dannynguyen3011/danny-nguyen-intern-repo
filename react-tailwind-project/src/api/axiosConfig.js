/**
 * Axios Configuration with Advanced Features
 * 
 * This module sets up a reusable Axios instance with:
 * - Base URL configuration
 * - Default headers including dynamic request IDs
 * - Request timeouts
 * - Request cancellation support
 * - Request/Response interceptors
 * - Error handling
 */

import axios from 'axios';
import { generateRequestId } from '../utils/requestId';

// Configuration constants
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000, // 10 seconds
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
  }
};

/**
 * Create and configure Axios instance
 */
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.DEFAULT_HEADERS,
    // Enable request cancellation
    signal: undefined, // Will be set per request
  });

  return instance;
};

// Create the main API instance
const apiClient = createAxiosInstance();

/**
 * Request Interceptor
 * Adds dynamic headers and request tracking
 */
apiClient.interceptors.request.use(
  (config) => {
    // Generate unique request ID for each request
    const requestId = generateRequestId();
    config.headers['X-Request-ID'] = requestId;
    
    // Add timestamp for request tracking
    config.metadata = {
      startTime: Date.now(),
      requestId: requestId
    };
    
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Log request details in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request [${requestId}]:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and errors consistently
 */
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = Date.now() - response.config.metadata.startTime;
    const requestId = response.config.metadata.requestId;
    
    // Log response details in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response [${requestId}] (${duration}ms):`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
    }
    
    // Add response metadata
    response.metadata = {
      requestId,
      duration,
      timestamp: new Date().toISOString()
    };
    
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.config?.metadata) {
      const duration = Date.now() - error.config.metadata.startTime;
      const requestId = error.config.metadata.requestId;
      
      console.error(`❌ API Error [${requestId}] (${duration}ms):`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please try again';
    } else if (error.code === 'ERR_CANCELED') {
      error.message = 'Request was cancelled';
    } else if (!error.response) {
      error.message = 'Network error - please check your connection';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Request Cancellation Manager
 * Manages AbortController instances for request cancellation
 */
class RequestCancellationManager {
  constructor() {
    this.controllers = new Map();
  }
  
  /**
   * Create a new AbortController for a request
   * @param {string} requestKey - Unique key for the request
   * @returns {AbortController} New AbortController instance
   */
  createController(requestKey) {
    // Cancel existing request with the same key
    this.cancelRequest(requestKey);
    
    const controller = new AbortController();
    this.controllers.set(requestKey, controller);
    return controller;
  }
  
  /**
   * Cancel a specific request
   * @param {string} requestKey - Key of the request to cancel
   */
  cancelRequest(requestKey) {
    const controller = this.controllers.get(requestKey);
    if (controller) {
      controller.abort();
      this.controllers.delete(requestKey);
    }
  }
  
  /**
   * Cancel all pending requests
   */
  cancelAllRequests() {
    this.controllers.forEach((controller, key) => {
      controller.abort();
    });
    this.controllers.clear();
  }
  
  /**
   * Get the signal for a request
   * @param {string} requestKey - Key of the request
   * @returns {AbortSignal|undefined} AbortSignal if controller exists
   */
  getSignal(requestKey) {
    const controller = this.controllers.get(requestKey);
    return controller?.signal;
  }
}

// Global cancellation manager instance
const cancellationManager = new RequestCancellationManager();

/**
 * Enhanced API methods with cancellation support
 */
const api = {
  /**
   * GET request with cancellation support
   * @param {string} url - Request URL
   * @param {Object} config - Axios config object
   * @param {string} requestKey - Unique key for request cancellation
   * @returns {Promise} Axios response promise
   */
  get: (url, config = {}, requestKey = url) => {
    const controller = cancellationManager.createController(requestKey);
    return apiClient.get(url, {
      ...config,
      signal: controller.signal
    });
  },
  
  /**
   * POST request with cancellation support
   * @param {string} url - Request URL
   * @param {any} data - Request data
   * @param {Object} config - Axios config object
   * @param {string} requestKey - Unique key for request cancellation
   * @returns {Promise} Axios response promise
   */
  post: (url, data, config = {}, requestKey = `${url}_post`) => {
    const controller = cancellationManager.createController(requestKey);
    return apiClient.post(url, data, {
      ...config,
      signal: controller.signal
    });
  },
  
  /**
   * PUT request with cancellation support
   * @param {string} url - Request URL
   * @param {any} data - Request data
   * @param {Object} config - Axios config object
   * @param {string} requestKey - Unique key for request cancellation
   * @param {Promise} Axios response promise
   */
  put: (url, data, config = {}, requestKey = `${url}_put`) => {
    const controller = cancellationManager.createController(requestKey);
    return apiClient.put(url, data, {
      ...config,
      signal: controller.signal
    });
  },
  
  /**
   * DELETE request with cancellation support
   * @param {string} url - Request URL
   * @param {Object} config - Axios config object
   * @param {string} requestKey - Unique key for request cancellation
   * @returns {Promise} Axios response promise
   */
  delete: (url, config = {}, requestKey = `${url}_delete`) => {
    const controller = cancellationManager.createController(requestKey);
    return apiClient.delete(url, {
      ...config,
      signal: controller.signal
    });
  },
  
  // Cancellation methods
  cancelRequest: cancellationManager.cancelRequest.bind(cancellationManager),
  cancelAllRequests: cancellationManager.cancelAllRequests.bind(cancellationManager),
  
  // Direct access to axios instance for advanced usage
  instance: apiClient,
  
  // Configuration access
  config: API_CONFIG
};

export default api;
export { apiClient, cancellationManager, API_CONFIG };
