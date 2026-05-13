<template>
  <span :class="['badge', variantClasses]">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'beige', 'green', 'red', 'teal', 'orange'].includes(value)
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'beige':
      return 'badge-beige'
    case 'green':
      return 'badge-green'
    case 'red':
      return 'badge-red'
    case 'teal':
      return 'badge-teal'
    case 'orange':
      return 'badge bg-orange-100 text-orange-800 border border-orange-300'
    default:
      return 'badge-blue'
  }
})
</script>
