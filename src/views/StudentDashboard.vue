<template>
  <div class="dashboard-layout">
    <DashboardSidebar>
      <template #nav-links>
        <a href="#" class="router-link-active">Dashboard</a>
        <a href="#" @click.prevent="view = 'list'">Take Quiz</a>
        <a href="#" @click.prevent="view = 'stats'">My Progress</a>
      </template>
    </DashboardSidebar>

    <main class="dashboard-content">
      <header class="dashboard-header mb-lg flex-between">
        <div>
          <h1 class="text-h3">Student Portal</h1>
          <p class="text-body-sm text-muted">Track your learning progress and take new assessments.</p>
        </div>
      </header>

      <!-- Stats Grid -->
      <div v-if="view !== 'runner'" class="stats-grid animate-fade-in">
        <StatCard 
          label="Quizzes Taken" 
          :value="quizStore.totalTaken(userId)" 
          subtext="Total completed attempts"
          delay="0.1s"
        />
        <StatCard 
          label="Average Score" 
          :value="quizStore.averageScore(userId) + '%'" 
          subtext="Your overall performance" 
          trend="+2%"
          trendType="up"
          delay="0.2s"
        />
        <StatCard 
          label="Completion" 
          :value="completionPercent + '%'" 
          subtext="Target goal reached" 
          delay="0.3s"
        />
      </div>

      <div class="dashboard-main position-relative">
        <!-- Loading State Overlay -->
        <transition name="fade">
          <div v-if="isLoading" class="loading-overlay flex-center">
            <div class="loader"></div>
            <p class="ml-sm font-bold color-primary">Loading Quiz...</p>
          </div>
        </transition>

        <!-- Conditional Rendering -->
        <transition name="fade" mode="out-in">
          <div v-if="view === 'list'">
            <div class="flex-between mb-md">
              <h2 class="text-h4">Available Quizzes</h2>
            </div>
            <QuizList @take="handleTake" />
          </div>
          <div v-else-if="view === 'runner'">
            <QuizRunner 
              :quiz="activeQuiz" 
              @cancel="view = 'list'" 
              @complete="handleComplete" 
            />
          </div>
          <div v-else-if="view === 'stats'">
            <div class="p-lg bg-white radius-md border animate-slide-up">
              <h3 class="text-h4 mb-md">Achievement History</h3>
              <div v-if="quizStore.userResults(userId).length === 0" class="text-center py-xl">
                <p class="text-muted">No records found. Start your first quiz!</p>
              </div>
              <ul v-else class="results-list">
                <li v-for="res in quizStore.userResults(userId)" :key="res.id" class="p-md border-b flex-between">
                  <div>
                    <div class="font-bold">{{ res.quizTitle }}</div>
                    <div class="text-xs text-muted">{{ new Date(res.timestamp).toLocaleDateString() }}</div>
                  </div>
                  <div class="text-h4 color-primary">{{ res.score }}%</div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useQuizStore } from '../stores/quizzes';
import QuizList from '../components/QuizList.vue';
import QuizRunner from '../components/QuizRunner.vue';
import DashboardSidebar from '../components/DashboardSidebar.vue';
import StatCard from '../components/StatCard.vue';

const authStore = useAuthStore();
const quizStore = useQuizStore();

const view = ref('list'); // 'list', 'runner', 'stats'
const activeQuiz = ref(null);
const isLoading = ref(false);

const userId = computed(() => authStore.user?.id);
const completionPercent = computed(() => {
  const total = quizStore.totalQuizzes;
  if (!total) return 0;
  const taken = quizStore.totalTaken(userId.value);
  return Math.min(Math.round((taken / total) * 100), 100);
});

const handleTake = async (id) => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 600));
  activeQuiz.value = quizStore.getQuizById(id);
  isLoading.value = false;
  view.value = 'runner';
};

const handleComplete = (result) => {
  quizStore.saveResult({
    userId: userId.value,
    quizId: result.quizId,
    quizTitle: result.quizTitle,
    score: result.score
  });
  view.value = 'stats';
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

.results-list {
  padding: 0;
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
</style>
