<script setup lang="ts">
import type { Component } from 'vue'
import { Cpu } from 'lucide-vue-next'

interface Props {
  eyebrow: string
  titlePrefix: string
  titleHighlight?: string
  titleSuffix?: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'md' | 'lg' | 'xl'
  showRadialGrid?: boolean
  icon?: Component
}

withDefaults(defineProps<Props>(), {
  align: 'left',
  size: 'lg',
  showRadialGrid: false
})

const titleSizes = {
  md: 'text-xl sm:text-3xl',
  lg: 'text-2xl sm:text-4xl lg:text-[2.75rem]',
  xl: 'text-3xl sm:text-5xl lg:text-6xl'
}
</script>

<template>
  <div
    class="section-heading relative isolate"
    :class="align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'"
  >
    <div v-if="showRadialGrid" class="heading-grid" aria-hidden="true" />

    <div v-if="eyebrow" class="heading-eyebrow">
      <component :is="icon || Cpu" class="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{{ eyebrow }}</span>
    </div>

    <h2 class="font-display font-extrabold leading-[1.22] text-[#022C22] dark:text-[#F4FBF7]" :class="titleSizes[size]">
      {{ titlePrefix }}<span v-if="titleHighlight" class="heading-highlight">{{ ' ' + titleHighlight }}</span><template v-if="titleSuffix">{{ ' ' + titleSuffix }}</template>
    </h2>

    <p v-if="subtitle" class="mt-2 max-w-2xl text-sm leading-relaxed opacity-75 sm:text-base">
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
.section-heading.text-center h2::after {
  margin-inline: auto;
}

.section-heading.text-left h2::after {
  margin-inline: 0;
}

.heading-grid {
  position: absolute;
  inset: -1rem 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(circle, color-mix(in srgb, var(--heading-accent) 32%, transparent) 1px, transparent 1.5px) 0 0 / 16px 16px;
  mask-image: radial-gradient(ellipse, #000, transparent 72%);
}

.heading-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.7rem;
  border-inline-start: 2px solid var(--heading-accent);
  background: linear-gradient(90deg, color-mix(in srgb, var(--heading-accent) 10%, transparent), transparent);
  color: var(--heading-accent);
  font-family: ui-monospace, Anuphan, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.heading-highlight {
  color: var(--heading-accent);
  background: linear-gradient(100deg, var(--heading-accent), var(--heading-accent-end));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (forced-colors: active) {
  .heading-highlight {
    -webkit-text-fill-color: currentColor;
  }
}
</style>
