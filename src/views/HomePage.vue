<script setup lang="ts">
import PersonalProfile from '../components/PersonalProfile.vue'
import LinkCard from '../components/LinkCard.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()
</script>

<template>
  <ThemeToggle />
  <div class="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100 dark:from-slate-900 dark:via-zinc-900 dark:to-neutral-900 transition-colors duration-500">
    <!-- Animated background blobs -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-300/20 dark:bg-teal-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    <div class="absolute -bottom-32 left-20 w-96 h-96 bg-sky-300/20 dark:bg-indigo-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

    <div class="w-full max-w-4xl z-10 flex flex-col items-center">
      <PersonalProfile />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in-up px-4">
        <LinkCard 
          v-for="link in store.links" 
          :key="link.id" 
          :link="link" 
        />
      </div>
      
      <footer class="mt-16 text-gray-500 dark:text-gray-400 text-sm font-light z-10 animate-fade-in flex flex-col items-center gap-2">
        <p>&copy; {{ new Date().getFullYear() }} {{ store.name }}. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.animate-fade-in {
  animation: fadeInUp 1s ease-out 0.5s backwards;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
