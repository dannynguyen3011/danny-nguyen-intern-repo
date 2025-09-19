/**
 * Utility functions for generating unique request IDs
 */

/**
 * Generate a unique request ID using timestamp and random string
 * @returns {string} Unique request ID
 */
export const generateRequestId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `req_${timestamp}_${randomStr}`;
};

/**
 * Generate a UUID v4 style request ID (more robust)
 * @returns {string} UUID-style request ID
 */
export const generateUUIDRequestId = () => {
  return 'req_' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Get request ID from session storage or generate new one
 * @param {string} key - Storage key for the request ID
 * @returns {string} Request ID
 */
export const getOrCreateRequestId = (key = 'current_request_id') => {
  let requestId = sessionStorage.getItem(key);
  if (!requestId) {
    requestId = generateRequestId();
    sessionStorage.setItem(key, requestId);
  }
  return requestId;
};
