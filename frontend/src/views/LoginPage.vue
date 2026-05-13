<template>
  <div class="auth-shell">
    <div class="auth-card">
      <div class="mb-8 text-center">
        <p class="page-kicker">Welcome back</p>
        <h2 class="page-title">Login to PC Parser</h2>
        <p class="page-subtitle">Access your marketplace, chats, and saved build tools.</p>
      </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              :class="[ 
                'form-control',
                errors.email ? 'border-red-500' : ''
              ]"
              placeholder="Enter your email"
              required
            />
            <span v-if="errors.email" class="text-red-500 text-sm mt-1 block">{{ errors.email }}</span>
          </div>

          <div>
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              :class="[
                'form-control',
                errors.password ? 'border-red-500' : ''
              ]"
              placeholder="Enter your password"
              required
            />
            <span v-if="errors.password" class="text-red-500 text-sm mt-1 block">{{ errors.password }}</span>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="primary-action w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div v-if="message" :class="[
          'mt-4 p-3 rounded-md text-center text-sm',
          messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        ]">
          {{ message }}
        </div>

        <div class="mt-6 text-center space-y-2">
          <p class="text-sm font-medium text-neutral-600">
            Don't have an account? 
            <router-link to="/register" class="font-bold text-blue-700 hover:text-blue-800">Create Account</router-link>
          </p>
          <p class="text-sm font-medium text-neutral-600">
            Need to verify your email? 
            <router-link to="/verify-email" class="font-bold text-blue-700 hover:text-blue-800">Verify Email</router-link>
          </p>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const message = ref('')
const messageType = ref('')

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const clearErrors = () => {
  errors.email = ''
  errors.password = ''
  message.value = ''
}

const handleLogin = async () => {
  clearErrors()
  loading.value = true

  try {
    console.log('Login attempt with:', form)
    
    const response = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    console.log('Login response status:', response.status)
    const data = await response.json()
    console.log('Login response data:', data)

    if (response.ok) {
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Dispatch custom event to notify navbar of login
      window.dispatchEvent(new CustomEvent('userLoggedIn'))

      // Force update of navbar by triggering a storage-like event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'access_token',
        newValue: data.access_token,
        oldValue: null
      }))
      
      message.value = data.message
      messageType.value = 'success'
      
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      console.error('Login failed:', data)
      
      // Handle different types of error responses
      if (data.error) {
        message.value = data.error
        messageType.value = 'error'

        if (data.error.includes('Email not verified')) {
          setTimeout(() => {
            router.push('/verify-email')
          }, 2000)
        }
      } else if (data.non_field_errors) {
        // Handle authentication errors
        message.value = Array.isArray(data.non_field_errors) 
          ? data.non_field_errors[0] 
          : data.non_field_errors
        messageType.value = 'error'
      } else if (data.detail) {
        // Handle detail errors
        message.value = data.detail
        messageType.value = 'error'
      } else {
        // Handle field-specific errors
        let hasFieldErrors = false
        Object.keys(data).forEach(key => {
          if (errors.hasOwnProperty(key)) {
            errors[key] = Array.isArray(data[key]) ? data[key][0] : data[key]
            hasFieldErrors = true
          }
        })
        
        // If no field errors, show generic message
        if (!hasFieldErrors) {
          if (response.status === 400) {
            message.value = 'Invalid email or password. Please check your credentials and try again.'
          } else if (response.status === 401) {
            message.value = 'Invalid email or password.'
          } else {
            message.value = 'Login failed. Please try again.'
          }
          messageType.value = 'error'
        }
      }
    }
  } catch (error) {
    console.error('Network error:', error)
    message.value = 'Network error. Please try again.'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
