import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/student',
    name: 'StudentDashboard',
    component: () => import('../views/StudentDashboard.vue'),
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/teacher',
    name: 'TeacherDashboard',
    component: () => import('../views/TeacherDashboard.vue'),
    meta: { requiresAuth: true, role: 'teacher' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  }
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // We need to access the store inside the guard to ensure Pinia is initialized
  const authStore = useAuthStore();
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login');
    } else {
      const userRole = authStore.userRole;
      const requiredRole = to.meta.role;
      
      if (requiredRole && requiredRole !== userRole) {
        // Fallback redirection based on actual role
        next(userRole === 'teacher' ? '/teacher' : '/student');
      } else {
        next();
      }
    }
  } else {
    // If user is already logged in and tries to access login or landing
    if (to.path === '/login' && authStore.isAuthenticated) {
      const role = authStore.userRole;
      next(role === 'teacher' ? '/teacher' : '/student');
    } else {
      next();
    }
  }
});

export default router;
