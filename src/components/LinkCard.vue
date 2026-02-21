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
    class="block p-6 rounded-xl border border-indigo-100 bg-white/70 backdrop-blur-md hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group no-underline shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div 
        class="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <component :is="iconComponent" :size="24" :color="link.color || '#4f46e5'" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{{ link.title }}</h3>
        <p class="text-sm text-gray-500 font-medium">{{ link.description }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
</style>
