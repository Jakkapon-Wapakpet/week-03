const API_URL = '/api';

/**
 * Helper function for making API calls with authentication token
 * @param {string} endpoint - API endpoint (e.g. '/products')
 * @param {object} options - Fetch options (method, body, etc.)
 */
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Network error or server is down' };
  }
}
