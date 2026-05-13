<template>
  <div class="page-shell">
    <div class="hero-band py-10 text-center">
      <p class="page-kicker">Components</p>
      <h1 class="page-title">Choose Memory</h1>
      <p class="page-subtitle">Filter RAM by type, capacity, frequency, and price.</p>
    </div>

    <div class="page-container grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Filters -->
      <aside class="surface-panel p-5 space-y-6">
        <div>
          <h2 class="form-label">PRICE</h2>
          <input type="range" min="20" max="500" v-model="filters.price" class="w-full" />
          <p class="text-sm">Up to ${{ filters.price }}</p>
        </div>

        <div>
          <h2 class="form-label">MANUFACTURER</h2>
          <div class="space-y-1">
            <div v-for="brand in brandOptions" :key="brand">
              <input type="checkbox" :id="brand" v-model="filters.manufacturer" :value="brand" />
              <label :for="brand" class="ml-2">{{ brand }}</label>
            </div>
          </div>
        </div>

        <div>
          <h2 class="form-label">RATING</h2>
          <div class="space-y-1">
            <div v-for="star in [5,4,3,2,1]" :key="star">
              <input type="checkbox" :id="'star-' + star" v-model="filters.rating" :value="star" />
              <label :for="'star-' + star" class="ml-2">{{ star }} stars & up</label>
            </div>
          </div>
        </div>

        <div>
          <h2 class="form-label">MEMORY TYPE</h2>
          <select v-model="filters.type" class="form-control">
            <option value="">All</option>
            <option value="DDR3">DDR3</option>
            <option value="DDR4">DDR4</option>
            <option value="DDR5">DDR5</option>
          </select>
        </div>

        <div>
          <h2 class="form-label">CAPACITY</h2>
          <select v-model="filters.capacity" class="form-control">
            <option value="">All</option>
            <option value="4">4GB</option>
            <option value="8">8GB</option>
            <option value="16">16GB</option>
            <option value="32">32GB</option>
          </select>
        </div>
      </aside>

      <!-- Table -->
      <section class="md:col-span-3 overflow-x-auto">
        <div class="flex justify-between mb-4 items-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Memory"
            class="form-control w-full max-w-md"
          />
          <button class="primary-action ml-4 px-4 py-2">Add From Selection</button>
        </div>

        <div class="surface-panel overflow-hidden">
        <table class="data-table min-w-full text-sm">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">IMAGE</th>
              <th class="px-4 py-2 text-left">NAME</th>
              <th class="px-4 py-2 text-left">TYPE</th>
              <th class="px-4 py-2 text-left">CAPACITY</th>
              <th class="px-4 py-2 text-left">FREQUENCY</th>
              <th class="px-4 py-2 text-left">RATING</th>
              <th class="px-4 py-2 text-left">PRICE</th>
              <th class="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ram in filteredMemory" :key="ram.name">
              <td class="px-4 py-2"><img :src="ram.image" alt="ram image" class="w-16 h-10 object-contain" /></td>
              <td class="px-4 py-2">{{ ram.name }}</td>
              <td class="px-4 py-2">{{ ram.type }}</td>
              <td class="px-4 py-2">{{ ram.capacity }}GB</td>
              <td class="px-4 py-2">{{ ram.frequency }}MHz</td>
              <td class="px-4 py-2">{{ ram.rating }} ⭐</td>
              <td class="px-4 py-2">${{ ram.price }}</td>
              <td class="px-4 py-2">
                <button class="primary-action px-3 py-1 text-sm">Add</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filters = ref({
  price: 500,
  manufacturer: [],
  rating: [],
  type: '',
  capacity: ''
})

const brandOptions = ['Corsair', 'G.Skill', 'Kingston', 'TeamGroup']

const memoryList = ref([
  {
    name: 'Corsair Vengeance LPX',
    type: 'DDR4',
    capacity: 16,
    frequency: 3200,
    rating: 5,
    manufacturer: 'Corsair',
    price: 89,
    image: 'https://via.placeholder.com/100x40?text=RAM1'
  },
  {
    name: 'G.Skill Ripjaws V',
    type: 'DDR4',
    capacity: 8,
    frequency: 3000,
    rating: 4,
    manufacturer: 'G.Skill',
    price: 45,
    image: 'https://via.placeholder.com/100x40?text=RAM2'
  }
])

const filteredMemory = computed(() => {
  return memoryList.value.filter(m => {
    return (
      (!filters.value.manufacturer.length || filters.value.manufacturer.includes(m.manufacturer)) &&
      (!filters.value.rating.length || filters.value.rating.some(r => m.rating >= r)) &&
      (!filters.value.type || filters.value.type === m.type) &&
      (!filters.value.capacity || parseInt(filters.value.capacity) === m.capacity) &&
      m.price <= filters.value.price &&
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})
</script>
