<template>
  <div class="login-page">
    <div class="container flex-center min-h-screen">
      <div class="form-card animate-slide-up">
        <h1 class="text-h1 mb-xl color-primary text-center">{{ isRegister ? 'Create Account' : 'Sign In' }}</h1>
        
        <form @submit.prevent="handleSubmit" class="login-form">
          <div v-if="isRegister" class="form-group slide-fade">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Enter password"
              required
              aria-required="true"
            />
          </div>

          <div v-if="isRegister" class="form-group mb-md slide-fade">
            <label>Join as a:</label>
            <div class="role-selector flex-center gap-md mt-xs">
              <label class="radio-label">
                <input type="radio" value="student" v-model="role" /> Student
              </label>
              <label class="radio-label">
                <input type="radio" value="teacher" v-model="role" /> Teacher
              </label>
            </div>
          </div>
          
          <div v-if="!isRegister" class="form-options mb-md flex-between">
            <label class="flex-center gap-xs">
              <input type="checkbox" id="remember-me" /> 
              <span class="text-muted">Remember me</span>
            </label>
          </div>

          <div v-if="authStore.error" class="error-banner mb-sm" role="alert" aria-live="assertive">
            {{ authStore.error }}
          </div>

          <button type="submit" class="btn btn-primary w-full py-md" :disabled="authStore.isLoading" aria-live="polite">
            {{ authStore.isLoading ? (isRegister ? 'Creating Account' : 'Signing In...') : (isRegister ? 'Register Now' : 'Sign In') }}
          </button>
        </form>

        <div class="separator-container my-lg flex-center">
          <span class="separator-line"></span>
          <span class="separator-text">or</span>
          <span class="separator-line"></span>
        </div>

        <button 
          type="button" 
          class="btn btn-outline w-full py-md" 
          @click="isRegister = !isRegister"
        >
          {{ isRegister ? 'Back to Sign In' : 'Create Account' }}
        </button>
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

const isRegister = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('student');

const handleSubmit = async () => {
  let result;
  if (isRegister.value) {
    result = await authStore.register(name.value, email.value, password.value, role.value);
  } else {
    result = await authStore.login(email.value, password.value);
  }
  
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
  background-color: var(--color-bg-white);
  padding-top: 80px; /* Offset for fixed navbar */
}

.min-h-screen { min-height: calc(100vh - 80px); }

.form-card {
  width: 100%;
  max-width: 450px;
  padding: var(--space-xl);
  /* Glassmorphism subtle effect */
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
}

.mb-xl { margin-bottom: var(--space-xl); }
.py-md { padding-top: 1rem; padding-bottom: 1rem; }

.form-group {
  margin-bottom: var(--space-md);
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  font-size: 0.9rem;
  text-transform: capitalize;
}

.form-group input {
  padding: 1rem;
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
  box-shadow: 0 0 0 3px rgba(0, 201, 177, 0.1);
  background-color: var(--color-bg-white);
}

.form-options {
  font-size: 0.875rem;
}

.forgot-link {
  color: var(--color-primary);
  font-weight: 600;
}

.forgot-link:hover {
  text-decoration: underline;
  color: var(--color-accent);
}

/* Separator */
.my-lg { margin-top: var(--space-lg); margin-bottom: var(--space-lg); }

.separator-container {
  width: 100%;
}

.separator-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(2, 52, 48, 0.1);
}

.separator-text {
  padding: 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
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

/* Separator */
.my-lg { margin-top: var(--space-lg); margin-bottom: var(--space-lg); }

.separator-container {
  width: 100%;
}

.separator-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(2, 52, 48, 0.1);
}

.separator-text {
  padding: 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* Role Selector */
.role-selector {
  gap: 2rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-main);
  transition: color var(--transition-fast);
}

.radio-label:hover {
  color: var(--color-secondary);
}

.radio-label input[type="radio"] {
  width: 20px;
  height: 20px;
  accent-color: var(--color-secondary);
  cursor: pointer;
}
</style>
