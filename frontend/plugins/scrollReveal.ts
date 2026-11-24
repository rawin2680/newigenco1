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
      const elements = document.querySelectorAll('.reveal-init:not(.is-revealed)')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If element is already visible or within viewport window, reveal immediately
        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
          el.classList.add('is-revealed')
        } else if (obs) {
          obs.observe(el)
        } else {
          el.classList.add('is-revealed')
        }
      })
    })
  }

  // MutationObserver to catch any dynamic DOM mounts
  if (typeof MutationObserver !== 'undefined') {
    let timer: number | null = null
    const mutObserver = new MutationObserver(() => {
      if (timer) cancelAnimationFrame(timer)
      timer = requestAnimationFrame(() => {
        observeAll()
      })
    })

    mutObserver.observe(document.body, { childList: true, subtree: true })
  }

  nuxtApp.hook('page:finish', observeAll)
  nuxtApp.hook('app:mounted', observeAll)
})
