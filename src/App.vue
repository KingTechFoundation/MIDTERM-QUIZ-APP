<template>
  <div id="app-wrapper">
    <!-- Navbar conditionally rendered based on route metadata or path -->
    <Navbar v-if="!isDashboardRoute" />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer v-if="!isDashboardRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

// Simple check if we are on a dashboard route to hide the public Navbar/Footer
const isDashboardRoute = computed(() => {
  return route.path.startsWith('/teacher') || route.path.startsWith('/student');
});
</script>

<style>
/* Global App Styles specific to the root wrapper */
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}

/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
