<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="sticky top-0 z-40 border-b border-beige-200 bg-white/90 shadow-sm backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-18 min-h-18">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-beige-50 ring-1 ring-beige-200">
              <img :src="pcLogo" alt="PC Parser Logo" class="h-9 w-9 object-contain" />
            </span>
            <span class="hidden sm:block">
              <span class="block text-base font-extrabold leading-tight text-neutral-900">PC Parser</span>
              <span class="block text-xs font-semibold text-beige-700">Parts, prices, builds</span>
            </span>
          </router-link>
        </div>

        <div class="hidden md:flex items-center rounded-xl border border-beige-200 bg-beige-50 p-1 shadow-inner">
          <router-link
            to="/"
            class="rounded-lg px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-white hover:text-blue-700"
            :class="{ 'bg-white text-blue-700 shadow-sm': $route.path === '/' }"
          >
            Home
          </router-link>

          <router-link
            to="/about"
            class="rounded-lg px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-white hover:text-blue-700"
            :class="{ 'bg-white text-blue-700 shadow-sm': $route.path === '/about' }"
          >
            About
          </router-link>

          <div ref="componentsDropdown" class="relative">
            <span
              @click="toggleComponentsDropdown"
              class="block cursor-pointer select-none rounded-lg px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-white hover:text-blue-700"
              :class="{ 'bg-white text-blue-700 shadow-sm': $route.path.startsWith('/components') }"
            >
              Components
            </span>
            <div
              v-show="showComponentsDropdown"
              class="animate-slideInDown absolute left-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-beige-200 bg-white shadow-xl"
            >
              <ul class="divide-y divide-beige-100">
                <li>
                  <router-link to="/components/monitor" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Monitor</router-link
                  >
                </li>
                <li>
                  <router-link to="/components/cpu" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >CPUs</router-link
                  >
                </li>
                <li>
                  <router-link to="/components/storage" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Storage</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/components/power-supplies"
                    class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Power Supplies</router-link
                  >
                </li>
                <li>
                  <router-link to="/components/cases" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Cases</router-link
                  >
                </li>
                <li>
                  <router-link to="/components/memory" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Memory</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/components/motherboards"
                    class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >Motherboards</router-link
                  >
                </li>
                <li>
                  <router-link to="/components/gpu" class="block px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-beige-50 hover:text-blue-700"
                    >GPU</router-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <router-link
            to="/builder"
            class="rounded-lg px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-white hover:text-blue-700"
            :class="{ 'bg-white text-blue-700 shadow-sm': $route.path === '/builder' }"
          >
            Builder
          </router-link>

          <router-link
            to="/marketplace"
            class="rounded-lg px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-white hover:text-blue-700"
            :class="{ 'bg-white text-blue-700 shadow-sm': $route.path === '/marketplace' }"
          >
            Marketplace
          </router-link>
        </div>

        <!-- User Section -->
        <div class="flex items-center space-x-3">
          <!-- Marketplace Cart -->
          <CartDropdown v-if="isLoggedIn && isInMarketplace" />
          
          <!-- Authenticated User -->
          <div v-if="isLoggedIn && user" class="flex items-center space-x-3">
            <span class="hidden sm:block text-sm font-semibold text-neutral-600">
              Welcome, {{ user.first_name }}!
            </span>
            <UserAvatar :user="user" @logout="handleLogout" />
          </div>

          <!-- Guest User -->
          <div v-else class="flex items-center space-x-3">
            <router-link
              to="/login"
              class="hidden rounded-lg px-3 py-2 text-sm font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700 sm:block"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-neutral-700 transition-colors hover:bg-beige-100 hover:text-blue-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="animate-slideInDown md:hidden border-t border-beige-200 py-4">
        <div class="flex flex-col space-y-2">
          <router-link
            to="/"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            :class="{ 'bg-blue-50 text-blue-700': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/components"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/components') }"
          >
            Components
          </router-link>
          <router-link
            to="/builder"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            :class="{ 'bg-blue-50 text-blue-700': $route.path === '/builder' }"
          >
            Builder
          </router-link>
          <router-link
            to="/marketplace"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            :class="{ 'bg-blue-50 text-blue-700': $route.path === '/marketplace' }"
          >
            Marketplace
          </router-link>
          <router-link
            to="/about"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            :class="{ 'bg-blue-50 text-blue-700': $route.path === '/about' }"
          >
            About
          </router-link>

          <!-- Mobile Auth Links -->
          <div v-if="!isLoggedIn" class="border-t border-beige-200 pt-3 mt-3">
            <router-link
              to="/login"
              @click="closeMobileMenu"
              class="block rounded-lg px-4 py-3 font-bold text-neutral-700 transition-colors hover:bg-beige-50 hover:text-blue-700"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              @click="closeMobileMenu"
              class="mt-2 block rounded-lg bg-blue-600 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-blue-700"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile User Info -->
          <div v-else class="border-t border-beige-200 pt-3 mt-3">
            <div class="flex items-center space-x-3 px-2 py-1">
              <div class="w-8 h-8 rounded-full overflow-hidden">
                <img
                  v-if="user?.profile_image_url"
                  :src="user.profile_image_url"
                  :alt="`${user.first_name} ${user.last_name}`"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs"
                >
                  {{ getInitials() }}
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-900">
                  {{ user?.first_name }} {{ user?.last_name }}
                </p>
                <p class="text-xs text-neutral-500">
                  {{ user?.email }}
                </p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="mt-2 block w-full rounded-lg px-4 py-3 text-left font-bold text-red-600 transition-colors hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UserAvatar from './UserAvatar.vue'
import CartDropdown from './CartDropdown.vue'
import pcLogo from '@/assets/Images/PC Parser logo.png'

const router = useRouter()
const route = useRoute()
const user = ref(null)
const showMobileMenu = ref(false)
const accessToken = ref(localStorage.getItem('access_token'))
const showComponentsDropdown = ref(false)
const componentsDropdown = ref(null)

const isInMarketplace = computed(() => {
  return route.path.startsWith('/marketplace')
})

watch(accessToken, (newToken) => {
  if (newToken) {
    loadUserData()
  } else {
    user.value = null
  }
})

const isLoggedIn = computed(() => {
  return !!accessToken.value && !!user.value
})

const getInitials = () => {
  if (!user.value) return '?'
  const firstName = user.value.first_name || ''
  const lastName = user.value.last_name || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const loadUserData = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }
}

const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      await fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    user.value = null

    closeMobileMenu()
    router.push('/')
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleComponentsDropdown = () => {
  showComponentsDropdown.value = !showComponentsDropdown.value
}

const handleClickOutsideDropdown = (e) => {
  if (componentsDropdown.value && !componentsDropdown.value.contains(e.target)) {
    showComponentsDropdown.value = false
  }
}

onMounted(() => {
  loadUserData()

  document.addEventListener('click', handleClickOutsideDropdown)

  window.addEventListener('storage', (e) => {
    if (e.key === 'user' || e.key === 'access_token') {
      loadUserData()
    }
  })

  window.addEventListener('userLoggedIn', () => {
    accessToken.value = localStorage.getItem('access_token')
    loadUserData()
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideDropdown)
})
</script>
