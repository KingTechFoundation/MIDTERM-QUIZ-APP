import { defineStore } from 'pinia';

// Mock DB
const MOCK_USERS = {
  'teacher@quiz.com': { password: '25291', role: 'teacher', name: 'Mrs. Nono' },
  'student@quiz.com': { password: '25291', role: 'student', name: 'Hillary 25291' }
};

const AUTH_KEY = 'quiz_app_auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(AUTH_KEY)) || null,
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userRecord = MOCK_USERS[email];
      
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
    
    logout() {
      this.user = null;
      localStorage.removeItem(AUTH_KEY);
    }
  }
});
