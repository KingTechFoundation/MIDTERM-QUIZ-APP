<template>
  <div class="stat-card p-md radius-md bg-white border animate-fade-in" :style="{ '--delay': delay }">
    <div class="flex-between mb-sm">
      <span class="stat-label text-xs font-bold text-muted text-uppercase">{{ label }}</span>
      <span v-if="trend" class="stat-trend text-xs font-bold" :class="trendClass">
        {{ trend }}
      </span>
    </div>
    <div class="stat-value text-h2 color-primary">{{ value }}</div>
    <div class="stat-subtext text-xs text-muted mt-xs">{{ subtext }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  value: [String, Number],
  subtext: String,
  trend: String,
  trendType: {
    type: String,
    default: 'neutral' // 'up', 'down', 'attention'
  },
  delay: {
    type: String,
    default: '0s'
  }
});

const trendClass = computed(() => {
  return {
    'text-success': props.trendType === 'up',
    'text-accent': props.trendType === 'attention',
    'text-muted': props.trendType === 'neutral'
  };
});
</script>

<style scoped>
.stat-card {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(2, 52, 48, 0.08);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  animation-delay: var(--delay);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: rgba(0, 201, 177, 0.2);
}

.stat-label {
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.text-success { color: #10b981; }
.text-uppercase { text-transform: uppercase; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
