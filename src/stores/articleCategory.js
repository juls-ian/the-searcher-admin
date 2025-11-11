import api from '@/services/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useArticleCategoryStore = defineStore('articleCategory', () => {
  // States
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const categories = ref([])

  // Getters
  const getArticleCategories = computed(() => categories.value)
  const getParentCategories = computed(
    () => categories.value.filter((category) => category.parent_id === null), // category = iterations
  )
  // // Get all sub
  const getSubcategories = computed(() =>
    categories.value.filter((category) => category.parent_id !== null),
  )
  // Returns subcategories of the currently selected parent.
  const getSubCurrentParent = computed(() =>
    categories.value.filter((sub) => sub.parent_id === parent.value?.id),
  )

  // Actions
  async function fetchArticleCategories() {
    error.value = null

    try {
      const response = await api.get('/article-categories')
      categories.value = response.data || []
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot retrieved article categories'
    }
  }

  return {
    // State
    user,
    loading,
    error,
    categories,
    // Getters
    getArticleCategories,
    getParentCategories,
    getSubcategories,
    getSubCurrentParent,
    // Actions
    fetchArticleCategories,
  }
})
