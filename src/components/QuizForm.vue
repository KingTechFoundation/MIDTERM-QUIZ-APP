<template>
  <div class="quiz-form-container bg-white p-lg radius-md shadow-sm">
    <div class="flex-between border-b pb-md mb-md">
      <h2 class="text-h3 color-primary">{{ isEditing ? 'Edit Quiz' : 'Create New Quiz' }}</h2>
      <button @click="$emit('cancel')" class="btn btn-outline btn-sm">Cancel</button>
    </div>

    <form @submit.prevent="saveQuiz" class="quiz-form">
      <!-- Quiz Meta -->
      <div class="form-section mb-lg">
        <h3 class="text-h4 mb-sm">Quiz Details</h3>
        <div class="form-group mb-sm">
          <label for="quiz-title">Quiz Title</label>
          <input 
            type="text" 
            id="quiz-title" 
            v-model="form.title" 
            required 
            placeholder="e.g. Midterm Computing" 
            class="form-input" 
          />
        </div>
        <div class="form-group mb-sm">
          <label for="quiz-desc">Description (Optional)</label>
          <textarea 
            id="quiz-desc" 
            v-model="form.description" 
            placeholder="What is this quiz about?" 
            class="form-input" 
            rows="2"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="quiz-time">Time Limit (Minutes)</label>
          <input 
            type="number" 
            id="quiz-time" 
            v-model.number="form.timeLimit" 
            min="1"
            max="180"
            required
            class="form-input" 
          />
        </div>
      </div>

      <!-- Questions List -->
      <div class="form-section">
        <div class="flex-between mb-sm">
          <h3 class="text-h4">Questions ({{ form.questions.length }})</h3>
          <button 
            type="button" 
            @click="addQuestion" 
            class="btn btn-secondary btn-sm"
            aria-label="Add a new question"
          >+ Add Question</button>
        </div>

        <div v-if="form.questions.length === 0" class="empty-questions text-center p-md border-dashed radius-md mb-md">
          <p class="text-muted">No questions added yet. You must add at least one question.</p>
        </div>

        <div 
          v-for="(q, qIndex) in form.questions" 
          :key="q.id" 
          class="question-card p-md radius-sm mb-md bg-light border"
        >
          <div class="flex-between mb-sm">
            <h4 class="color-primary font-bold">Question {{ qIndex + 1 }}</h4>
            <button 
              type="button" 
              @click="removeQuestion(qIndex)" 
              class="text-accent text-sm hover-underline"
              :aria-label="`Remove question ${qIndex + 1}`"
            >Remove</button>
          </div>
          
          <div class="form-group mb-sm">
            <label :for="`q-text-${qIndex}`" class="sr-only">Question Text</label>
            <input 
              type="text" 
              :id="`q-text-${qIndex}`"
              v-model="q.text" 
              required 
              placeholder="Enter the question text" 
              class="form-input" 
            />
          </div>

          <!-- Options -->
          <div class="options-list">
            <span class="text-sm font-bold color-primary mb-xs block">Provide 4 Options & Select Correct Answer:</span>
            <div 
              v-for="(opt, oIndex) in q.options" 
              :key="oIndex" 
              class="option-row flex-center gap-sm mb-xs"
            >
              <input 
                type="radio" 
                :name="`correct-${qIndex}`" 
                :value="oIndex"
                v-model="q.correctAnswerIndex"
                class="radio-input"
                required
                :aria-label="`Mark option ${['A', 'B', 'C', 'D'][oIndex]} as correct for question ${qIndex + 1}`"
              />
              <label :for="`q-${qIndex}-opt-${oIndex}`" class="sr-only">Option {{ ['A', 'B', 'C', 'D'][oIndex] }}</label>
              <input 
                type="text" 
                :id="`q-${qIndex}-opt-${oIndex}`"
                v-model="q.options[oIndex]" 
                required 
                :placeholder="`Option ${oIndex + 1}`" 
                class="form-input flex-grow"
                :class="{ 'border-success': q.correctAnswerIndex === oIndex }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Validation Error -->
      <transition name="fade">
        <div v-if="validationError" class="error-banner mb-sm" role="alert">
          {{ validationError }}
        </div>
      </transition>

      <!-- Submit -->
      <div class="border-t pt-md mt-md flex-end">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Quiz') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const isEditing = ref(!!props.initialData);

// Form state
const form = ref({
  title: '',
  description: '',
  timeLimit: 10,
  questions: []
});

// Initialize form
if (props.initialData) {
  // Deep copy to avoid mutating store directly
  form.value = JSON.parse(JSON.stringify(props.initialData));
}

const addQuestion = () => {
  form.value.questions.push({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    text: '',
    options: ['', '', '', ''],
    correctAnswerIndex: 0
  });
};

const removeQuestion = (index) => {
  form.value.questions.splice(index, 1);
};

const validationError = ref('');

const saveQuiz = () => {
  validationError.value = '';
  
  if (!form.value.title.trim()) {
    validationError.value = 'Please provide a quiz title.';
    return;
  }
  
  if (form.value.questions.length === 0) {
    validationError.value = 'You must add at least one question.';
    return;
  }
  
  const incompleteQuestion = form.value.questions.some(q => !q.text.trim() || q.options.some(opt => !opt.trim()));
  if (incompleteQuestion) {
    validationError.value = 'Please fill in all question texts and options.';
    return;
  }

  // Deep copy for saving
  emit('save', JSON.parse(JSON.stringify(form.value)));
};
</script>

<style scoped>
/* Utility Layout Classes specific to this complex form */
.bg-white { background-color: var(--color-bg-white); }
.bg-light { background-color: var(--color-bg-light); }
.p-lg { padding: var(--space-lg); }
.p-md { padding: var(--space-md); }
.pb-md { padding-bottom: var(--space-md); }
.pt-md { padding-top: var(--space-md); }
.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mt-md { margin-top: var(--space-md); }
.radius-md { border-radius: var(--radius-md); }
.radius-sm { border-radius: var(--radius-sm); }
.shadow-sm { box-shadow: var(--shadow-sm); }
.border { border: 1px solid rgba(2, 52, 48, 0.1); }
.border-b { border-bottom: 1px solid rgba(2, 52, 48, 0.1); }
.border-t { border-top: 1px solid rgba(2, 52, 48, 0.1); }
.border-dashed { border: 1px dashed rgba(2, 52, 48, 0.2); }
.color-primary { color: var(--color-primary); }
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-text-muted); }
.text-sm { font-size: 0.875rem; }
.font-bold { font-weight: 600; }
.block { display: block; }

.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-center { display: flex; align-items: center; }
.flex-end { display: flex; justify-content: flex-end; }
.flex-grow { flex-grow: 1; }
.gap-sm { gap: 1rem; }
.text-center { text-align: center; }

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text-main);
  font-size: 0.9rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(2, 52, 48, 0.15);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background-color: var(--color-bg-white);
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(0, 201, 177, 0.15);
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.border-success {
  border-color: var(--color-secondary);
  background-color: rgba(0, 201, 177, 0.05);
}

.radio-input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-secondary);
  cursor: pointer;
}

.question-card {
  transition: transform var(--transition-fast);
}
.question-card:hover {
  border-color: rgba(0, 201, 177, 0.3);
}
</style>
