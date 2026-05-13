<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-neutral-800 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'input-field',
        size === 'lg' && 'input-field-lg',
        error && 'border-red-500 focus:ring-red-200'
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600 font-medium">{{ error }}</p>
    <p v-if="hint" class="mt-1 text-sm text-neutral-500">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg'].includes(value)
  }
})

defineEmits(['update:modelValue'])
</script>
