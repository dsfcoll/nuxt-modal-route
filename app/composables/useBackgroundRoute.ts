// Global state to track modal route (shared across components)
const modalRoute = ref<{ name: string; params: Record<string, any> } | null>(null)

export const useBackgroundRoute = () => {
  const router = useRouter()
  const route = useRoute()

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

    // Update URL without full navigation (pushState with marker)
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
      // If navigating back from modal, clear modal state
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
}
