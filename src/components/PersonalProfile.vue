<script setup lang="ts">
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()
</script>

<template>
  <div class="flex flex-col items-center text-center text-gray-800 dark:text-gray-100 mb-12 animate-fade-in-down">
    <div class="relative mb-6 group cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-400 via-cyan-400 to-sky-400 dark:from-blue-600 dark:via-purple-600 dark:to-indigo-600 rounded-full blur-xl opacity-40 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
      <img 
        :src="store.avatar" 
        :alt="store.name" 
        class="relative w-32 h-32 rounded-full border-4 border-white/80 dark:border-white/20 object-cover shadow-xl transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <h1 class="text-4xl font-bold mb-2 tracking-tight drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 dark:from-cyan-300 dark:via-sky-300 dark:to-blue-300 animate-fade-in">{{ store.name }}</h1>
    <h2 class="text-xl text-blue-700 dark:text-cyan-200 mb-4 font-semibold tracking-wide bg-white/60 dark:bg-white/5 px-4 py-1 rounded-full backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-sm">{{ store.title }}</h2>
    <p class="max-w-lg text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">{{ store.description }}</p>
  </div>
</template>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}
</style>
