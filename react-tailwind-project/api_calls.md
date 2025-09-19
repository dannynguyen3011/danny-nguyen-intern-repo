# API Calls and Axios Instance Reflections

## Why Is It Useful to Create a Reusable Axios Instance?

Creating a reusable Axios instance is a fundamental best practice in modern web development that provides centralized configuration, consistency, and maintainability across an application's HTTP requests.

### **1. Centralized Configuration Management**

**Problem with Direct Axios Usage:**
```javascript
// ❌ Scattered configuration throughout the app
// In UserService.js
const getUserData = async (userId) => {
  const response = await axios.get(`https://api.myapp.com/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'X-Request-ID': generateRequestId()
    },
    timeout: 10000
  });
  return response.data;
};

// In PostService.js - duplicated configuration
const getPosts = async () => {
  const response = await axios.get(`https://api.myapp.com/posts`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'X-Request-ID': generateRequestId()
    },
    timeout: 10000
  });
  return response.data;
};
```

**Solution with Reusable Instance:**
```javascript
// ✅ Centralized configuration in axiosConfig.js
import axios from 'axios';
import { generateRequestId } from '../utils/requestId';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const REQUEST_TIMEOUT = 10000;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - applies to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['X-Request-ID'] = generateRequestId();
    
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
```

**Benefits:**
- **Single Source of Truth**: All HTTP configuration in one place
- **Easy Updates**: Change base URL or headers once, affects entire app
- **Environment Management**: Different configs for dev/staging/production
- **Reduced Duplication**: No repeated configuration code

### **2. Consistent Error Handling**

**Centralized Error Processing:**
```javascript
// Response Interceptor for consistent error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        requestId: response.config.headers['X-Request-ID'],
        responseTime: Date.now() - response.config.metadata?.startTime
      });
    }
    return response;
  },
  (error) => {
    // Centralized error handling logic
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
      return Promise.reject({ type: 'CANCELLED', message: 'Request was cancelled' });
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.message);
      return Promise.reject({ 
        type: 'TIMEOUT', 
        message: 'Request timed out. Please try again.' 
      });
    }
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Handle unauthorized - redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          return Promise.reject({ type: 'UNAUTHORIZED', message: 'Please log in again' });
          
        case 403:
          return Promise.reject({ type: 'FORBIDDEN', message: 'Access denied' });
          
        case 404:
          return Promise.reject({ type: 'NOT_FOUND', message: 'Resource not found' });
          
        case 429:
          return Promise.reject({ type: 'RATE_LIMITED', message: 'Too many requests. Please wait.' });
          
        case 500:
          return Promise.reject({ type: 'SERVER_ERROR', message: 'Server error. Please try again later.' });
          
        default:
          return Promise.reject({ 
            type: 'API_ERROR', 
            message: data?.message || 'An error occurred',
            status 
          });
      }
    }
    
    // Network error
    return Promise.reject({ 
      type: 'NETWORK_ERROR', 
      message: 'Network error. Please check your connection.' 
    });
  }
);
```

### **3. Performance Monitoring and Logging**

**Request/Response Timing:**
```javascript
// Add request timing metadata
axiosInstance.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() };
    config.headers['X-Request-ID'] = generateRequestId();
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
        requestId: config.headers['X-Request-ID'],
        data: config.data
      });
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Calculate and log response times
axiosInstance.interceptors.response.use(
  (response) => {
    const responseTime = Date.now() - response.config.metadata?.startTime;
    
    // Performance monitoring
    if (responseTime > 3000) {
      console.warn(`⚠️ Slow request: ${response.config.url} took ${responseTime}ms`);
    }
    
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'api_call', {
        'custom_parameter_url': response.config.url,
        'custom_parameter_method': response.config.method,
        'custom_parameter_status': response.status,
        'custom_parameter_duration': responseTime
      });
    }
    
    return response;
  },
  (error) => {
    // Track API errors
    if (window.gtag && error.response) {
      window.gtag('event', 'api_error', {
        'custom_parameter_url': error.config?.url,
        'custom_parameter_status': error.response.status,
        'custom_parameter_error': error.response.data?.message
      });
    }
    
    return Promise.reject(error);
  }
);
```

### **4. Development vs. Production Optimizations**

**Environment-Specific Configuration:**
```javascript
// Environment-specific settings
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: isDevelopment ? 30000 : 10000, // Longer timeout in dev
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    ...(isProduction && { 'X-Environment': 'production' })
  },
});

// Development-only features
if (isDevelopment) {
  // Detailed logging in development
  axiosInstance.interceptors.request.use(
    (config) => {
      console.group(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Data:', config.data);
      console.log('Params:', config.params);
      console.groupEnd();
      return config;
    }
  );
  
  // Mock delay for testing loading states
  axiosInstance.interceptors.response.use(
    async (response) => {
      if (process.env.REACT_APP_MOCK_DELAY) {
        await new Promise(resolve => 
          setTimeout(resolve, parseInt(process.env.REACT_APP_MOCK_DELAY))
        );
      }
      return response;
    }
  );
}
```

## How Does Intercepting Requests Help with Authentication?

Request interceptors provide a powerful mechanism for handling authentication automatically and consistently across all API calls.

### **1. Automatic Token Injection**

**Traditional Manual Approach:**
```javascript
// ❌ Manual token handling in every request
const fetchUserProfile = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get('/api/user/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.put('/api/user/profile', profileData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
```

**Automated with Interceptors:**
```javascript
// ✅ Automatic token injection via interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from various sources
    const token = getAuthToken();
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to get token from multiple sources
const getAuthToken = () => {
  // Priority order: memory -> localStorage -> sessionStorage
  return (
    window.authToken || 
    localStorage.getItem('authToken') || 
    sessionStorage.getItem('tempAuthToken')
  );
};

// Now all requests automatically include authentication
const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/api/user/profile');
  return response.data; // Token automatically included
};
```

### **2. Token Refresh Handling**

**Automatic Token Renewal:**
```javascript
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/auth/refresh', {
          refreshToken
        });
        
        const { accessToken } = response.data;
        localStorage.setItem('authToken', accessToken);
        
        // Update default header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        
        // Retry original request
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);
```

### **3. Role-Based Request Modification**

**Dynamic Headers Based on User Role:**
```javascript
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getCurrentUser();
    const token = getAuthToken();
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (user) {
      // Add user context headers
      config.headers['X-User-ID'] = user.id;
      config.headers['X-User-Role'] = user.role;
      
      // Role-specific modifications
      switch (user.role) {
        case 'admin':
          config.headers['X-Admin-Access'] = 'true';
          break;
          
        case 'premium':
          config.headers['X-Premium-Features'] = 'enabled';
          break;
          
        case 'trial':
          // Add trial limitations
          config.headers['X-Trial-User'] = 'true';
          config.timeout = 5000; // Shorter timeout for trial users
          break;
      }
      
      // Geographic context
      if (user.region) {
        config.headers['X-User-Region'] = user.region;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);
```

### **4. Session Management**

**Automatic Session Validation:**
```javascript
let lastActivityTime = Date.now();

axiosInstance.interceptors.request.use(
  (config) => {
    const now = Date.now();
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    
    // Check session expiry
    if (now - lastActivityTime > sessionTimeout) {
      localStorage.removeItem('authToken');
      window.location.href = '/login?reason=session-expired';
      return Promise.reject(new Error('Session expired'));
    }
    
    // Update activity time
    lastActivityTime = now;
    
    // Add session info
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);
```

## What Happens If an API Request Times Out, and How Can You Handle It?

API request timeouts are common in web applications and require robust handling to maintain good user experience and application stability.

### **1. Understanding Timeout Scenarios**

**Types of Timeouts:**
```javascript
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000, // 10 seconds - overall request timeout
});

// Different timeout scenarios:
// 1. Connection timeout - can't establish connection
// 2. Request timeout - request sent but no response
// 3. Response timeout - partial response received
// 4. Custom timeout - application-specific limits
```

**Timeout Detection:**
```javascript
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', {
        url: error.config?.url,
        method: error.config?.method,
        timeout: error.config?.timeout,
        message: error.message
      });
      
      // Categorize timeout type
      if (error.message.includes('timeout')) {
        return Promise.reject({
          type: 'TIMEOUT',
          message: 'Request timed out. Please try again.',
          originalError: error
        });
      }
    }
    
    return Promise.reject(error);
  }
);
```

### **2. Progressive Timeout Handling**

**Retry with Exponential Backoff:**
```javascript
const createRetryableRequest = (config, maxRetries = 3) => {
  let retryCount = 0;
  
  const makeRequest = async () => {
    try {
      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      if (error.code === 'ECONNABORTED' && retryCount < maxRetries) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        
        console.log(`Request timed out. Retrying in ${delay}ms... (${retryCount}/${maxRetries})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Increase timeout for retry
        config.timeout = config.timeout * 1.5;
        
        return makeRequest();
      }
      
      throw error;
    }
  };
  
  return makeRequest();
};

// Usage
const fetchDataWithRetry = async () => {
  try {
    const response = await createRetryableRequest({
      method: 'GET',
      url: '/api/data',
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('All retry attempts failed:', error);
    throw error;
  }
};
```

### **3. User Experience During Timeouts**

**Progressive Loading States:**
```javascript
const useApiWithTimeout = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutWarning, setTimeoutWarning] = useState(false);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setTimeoutWarning(false);
    
    // Show warning after 5 seconds
    const warningTimer = setTimeout(() => {
      setTimeoutWarning(true);
    }, 5000);
    
    try {
      const response = await axiosInstance.get(url, {
        timeout: options.timeout || 15000,
        ...options
      });
      
      clearTimeout(warningTimer);
      setData(response.data);
      setTimeoutWarning(false);
    } catch (err) {
      clearTimeout(warningTimer);
      setTimeoutWarning(false);
      
      if (err.code === 'ECONNABORTED') {
        setError({
          type: 'timeout',
          message: 'Request is taking longer than expected. Please try again.',
          canRetry: true
        });
      } else {
        setError({
          type: 'error',
          message: err.message,
          canRetry: false
        });
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  return { data, loading, error, timeoutWarning, refetch: fetchData };
};

// Component usage
const DataComponent = () => {
  const { data, loading, error, timeoutWarning, refetch } = useApiWithTimeout('/api/slow-endpoint');
  
  if (loading) {
    return (
      <div>
        <Spinner />
        <p>Loading data...</p>
        {timeoutWarning && (
          <div className="timeout-warning">
            <p>This is taking longer than usual. Please wait...</p>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        )}
      </div>
    );
  }
  
  if (error?.type === 'timeout') {
    return (
      <div className="error-container">
        <h3>Request Timed Out</h3>
        <p>{error.message}</p>
        <button onClick={refetch}>Try Again</button>
        <button onClick={() => window.location.reload()}>
          Refresh Page
        </button>
      </div>
    );
  }
  
  return <div>{data && <DataDisplay data={data} />}</div>;
};
```

### **4. Request Cancellation and Cleanup**

**AbortController Integration:**
```javascript
const useCancellableRequest = () => {
  const abortControllerRef = useRef(null);
  
  const makeRequest = useCallback(async (config) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort('New request initiated');
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await axiosInstance({
        ...config,
        signal: abortControllerRef.current.signal,
        timeout: config.timeout || 10000
      });
      
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
        return null;
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      
      throw error;
    }
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort('Component unmounted');
      }
    };
  }, []);
  
  return { makeRequest };
};
```

### **5. Network-Aware Timeout Handling**

**Adaptive Timeouts Based on Connection:**
```javascript
const getNetworkAwareTimeout = () => {
  // Check network connection type
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return 10000; // Default 10 seconds
  
  const effectiveType = connection.effectiveType;
  
  switch (effectiveType) {
    case 'slow-2g':
      return 30000; // 30 seconds
    case '2g':
      return 20000; // 20 seconds
    case '3g':
      return 15000; // 15 seconds
    case '4g':
      return 10000; // 10 seconds
    default:
      return 10000;
  }
};

// Apply network-aware timeouts
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.timeout) {
      config.timeout = getNetworkAwareTimeout();
    }
    
    // Add network info to headers for server-side optimization
    const connection = navigator.connection;
    if (connection) {
      config.headers['X-Connection-Type'] = connection.effectiveType;
      config.headers['X-Connection-Downlink'] = connection.downlink;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);
```

### **6. Graceful Degradation Strategies**

**Fallback Mechanisms:**
```javascript
const createResilientRequest = async (primaryConfig, fallbackConfig = null) => {
  try {
    // Try primary request with shorter timeout
    const response = await axiosInstance({
      ...primaryConfig,
      timeout: 8000
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.log('Primary request timed out, trying fallback...');
      
      if (fallbackConfig) {
        try {
          const fallbackResponse = await axiosInstance({
            ...fallbackConfig,
            timeout: 15000 // Longer timeout for fallback
          });
          return fallbackResponse.data;
        } catch (fallbackError) {
          throw new Error('Both primary and fallback requests failed');
        }
      }
      
      // If no fallback, try cached data
      const cachedData = getCachedData(primaryConfig.url);
      if (cachedData) {
        console.log('Using cached data due to timeout');
        return cachedData;
      }
    }
    
    throw error;
  }
};

// Usage with fallback
const fetchUserData = async (userId) => {
  return createResilientRequest(
    { url: `/api/users/${userId}` },
    { url: `/api/users/${userId}/basic` } // Fallback with less data
  );
};
```

### **Summary of Timeout Handling Best Practices:**

1. **Set Reasonable Timeouts**: Based on network conditions and request complexity
2. **Implement Retry Logic**: With exponential backoff for transient failures
3. **Provide User Feedback**: Progressive loading states and timeout warnings
4. **Use Request Cancellation**: AbortController for cleanup and avoiding memory leaks
5. **Fallback Strategies**: Cached data, simplified endpoints, or offline modes
6. **Monitor and Adapt**: Network-aware timeouts and performance tracking
7. **Graceful Error Messages**: User-friendly explanations with actionable options

Proper timeout handling ensures your application remains responsive and provides a good user experience even when network conditions are poor or services are slow to respond.
