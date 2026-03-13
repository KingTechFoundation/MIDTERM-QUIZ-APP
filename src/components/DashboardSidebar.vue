<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar-brand p-lg border-b">
      <router-link to="/" class="brand">
        <span class="brand-text">Quiz<span class="accent">Vista</span></span>
      </router-link>
    </div>

    <nav class="sidebar-nav flex-grow p-md">
      <div class="nav-section mb-lg">
        <slot name="nav-links"></slot>
      </div>
      
      <div class="nav-section-label text-xs font-bold text-muted mb-sm px-sm text-uppercase">
        Account
      </div>
      
      <div class="user-pill flex-center gap-sm p-sm mb-md bg-light radius-md">
        <div class="avatar-circle flex-center font-bold">
          {{ userInitial }}
        </div>
        <div class="user-info flex-grow overflow-hidden">
          <div class="user-name font-bold text-sm truncate">{{ userName }}</div>
          <div class="user-role text-xs text-muted capitalize">{{ userRole }}</div>
        </div>
      </div>

      <button @click="handleLogout" class="sidebar-logout btn btn-link w-full flex-start">
        <span class="text-accent font-bold">Log out</span>
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
  font-size: 1.25rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-section-label {
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.user-pill {
  border: 1px solid rgba(2, 52, 48, 0.05);
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  min-width: 32px;
}

.sidebar-logout {
  padding: 0.75rem var(--space-sm);
  margin-top: auto;
}

.sidebar-logout:hover span {
  text-decoration: underline;
}

.text-uppercase { text-transform: uppercase; }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

:deep(.sidebar-nav a) {
  display: block;
  padding: 0.75rem var(--space-sm);
  border-radius: var(--radius-sm);
  color: var(--color-text-main);
  font-weight: 500;
  margin-bottom: 2px;
  transition: all var(--transition-fast);
}

:deep(.sidebar-nav a:hover) {
  background-color: var(--color-bg-light);
  color: var(--color-primary);
}

:deep(.sidebar-nav a.router-link-active) {
  background-color: rgba(0, 201, 177, 0.1);
  color: var(--color-primary);
  font-weight: 600;
}
</style>
