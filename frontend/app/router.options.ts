import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'

export default {
  scrollBehavior(to, from, savedPosition) {
    const scrollTarget = () => {
      if (savedPosition) return { ...savedPosition, behavior: 'instant' as const }

      if (to.hash) {
        const id = to.hash.slice(1)
        const element = document.getElementById(id)
        if (element) {
          const margin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0
          const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
          return { el: element, top: margin + padding }
        }
      }

      if (to.path === from.path && !from.hash) return false
      return { left: 0, top: 0, behavior: 'instant' as const }
    }

    if (to.path === from.path || from === START_LOCATION) return scrollTarget()

    const nuxtApp = useNuxtApp()
    const router = useRouter()
    return new Promise(resolve => {
      nuxtApp.hooks.hookOnce('page:loading:end', () => {
        requestAnimationFrame(() => {
          resolve(router.currentRoute.value.fullPath === to.fullPath ? scrollTarget() : false)
        })
      })
    })
  }
} satisfies RouterConfig
