<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar-brand p-md">
      <router-link to="/" class="brand">
        <span class="brand-text">QuizVista</span>
      </router-link>
    </div>

    <nav class="sidebar-nav flex-grow p-md">
      <div class="nav-section mb-lg">
        <slot name="nav-links"></slot>
      </div>
      
      <div class="nav-section-label text-xs font-bold text-muted mb-sm px-sm text-uppercase">
        Account
      </div>
      
      <div class="user-pill flex-center gap-sm p-sm mb-sm mt-sm">
        <div class="avatar-circle flex-center font-bold">
          {{ userInitial }}
        </div>
        <div class="user-info flex-grow">
          <div class="user-name font-bold text-sm">{{ userName }}</div>
          <div class="user-role text-xs text-muted capitalize">{{ userRole }}</div>
        </div>
      </div>

      <button @click="handleLogout" class="sidebar-logout p-sm w-full flex-center">
        <span class="text-black font-bold">Log out</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name || 'User');
const userRole = computed(() => authStore.userRole || 'student');
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar-brand .brand-text {
  font-size: 1.5rem;
  color: #1A1A1A;
  font-weight: 500;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-section-label {
  letter-spacing: 0.1em;
  opacity: 0.5;
  border-top: 1px solid rgba(0,0,0,0.05);
  padding-top: 1rem;
}

.user-pill {
  border: none;
}

.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #023430;
  color: white;
  min-width: 44px;
  font-size: 1.25rem;
}

.sidebar-logout {
  margin-top: 0.5rem;
  cursor: pointer;
}

.sidebar-logout:hover span {
  text-decoration: underline;
}

.text-black { color: #000; }
.text-uppercase { text-transform: uppercase; }

:deep(.sidebar-nav a) {
  display: block;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  color: #000;
  font-weight: 600;
  margin-bottom: 4px;
  transition: all var(--transition-fast);
  font-size: 1.1rem;
}

:deep(.sidebar-nav a:hover) {
  background-color: rgba(0, 201, 177, 0.05);
}

:deep(.sidebar-nav a.router-link-active) {
  background-color: rgba(0, 201, 177, 0.1);
  color: #023430;
}
</style>
