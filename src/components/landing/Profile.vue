<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <div :class="['landing-content', { 'is-visible': show }]">
    <h1 class="landing-title">Sammie</h1>
    <p class="landing-quote">我们终有一日会实现贾维斯</p>
    <nav class="landing-nav" aria-label="Primary">
      <a class="landing-link" href="http://blog.sammie.vip" target="_blank"><span>Blog</span><i class="landing-link-ripple"></i></a>
      <a class="landing-link" href="https://github.com/szysammie" target="_blank"><span>GitHub</span><i class="landing-link-ripple"></i></a>
      <a class="landing-link" href="http://project.sammie.vip" target="_blank"><span>Projects</span><i class="landing-link-ripple"></i></a>
    </nav>
  </div>
</template>

<style scoped>
.landing-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  text-align: center;
  opacity: 0;
  transform: translateY(14px) scale(0.985);
  transition:
    opacity 1400ms ease,
    transform 1400ms cubic-bezier(0.2, 0.75, 0.2, 1);
  filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.28));
  pointer-events: none;
}

.landing-content.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.landing-title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(56px, 10vw, 120px);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: 0.055em;
  color: transparent;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(196,210,238,0.92) 58%, rgba(135,154,198,0.88));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-stroke: 1px rgba(214,224,255,0.18);
  text-shadow:
    0 0 14px rgba(255,255,255,0.12),
    0 0 36px rgba(120,150,255,0.08),
    0 8px 26px rgba(0,0,0,0.28);
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(12px) scale(0.985);
  transition:
    opacity 1400ms ease 680ms,
    transform 1400ms cubic-bezier(0.2, 0.75, 0.2, 1) 680ms;
}

.landing-content.is-visible .landing-title {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.landing-title::after {
  content: '';
  display: block;
  width: 42%;
  height: 1px;
  margin: 16px auto 0;
  background: linear-gradient(90deg, transparent, rgba(220,230,255,0.28), transparent);
}

.landing-quote {
  position: relative;
  max-width: min(80vw, 720px);
  margin: 0 0 48px;
  padding: 14px 0 14px 22px;
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 1.7vw, 18px);
  line-height: 1.7;
  color: rgba(235,240,255,0.72);
  letter-spacing: 0.04em;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 1400ms ease 820ms,
    transform 1400ms cubic-bezier(0.2, 0.75, 0.2, 1) 820ms;
  background: linear-gradient(90deg, rgba(255,255,255,0.025), rgba(255,255,255,0.0));
  border-radius: 0 16px 16px 0;
}

.landing-quote::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,0.58), rgba(120,150,255,0.25));
  box-shadow: 0 0 18px rgba(130,150,255,0.18);
}

.landing-content.is-visible .landing-quote {
  opacity: 1;
  transform: translateY(0);
}

.landing-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 1400ms ease 960ms,
    transform 1400ms cubic-bezier(0.2, 0.75, 0.2, 1) 960ms;
}

.landing-content.is-visible .landing-nav {
  opacity: 1;
  transform: translateY(0);
}

.landing-nav::before {
  content: '';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  width: min(420px, 72vw);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(210,220,255,0.14), transparent);
}

.landing-link {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.95);
  text-decoration: none;
  padding: 14px 26px;
  border-radius: 999px;
  border: 1px solid rgba(200,210,255,0.15);
  background: linear-gradient(180deg, rgba(40,60,110,0.35), rgba(20,30,60,0.25));
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 12px 30px rgba(0,0,0,0.45),
    0 0 22px rgba(90,120,200,0.12);
  transition:
    transform 220ms ease,
    background 220ms ease,
    border-color 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease;
}

.landing-link::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(120,150,255,0.05), rgba(255,255,255,0.02));
  opacity: 0.92;
  pointer-events: none;
  z-index: -2;
}

.landing-link > span {
  position: relative;
  z-index: 2;
}

.landing-link::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -120%;
  width: 52%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
  transform: skewX(-20deg);
  transition: left 360ms ease;
  pointer-events: none;
  z-index: 1;
}

.landing-link .landing-link-ripple {
  position: absolute;
  inset: 50% auto auto 50%;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  transform: translate(-50%, -50%) scale(0.2);
  opacity: 0;
  transition: transform 320ms ease, opacity 260ms ease;
  pointer-events: none;
  z-index: 0;
}

.landing-link:nth-child(1) {
  border-color: rgba(120,180,255,0.35);
  background: linear-gradient(180deg, rgba(80,140,255,0.35), rgba(40,70,150,0.25));
}

.landing-link:nth-child(1) .landing-link-ripple {
  background: radial-gradient(circle, rgba(146,205,255,0.34), rgba(80,140,255,0.12) 45%, transparent 72%);
}

.landing-link:nth-child(2) {
  border-color: rgba(255,120,120,0.35);
  background: linear-gradient(180deg, rgba(170,60,80,0.35), rgba(90,25,40,0.28));
}

.landing-link:nth-child(2) .landing-link-ripple {
  background: radial-gradient(circle, rgba(255,180,180,0.28), rgba(190,70,90,0.12) 45%, transparent 72%);
}

.landing-link:nth-child(3) {
  border-color: rgba(180,160,90,0.35);
  background: linear-gradient(180deg, rgba(160,140,60,0.35), rgba(80,70,30,0.28));
}

.landing-link:nth-child(3) .landing-link-ripple {
  background: radial-gradient(circle, rgba(230,210,140,0.28), rgba(170,145,60,0.12) 45%, transparent 72%);
}

.landing-link:hover {
  transform: translateY(-3px) scale(1.01);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.15),
    0 18px 42px rgba(0,0,0,0.55),
    0 0 28px rgba(120,150,255,0.18);
}

.landing-link:hover .landing-link-ripple {
  opacity: 1;
  transform: translate(-50%, -50%) scale(7.2);
}

.landing-link:hover::after {
  left: 135%;
}
</style>
