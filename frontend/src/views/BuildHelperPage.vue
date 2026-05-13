<template>
  <div class="page-shell">
    <main class="page-container max-w-5xl">
      <div class="surface-panel p-6 sm:p-8">
        <div class="mb-6 text-center">
          <p class="page-kicker">Build assistant</p>
          <h1 class="page-title">Build Your PC with AI</h1>
          <p class="page-subtitle">
            Ask about budgets, compatibility, upgrades, and part tradeoffs.
          </p>
        </div>

        <!-- Chat Box -->
        <div
          class="mb-4 h-[400px] overflow-y-auto rounded-xl border border-beige-200 bg-beige-50 p-4"
        >
          <div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
            <div v-if="msg.type === 'user'" class="text-right">
              <span class="inline-block max-w-xs rounded-xl bg-blue-600 px-3 py-2 text-white shadow-sm">
                {{ msg.text }}
              </span>
            </div>
            <div v-else class="text-left">
              <span
                class="inline-block max-w-xs whitespace-pre-wrap rounded-xl border border-beige-200 bg-white px-3 py-2 text-neutral-800 shadow-sm"
              >
                {{ msg.text }}
              </span>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="text-left">
            <span class="inline-block rounded-xl border border-beige-200 bg-white px-3 py-2 text-neutral-800 shadow-sm">
              Thinking...
            </span>
          </div>
        </div>

        <!-- Input -->
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="userInput"
            type="text"
            placeholder="Ask your build assistant..."
            class="form-control flex-1"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="primary-action px-5 py-2 disabled:opacity-50"
            :disabled="isLoading"
          >
            Send
          </button>
        </form>

        <!-- Prompt Suggestions -->
        <div class="mt-6">
          <p class="mb-2 text-sm font-bold text-neutral-700">Suggestions:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in suggestions"
              :key="s"
              @click="userInput = s"
              class="secondary-action px-3 py-1 text-sm"
              :disabled="isLoading"
            >
              {{ s }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userInput = ref('')
const isLoading = ref(false)
const messages = ref([
  {
    type: 'ai',
    text: 'Hi! I am your PC build assistant. Ask me anything like "Build me a PC for gaming under 100k BDT"',
  },
])

const suggestions = [
  'Build a gaming PC under 100k BDT',
  'Suggest parts for a programming rig',
  'Give me a silent build for office use',
  'Best budget GPU for 1080p gaming',
]

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = userInput.value
  messages.value.push({ type: 'user', text: userMessage })
  userInput.value = ''
  isLoading.value = true

  try {
    console.log('Sending request to:', '/api/builder/llmchat/')
    console.log('Message:', userMessage)

    const res = await axios.post('/api/builder/llmchat/', {
      message: userMessage,
    })

    console.log('Response:', res.data)
    messages.value.push({ type: 'ai', text: res.data.response })
  } catch (error) {
    console.error('Full error:', error)

    let errorMessage = 'Error connecting to AI backend.'

    if (error.response) {
      // Server responded with error status
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)

      if (error.response.data && error.response.data.error) {
        errorMessage = `Server Error: ${error.response.data.error}`
        if (error.response.data.details) {
          errorMessage += `\n\nDetails: ${error.response.data.details}`
        }
      } else {
        errorMessage = `Server Error (${error.response.status}): ${error.response.statusText}`
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Make sure Django backend is running on port 8000.'
    } else {
      // Something else happened
      errorMessage = `Request Error: ${error.message}`
    }

    messages.value.push({ type: 'ai', text: errorMessage })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
input::placeholder {
  color: #a0aec0;
}
</style>
