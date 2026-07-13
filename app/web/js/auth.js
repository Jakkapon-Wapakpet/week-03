// Authentication Helper Methods
const Auth = {
  // Check if token exists
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  // Get current user object
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  },

  // Save session details
  saveSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Clear session
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  },

  // Register request
  async register(username, email, password, firstName, lastName, phoneNumber, role = 'customer') {
    try {
      const response = await fetch(`${window.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, firstName, lastName, phoneNumber, role })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      this.saveSession(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // Login request
  async login(email, password) {
    try {
      const response = await fetch(`${window.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      this.saveSession(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Get profile from server (validates token)
  async fetchProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${window.API_BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Fetch profile failed:', error);
      this.logout();
      return null;
    }
  },

  // Redirect if guest
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html';
    }
  },

  // Redirect if not admin
  requireAdmin() {
    this.requireAuth();
    const user = this.getUser();
    if (!user || user.role !== 'admin') {
      window.location.href = '/index.html';
    }
  }
};

window.Auth = Auth;
