<template>
  <div class="min-h-screen bg-beige-50 text-neutral-900">
    <section class="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-beige-50 text-neutral-950">
      <img
        :src="pcBuildImg"
        alt="Custom PC build"
        class="absolute inset-0 h-full w-full object-cover object-right opacity-35"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-beige-50 via-beige-50/95 to-white/50"></div>
      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-beige-50 to-transparent"></div>

      <div class="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            Bangladesh PC parts, prices, and builds
          </p>
          <h1 class="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            PC Parser
          </h1>
          <p class="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
            Compare components, inspect used listings, and plan a compatible build without jumping
            between vendor tabs.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link
              to="/components"
              class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-950/30 transition-all hover:bg-blue-500"
            >
              Browse Components
            </router-link>
            <router-link
              to="/builder"
              class="inline-flex items-center justify-center rounded-xl border border-beige-300 bg-white/80 px-6 py-3 font-bold text-neutral-900 shadow-sm backdrop-blur transition-all hover:bg-white"
            >
              Build a PC
            </router-link>
            <router-link
              v-if="!isLoggedIn"
              to="/register"
              class="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 font-bold text-neutral-950 shadow-lg shadow-teal-950/20 transition-all hover:bg-teal-400"
            >
              Create Account
            </router-link>
          </div>

          <div class="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-beige-200 rounded-xl border border-beige-200 bg-white/75 text-center shadow-sm backdrop-blur">
            <div class="px-3 py-4">
              <p class="text-2xl font-extrabold">8</p>
              <p class="mt-1 text-xs font-bold uppercase tracking-widest text-blue-700">Categories</p>
            </div>
            <div class="px-3 py-4">
              <p class="text-2xl font-extrabold">Live</p>
              <p class="mt-1 text-xs font-bold uppercase tracking-widest text-blue-700">Pricing</p>
            </div>
            <div class="px-3 py-4">
              <p class="text-2xl font-extrabold">AI</p>
              <p class="mt-1 text-xs font-bold uppercase tracking-widest text-blue-700">Builds</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-14">
      <div class="container-main">
        <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p class="text-sm font-extrabold uppercase tracking-widest text-blue-700">Workflows</p>
            <h2 class="section-title mt-2">Start with the task, not the tab list</h2>
          </div>
          <router-link
            to="/marketplace"
            class="inline-flex w-fit items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100"
          >
            Open Marketplace
          </router-link>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <div
            class="card cursor-pointer border-l-4 border-l-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg"
            @click="toggleProductDropdown"
          >
            <p class="mb-4 text-sm font-extrabold uppercase tracking-widest text-blue-700">
              Compare
            </p>
            <h3 class="text-xl font-extrabold text-neutral-900">Component price desk</h3>
            <p class="mt-3 text-neutral-600">
              Browse CPUs, GPUs, memory, monitors, and core parts with filters built for fast
              comparison.
            </p>
          </div>

          <div
            @click="router.push('/builder')"
            class="card cursor-pointer border-l-4 border-l-teal-500 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <p class="mb-4 text-sm font-extrabold uppercase tracking-widest text-teal-700">
              Build
            </p>
            <h3 class="text-xl font-extrabold text-neutral-900">Compatibility assistant</h3>
            <p class="mt-3 text-neutral-600">
              Turn a budget and purpose into a parts list that is easier to evaluate before buying.
            </p>
          </div>

          <div
            @click="router.push('/marketplace')"
            class="card cursor-pointer border-l-4 border-l-orange-500 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <p class="mb-4 text-sm font-extrabold uppercase tracking-widest text-orange-700">
              Trade
            </p>
            <h3 class="text-xl font-extrabold text-neutral-900">Used parts marketplace</h3>
            <p class="mt-3 text-neutral-600">
              Inspect listings, message sellers, and keep second-hand parts alongside retail data.
            </p>
          </div>
        </div>

        <transition name="fade">
          <div
            v-if="showProductDropdown"
            class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <router-link
              v-for="item in productItems"
              :key="item.label"
              :to="getRouteForItem(item.label)"
              class="flex items-center gap-3 rounded-xl border border-beige-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <img :src="item.image" alt="" class="h-12 w-12 object-contain" />
              <p class="text-sm font-extrabold text-neutral-800">{{ item.label }}</p>
            </router-link>
          </div>
        </transition>
      </div>
    </section>

    <footer class="border-t border-beige-200 bg-white py-6 text-center text-sm font-semibold text-neutral-500">
      &copy; {{ new Date().getFullYear() }} PC Parser. Built for PC buyers in Bangladesh.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import pcBuildImg from '@/assets/Images/Pcbuild.png'
import cpuImg from '@/assets/Images/CPU.png'
import monitorImg from '@/assets/Images/Monitor.png'
import motherboardImg from '@/assets/Images/Motherboard.png'
import memoryImg from '@/assets/Images/Memory.png'
import storageImg from '@/assets/Images/Storage.png'
import gpuImg from '@/assets/Images/GPU.png'
import powersupplyImg from '@/assets/Images/Powersupply.png'
import caseImg from '@/assets/Images/Cases.png'

const router = useRouter()
const showProductDropdown = ref(false)
const user = ref(null)

const toggleProductDropdown = () => {
  showProductDropdown.value = !showProductDropdown.value
}

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('access_token') && !!user.value
})

const productItems = [
  { label: 'CPUs', image: cpuImg },
  { label: 'Monitor', image: monitorImg },
  { label: 'Motherboards', image: motherboardImg },
  { label: 'Power Supplies', image: powersupplyImg },
  { label: 'Memory', image: memoryImg },
  { label: 'Storage', image: storageImg },
  { label: 'GPU', image: gpuImg },
  { label: 'Cases', image: caseImg },
]

const getRouteForItem = (label) => {
  const routes = {
    CPUs: '/components/cpu',
    Monitor: '/components/monitor',
    Motherboards: '/components/motherboards',
    'Power Supplies': '/components/power-supplies',
    Memory: '/components/memory',
    Storage: '/components/storage',
    GPU: '/components/gpu',
    Cases: '/components/cases',
  }
  return routes[label] || '/'
}

const loadUserData = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch {
      localStorage.clear()
    }
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
