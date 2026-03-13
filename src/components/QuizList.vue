<template>
  <div class="quiz-list-container">
    <div v-if="quizzes.length === 0" class="empty-state text-center animate-slide-up">
      <div class="icon-wrapper mx-auto mb-md">📝</div>
      <h4 class="text-h4 mb-xs">No Quizzes Available</h4>
      <p class="text-muted mb-md">Get started by creating your first interactive assessment.</p>
    </div>

    <div v-else class="quiz-grid">
      <div 
        v-for="(quiz, index) in quizzes" 
        :key="quiz.id" 
        class="quiz-card animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-header flex-between mb-sm">
          <span class="badge badge-medium">
            {{ quiz.questions?.length || 0 }} Questions
          </span>
          <span v-if="authStore.userRole === 'student' && hasTaken(quiz.id)" class="badge badge-success">
            Completed
          </span>
        </div>
        
        <div class="card-content">
          <h4 class="quiz-title font-bold mb-xs">{{ quiz.title }}</h4>
          <p class="quiz-desc text-muted text-sm">{{ quiz.description }}</p>
        </div>
        
        <div class="card-footer mt-md pt-sm border-t flex-between">
          <div class="quiz-meta flex-center gap-xs text-xs text-muted">
             <span v-if="authStore.userRole === 'student' && getBestScore(quiz.id)">
               Best: {{ getBestScore(quiz.id) }}%
             </span>
          </div>
          
          <div class="actions flex-center gap-sm">
            <template v-if="authStore.userRole === 'teacher'">
              <button @click="$emit('edit', quiz.id)" class="text-primary font-bold text-xs hover-underline">Edit</button>
              <button @click="confirmDelete(quiz.id)" class="text-accent font-bold text-xs hover-underline">Delete</button>
            </template>
            <template v-else>
              <button @click="$emit('take', quiz.id)" class="btn btn-primary btn-xs">
                {{ hasTaken(quiz.id) ? 'Retake' : 'Start' }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useQuizStore } from '../stores/quizzes';
import { useAuthStore } from '../stores/auth';

const emit = defineEmits(['create', 'edit', 'take']);
const quizStore = useQuizStore();
const authStore = useAuthStore();

const quizzes = computed(() => quizStore.quizzes);
const userId = computed(() => authStore.user?.id);

const hasTaken = (quizId) => {
  return quizStore.results.some(r => r.userId === userId.value && r.quizId === quizId);
};

const getBestScore = (quizId) => {
  const results = quizStore.results.filter(r => r.userId === userId.value && r.quizId === quizId);
  if (results.length === 0) return null;
  return Math.max(...results.map(r => r.score));
};

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this quiz? This cannot be undone.')) {
    quizStore.deleteQuiz(id);
  }
};
</script>

<style scoped>
.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mt-sm { margin-top: var(--space-sm); }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
.text-muted { color: var(--color-text-muted); }
.text-secondary { color: var(--color-secondary); }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.gap-xs { gap: 0.5rem; }

/* Empty State */
.empty-state {
  padding: var(--space-xl) var(--space-md);
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  border: 1px dashed rgba(2, 52, 48, 0.2);
}

.icon-wrapper {
  font-size: 2.5rem;
  width: 70px;
  height: 70px;
  background: rgba(0, 201, 177, 0.1);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Badges */
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-medium {
  background-color: rgba(0, 201, 177, 0.1);
  color: var(--color-primary);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

/* Grid & Cards */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-md);
}

.quiz-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border: 1px solid rgba(2, 52, 48, 0.08);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.quiz-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(0, 201, 177, 0.2);
}

.quiz-title {
  font-size: 1.15rem;
  color: var(--color-primary);
}

.quiz-desc {
  line-height: 1.4;
  margin-top: 0.25rem;
}

.border-t { border-top: 1px solid rgba(2, 52, 48, 0.05); }

.hover-underline:hover { text-decoration: underline; }
.text-primary { color: var(--color-secondary); }

.btn-xs {
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
}
</style>
