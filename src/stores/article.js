import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/api'
import { useUserStore } from './user'

export const useArticleStore = defineStore('article', () => {
  // States
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const articles = ref([])
  const paginationLinks = ref([])
  const paginationMeta = ref([])
  const now = new Date().toISOString()

  // Getters
  const getSortedArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  )

  const getHeaderArticles = computed(() => {
    return articles.value.filter((article) => article.is_header === true && article.live_expires_at > now)
  })

  /**
   * Normal function - already reactive because it came from a ref
   * Formerly a computed property
   * @param {*} limit
   */
  const getRecentArticles = (limit = 5) => {
    return articles.value.slice(0, limit)
  }

  // Actions
  async function fetchArticles(url = 'articles', params = {}) {
    error.value = null

    try {
      await new Promise((resolve) => setTimeout(resolve, 4000))
      const response = await api.get(url, { params })
      articles.value = response.data || [] // assign to state
      paginationLinks.value = response.meta.links || []
      paginationMeta.value = response.meta || {}

    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot retrieve articles'
      throw err
    }
  }

  async function addArticle(formData) {
    error.value = null

    try {
      const userStore = useUserStore()
      const user = userStore.fetchCurrentUser
      formData.append('publisher_id', user.id)

      const response = await api.post('/articles', formData)

      // Pushing article from response
      articles.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot publish article'
      console.error(err)
      throw err
    }
  }

  return {
    // State
    user,
    loading,
    error,
    articles,
    paginationLinks,
    // Getters
    getRecentArticles,
    getSortedArticles,
    getHeaderArticles,
    // Actions
    fetchArticles,
    addArticle
  }
})
