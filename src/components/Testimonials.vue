<template>
  <section id="testimonials" class="section testimonials">
    <div class="container relative">
      <div class="test-header text-center animate-slide-up">
        <h2 class="text-h2 test-title">Loved by <span class="accent">Thousands</span></h2>
        <p class="text-body-lg text-muted">Join the revolution in seamless learning.</p>
      </div>
      
      <div class="test-grid">
        <div 
          v-for="(review, i) in reviews" 
          :key="i"
          class="test-card animate-slide-up"
          :style="{ animationDelay: `${i * 0.15 + 0.2}s` }"
        >
          <div class="quote-icon" aria-hidden="true">"</div>
          <p class="review-text">{{ review.text }}</p>
          <div class="reviewer">
            <div class="avatar" :class="review.role">{{ review.name.charAt(0) }}</div>
            <div class="reviewer-info">
              <span class="name">{{ review.name }}</span>
              <span class="role">{{ review.role === 'teacher' ? 'Educator' : 'Student' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'teacher',
    text: 'Creating quizzes used to take hours of formatting. QuizVista allows me to build beautiful assessments in minutes. My students love the interface!'
  },
  {
    name: 'James L.',
    role: 'student',
    text: 'The best platform I’ve used for midterms. No clutter, fast load times, and it looks incredible compared to our old portal.'
  },
  {
    name: 'Dr. Alistair',
    role: 'teacher',
    text: 'The analytics and ease of use are unmatched. It feels premium and makes grading feel less like a chore.'
  }
];
</script>

<style scoped>
.testimonials {
  background-color: var(--color-bg-light);
  overflow: hidden;
}

.test-header {
  margin-bottom: var(--space-xl);
}

.test-title {
  margin-bottom: var(--space-xs);
}

.text-center {
  text-align: center;
}

.text-muted {
  color: var(--color-text-muted);
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.test-card {
  position: relative;
  background-color: var(--color-bg-white);
  padding: var(--space-lg) var(--space-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--color-secondary);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.test-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.quote-icon {
  font-family: var(--font-heading);
  font-size: 5rem;
  color: var(--color-bg-light);
  line-height: 0;
  position: absolute;
  top: 40px;
  left: 20px;
  opacity: 0.8;
  z-index: 0;
}

.review-text {
  font-size: 1.05rem;
  color: var(--color-text-main);
  font-style: italic;
  margin-bottom: var(--space-lg);
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.reviewer {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border-top: 1px solid rgba(2, 52, 48, 0.05);
  padding-top: var(--space-md);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-bg-white);
}

.avatar.teacher {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
}

.avatar.student {
  background: linear-gradient(135deg, var(--color-secondary), #00A38F);
}

.reviewer-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  color: var(--color-primary);
}

.role {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
