<template>
  <section id="vision" class="section vision">
    <div class="container vision-container">
      <div class="vision-content animate-slide-up">
        <h2 class="text-h2 vision-title">
          Our <span class="accent">Vision</span>
        </h2>
        <p class="text-body-lg vision-text">
          QuizVista is built to break the barriers of traditional assessments. 
          We empower <strong>educators</strong> with seamless tools to create engaging 
          challenges, and inspire <strong>students</strong> to learn dynamically through 
          interactive, beautifully designed quizzes.
        </p>
        
        <div class="vision-features">
          <div class="feature-card">
            <div class="icon-wrapper" aria-hidden="true">🎓</div>
            <h4>For Teachers</h4>
            <p>Intuitive dashboard to easily craft, manage, and analyze quizzes in real-time.</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper" aria-hidden="true">🚀</div>
            <h4>For Students</h4>
            <p>A distraction-free, stunning interface to complete assessments effortlessly.</p>
          </div>
        </div>
      </div>
      
      <div class="vision-image animate-slide-up" style="animation-delay: 0.2s;" aria-hidden="true">
        <!-- Using a generated abstract representation of the platform -->
        <div class="image-placeholder">
          <div class="glass-orb"></div>
          <div class="glass-card main-card"></div>
          <div class="glass-card sub-card"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vision {
  background-color: var(--color-bg-white);
  position: relative;
  overflow: hidden;
}

.vision-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: center;
}

.vision-title {
  margin-bottom: var(--space-md);
}

.accent {
  color: var(--color-accent);
}

.vision-text {
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.vision-text strong {
  color: var(--color-primary);
}

.vision-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.feature-card {
  background: var(--color-bg-light);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(2, 52, 48, 0.05);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: rgba(0, 201, 177, 0.3);
}

.icon-wrapper {
  font-size: 2rem;
  margin-bottom: var(--space-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 201, 177, 0.1);
  color: var(--color-primary);
}

.feature-card h4 {
  font-size: 1.25rem;
  margin-bottom: var(--space-xs);
  color: var(--color-primary);
}

.feature-card p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

/* Abstract CSS Art replacing an image */
.vision-image {
  position: relative;
  height: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.glass-orb {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  filter: blur(40px);
  opacity: 0.6;
}

.glass-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.main-card {
  width: 60%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.sub-card {
  width: 40%;
  height: 30%;
  bottom: 10%;
  right: 10%;
  z-index: 1;
  background: rgba(255, 107, 74, 0.15); /* Accent tint */
}

@media (max-width: 992px) {
  .vision-container {
    grid-template-columns: 1fr;
  }
  
  .vision-image {
    min-height: 400px;
    order: -1; /* Image appears above text on mobile */
  }
}

@media (max-width: 576px) {
  .vision-features {
    grid-template-columns: 1fr;
  }
}
</style>
