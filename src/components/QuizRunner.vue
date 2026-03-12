<template>
  <div class="quiz-runner-container bg-white p-lg radius-md shadow-lg max-w-lg mx-auto">
    <!-- Quiz Intro -->
    <div v-if="state === 'intro'" class="quiz-intro text-center animate-slide-up" role="region" aria-labelledby="quiz-intro-title">
      <div class="icon-wrapper mx-auto mb-md" aria-hidden="true">🎯</div>
      <h2 id="quiz-intro-title" class="text-h2 color-primary mb-sm">{{ quiz.title }}</h2>
      <p class="text-body-lg text-muted mb-lg">{{ quiz.description }}</p>
      
      <div class="quiz-info-grid mb-xl p-md bg-light radius-sm border">
        <div class="info-item">
          <span class="label">Questions</span>
          <span class="value">{{ quiz.questions.length }}</span>
        </div>
        <div class="info-item">
          <span class="label">Duration</span>
          <span class="value">Untimed</span>
        </div>
      </div>

      <div class="flex-center gap-md">
        <button @click="$emit('cancel')" class="btn btn-outline" aria-label="Go back to dashboard">Go Back</button>
        <button @click="startQuiz" class="btn btn-primary" aria-label="Start this quiz now">Start Quiz</button>
      </div>
    </div>

    <!-- Question View -->
    <div v-else-if="state === 'playing'" class="quiz-playing animate-slide-up" role="form">
      <header class="playing-header flex-between mb-lg">
        <span class="progress-text font-bold color-primary" aria-live="polite">
          Question {{ currentQuestionIndex + 1 }} of {{ quiz.questions.length }}
        </span>
        <div class="progress-bar-container" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </header>

      <div class="question-content mb-xl">
        <h3 class="text-h3 color-primary mb-lg">{{ currentQuestion.text }}</h3>
        
        <div class="options-grid" role="radiogroup" :aria-label="`Options for question ${currentQuestionIndex + 1}`">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="option-btn"
            :class="{ 'selected': selectedOptionIndex === index }"
            @click="selectOption(index)"
            @keydown.enter.space.prevent="selectOption(index)"
            role="radio"
            :aria-checked="selectedOptionIndex === index"
            :tabindex="0"
          >
            <span class="option-letter" aria-hidden="true">{{ ['A', 'B', 'C', 'D'][index] }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>
      </div>

      <div class="flex-end">
        <button 
          @click="nextQuestion" 
          class="btn btn-primary" 
          :disabled="selectedOptionIndex === null"
          :aria-label="isLastQuestion ? 'Finish the quiz and see results' : 'Go to next question'"
        >
          {{ isLastQuestion ? 'Finish Quiz' : 'Next Question' }}
        </button>
      </div>
    </div>

    <!-- Results View -->
    <div v-else-if="state === 'finished'" class="quiz-results text-center animate-slide-up">
      <div class="result-icon mb-md">🏆</div>
      <h2 class="text-h2 color-primary mb-sm">Quiz Completed!</h2>
      <p class="text-body-lg text-muted mb-lg">You've successfully finished the <strong>{{ quiz.title }}</strong> assessment.</p>
      
      <div class="score-display mb-xl p-xl bg-light radius-lg border-accent">
        <span class="score-label block text-muted mb-xs">Your Final Score</span>
        <span class="score-value text-h1 color-accent">{{ score }}<span class="total">/{{ quiz.questions.length }}</span></span>
      </div>

      <div class="flex-center gap-md">
        <button @click="$emit('cancel')" class="btn btn-primary">Back to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  quiz: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['cancel', 'complete']);

const state = ref('intro'); // 'intro', 'playing', 'finished'
const currentQuestionIndex = ref(0);
const selectedOptionIndex = ref(null);
const userAnswers = ref([]);
const score = ref(0);

const currentQuestion = computed(() => props.quiz.questions[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === props.quiz.questions.length - 1);
const progress = computed(() => ((currentQuestionIndex.value + 1) / props.quiz.questions.length) * 100);

const startQuiz = () => {
  state.value = 'playing';
};

const selectOption = (index) => {
  selectedOptionIndex.value = index;
};

const nextQuestion = () => {
  if (selectedOptionIndex.value === null) return;
  
  // Save answer
  userAnswers.value.push(selectedOptionIndex.value);
  
  if (isLastQuestion.value) {
    calculateScore();
    state.value = 'finished';
  } else {
    currentQuestionIndex.value++;
    selectedOptionIndex.value = null;
  }
};

const calculateScore = () => {
  let correctCount = 0;
  props.quiz.questions.forEach((q, index) => {
    if (userAnswers.value[index] === q.correctAnswerIndex) {
      correctCount++;
    }
  });
  score.value = correctCount;
  emit('complete', { score: score.value, total: props.quiz.questions.length });
};
</script>

<style scoped>
.quiz-runner-container {
  width: 100%;
  border: 1px solid rgba(2, 52, 48, 0.05);
}

.max-w-lg { max-width: 700px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.bg-white { background-color: var(--color-bg-white); }
.bg-light { background-color: var(--color-bg-light); }
.p-lg { padding: var(--space-lg); }
.p-md { padding: var(--space-md); }
.p-xl { padding: var(--space-xl); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }
.radius-md { border-radius: var(--radius-md); }
.radius-sm { border-radius: var(--radius-sm); }
.radius-lg { border-radius: var(--radius-lg); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.border { border: 1px solid rgba(2, 52, 48, 0.1); }
.border-accent { border: 2px solid var(--color-accent); }
.color-primary { color: var(--color-primary); }
.color-accent { color: var(--color-accent); }
.text-muted { color: var(--color-text-muted); }
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.block { display: block; }

.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-end { display: flex; justify-content: flex-end; }
.gap-md { gap: var(--space-md); }

.icon-wrapper {
  font-size: 3rem;
  width: 90px;
  height: 90px;
  background: rgba(0, 201, 177, 0.1);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Quiz Info Grid */
.quiz-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 1px;
}

.value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* Progress Bar */
.progress-bar-container {
  height: 8px;
  background: var(--color-bg-light);
  border-radius: 4px;
  flex-grow: 1;
  margin-left: var(--space-md);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--color-secondary);
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Options Grid */
.options-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.option-btn {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background: var(--color-bg-light);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  text-align: left;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.option-btn:hover {
  background: var(--color-bg-white);
  border-color: rgba(0, 201, 177, 0.3);
  transform: translateX(5px);
}

.option-btn.selected {
  background: var(--color-bg-white);
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-sm);
}

.option-letter {
  width: 36px;
  height: 36px;
  background: var(--color-bg-white);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: var(--space-md);
  border: 1px solid rgba(2, 52, 48, 0.1);
  transition: all var(--transition-fast);
}

.option-btn.selected .option-letter {
  background: var(--color-secondary);
  color: var(--color-bg-white);
  border-color: var(--color-secondary);
}

.option-text {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-text-main);
}

/* Results */
.result-icon {
  font-size: 5rem;
}

.total {
  font-size: 2rem;
  opacity: 0.5;
}
</style>
