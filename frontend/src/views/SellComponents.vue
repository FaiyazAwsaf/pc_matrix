<template>
  <div class="page-shell">
    <div class="page-container max-w-4xl">
      <header class="page-header text-center">
        <p class="page-kicker">Marketplace</p>
        <h1 class="page-title">Sell Your Product</h1>
        <p class="page-subtitle">Create a used component listing with the same clean PC Parser theme.</p>
      </header>

      <div class="surface-panel p-6 sm:p-8">

    <!-- Select Product Type -->
    <div class="mb-6">
      <label class="form-label">Select Product Type:</label>
      <select v-model="productType" class="form-control">
        <option value="">-- Select --</option>
        <option value="monitor">Monitor</option>
        <option value="ram">RAM</option>
      </select>
    </div>

    <!-- Upload Image -->
    <div class="mb-6">
      <label class="form-label">Upload Image:</label>
      <input type="file" @change="handleImageUpload" accept="image/*" class="form-control" />
      <div v-if="imagePreview" class="mt-4">
        <img :src="imagePreview" alt="Preview" class="max-w-sm rounded-xl border border-beige-200 shadow-sm" />
      </div>
    </div>

    <!-- Monitor Form -->
    <div v-if="productType === 'monitor'" class="grid grid-cols-1 gap-4">
      <input
        v-model="form.brand"
        type="text"
        placeholder="Brand"
        class="form-control"
      />
      <input
        v-model="form.screenSize"
        type="text"
        placeholder="Screen Size (e.g., 24 inch)"
        class="form-control"
      />
      <input
        v-model="form.refreshRate"
        type="text"
        placeholder="Refresh Rate (e.g., 144Hz)"
        class="form-control"
      />
      <input
        v-model="form.panelType"
        type="text"
        placeholder="Panel Type (e.g., IPS, VA)"
        class="form-control"
      />
    </div>

    <!-- RAM Form -->
    <div v-if="productType === 'ram'" class="grid grid-cols-1 gap-4">
      <input
        v-model="form.brand"
        type="text"
        placeholder="Brand"
        class="form-control"
      />
      <input
        v-model="form.name"
        type="text"
        placeholder="Model Name"
        class="form-control"
      />
      <input
        v-model="form.capacity"
        type="text"
        placeholder="Capacity (e.g., 8GB, 16GB)"
        class="form-control"
      />
      <select v-model="form.ddrType" class="form-control">
        <option value="">Select DDR Type</option>
        <option value="DDR3">DDR3</option>
        <option value="DDR4">DDR4</option>
        <option value="DDR5">DDR5</option>
      </select>
    </div>

    <!-- Submit Button -->
    <div class="mt-8 text-center">
      <button
        @click="submitForm"
        class="primary-action px-6 py-3"
      >
        Submit Product
      </button>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const productType = ref('')
const imagePreview = ref(null)
const form = ref({
  brand: '',
  screenSize: '',
  refreshRate: '',
  panelType: '',
  name: '',
  capacity: '',
  ddrType: '',
})

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
  }
}

function submitForm() {
  console.log('Submitting:', {
    type: productType.value,
    image: imagePreview.value,
    ...form.value,
  })
  alert('Product submitted!')
  // Here you would typically send form data to the backend
}
</script>
