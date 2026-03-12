<template>
  <header class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <router-link to="/" class="brand">
        <span class="brand-text">Quiz<span class="accent">Vista</span></span>
      </router-link>

      <nav 
        class="nav-links" 
        :class="{ 'active': mobileMenuOpen }"
        :aria-hidden="mobileMenuOpen ? 'false' : 'true'"
        id="main-navigation"
      >
        <a href="#hero" @click="closeMenu">Home</a>
        <a href="#vision" @click="closeMenu">Vision</a>
        <a href="#testimonials" @click="closeMenu">Reviews</a>
        
        <router-link to="/login" class="btn btn-primary login-btn" @click="closeMenu">
          Get Started
        </router-link>
      </nav>

      <button 
        class="hamburger" 
        @click="toggleMenu" 
        :aria-expanded="mobileMenuOpen" 
        aria-controls="main-navigation"
        aria-label="Toggle Navigation Menu"
      >
        <span class="bar" :class="{ 'active': mobileMenuOpen }" aria-hidden="true"></span>
        <span class="bar" :class="{ 'active': mobileMenuOpen }" aria-hidden="true"></span>
        <span class="bar" :class="{ 'active': mobileMenuOpen }" aria-hidden="true"></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMenu = () => {
  mobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  transition: all var(--transition-normal);
  padding: var(--space-sm) 0;
}

.navbar.scrolled {
  background-color: rgba(244, 241, 234, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-text {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--color-primary);
  letter-spacing: -0.5px;
}

.accent {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.nav-links a {
  font-weight: 500;
  color: var(--color-text-main);
  position: relative;
}

.nav-links a:not(.login-btn)::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--color-secondary);
  transition: width var(--transition-fast);
}

.nav-links a:not(.login-btn):hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  z-index: 1001;
}

.bar {
  width: 24px;
  height: 2px;
  background-color: var(--color-primary);
  transition: all 0.3s ease;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--color-bg-white);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-lg);
    transition: right var(--transition-normal);
  }

  .nav-links.active {
    right: 0;
  }

  .bar.active:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  .bar.active:nth-child(2) {
    opacity: 0;
  }
  .bar.active:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }
}
</style>
