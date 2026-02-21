<script setup lang="ts">
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()
</script>

<template>
  <div class="flex flex-col items-center text-center text-gray-800 mb-12 animate-fade-in-down">
    <div class="relative mb-6 group cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
      <img 
        :src="store.avatar" 
        :alt="store.name" 
        class="relative w-32 h-32 rounded-full border-4 border-white/80 object-cover shadow-xl transform group-hover:scale-105 transition-transform duration-500 bg-white"
      />
    </div>
    
    <h1 class="text-4xl font-bold mb-2 tracking-tight drop-shadow-sm text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{{ store.name }}</h1>
    <h2 class="text-xl text-indigo-600 mb-4 font-semibold tracking-wide bg-indigo-50/80 px-4 py-1 rounded-full backdrop-blur-sm border border-indigo-100/50 shadow-sm">{{ store.title }}</h2>
    <p class="max-w-lg text-gray-600 leading-relaxed text-lg font-medium">{{ store.description }}</p>
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
