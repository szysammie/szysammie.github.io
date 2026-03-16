<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LandingBackground from '../components/landing/Background.vue'
import LandingEnvelope from '../components/landing/Envelope.vue'
import LandingProfile from '../components/landing/Profile.vue'
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()
const showLoading = ref(true)
const showContent = ref(false)
const playBackground = ref(false)
const isMobile = ref(false)

const DESKTOP_MIN_WIDTH = 1024
const DROP_DURATION_MS = 2500
const CONTENT_FADE_DELAY_MS = 550

let revealTimer = 0

function detectMobile(): boolean {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  const mobileUa = /android|iphone|ipad|ipod|mobile|blackberry|iemobile|opera mini/.test(ua)
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  return mobileUa || coarsePointer || window.innerWidth < DESKTOP_MIN_WIDTH
}

const onLoadingFinish = () => {
  showLoading.value = false
  if (!isMobile.value) {
    playBackground.value = true
    revealTimer = window.setTimeout(() => {
      showContent.value = true
    }, DROP_DURATION_MS + CONTENT_FADE_DELAY_MS)
  } else {
    // Mobile direct reveal since no WebGL
    showContent.value = true
  }
}

onMounted(() => {
  isMobile.value = detectMobile()
})

onBeforeUnmount(() => {
  window.clearTimeout(revealTimer)
})
</script>

<template>
  <main class="landing-page">
    <LandingBackground :is-mobile="isMobile" :play="playBackground" />
    
    <div class="landing-page__container">
      <div class="landing-page__center">
        <LandingProfile :show="showContent" />
      </div>
    </div>

    <LandingEnvelope v-if="showLoading" @finish="onLoadingFinish" />
  </main>
</template>

<style scoped>
.landing-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #fff;
}

.landing-page__container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.landing-page__center {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
