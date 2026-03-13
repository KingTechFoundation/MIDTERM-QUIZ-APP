import { defineStore } from 'pinia';

const QUIZ_STORAGE_KEY = 'quiz_app_quizzes';

// Initial dummy data if storage is empty
const INITIAL_QUIZZES = [
  {
    id: '1',
    title: 'Web Technologies Midterm',
    description: 'A comprehensive test on HTML, CSS, and modern JS frameworks.',
    questions: [
      {
        id: 'q1',
        text: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'],
        correctAnswerIndex: 0
      },
      {
        id: 'q2',
        text: 'Which framework is maintained by Evan You?',
        options: ['React', 'Angular', 'Vue', 'Svelte'],
        correctAnswerIndex: 2
      }
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
