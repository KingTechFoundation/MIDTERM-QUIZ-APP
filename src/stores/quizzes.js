import { defineStore } from 'pinia';

const QUIZ_STORAGE_KEY = 'quiz_app_quizzes';

// Initial dummy data if storage is empty
const INITIAL_QUIZZES = [
  {
    id: '1',
    title: 'Vue JS Fundamentals',
    description: 'Test your basic knowledge of Vue components and reactivity.',
    timeLimit: 10,
    questions: [
      { id: '1-1', text: 'Which directive is used for two-way binding?', options: ['v-bind', 'v-model', 'v-on', 'v-if'], correctAnswerIndex: 1 },
      { id: '1-2', text: 'What is the standard store for Vue?', options: ['Vuex', 'Pinia', 'Redux', 'MobX'], correctAnswerIndex: 1 }
    ]
  },
  {
    id: '2',
    title: 'CSS Masterclass',
    description: 'Advanced layout techniques with Flexbox and Grid.',
    timeLimit: 5,
    questions: [
      { id: '2-1', text: 'Which property is used to create a flex container?', options: ['flex: 1', 'display: flex', 'float: left', 'align-items: center'], correctAnswerIndex: 1 }
    ]
  }
];

const RESULTS_STORAGE_KEY = 'quiz_app_results';

export const useQuizStore = defineStore('quizzes', {
  state: () => ({
    quizzes: JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY)) || INITIAL_QUIZZES,
    results: JSON.parse(localStorage.getItem(RESULTS_STORAGE_KEY)) || [],
    selectedQuiz: null,
  }),
  
  getters: {
    getQuizById: (state) => (id) => {
      return state.quizzes.find(q => q.id === id);
    },
    totalQuizzes: (state) => state.quizzes.length,
    
    // Performance Statistics
    userResults: (state) => (userId) => {
      return state.results.filter(r => r.userId === userId);
    },
    averageScore: (state) => (userId) => {
      const results = state.results.filter(r => r.userId === userId);
      if (results.length === 0) return 0;
      const total = results.reduce((sum, r) => sum + r.score, 0);
      return Math.round(total / results.length);
    },
    totalTaken: (state) => (userId) => {
      return state.results.filter(r => r.userId === userId).length;
    }
  },
  
  actions: {
    saveToStorage() {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(this.quizzes));
    },
    
    saveResultToStorage() {
      localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(this.results));
    },

    saveResult(result) {
      const newResult = {
        ...result,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      this.results.push(newResult);
      this.saveResultToStorage();
    },
    
    addQuiz(quiz) {
      const newQuiz = {
        ...quiz,
        id: Date.now().toString()
      };
      this.quizzes.push(newQuiz);
      this.saveToStorage();
    },
    
    updateQuiz(updatedQuiz) {
      const index = this.quizzes.findIndex(q => q.id === updatedQuiz.id);
      if (index !== -1) {
        this.quizzes[index] = updatedQuiz;
        this.saveToStorage();
      }
    },
    
    deleteQuiz(id) {
      this.quizzes = this.quizzes.filter(q => q.id !== id);
      this.saveToStorage();
    },
    
    selectQuiz(id) {
      this.selectedQuiz = this.getQuizById(id);
    },
    
    clearSelected() {
      this.selectedQuiz = null;
    }
  }
});
