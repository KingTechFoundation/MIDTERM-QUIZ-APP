<template>
  <div class="dashboard container pt-nav section">
    <header class="dashboard-header mb-xl flex-between">
      <div>
        <h1 class="text-h2 dashboard-title">Student <span class="accent">Portal</span></h1>
        <p class="text-body-lg text-muted">Ready to learn, {{ authStore.user?.name || 'Student' }}?</p>
      </div>
      <button @click="logout" class="btn btn-outline">Sign Out</button>
    </header>

    <main class="dashboard-main">
      <!-- Conditional Rendering for List or Runner -->
      <transition name="fade" mode="out-in">
        <div v-if="view === 'list'">
          <QuizList 
            @take="handleTake" 
          />
        </div>
        <div v-else-if="view === 'runner'">
          <QuizRunner 
            :quiz="activeQuiz" 
            @cancel="view = 'list'" 
            @complete="handleComplete" 
          />
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useQuizStore } from '../stores/quizzes';
import QuizList from '../components/QuizList.vue';
import QuizRunner from '../components/QuizRunner.vue';

const router = useRouter();
const authStore = useAuthStore();
const quizStore = useQuizStore();

const view = ref('list'); // 'list' or 'runner'
const activeQuiz = ref(null);

const handleTake = (id) => {
  activeQuiz.value = quizStore.getQuizById(id);
  view.value = 'runner';
};

const handleComplete = (result) => {
  console.log('Quiz completed!', result);
  // In a real app we might save this to a backend or a separate store
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
}

.dashboard-title {
  margin-bottom: var(--space-xs);
}

.accent {
  color: var(--color-accent);
}

.text-muted {
  color: var(--color-text-muted);
}

.mb-xl { margin-bottom: var(--space-xl); }

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
