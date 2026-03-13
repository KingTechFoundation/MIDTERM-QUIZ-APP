<template>
  <div class="dashboard-layout">
    <DashboardSidebar>
      <template #nav-links>
        <a href="#" class="router-link-active">Dashboard</a>
        <a href="#" @click.prevent="handleCreate">Create Quiz</a>
        <a href="#" @click.prevent="view = 'list'">Manage Quizzes</a>
      </template>
    </DashboardSidebar>

    <main class="dashboard-content">
      <header class="dashboard-header mb-lg flex-between">
        <div>
          <h1 class="text-h3">Teacher Dashboard</h1>
          <p class="text-body-sm text-muted">Here's an overview of your academic activities.</p>
        </div>
        <button v-if="view === 'list'" @click="handleCreate" class="btn btn-primary btn-sm flex-center gap-xs">
          <span>+ Create Quiz</span>
        </button>
      </header>

      <!-- Stats Grid -->
      <div v-if="view === 'list'" class="stats-grid animate-fade-in">
        <StatCard 
          label="Total Quizzes" 
          :value="quizStore.totalQuizzes" 
          subtext="Quizzes created so far"
          delay="0.1s"
        />
        <StatCard 
          label="Active Assessments" 
          :value="quizStore.totalQuizzes" 
          subtext="Currently available to students" 
          trend="Live"
          trendType="up"
          delay="0.2s"
        />
        <StatCard 
          label="Student Submissions" 
          :value="quizStore.results.length" 
          subtext="Total attempts recorded" 
          trend="Updated"
          trendType="neutral"
          delay="0.3s"
        />
      </div>

      <div class="dashboard-main position-relative">
        <!-- Loading State Overlay -->
        <transition name="fade">
          <div v-if="isLoading" class="loading-overlay flex-center">
            <div class="loader"></div>
            <p class="ml-sm font-bold color-primary">Saving Changes...</p>
          </div>
        </transition>

        <!-- Conditional Rendering -->
        <transition name="fade" mode="out-in">
          <div v-if="view === 'list'">
            <div class="flex-between mb-md">
              <h2 class="text-h4">Your Quizzes</h2>
            </div>
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
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuizStore } from '../stores/quizzes';
import QuizList from '../components/QuizList.vue';
import QuizForm from '../components/QuizForm.vue';
import DashboardSidebar from '../components/DashboardSidebar.vue';
import StatCard from '../components/StatCard.vue';

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
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (quizData.id) {
    quizStore.updateQuiz(quizData);
  } else {
    quizStore.addQuiz(quizData);
  }
  
  isLoading.value = false;
  view.value = 'list';
};
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

.dashboard-header {
  border-bottom: 1px solid rgba(2, 52, 48, 0.05);
  padding-bottom: var(--space-sm);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.btn-sm {
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
}
</style>
