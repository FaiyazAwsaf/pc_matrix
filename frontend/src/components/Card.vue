<template>
  <div :class="['card', variantClasses]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'subtle'].includes(value)
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'elevated':
      return 'card-elevated'
    case 'subtle':
      return 'card-subtle'
    default:
      return ''
  }
})
</script>
