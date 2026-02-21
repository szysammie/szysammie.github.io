<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import type { Link } from '../stores/profile'

const props = defineProps<{
  link: Link
}>()

const iconComponent = computed(() => {
  // @ts-ignore - Dynamic access to icons
  return LucideIcons[props.link.icon as keyof typeof LucideIcons] || LucideIcons.Link
})
</script>

<template>
  <a 
    :href="link.url" 
    target="_blank" 
    class="block h-full w-full p-6 rounded-xl border border-white/60 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] group no-underline relative overflow-hidden shadow-sm ring-1 ring-white/50 dark:ring-white/10 from-white/60 to-cyan-50/60 bg-gradient-to-br flex flex-col"
  >
    <!-- Glass reflection effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <div class="flex flex-col gap-3 relative z-10 h-full">
      <div class="flex items-center gap-3">
        <div 
          class="p-2.5 rounded-lg bg-white/80 dark:bg-white/10 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-sm ring-1 ring-white/60 dark:ring-white/20"
        >
          <component :is="iconComponent" :size="22" class="transition-colors" :color="link.color" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors drop-shadow-sm">{{ link.title }}</h3>
      </div>
      
      <div class="flex-1 mt-1">
        <p class="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed line-clamp-4">{{ link.description }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
</style>
