<script setup lang="ts">
import { onMounted, ref } from 'vue'

const ENVELOPE_OPEN_DELAY = 240
const ENVELOPE_TOTAL_MS = 1700

const emit = defineEmits(['finish'])
const envelopeOpen = ref(false)

onMounted(() => {
  setTimeout(() => {
    envelopeOpen.value = true
  }, ENVELOPE_OPEN_DELAY)

  setTimeout(() => {
    emit('finish')
  }, ENVELOPE_TOTAL_MS)
})
</script>

<template>
  <div class="landing-loading">
    <div :class="['sammie-envelope', { 'is-open': envelopeOpen }]">
      <div class="sammie-envelope__shadow"></div>
      <div class="sammie-envelope__back"></div>
      <div class="sammie-envelope__pattern sammie-envelope__pattern--left"></div>
      <div class="sammie-envelope__pattern sammie-envelope__pattern--right"></div>
      <div class="sammie-envelope__letter">
        <div class="sammie-envelope__seal"></div>
        <div class="sammie-envelope__letter-lines"></div>
      </div>
      <div class="sammie-envelope__flap"></div>
    </div>
  </div>
</template>

<style scoped>
.landing-loading {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 50% 42%, rgba(255,255,255,0.08), transparent 32%),
    linear-gradient(180deg, rgba(10,10,10,0.98), rgba(0,0,0,0.98));
  backdrop-filter: blur(12px);
}

.sammie-envelope {
  position: relative;
  width: min(36vw, 260px);
  aspect-ratio: 1.25;
  transform-style: preserve-3d;
}

.sammie-envelope__shadow {
  position: absolute;
  left: 50%;
  bottom: -18%;
  width: 72%;
  height: 16%;
  transform: translateX(-50%);
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 68%);
  filter: blur(14px);
}

.sammie-envelope__back,
.sammie-envelope__flap,
.sammie-envelope__letter,
.sammie-envelope__pattern {
  position: absolute;
  inset: 0;
  border-radius: 10px;
}

.sammie-envelope__back {
  background: linear-gradient(135deg, #1d1b18 0%, #342c23 100%);
  box-shadow:
    0 20px 55px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255,255,255,0.08);
  overflow: hidden;
  border: 1px solid rgba(201, 171, 122, 0.18);
}

.sammie-envelope__pattern--left,
.sammie-envelope__pattern--right {
  background: linear-gradient(135deg, rgba(150, 52, 52, 0.2), rgba(190, 158, 100, 0.08));
  clip-path: polygon(0 100%, 50% 46%, 50% 100%);
}

.sammie-envelope__pattern--right {
  clip-path: polygon(100% 100%, 50% 46%, 50% 100%);
}

.sammie-envelope__letter {
  inset: 14% 12% 12%;
  background: linear-gradient(180deg, rgba(22,22,22,0.98), rgba(8,8,8,0.97));
  box-shadow: 0 12px 28px rgba(0,0,0,0.28);
  transform-origin: bottom center;
  transform: translateY(14%) scale(0.96);
  transition: transform 0.92s cubic-bezier(0.2, 0.7, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(201, 171, 122, 0.12);
}

.sammie-envelope__seal {
  position: absolute;
  left: 50%;
  top: 22%;
  width: 18%;
  aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 26%),
    linear-gradient(135deg, #b4413f, #7c2322);
  box-shadow: 0 8px 18px rgba(132, 53, 51, 0.28);
}

.sammie-envelope__letter-lines {
  position: absolute;
  left: 18%;
  right: 18%;
  top: 48%;
  bottom: 16%;
  background:
    linear-gradient(180deg,
      rgba(201,171,122,0) 0%, rgba(201,171,122,0) 8%,
      rgba(201,171,122,0.12) 8%, rgba(201,171,122,0.12) 12%,
      rgba(201,171,122,0) 12%, rgba(201,171,122,0) 32%,
      rgba(201,171,122,0.1) 32%, rgba(201,171,122,0.1) 36%,
      rgba(201,171,122,0) 36%, rgba(201,171,122,0) 56%,
      rgba(201,171,122,0.08) 56%, rgba(201,171,122,0.08) 60%,
      rgba(201,171,122,0) 60%, rgba(201,171,122,0) 100%);
}

.sammie-envelope__flap {
  background: linear-gradient(135deg, #29241e 0%, #3c3228 100%);
  clip-path: polygon(0 0, 100% 0, 50% 56%);
  transform-origin: top center;
  transition: transform 0.98s cubic-bezier(0.2, 0.7, 0.2, 1);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  border: 1px solid rgba(201, 171, 122, 0.1);
}

.sammie-envelope.is-open .sammie-envelope__flap {
  transform: rotateX(180deg);
}

.sammie-envelope.is-open .sammie-envelope__letter {
  transform: translateY(-18%) scale(1);
}

@media (max-width: 1023px) {
  .sammie-envelope {
    width: min(58vw, 240px);
  }
}
</style>
