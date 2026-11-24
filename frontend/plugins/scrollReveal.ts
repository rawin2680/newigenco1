import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (!observer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer?.unobserve(entry.target)
            }
          })
        },
        {
          root: null,
          rootMargin: '120px 0px 50px 0px',
          threshold: 0.01
        }
      )
    }
    return observer
  }

  const observeAll = () => {
    requestAnimationFrame(() => {
      const obs = getObserver()
      if (obs) {
        const elements = document.querySelectorAll('.reveal-init:not(.is-revealed)')
        elements.forEach((el) => obs.observe(el))
      }
    })
  }

  nuxtApp.hook('page:finish', observeAll)
  nuxtApp.hook('app:mounted', observeAll)
})
