<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-dark-900 to-secondary-900/20"></div>
    
    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="text-center group"
        >
          <div class="relative inline-block mb-4">
            <div 
              class="text-5xl md:text-6xl font-bold font-display"
              :class="stat.colorClass"
            >
              <span ref="counterRefs">{{ stat.value }}</span>{{ stat.suffix }}
            </div>
            <div 
              class="absolute -inset-4 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
              :class="stat.bgClass"
            ></div>
          </div>
          <p class="text-dark-400 text-lg">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { 
    value: '50000', 
    suffix: '+', 
    label: '注册学员', 
    colorClass: 'text-primary-400',
    bgClass: 'bg-primary-400'
  },
  { 
    value: '200', 
    suffix: '+', 
    label: '精品课程', 
    colorClass: 'text-secondary-400',
    bgClass: 'bg-secondary-400'
  },
  { 
    value: '100', 
    suffix: '+', 
    label: '专业讲师', 
    colorClass: 'text-accent-400',
    bgClass: 'bg-accent-400'
  },
  { 
    value: '98', 
    suffix: '%', 
    label: '学员好评', 
    colorClass: 'text-yellow-400',
    bgClass: 'bg-yellow-400'
  },
]
</script>

