// Required api.js to be loaded before this file

const Auth = {
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
  },

  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (userData) => {
    // userData contains username, email, password, firstName, lastName, phoneNumber, role
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  checkSession: async () => {
    if (Auth.isLoggedIn()) {
      const data = await apiCall('/auth/me');
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        // Token invalid or expired
        Auth.logout();
      }
    }
  },

  // UI Helper: Update header based on auth state
  updateHeader: () => {
    const user = Auth.getUser();
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const userNameSpan = document.getElementById('user-name-display');
    const adminLink = document.getElementById('admin-link');

    if (user) {
      if (guestLinks) guestLinks.style.display = 'none';
      if (userLinks) userLinks.style.display = 'flex';
      if (userNameSpan) userNameSpan.textContent = user.username;
      if (adminLink) {
        adminLink.style.display = user.role === 'admin' ? 'block' : 'none';
      }
    } else {
      if (guestLinks) guestLinks.style.display = 'flex';
      if (userLinks) userLinks.style.display = 'none';
      if (adminLink) adminLink.style.display = 'none';
    }
  }
};

// Check session on load
document.addEventListener('DOMContentLoaded', () => {
  Auth.checkSession().then(() => {
    Auth.updateHeader();
  });
});
