<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Sparkles } from 'lucide-vue-next'

interface Props {
  eyebrow: string
  titlePrefix: string
  titleHighlight?: string
  titleSuffix?: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'md' | 'lg' | 'xl'
  showRadialGrid?: boolean
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  titleHighlight: '',
  titleSuffix: '',
  subtitle: '',
  align: 'left',
  size: 'lg',
  showRadialGrid: false,
  icon: null
})

const rootRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const spotX = ref(50)
const spotY = ref(50)
const isHovering = ref(false)

let observer: IntersectionObserver | null = null

const handleMouseMove = (e: MouseEvent) => {
  if (!rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  spotX.value = ((e.clientX - rect.left) / rect.width) * 100
  spotY.value = ((e.clientY - rect.top) / rect.height) * 100
}

onMounted(() => {
  if (!import.meta.client || !rootRef.value) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="rootRef"
    class="section-heading-root relative"
    :class="align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- Optional Radial Grid Fade behind heading -->
    <div
      v-if="showRadialGrid"
      class="pointer-events-none absolute -inset-x-12 -inset-y-8 -z-10 radial-grid-fade opacity-70 dark:opacity-50"
    />

    <!-- 1. Eyebrow Glassmorphic Pill + Shimmer Border -->
    <div
      class="eyebrow-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-500/30 shadow-[0_2px_16px_rgba(0,200,100,0.10)] mb-3.5 relative overflow-hidden"
      :class="isVisible ? 'is-revealed' : ''"
    >
      <!-- Shimmer Sweep -->
      <span class="eyebrow-shimmer pointer-events-none" />

      <component
        :is="icon || Sparkles"
        class="w-3.5 h-3.5 text-[#00A854] dark:text-[#00FF88] shrink-0 sparkle-twinkle relative z-10"
      />
      <span class="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#047857] dark:text-[#00FF88] font-bold relative z-10">
        {{ eyebrow }}
      </span>
    </div>

    <!-- 2. Main Heading with Blur-to-Focus Reveal, Dual-Tone Gradient, SVG Underline & Cursor Spotlight -->
    <div
      class="heading-reveal relative"
      :class="isVisible ? 'is-revealed' : ''"
    >
      <h2
        class="font-display font-extrabold tracking-tight leading-[1.18] relative"
        :class="[
          size === 'xl'
            ? 'text-3xl sm:text-5xl lg:text-6xl'
            : size === 'lg'
              ? 'text-2xl sm:text-4xl lg:text-[2.75rem]'
              : 'text-xl sm:text-3xl',
        ]"
      >
        <span class="text-[#022C22] dark:text-[#F4FBF7]">{{ titlePrefix }}</span>
        <span
          v-if="titleHighlight"
          class="relative inline-block ml-1.5"
        >
          <span class="bg-gradient-to-r from-[#00A854] via-[#00C864] to-[#059669] dark:from-[#00FF88] dark:via-[#34D399] dark:to-[#10B981] bg-clip-text text-transparent">
            {{ titleHighlight }}
          </span>
          <!-- Animated Hand-Drawn / Glowing SVG Underline -->
          <svg
            class="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible pointer-events-none"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 2 9 Q 60 2 120 7 T 198 5"
              fill="none"
              stroke="url(#igenco-underline-grad)"
              stroke-width="3.2"
              stroke-linecap="round"
              class="svg-underline-path"
              :class="isVisible ? 'is-drawn' : ''"
            />
            <defs>
              <linearGradient id="igenco-underline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00C864" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#00FF88" stop-opacity="0.95" />
                <stop offset="100%" stop-color="#00C864" stop-opacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span v-if="titleSuffix" class="text-[#022C22] dark:text-[#F4FBF7] ml-1.5">{{ titleSuffix }}</span>

        <!-- Radial Cursor Spotlight Overlay on Heading -->
        <span
          v-if="isHovering"
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 mix-blend-plus-lighter dark:mix-blend-screen opacity-60 transition-opacity duration-200"
          :style="{
            background: `radial-gradient(140px circle at ${spotX}% ${spotY}%, rgba(0, 255, 136, 0.22), transparent 70%)`
          }"
        />
      </h2>
    </div>

    <!-- Optional Subtitle -->
    <p
      v-if="subtitle"
      class="subtitle-reveal text-sm sm:text-base opacity-75 mt-3 max-w-2xl leading-relaxed"
      :class="isVisible ? 'is-revealed' : ''"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
/* Shimmer Sweep across Eyebrow Glass Pill */
.eyebrow-shimmer {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    110deg,
    transparent 20%,
    rgba(255, 255, 255, 0.75) 50%,
    transparent 80%
  );
  animation: eyebrow-shimmer-anim 3.8s infinite ease-in-out;
}

:global(html.dark) .eyebrow-shimmer {
  background: linear-gradient(
    110deg,
    transparent 20%,
    rgba(0, 255, 136, 0.25) 50%,
    transparent 80%
  );
}

@keyframes eyebrow-shimmer-anim {
  0% { transform: translateX(-120%); }
  45%, 100% { transform: translateX(120%); }
}

/* Twinkle / gentle pulse on Sparkles icon */
.sparkle-twinkle {
  animation: sparkle-pulse 2.8s ease-in-out infinite;
}

@keyframes sparkle-pulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
  50% { transform: scale(1.18) rotate(12deg); opacity: 1; }
}

/* Staggered Blur-to-Focus Scroll Reveal */
.eyebrow-reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.eyebrow-reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.heading-reveal {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(12px) scale(0.98);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
    filter 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
}

.heading-reveal.is-revealed {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0) scale(1);
}

.subtitle-reveal {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.6s ease 0.22s,
    transform 0.6s ease 0.22s;
}

.subtitle-reveal.is-revealed {
  opacity: 0.75;
  transform: translateY(0);
}

/* Animated Glowing SVG Underline */
.svg-underline-path {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
  filter: drop-shadow(0 0 6px rgba(0, 200, 100, 0.45));
  transition: stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
}

.svg-underline-path.is-drawn {
  stroke-dashoffset: 0;
}

/* Radial Grid Fade behind centered headings */
.radial-grid-fade {
  background-size: 36px 36px;
  background-image:
    linear-gradient(to right, rgba(0, 200, 100, 0.09) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 200, 100, 0.09) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse at center, black 15%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 15%, transparent 72%);
}
</style>
