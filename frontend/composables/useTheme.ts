export const useTheme = () => {
  const isDark = useState<boolean>('theme:isDark', () => false)
  const isXray = useState<boolean>('theme:isXray', () => false)
  const toastMessage = useState<string>('theme:toastMessage', () => '')
  const isToastVisible = useState<boolean>('theme:isToastVisible', () => false)
  const scrollDepth = useState<number>('theme:scrollDepth', () => 0)
  const cursorLabel = useState<string>('theme:cursorLabel', () => '')
  const isCursorExpanded = useState<boolean>('theme:isCursorExpanded', () => false)

  const showToast = (message: string) => {
    toastMessage.value = message
    isToastVisible.value = true
    setTimeout(() => {
      isToastVisible.value = false
    }, 3200)
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
    showToast(isDark.value ? 'MODE: CYBER-EMERALD OBSIDIAN' : 'MODE: ARCHITECTURAL LAB WHITE')
  }

  const toggleXray = () => {
    isXray.value = !isXray.value
    if (import.meta.client) {
      document.body.classList.toggle('xray-active', isXray.value)
    }
    showToast(isXray.value ? 'X-RAY BLUEPRINT LAYER ENABLED' : 'X-RAY LAYER DISABLED')
  }

  const setCursor = (label: string, expanded = true) => {
    cursorLabel.value = label
    isCursorExpanded.value = expanded
  }

  const resetCursor = () => {
    cursorLabel.value = ''
    isCursorExpanded.value = false
  }

  return {
    isDark,
    isXray,
    toastMessage,
    isToastVisible,
    scrollDepth,
    cursorLabel,
    isCursorExpanded,
    showToast,
    toggleTheme,
    toggleXray,
    setCursor,
    resetCursor
  }
}
