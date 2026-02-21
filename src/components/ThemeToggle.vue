<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
import { Sun, Moon } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="fixed top-6 right-6 p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg hover:scale-110 transition-all duration-300 z-50 group border border-slate-200 dark:border-white/20 cursor-pointer"
    aria-label="Toggle Theme"
  >
    <Sun v-if="!isDark" class="w-6 h-6 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
    <Moon v-else class="w-6 h-6 text-indigo-300 group-hover:-rotate-12 transition-transform duration-500" />
  </button>
</template>