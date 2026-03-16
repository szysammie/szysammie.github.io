<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

type Ripple = {
  x: number
  y: number
  start: number
  amp: number
  freq: number
  decay: number
  speed: number
  width: number
}

const props = defineProps<{
  isMobile: boolean
  play: boolean
}>()

const MAX_RIPPLES = 12
const DROP_DURATION_MS = 2500
const RIPPLE_DURATION_MS = 3200

const wrapRef = ref<HTMLElement | null>(null)
const canvasHostRef = ref<HTMLDivElement | null>(null)

let cleanupWebGL: (() => void) | null = null

function initWebGL() {
  const wrap = wrapRef.value
  const host = canvasHostRef.value
  if (!wrap || !host) return

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let waterMaterial: THREE.ShaderMaterial | null = null
  let quad: THREE.Mesh | null = null
  let rafId = 0
  let width = 1
  let height = 1
  let renderStartAt = 0

  const ripples: Ripple[] = []
  const rippleCenters = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, -9999, 0))
  const rippleParams = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, 0, 0))

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uRippleCount: { value: 0 },
    uRippleCenters: { value: rippleCenters },
    uRippleParams: { value: rippleParams },
    uDropProgress: { value: 0 },
    uDropVisible: { value: 1 },
    uImpactFlash: { value: 0 },
    uDropRing: { value: 0 },
    uInkAmount: { value: 0 },
    uRippleGlow: { value: 0 },
  }

  function resizeWebGL() {
    if (!renderer) return
    const rect = wrap.getBoundingClientRect()
    width = Math.max(320, rect.width)
    height = Math.max(480, rect.height)
    renderer.setSize(width, height, false)
    uniforms.uResolution.value.set(width, height)
  }

  function addRipple(x: number, y: number, strength = 1) {
    ripples.push({
      x,
      y,
      start: uniforms.uTime.value,
      amp: 0.026 * strength,
      freq: 58 + Math.random() * 12,
      decay: 0.62 + Math.random() * 0.12,
      speed: 0.285 + Math.random() * 0.03,
      width: 0.0019 + Math.random() * 0.0005,
    })
  }

  function seedImpact() {
    ripples.length = 0
    addRipple(0.5, 0.5, 1.85)
    addRipple(0.5, 0.5, 1.1)
  }

  function syncRipples(time: number) {
    const alive = ripples.filter((r) => time - r.start < 5.5)
    ripples.length = 0
    ripples.push(...alive.slice(-MAX_RIPPLES))

    for (let i = 0; i < MAX_RIPPLES; i += 1) {
      const r = ripples[i]
      if (!r) {
        rippleCenters[i].set(0, 0, -9999, 0)
        rippleParams[i].set(0, 0, 0, 0)
        continue
      }
      rippleCenters[i].set(r.x, r.y, r.start, 0)
      rippleParams[i].set(r.amp, r.freq, r.decay, r.speed)
    }
    uniforms.uRippleCount.value = ripples.length
  }

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `

  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform int uRippleCount;
    uniform vec4 uRippleCenters[12];
    uniform vec4 uRippleParams[12];
    uniform float uDropProgress;
    uniform float uDropVisible;
    uniform float uImpactFlash;
    uniform float uDropRing;
    uniform float uInkAmount;
    uniform float uRippleGlow;

    float rippleHeight(vec2 uv) {
      float h = 0.0;
      for (int i = 0; i < 12; i++) {
        if (i >= uRippleCount) break;
        vec2 c = uRippleCenters[i].xy;
        float start = uRippleCenters[i].z;
        float amp = uRippleParams[i].x;
        float freq = uRippleParams[i].y;
        float decay = uRippleParams[i].z;
        float speed = uRippleParams[i].w;
        float age = max(0.0, uTime - start);
        vec2 d = uv - c;
        d.x *= uResolution.x / uResolution.y;
        float dist = length(d);
        float front = dist - age * speed;
        float ring = exp(-front * front / 0.0022);
        float wave = sin(front * freq - age * 6.5);
        h += amp * exp(-age * decay) * ring * wave;
      }
      return h;
    }

    vec3 bgBase(vec2 uv) {
      vec3 deep = vec3(0.012, 0.014, 0.018);
      vec3 mid = vec3(0.03, 0.04, 0.06);
      vec3 top = vec3(0.06, 0.08, 0.11);
      vec3 base = mix(deep, mid, smoothstep(0.0, 0.72, 1.0 - uv.y));
      base = mix(base, top, smoothstep(0.0, 0.26, 1.0 - uv.y));

      float moonGlow = smoothstep(0.42, 0.0, length(uv - vec2(0.5, 0.18)));
      float horizonMist = smoothstep(1.0, 0.18, uv.y) * 0.18;
      base += vec3(0.06, 0.08, 0.11) * moonGlow * 0.35;
      base += vec3(0.02, 0.025, 0.03) * horizonMist;
      return base;
    }

    float dropMask(vec2 uv) {
      vec2 center = vec2(0.5, mix(0.1, 0.5, uDropProgress));
      vec2 p = uv - center;
      p.x *= uResolution.x / uResolution.y;

      float dropCore = smoothstep(0.013, 0.0, length(p * vec2(0.88, 1.18)) - 0.0052);

      vec2 haloP = uv - center;
      haloP.x *= uResolution.x / uResolution.y;
      float halo = smoothstep(0.032, 0.0, length(haloP) - 0.004) * 0.26;

      vec2 ringP = uv - center;
      ringP.x *= uResolution.x / uResolution.y;
      float ring = smoothstep(0.008, 0.0, abs(length(ringP) - mix(0.0, 0.026, uDropRing))) * uDropRing * 0.45;

      vec2 trailP = uv - vec2(0.5, mix(0.03, 0.42, uDropProgress));
      trailP.x *= uResolution.x / uResolution.y;
      float trail = smoothstep(0.008, 0.0, abs(trailP.x)) * smoothstep(0.0, 0.09, trailP.y) * smoothstep(0.14, 0.01, trailP.y) * 0.42;

      return (dropCore + halo + ring + trail) * uDropVisible;
    }

    void main() {
      vec2 uv = vUv;
      float h = rippleHeight(uv);
      float eps = 0.0015;
      float hx = rippleHeight(uv + vec2(eps, 0.0)) - rippleHeight(uv - vec2(eps, 0.0));
      float hy = rippleHeight(uv + vec2(0.0, eps)) - rippleHeight(uv - vec2(0.0, eps));
      vec3 normal = normalize(vec3(-hx * 26.0, -hy * 26.0, 1.0));

      vec3 color = bgBase(uv);

      float centerGlow = smoothstep(0.55, 0.0, length((uv - vec2(0.5)) * vec2(1.0, 0.78)));
      color += vec3(0.02, 0.03, 0.04) * centerGlow * 0.16;

      vec3 lightDir = normalize(vec3(-0.25, -0.34, 1.0));
      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      float diffuse = max(dot(normal, lightDir), 0.0);
      vec3 halfDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfDir), 0.0), 90.0);
      float wideSpec = pow(max(dot(normal, halfDir), 0.0), 24.0);

      color += vec3(0.10, 0.12, 0.16) * diffuse * 0.09;
      color += vec3(0.85, 0.9, 1.0) * spec * 0.42;
      color += vec3(0.35, 0.42, 0.5) * wideSpec * 0.16;

      float drop = dropMask(uv);
      color += vec3(0.0, 0.4, 1.0) * drop * 1.5; // Vibrant pure blue
      color += vec3(0.0, 0.2, 0.8) * drop * 0.8; // Deep blue glow

      float inkCenter = smoothstep(0.34, 0.0, length((uv - vec2(0.5, 0.5)) * vec2(1.0, 0.84)));
      float inkRing = smoothstep(0.02, 0.0, abs(length((uv - vec2(0.5, 0.5)) * vec2(uResolution.x / uResolution.y, 1.0)) - (0.06 + uInkAmount * 0.46)));
      color -= vec3(0.018, 0.016, 0.012) * inkCenter * uInkAmount * 0.85;
      color += vec3(0.08, 0.1, 0.15) * inkRing * uInkAmount * 0.22;

      float flash = smoothstep(0.0, 1.0, uImpactFlash) * smoothstep(1.0, 0.0, uImpactFlash);
      float flashMask = smoothstep(0.16, 0.0, length((uv - vec2(0.5, 0.5)) * vec2(1.0, 0.8)));
      float rippleAura = smoothstep(0.85, 0.0, length((uv - vec2(0.5, 0.5)) * vec2(1.0, 0.78)));
      color += vec3(0.6, 0.7, 0.85) * flash * flashMask * 0.18;
      color += vec3(0.10, 0.14, 0.22) * rippleAura * uRippleGlow * 0.14;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'default',
    preserveDrawingBuffer: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x000000, 1)
  host.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  waterMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: false,
  })

  quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), waterMaterial)
  scene.add(quad)

  function stopRenderLoop() {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
  }

  function renderFrame(now: number) {
    if (!renderer || !scene || !camera) return
    if (!renderStartAt) renderStartAt = now

    const elapsed = now - renderStartAt
    const t = elapsed / 1000
    uniforms.uTime.value = t

    if (elapsed <= DROP_DURATION_MS) {
      const dropProgress = Math.min(elapsed / DROP_DURATION_MS, 1)
      uniforms.uDropProgress.value = dropProgress
      uniforms.uDropVisible.value = 1
      uniforms.uDropRing.value = Math.sin(Math.min(dropProgress, 0.96) * Math.PI) * 0.65
      uniforms.uImpactFlash.value = 0
      uniforms.uInkAmount.value = 0
      uniforms.uRippleGlow.value = 0
    } else {
      if (ripples.length === 0) {
        seedImpact()
      }
      uniforms.uDropProgress.value = 1
      uniforms.uDropVisible.value = 0
      uniforms.uDropRing.value = 0
      const impactElapsed = elapsed - DROP_DURATION_MS
      uniforms.uImpactFlash.value = Math.min(impactElapsed / 600, 1)
      uniforms.uInkAmount.value = Math.min(impactElapsed / 1800, 1)
      uniforms.uRippleGlow.value = Math.max(0, 1 - impactElapsed / 2400)
    }

    syncRipples(t)
    renderer.render(scene, camera)

    if (elapsed < DROP_DURATION_MS + RIPPLE_DURATION_MS && !document.hidden) {
      rafId = requestAnimationFrame(renderFrame)
    } else {
      stopRenderLoop()
    }
  }

  resizeWebGL()
  rafId = requestAnimationFrame(renderFrame)

  const onResize = () => {
    if (!props.isMobile) resizeWebGL()
  }

  const onVisibility = () => {
    if (document.hidden) stopRenderLoop()
  }

  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)

  cleanupWebGL = () => {
    stopRenderLoop()
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    waterMaterial?.dispose()
    quad?.geometry.dispose()
    renderer?.dispose()
    if (renderer?.domElement.parentNode === host) host.removeChild(renderer.domElement)
  }
}

import { watch } from 'vue'

onMounted(() => {
  if (!props.isMobile && props.play) {
    initWebGL()
  }
})

watch(() => props.play, (newPlay) => {
  if (newPlay && !props.isMobile && !cleanupWebGL) {
    initWebGL()
  }
})

onBeforeUnmount(() => {
  cleanupWebGL?.()
})
</script>

<template>
  <div ref="wrapRef" class="landing-background">
    <div v-if="!isMobile" ref="canvasHostRef" class="landing-background__canvas"></div>
    <div class="landing-background__vignette"></div>
  </div>
</template>

<style scoped>
.landing-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgba(76, 96, 132, 0.18), transparent 18%),
    radial-gradient(circle at 50% 38%, rgba(18, 24, 38, 0.42), transparent 42%),
    linear-gradient(180deg, #111722 0%, #07090d 48%, #020203 100%);
}

.landing-background__canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.landing-background__vignette {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 18%, rgba(122,145,190,0.12), transparent 18%),
    radial-gradient(circle at 50% 72%, rgba(40,60,90,0.12), transparent 38%),
    linear-gradient(180deg, rgba(10,14,22,0.0) 0%, rgba(10,14,22,0.14) 38%, rgba(0,0,0,0.34) 100%),
    radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.58) 100%);
}
</style>
