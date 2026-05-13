<template>
  <router-link
    :to="to"
    :class="[
      'block px-4 py-3 font-semibold rounded-lg transition-all duration-200 border-l-4',
      active
        ? 'bg-blue-50 text-blue-600 border-l-blue-600'
        : 'text-neutral-700 hover:text-blue-600 hover:bg-beige-100 border-l-transparent hover:border-l-blue-600'
    ]"
    @click="$emit('click')"
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

defineEmits(['click'])
</script>
