import { defineStore } from 'pinia';

// Keys for storage
const USERS_KEY = 'quiz_app_users_db';
const AUTH_KEY = 'quiz_app_auth';

// Initial dummy data
const INITIAL_USERS = {
  'teacher@quiz.com': { password: '25291', role: 'teacher', name: 'Mrs. Nono' },
  'student@quiz.com': { password: '25291', role: 'student', name: 'Hillary 25291' }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(AUTH_KEY)) || null,
    // Load all users from storage or use initial
    users: JSON.parse(localStorage.getItem(USERS_KEY)) || INITIAL_USERS,
    error: null,
    isLoading: false,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role || null,
  },
  
  actions: {
    async login(email, password) {
      this.isLoading = true;
      this.error = null;
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userRecord = this.users[email];
      
      if (userRecord && userRecord.password === password) {
        const authData = { email, role: userRecord.role, name: userRecord.name };
        this.user = authData;
        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        this.isLoading = false;
        return { success: true, role: authData.role };
      } else {
        this.error = 'Invalid credentials. Please try again.';
        this.isLoading = false;
        return { success: false };
      }
    },

    async register(name, email, password, role) {
      this.isLoading = true;
      this.error = null;
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.users[email]) {
        this.error = 'Email already exists. Try signing in.';
        this.isLoading = false;
        return { success: false };
      }

      // Add new user
      this.users[email] = { password, role, name };
      
      // Persist users DB
      localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
      
      // Auto-login after registration
      const authData = { email, role, name };
      this.user = authData;
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      
      this.isLoading = false;
      return { success: true, role };
    },
    
    logout() {
      this.user = null;
      localStorage.removeItem(AUTH_KEY);
    }
  }
});
