<template>
  <div class="login-page">
    <div class="login-split">
      <!-- Left: Decorative / Branding -->
      <div class="login-brand-panel text-center">
        <router-link to="/" class="brand mb-md mx-auto inline-flex">
          <span class="brand-text text-h3 text-white">Quiz<span class="accent">Vista</span></span>
        </router-link>
        <h2 class="text-h2 text-white mb-sm">Welcome Back</h2>
        <p class="text-body-lg text-light opacity-80 mb-lg max-w-sm mx-auto">
          Sign in to access your dashboard, manage quizzes, or start your next assessment.
        </p>
        
        <div class="login-illustration">
          <div class="glass-shape shape-1"></div>
          <div class="glass-shape shape-2"></div>
          <div class="glass-shape shape-3"></div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="login-form-panel">
        <div class="form-container animate-slide-up">
          <h3 class="text-h3 mb-md color-primary">Sign In</h3>
          
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="teacher@quiz.com or student@quiz.com"
                required
                aria-required="true"
              />
            </div>
            
            <div class="form-group mb-sm">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                placeholder="Enter 'password'"
                required
                aria-required="true"
              />
            </div>
            
            <div class="form-options mb-md flex-between">
              <label class="flex-center gap-xs">
                <input type="checkbox" id="remember-me" /> 
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <div v-if="authStore.error" class="error-banner mb-sm" role="alert" aria-live="assertive">
              {{ authStore.error }}
            </div>

            <button type="submit" class="btn btn-primary w-full" :disabled="authStore.isLoading" aria-live="polite">
              {{ authStore.isLoading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>

          <p class="mt-lg text-center text-muted text-body-sm">
            Don't have an account? <a href="#" class="font-bold color-primary">Contact your administrator</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const result = await authStore.login(email.value, password.value);
  
  if (result.success) {
    if (result.role === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/student');
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background-color: var(--color-bg-light);
}

.login-split {
  display: flex;
  width: 100%;
}

/* Left Panel */
.login-brand-panel {
  flex: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, #041f1c 100%);
  padding: var(--space-xl) var(--space-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brand-text {
  font-family: var(--font-heading);
  font-weight: 800;
}

.accent { color: var(--color-accent); }
.text-white { color: var(--color-bg-white); }
.text-light { color: var(--color-bg-light); }
.opacity-80 { opacity: 0.8; }
.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mt-lg { margin-top: var(--space-lg); }
.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-sm { max-width: 400px; }
.inline-flex { display: inline-flex; }
.w-full { width: 100%; }
.font-bold { font-weight: 600; }
.color-primary { color: var(--color-primary); }
.gap-xs { gap: 0.5rem; }

/* Abstract Illustration */
.login-illustration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.glass-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 201, 177, 0.2), rgba(2, 52, 48, 0));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -10%;
  left: -10%;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -5%;
  right: -5%;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15), rgba(2, 52, 48, 0));
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: 70%;
}

.login-brand-panel > * {
  position: relative;
  z-index: 1;
}

/* Right Panel */
.login-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) var(--space-md);
  background-color: var(--color-bg-white);
}

.form-container {
  width: 100%;
  max-width: 420px;
}

.form-group {
  margin-bottom: var(--space-sm);
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  font-size: 0.95rem;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(2, 52, 48, 0.15);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background-color: var(--color-bg-light);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(0, 201, 177, 0.15);
  background-color: var(--color-bg-white);
}

.form-options {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.forgot-link {
  color: var(--color-primary);
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
  color: var(--color-accent);
}

.error-banner {
  background-color: rgba(255, 107, 74, 0.1);
  color: var(--color-accent);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  border-left: 3px solid var(--color-accent);
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@media (max-width: 992px) {
  .login-split {
    flex-direction: column;
  }
  
  .login-brand-panel {
    flex: none;
    padding: var(--space-lg) var(--space-md);
  }
  
  .login-form-panel {
    flex: 1;
    padding: var(--space-lg) var(--space-md);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    margin-top: -2rem; /* Overlap effect */
    position: relative;
    z-index: 10;
  }
}
</style>
