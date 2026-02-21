<script setup lang="ts">
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()
</script>

<template>
  <div class="flex flex-col items-center text-center text-white mb-12 animate-fade-in-down">
    <div class="relative mb-6 group cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      <img 
        :src="store.avatar" 
        :alt="store.name" 
        class="relative w-32 h-32 rounded-full border-4 border-white/30 object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <h1 class="text-4xl font-bold mb-2 tracking-tight drop-shadow-lg">{{ store.name }}</h1>
    <h2 class="text-xl text-indigo-100 mb-4 font-semibold tracking-wide bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">{{ store.title }}</h2>
    <p class="max-w-lg text-gray-50/90 leading-relaxed text-lg font-medium drop-shadow-md">{{ store.description }}</p>
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
