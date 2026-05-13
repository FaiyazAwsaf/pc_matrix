<template>
  <router-link
    :to="to"
    :class="[
      'px-4 py-2 font-semibold rounded-lg transition-all duration-200',
      active
        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
        : 'text-neutral-700 hover:text-blue-600 hover:bg-beige-50'
    ]"
  >
    <slot />
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
