<template>
  <div class="landing-page">
    <HeroSlider />
    <Vision />
    <Testimonials />
  </div>
</template>

<script setup>
import HeroSlider from '../components/HeroSlider.vue';
import Vision from '../components/Vision.vue';
import Testimonials from '../components/Testimonials.vue';
</script>

<style scoped>
.landing-page {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
