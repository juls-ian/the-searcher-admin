import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api'

export const useArticleStore = defineStore('article', () => {
  // States
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const articles = ref([])

  // Getters
  const getSortedArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  )

  /**
   * Normal function - already reactive because it came from a ref
   * Formerly a computed property
   * @param {*} limit
   */
  const getRecentArticles = (limit = 5) => {
    return articles.value.slice(0, limit)
  }

  // Actions
  async function fetchArticles(limit) {
    error.value = null

    try {
      const response = await api.get('/articles')
      articles.value = response.data || [] // assign to state
    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot retrieve articles'
      throw err
    }
  }

  return {
    // State
    user,
    loading,
    error,
    articles,
    // Getters
    getRecentArticles,
    getSortedArticles,
    // Actions
    fetchArticles,
  }
})
