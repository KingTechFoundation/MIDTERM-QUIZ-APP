<template>
  <section id="hero" class="hero">
    <!-- Background Slider Overlay -->
    <div class="hero-slider">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="slide"
        :class="{ 'active': currentSlide === index }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="overlay"></div>
    </div>
    
    <!-- Hero Content -->
    <div class="container hero-container pt-nav">
      <div class="hero-content">
        <h1 class="text-h1 hero-title animate-slide-up">
          Assess with <span class="accent">Brilliance</span>
        </h1>
        <p class="text-body-lg hero-subtitle animate-slide-up" style="animation-delay: 0.2s;">
          The premium platform for educators to create stunning quizzes 
          and for students to experience flawless, distraction-free learning.
        </p>
        
        <div class="hero-cta animate-slide-up" style="animation-delay: 0.4s;">
          <router-link to="/login" class="btn btn-primary btn-lg">
            Start Your Journey
          </router-link>
          <a href="#vision" class="btn btn-outline btn-lg cta-secondary">
            Discover How
          </a>
        </div>
        
        <!-- Quick Stats -->
        <div class="hero-stats animate-slide-up" style="animation-delay: 0.6s;">
          <div class="stat">
            <span class="stat-num">50k+</span>
            <span class="stat-label">Active Users</span>
          </div>
          <div class="stat">
            <span class="stat-num">10M+</span>
            <span class="stat-label">Quizzes Taken</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Using high-quality abstract/educational placeholders
const images = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', // Group studying
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop', // Desk writing
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'  // Digital learning
];

const currentSlide = ref(0);
let slideInterval;

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % images.length;
  }, 5000); // Change image every 5 seconds
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--color-primary); /* Fallback */
}

/* Background Slider Styling */
.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 10s linear;
  transform: scale(1.05); /* Slight scale for ken burns effect */
}

.slide.active {
  opacity: 1;
  transform: scale(1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Dark Emerald gradient overlay */
  background: linear-gradient(
    135deg, 
    rgba(2, 52, 48, 0.95) 0%, 
    rgba(6, 75, 70, 0.8) 50%,
    rgba(2, 52, 48, 0.9) 100%
  );
  z-index: 2;
}

/* Foreground Content */
.hero-container {
  position: relative;
  z-index: 3; /* Above slider */
}

.hero-content {
  max-width: 800px;
  color: var(--color-bg-white);
  padding: var(--space-xl) 0;
}

.hero-title {
  color: var(--color-bg-white);
  margin-bottom: var(--space-sm);
  line-height: 1.1;
}

.accent {
  color: var(--color-accent);
}

.hero-subtitle {
  color: var(--color-bg-light);
  opacity: 0.9;
  margin-bottom: var(--space-lg);
  max-width: 600px;
}

.hero-cta {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.cta-secondary {
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--color-bg-white);
}

.cta-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--color-bg-white);
}

/* Stats */
.hero-stats {
  display: flex;
  gap: var(--space-xl);
  border-left: 3px solid var(--color-secondary);
  padding-left: var(--space-md);
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-secondary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(244, 241, 234, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-cta {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: var(--space-sm);
  }
  
  .btn-lg {
    width: 100%;
  }

  .hero-stats {
    border-left: none;
    border-top: 3px solid var(--color-secondary);
    padding-left: 0;
    padding-top: var(--space-md);
    justify-content: center;
  }
}
</style>
