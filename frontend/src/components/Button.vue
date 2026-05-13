<template>
  <button
    :class="[
      'font-semibold transition-all duration-200 inline-flex items-center justify-center space-x-2',
      sizeClasses,
      variantClasses,
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-sm rounded-md'
    case 'lg':
      return 'px-8 py-4 text-lg rounded-xl'
    default:
      return 'px-6 py-3 text-base rounded-lg'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'btn-primary'
    case 'secondary':
      return 'btn-secondary'
    case 'outline':
      return 'btn-outline'
    case 'ghost':
      return 'btn-ghost'
    case 'danger':
      return 'btn-danger'
    case 'success':
      return 'btn-success'
    default:
      return 'btn-primary'
  }
})
</script>
