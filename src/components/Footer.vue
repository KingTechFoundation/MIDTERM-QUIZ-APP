<template>
  <footer class="footer section">
    <div class="container footer-container">
      <div class="footer-brand">
        <h2 class="brand-text">Quiz<span class="accent">Vista</span></h2>
        <p class="text-body-sm tag-line">Empowering learning through seamless assessments.</p>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Platform</h4>
          <router-link to="/">About Us</router-link>
          <router-link to="/">Features</router-link>
          <router-link to="/">Pricing</router-link>
        </div>
        
        <div class="link-group">
          <h4>Support</h4>
          <router-link to="/">Help Center</router-link>
          <router-link to="/">Terms of Service</router-link>
          <router-link to="/">Privacy Policy</router-link>
        </div>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <p class="text-body-sm">&copy; {{ new Date().getFullYear() }} QuizVista. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary);
  color: var(--color-bg-light);
  padding: var(--space-lg) 0 var(--space-sm) 0;
}

.footer-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-lg);
}

.brand-text {
  color: var(--color-bg-white);
  margin-bottom: var(--space-xs);
}

.tag-line {
  color: var(--color-secondary);
  opacity: 0.8;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-md);
}

.link-group h4 {
  color: var(--color-secondary);
  margin-bottom: var(--space-sm);
  font-size: 1.125rem;
}

.link-group a {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--color-bg-light);
  opacity: 0.7;
  font-size: 0.875rem;
}

.link-group a:hover {
  opacity: 1;
  color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid rgba(244, 241, 234, 0.1);
  padding-top: var(--space-md);
  text-align: center;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
</style>
