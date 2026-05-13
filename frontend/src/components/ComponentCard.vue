<template>
  <div class="component-card surface-panel overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div class="relative">
      <img 
        :src="component.image || '/placeholder-component.png'" 
        :alt="component.name"
        class="w-full h-48 object-contain bg-beige-50 p-4"
      />
      <span 
        v-if="component.lowest_price && component.lowest_price.is_on_sale" 
        class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
      >
        On Sale
      </span>
    </div>
    
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase tracking-widest text-neutral-500">{{ component.category.name }}</span>
        <span class="text-xs font-bold text-blue-700">{{ component.manufacturer.name }}</span>
      </div>
      
      <h3 class="text-lg font-extrabold text-neutral-900 mb-1 truncate">{{ component.name }}</h3>
      <p class="text-sm text-neutral-600 mb-3 truncate">{{ component.model_number }}</p>
      
      <div v-if="component.lowest_price" class="flex justify-between items-end">
        <div>
          <p class="text-sm font-semibold text-neutral-500">Lowest Price:</p>
          <p class="text-xl font-bold text-blue-700">
            {{ component.lowest_price.price }} {{ component.lowest_price.currency }}
          </p>
          <p class="text-xs text-neutral-500">{{ component.lowest_price.vendor_name }}</p>
        </div>
        
        <div class="flex space-x-2">
          <button 
            @click="$emit('view-details', component)" 
            class="primary-action px-3 py-1 text-sm"
          >
            Details
          </button>
          <button 
            @click="$emit('add-to-compare', component)" 
            class="secondary-action px-3 py-1 text-sm"
          >
            Compare
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-2">
        <p class="text-neutral-500 text-sm">No price information available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  component: {
    type: Object,
    required: true
  }
});

defineEmits(['view-details', 'add-to-compare']);
</script>
