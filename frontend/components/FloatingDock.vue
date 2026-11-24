<script setup lang="ts">
import { Compass, Layers, Cpu, Orbit, Contrast, ArrowUpRight } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { toggleTheme, setCursor, resetCursor } = useTheme()
</script>

<template>
  <nav aria-label="Floating Spatial Dock" class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-3 max-w-[95vw]">
    <div class="spatial-glass rounded-full p-2 shadow-2xl flex items-center gap-1 sm:gap-2">
      <a
        href="#top"
        class="dock-item px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#00C864]/15 dark:hover:bg-[#00FF88]/15 transition-all flex items-center gap-2"
        @mouseenter="setCursor('TOP')"
        @mouseleave="resetCursor"
      >
        <Compass class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span class="hidden sm:inline">ภาพรวม</span>
      </a>

      <a
        href="#capabilities"
        class="dock-item px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#00C864]/15 dark:hover:bg-[#00FF88]/15 transition-all flex items-center gap-2"
        @mouseenter="setCursor('STACK')"
        @mouseleave="resetCursor"
      >
        <Layers class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span class="hidden sm:inline">สถาปัตยกรรม</span>
      </a>

      <a
        href="#synthesizer"
        class="dock-item px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#00C864]/15 dark:hover:bg-[#00FF88]/15 transition-all flex items-center gap-2"
        @mouseenter="setCursor('AI LAB')"
        @mouseleave="resetCursor"
      >
        <Cpu class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span>AI Synthesizer</span>
      </a>

      <a
        href="#showcase"
        class="dock-item px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#00C864]/15 dark:hover:bg-[#00FF88]/15 transition-all flex items-center gap-2"
        @mouseenter="setCursor('CASES')"
        @mouseleave="resetCursor"
      >
        <Orbit class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span class="hidden sm:inline">ผลงาน</span>
      </a>

      <div class="h-5 w-[1px] bg-current opacity-15 mx-1" />

      <!-- Theme Invert Button -->
      <button
        type="button"
        aria-label="Invert Color Mode"
        class="p-2.5 rounded-full bg-[#022C22] text-white dark:bg-[#00FF88] dark:text-[#020806] hover:scale-110 transition-transform"
        @click="toggleTheme"
        @mouseenter="setCursor('MODE')"
        @mouseleave="resetCursor"
      >
        <Contrast class="w-4 h-4" />
      </button>

      <!-- Action Trigger -->
      <a
        href="#initiate"
        class="px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#00C864] text-[#022C22] dark:bg-white dark:text-[#020806] hover:scale-105 transition-transform flex items-center gap-1.5"
        @mouseenter="setCursor('START')"
        @mouseleave="resetCursor"
      >
        <span>เริ่มโปรเจกต์</span>
        <ArrowUpRight class="w-4 h-4" />
      </a>
    </div>
  </nav>
</template>
