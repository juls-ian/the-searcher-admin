import api from '@/services/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // States
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const users = ref([])

  // HELPERS
  // Get current position category
  const getUserPositionCategory = (user) => {
    // current_board_position from resource
    if (user.current_board_position) {
      return user.current_board_position.category
    }

    // Fallback: board_positions from resource
    const currentBoard = user.board_positions?.find((board) => board.is_current)

    return currentBoard?.board_position?.category || null
  }

  // Get user position name
  const getUserPositionName = (user) => {
    if (user.current_board_position) {
      return user.current_board_position.name
    }

    const currentBoard = user.board_positions?.find((board) => board.is_current)

    return currentBoard?.board_position?.name || null
  }

  // GETTERS
  const getActiveStaff = computed(() =>
    [...users.value] // spread operator, shallow copy of reactive array
      .filter((user) => user.status === 'active')
      .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())),
  )

  const getInactiveStaff = computed(() =>
    [...users.value]
      .filter((user) => user.status === 'inactive')
      .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())),
  )

  const getAlumni = computed(() =>
    [...users.value]
      .filter((user) => user.status === 'alumni')
      .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())),
  )

  const getWriters = computed(() => {
    return users.value
      .filter((user) => {
        const category = getUserPositionCategory(user)
        // if true, keep user in the filtered array
        return (
          category === 'executive' ||
          category === 'writer (editor)' ||
          category === 'writer (staff)'
        )
      })
      .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase()))
  })

  const getArtists = computed(() => {
    return users.value
      .filter((user) => {
        const category = getUserPositionCategory(user)
        return (
          category === 'executive' ||
          category === 'artist (editor)' ||
          category === 'artist (staff)'
        )
      })
      .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase()))
  })

  // Group users by board position category
  const getStaffByPositionCategory = computed(() => {
    const grouped = {} // stores the users

    users.value.forEach((user) => {
      const category = getUserPositionCategory(user)

      // grouping
      if (category) {
        if (!grouped[category]) {
          grouped[category] = []
        }

        grouped[category].push(user)
      }
    })

    return grouped
  })

  // ACTIONS
  async function fetchUsers() {
    error.value = null

    try {
      const response = await api('/users')
      users.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot retrieve users'
      throw err
    }
  }

  return {
    // State
    currentUser,
    loading,
    error,
    users,
    // Getters
    getActiveStaff,
    getInactiveStaff,
    getAlumni,
    getWriters,
    getArtists,
    getStaffByPositionCategory,
    getUserPositionName,
    // Actions
    fetchUsers,
  }
})
