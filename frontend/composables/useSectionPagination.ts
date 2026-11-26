import type { Ref } from 'vue'

export function useSectionPagination<T extends { category: string }>(
  items: Ref<T[]>,
  categories: readonly string[],
  itemsPerPage: number,
  section: string,
  categoryKey: string,
  pageKey: string
) {
  const route = useRoute()
  const router = useRouter()
  const defaultCategory = categories[0]

  const activeCategory = computed(() => {
    const value = route.query[categoryKey]
    return typeof value === 'string' && categories.includes(value) ? value : defaultCategory
  })
  const filteredItems = computed(() => activeCategory.value === defaultCategory
    ? items.value
    : items.value.filter(item => item.category === activeCategory.value))
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)))
  const currentPage = computed(() => {
    const value = route.query[pageKey]
    const page = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : 1
    return Math.max(1, Math.min(page, totalPages.value))
  })
  const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredItems.value.slice(start, start + itemsPerPage)
  })

  const goTo = (category: string, page: number) => {
    if (category === activeCategory.value && page === currentPage.value) return
    return router.push({
      path: route.path,
      query: {
        ...route.query,
        [categoryKey]: category === defaultCategory ? undefined : category,
        [pageKey]: page === 1 ? undefined : String(page)
      },
      hash: `#${section}`
    })
  }

  return {
    activeCategory,
    filteredItems,
    displayedItems,
    currentPage,
    totalPages,
    selectCategory: (category: string) => goTo(category, 1),
    prevPage: () => currentPage.value > 1 && goTo(activeCategory.value, currentPage.value - 1),
    nextPage: () => currentPage.value < totalPages.value && goTo(activeCategory.value, currentPage.value + 1)
  }
}
