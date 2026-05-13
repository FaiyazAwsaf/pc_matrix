<template>
  <div class="auth-shell">
    <div class="auth-card">
        <div class="mb-8 text-center">
          <p class="page-kicker">Email verification</p>
          <h2 class="page-title">Verify Your Email</h2>
        </div>
        <p class="text-center text-sm font-medium text-neutral-600 mb-8 leading-relaxed">
          We've sent a 6-digit verification code to your email address. 
          Please enter it below to verify your account.
        </p>
        
        <form @submit.prevent="handleVerification" class="space-y-6">
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
            <label for="token" class="form-label">Verification Code</label>
            <input
              type="text"
              id="token"
              v-model="form.token"
              :class="[
                'form-control text-center text-lg font-semibold tracking-widest',
                errors.token ? 'border-red-500' : ''
              ]"
              placeholder="Enter 6-digit code"
              maxlength="6"
              pattern="[0-9]{6}"
              required
            />
            <span v-if="errors.token" class="text-red-500 text-sm mt-1 block">{{ errors.token }}</span>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="primary-action w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? 'Verifying...' : 'Verify Email' }}
          </button>
        </form>

        <div v-if="message" :class="[
          'mt-4 p-3 rounded-md text-center text-sm',
          messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        ]">
          {{ message }}
        </div>

        <div class="mt-6 text-center">
          <button 
            @click="resendCode" 
            :disabled="resendLoading || resendCooldown > 0"
            class="text-sm font-bold text-blue-700 underline hover:text-blue-800 disabled:text-neutral-400 disabled:no-underline disabled:cursor-not-allowed"
          >
            {{ resendLoading ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
          </button>
        </div>

        <div class="mt-6 text-center space-y-2">
          <p class="text-sm font-medium text-neutral-600">
            Remember your password? 
            <router-link to="/login" class="font-bold text-blue-700 hover:text-blue-800">Login</router-link>
          </p>
          <p class="text-sm font-medium text-neutral-600">
            Need to create an account? 
            <router-link to="/register" class="font-bold text-blue-700 hover:text-blue-800">Register</router-link>
          </p>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const resendLoading = ref(false)
const message = ref('')
const messageType = ref('')
const resendCooldown = ref(0)
let cooldownInterval = null

const form = reactive({
  email: '',
  token: ''
})

const errors = reactive({
  email: '',
  token: ''
})

const clearErrors = () => {
  errors.email = ''
  errors.token = ''
  message.value = ''
}

const startCooldown = () => {
  resendCooldown.value = 60
  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval)
    }
  }, 1000)
}

const handleVerification = async () => {
  clearErrors()
  loading.value = true

  try {
    const response = await fetch('http://localhost:8000/api/auth/verify-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (response.ok) {
      message.value = data.message
      messageType.value = 'success'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      if (data.error) {
        message.value = data.error
        messageType.value = 'error'
      } else {
        Object.keys(data).forEach(key => {
          if (errors.hasOwnProperty(key)) {
            errors[key] = Array.isArray(data[key]) ? data[key][0] : data[key]
          }
        })
      }
    }
  } catch (error) {
    message.value = 'Network error. Please try again.'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (!form.email) {
    message.value = 'Please enter your email address first.'
    messageType.value = 'error'
    return
  }

  clearErrors()
  resendLoading.value = true

  try {
    const response = await fetch('http://localhost:8000/api/auth/resend-verification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: form.email })
    })

    const data = await response.json()

    if (response.ok) {
      message.value = data.message
      messageType.value = 'success'
      startCooldown()
    } else {
      message.value = data.error || 'Failed to resend verification code.'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = 'Network error. Please try again.'
    messageType.value = 'error'
  } finally {
    resendLoading.value = false
  }
}

onMounted(() => {
  if (route.query.email) {
    form.email = route.query.email
  }
})

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
})
</script>
