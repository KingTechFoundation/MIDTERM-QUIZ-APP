<template>
  <div class="dashboard container pt-nav section">
    <header class="dashboard-header mb-xl flex-between">
      <div>
        <h1 class="text-h2 dashboard-title">Teacher <span class="accent">Dashboard</span></h1>
        <p class="text-body-lg text-muted">Welcome back, {{ authStore.user?.name || 'Educator' }}</p>
      </div>
      <button @click="logout" class="btn btn-outline">Sign Out</button>
    </header>

    <main class="dashboard-main position-relative">
      <!-- Loading State Overlay -->
      <transition name="fade">
        <div v-if="isLoading" class="loading-overlay flex-center">
          <div class="loader"></div>
          <p class="ml-sm font-bold color-primary">Saving Changes...</p>
        </div>
      </transition>

      <!-- Conditional Rendering for List or Form -->
      <transition name="fade" mode="out-in">
        <div v-if="view === 'list'">
          <QuizList 
            @create="handleCreate" 
            @edit="handleEdit" 
          />
        </div>
        <div v-else-if="view === 'form'">
          <QuizForm 
            :initial-data="editingQuiz" 
            :is-loading="isLoading"
            @save="handleSave" 
            @cancel="view = 'list'" 
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
import QuizForm from '../components/QuizForm.vue';

const router = useRouter();
const authStore = useAuthStore();
const quizStore = useQuizStore();

const view = ref('list'); // 'list' or 'form'
const editingQuiz = ref(null);
const isLoading = ref(false);

const handleCreate = () => {
  editingQuiz.value = null;
  view.value = 'form';
};

const handleEdit = (id) => {
  editingQuiz.value = quizStore.getQuizById(id);
  view.value = 'form';
};

const handleSave = async (quizData) => {
  isLoading.value = true;
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (quizData.id) {
    quizStore.updateQuiz(quizData);
  } else {
    quizStore.addQuiz(quizData);
  }
  
  isLoading.value = false;
  view.value = 'list';
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
