<template>
  <div class="quiz-list-container">
    <div class="list-header flex-between mb-lg">
      <div>
        <h2 class="text-h3">Your Quizzes</h2>
        <p class="text-muted">Manage and monitor your created assessments.</p>
      </div>
      <button @click="$emit('create')" class="btn btn-primary flex-center gap-xs">
        <span>+</span> New Quiz
      </button>
    </div>

    <div v-if="quizzes.length === 0" class="empty-state text-center animate-slide-up">
      <div class="icon-wrapper mx-auto mb-md">📝</div>
      <h4 class="text-h4 mb-xs">No Quizzes Yet</h4>
      <p class="text-muted mb-md">Get started by creating your first interactive assessment.</p>
      <button @click="$emit('create')" class="btn btn-outline">Create Quiz</button>
    </div>

    <div v-else class="quiz-grid">
      <div 
        v-for="(quiz, index) in quizzes" 
        :key="quiz.id" 
        class="quiz-card animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-content">
          <h4 class="quiz-title">{{ quiz.title }}</h4>
          <p class="quiz-desc text-muted">{{ quiz.description }}</p>
          <div class="quiz-meta text-body-sm text-secondary mt-sm">
            <span class="meta-item">🎯 {{ quiz.questions?.length || 0 }} Questions</span>
          </div>
        </div>
        
        <div class="card-actions flex-between" v-if="authStore.userRole === 'teacher'">
          <button @click="$emit('edit', quiz.id)" class="btn-action edit" :aria-label="`Edit quiz: ${quiz.title}`">Edit</button>
          <button @click="confirmDelete(quiz.id)" class="btn-action delete" :aria-label="`Delete quiz: ${quiz.title}`">Delete</button>
        </div>
        <div class="card-actions flex-between" v-else>
          <button @click="$emit('take', quiz.id)" class="btn-action take" :aria-label="`Take quiz: ${quiz.title}`">Take Quiz</button>
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

// Reactive list of quizzes from Pinia
const quizzes = computed(() => quizStore.quizzes);

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

/* Grid & Cards */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
}

.quiz-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  border: 1px solid rgba(2, 52, 48, 0.05);
  overflow: hidden;
}

.quiz-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-content {
  padding: var(--space-md);
  flex-grow: 1;
}

.quiz-title {
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.quiz-desc {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions {
  border-top: 1px solid rgba(2, 52, 48, 0.05);
  background: var(--color-bg-light);
}

.btn-action {
  flex: 1;
  padding: 0.75rem;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color var(--transition-fast);
}

.btn-action.edit {
  color: var(--color-primary);
  border-right: 1px solid rgba(2, 52, 48, 0.05);
}

.btn-action.edit:hover {
  background: rgba(0, 201, 177, 0.1);
}

.btn-action.delete {
  color: var(--color-accent);
}

.btn-action.delete:hover {
  background: rgba(255, 107, 74, 0.1);
}
</style>
