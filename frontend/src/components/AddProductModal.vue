<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0, 0, 0, 0.3);" @click="handleOverlayClick">
    <div class="surface-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4" @click.stop>
      <div class="flex justify-between items-center p-6 border-b border-beige-200">
        <h2 class="text-2xl font-bold text-neutral-800">Add Product</h2>
        <button @click="$emit('close')" class="text-neutral-400 hover:text-neutral-600 text-2xl font-bold w-8 h-8 flex items-center justify-center">
          &times;
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Product Name -->
        <div>
          <label for="name" class="form-label">Product Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter product name"
            class="form-control"
          />
        </div>
        
        <!-- Category and Condition -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="category" class="form-label">Category *</label>
            <select id="category" v-model="form.category" required class="form-control">
              <option value="">Select Category</option>
              <option value="CPU">CPU</option>
              <option value="RAM">RAM</option>
              <option value="Storage">Storage</option>
              <option value="Monitor">Monitor</option>
              <option value="Motherboard">Motherboard</option>
              <option value="PSU">PSU</option>
            </select>
          </div>
          
          <div>
            <label for="condition" class="form-label">Condition *</label>
            <select id="condition" v-model="form.condition" required class="form-control">
              <option value="">Select Condition</option>
              <option value="Used-Like New">Used-Like New</option>
              <option value="Used-Good">Used-Good</option>
              <option value="Used-Fair">Used-Fair</option>
            </select>
          </div>
        </div>

        <!-- Age and Warranty -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="age" class="form-label">Age/Usage *</label>
            <select id="age" v-model="form.age" required class="form-control">
              <option value="">Select Age</option>
              <option value="0-6months">Less than 6 months</option>
              <option value="6-12months">6-12 months</option>
              <option value="1-2years">1-2 years</option>
              <option value="2plus">2+ years</option>
            </select>
          </div>
          
          <div>
            <label for="warranty" class="form-label">Warranty *</label>
            <select id="warranty" v-model="form.warranty" required class="form-control">
              <option value="">Select Warranty</option>
              <option value="under">Under warranty</option>
              <option value="expired">Warranty expired</option>
              <option value="none">No warranty info</option>
            </select>
          </div>
        </div>

        <!-- Brand and Performance Tier -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="brand" class="form-label">Brand *</label>
            <select id="brand" v-model="form.brand" required class="form-control">
              <option value="">Select Brand</option>
              <option value="intel">Intel</option>
              <option value="amd">AMD</option>
              <option value="nvidia">NVIDIA</option>
              <option value="asus">ASUS</option>
              <option value="msi">MSI</option>
              <option value="corsair">Corsair</option>
              <option value="gigabyte">Gigabyte</option>
              <option value="evga">EVGA</option>
              <option value="samsung">Samsung</option>
              <option value="western-digital">Western Digital</option>
            </select>
          </div>
          
          <div>
            <label for="performance_tier" class="form-label">Performance Tier *</label>
            <select id="performance_tier" v-model="form.performance_tier" required class="form-control">
              <option value="">Select Tier</option>
              <option value="entry">Entry level</option>
              <option value="mid">Mid-range</option>
              <option value="high">High-end</option>
            </select>
          </div>
        </div>

        <!-- Box & Accessories and Price Type -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="box_accessories" class="form-label">Box & Accessories *</label>
            <select id="box_accessories" v-model="form.box_accessories" required class="form-control">
              <option value="">Select Status</option>
              <option value="box">Has original box</option>
              <option value="accessories">Has all accessories</option>
              <option value="missing">Missing items</option>
            </select>
          </div>
          
          <div>
            <label for="price_type" class="form-label">Price Type *</label>
            <select id="price_type" v-model="form.price_type" required class="form-control">
              <option value="">Select Type</option>
              <option value="fixed">Fixed price</option>
              <option value="negotiable">Price negotiable</option>
            </select>
          </div>
        </div>

        <!-- Availability and Compatibility -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="availability" class="form-label">Availability *</label>
            <select id="availability" v-model="form.availability" required class="form-control">
              <option value="">Select Availability</option>
              <option value="now">Available now</option>
              <option value="soon">Available soon</option>
            </select>
          </div>
          
          <div>
            <label for="compatibility" class="form-label">Compatibility</label>
            <select id="compatibility" v-model="form.compatibility" class="form-control">
              <option value="">Select Compatibility (Optional)</option>
              <option value="lga1700">LGA1700</option>
              <option value="am4">AM4</option>
              <option value="am5">AM5</option>
              <option value="ddr4">DDR4</option>
              <option value="ddr5">DDR5</option>
              <option value="atx">ATX</option>
              <option value="micro-atx">Micro-ATX</option>
              <option value="mini-itx">Mini-ITX</option>
            </select>
          </div>
        </div>
        
        <!-- Price -->
        <div>
          <label for="price" class="form-label">Price (৳) *</label>
          <input
            id="price"
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="Enter price in BDT"
            class="form-control"
          />
        </div>
        
        <!-- Description -->
        <div>
          <label for="description" class="form-label">Description *</label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="4"
            placeholder="Describe your product..."
            class="form-control resize-vertical"
          ></textarea>
        </div>
        
        <!-- Image Upload -->
        <div>
          <label for="image" class="form-label">Product Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="form-control"
          />
          <div v-if="imagePreview" class="mt-3">
            <img :src="imagePreview" alt="Preview" class="max-w-48 max-h-48 rounded-md object-cover" />
          </div>
        </div>
        
        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-beige-200">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="secondary-action px-6 py-2"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="loading" 
            class="success-action px-6 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Adding...' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['close', 'product-added'])

const loading = ref(false)
const imagePreview = ref(null)
const selectedImage = ref(null)

const form = reactive({
  name: '',
  category: '',
  condition: '',
  age: '',
  warranty: '',
  brand: '',
  performance_tier: '',
  box_accessories: '',
  price_type: 'fixed',
  availability: 'now',
  compatibility: '',
  price: '',
  description: '',
})

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', form.category)
    formData.append('condition', form.condition)
    formData.append('age', form.age)
    formData.append('warranty', form.warranty)
    formData.append('brand', form.brand)
    formData.append('performance_tier', form.performance_tier)
    formData.append('box_accessories', form.box_accessories)
    formData.append('price_type', form.price_type)
    formData.append('availability', form.availability)
    formData.append('compatibility', form.compatibility)
    formData.append('price', form.price)
    formData.append('description', form.description)
    
    if (selectedImage.value) {
      formData.append('image', selectedImage.value)
    }
    
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://localhost:8000/api/marketplace/products/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    
    if (response.ok) {
      emit('product-added')
    } else {
      const errorData = await response.json()
      console.error('Error adding product:', errorData)
      alert('Error adding product. Please try again.')
    }
  } catch (error) {
    console.error('Error adding product:', error)
    alert('Error adding product. Please try again.')
  } finally {
    loading.value = false
  }
}

const handleOverlayClick = () => {
  emit('close')
}
</script>
