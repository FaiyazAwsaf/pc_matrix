<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="surface-panel p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-neutral-900">Rate Seller</h3>
        <button @click="$emit('close')" class="text-neutral-400 hover:text-neutral-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Seller Info -->
      <div class="mb-4 p-3 bg-beige-50 rounded-lg">
        <h4 class="font-medium text-neutral-900">Rating Seller: {{ product.seller_name }}</h4>
        <p class="text-sm text-neutral-600">Product: {{ product.name }} • {{ product.category }}</p>
      </div>
      
      <!-- Rating Section -->
      <div class="mb-4">
        <label class="form-label">Your Rating for this Seller</label>
        <StarRating 
          v-model="rating"
          :interactive="true"
          :showText="false"
        />
        <p class="text-sm text-neutral-500 mt-1">Click on stars to rate the seller</p>
      </div>
      
      <!-- Review Section -->
      <div class="mb-6">
        <label class="form-label">Review the Seller (Optional)</label>
        <textarea
          v-model="review"
          rows="4"
          class="form-control"
          placeholder="Share your experience with this seller..."
        ></textarea>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="secondary-action px-4 py-2"
        >
          Cancel
        </button>
        <button
          @click="submitRating"
          :disabled="rating === 0 || submitting"
          class="primary-action px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ submitting ? 'Submitting...' : (existingRating ? 'Update Rating' : 'Submit Rating') }}
        </button>
      </div>
      
      <!-- Error Message -->
      <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import StarRating from './StarRating.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    required: true
  },
  existingRating: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'rating-submitted'])

const rating = ref(0)
const review = ref('')
const submitting = ref(false)
const error = ref('')

watch(() => props.existingRating, (newRating) => {
  if (newRating) {
    rating.value = newRating.rating
    review.value = newRating.review || ''
  } else {
    rating.value = 0
    review.value = ''
  }
}, { immediate: true })

watch(() => props.show, (newShow) => {
  if (!newShow) {
    error.value = ''
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD').format(price)
}

const submitRating = async () => {
  if (rating.value === 0) {
    error.value = 'Please select a rating'
    return
  }
  
  submitting.value = true
  error.value = ''
  
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      error.value = 'You must be logged in to rate a seller'
      submitting.value = false
      return
    }
    
    const requestData = {
      rating: rating.value,
      review: review.value
    }
    
    console.log('Submitting rating:', requestData)
    console.log('Seller ID:', props.product.seller)
    console.log('API URL:', `http://localhost:8000/api/marketplace/sellers/${props.product.seller}/ratings/create/`)
    
    const response = await axios.post(
      `http://localhost:8000/api/marketplace/sellers/${props.product.seller}/ratings/create/`,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('Rating response:', response.data)
    
    if (response.status === 200 || response.status === 201) {
      emit('rating-submitted')
      emit('close')
    }
  } catch (err) {
    console.error('Error submitting rating:', err)
    console.error('Error response:', err.response?.data)
    if (err.response?.status === 401) {
      error.value = 'You must be logged in to rate a seller'
    } else if (err.response?.status === 400) {
      error.value = err.response.data.error || 'Invalid rating data'
    } else {
      error.value = 'Failed to submit rating. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>
