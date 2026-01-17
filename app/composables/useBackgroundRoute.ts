import { createSharedComposable } from '@vueuse/core'

export const useBackgroundRoute = createSharedComposable(() => {
  const router = useRouter()
  const route = useRoute()

  // Modal route state
  const modalRoute = ref<{ name: string; params: Record<string, any> } | null>(null)

  // Check if we're currently showing a modal
  const isModalOpen = computed(() => modalRoute.value !== null)

  // Get the modal route params
  const modalParams = computed(() => modalRoute.value?.params || {})

  // Open a route as a modal (updates URL but doesn't navigate the background)
  function openAsModal(to: { name: string; params?: Record<string, any> }) {
    const resolved = router.resolve(to)

    // Store modal state
    modalRoute.value = {
      name: to.name,
      params: to.params || {},
    }

    // Update URL without full navigation
    if (import.meta.client) {
      history.pushState(
        { ...history.state, backgroundView: route.fullPath, modal: true },
        '',
        resolved.fullPath
      )
    }
  }

  // Close the modal
  function closeModal() {
    modalRoute.value = null
    if (import.meta.client) {
      history.back()
    }
  }

  // Handle browser back/forward
  if (import.meta.client) {
    window.addEventListener('popstate', () => {
      if (!history.state?.modal) {
        modalRoute.value = null
      }
    })
  }

  return {
    isModalOpen,
    modalParams,
    modalRoute: computed(() => modalRoute.value),
    openAsModal,
    closeModal,
  }
})
