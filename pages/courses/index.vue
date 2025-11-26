<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            课程中心
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            探索<span class="text-gradient">AI课程</span>
          </h1>
          <p class="text-xl text-dark-300">
            从入门到专业，系统化的课程体系助你掌握AI技能
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Courses -->
    <section class="py-12 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside class="lg:w-72 flex-shrink-0">
            <div class="card p-6 sticky top-24">
              <h3 class="text-lg font-bold text-white mb-4">筛选课程</h3>
              
              <!-- Search -->
              <div class="mb-6">
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="搜索课程..." 
                  class="input-field"
                >
              </div>

              <!-- Category Filter -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-dark-300 mb-3">课程分类</h4>
                <div class="space-y-2">
                  <label 
                    v-for="cat in categories" 
                    :key="cat.id"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input 
                      type="checkbox" 
                      :value="cat.id"
                      v-model="selectedCategories"
                      class="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
                    >
                    <span class="text-dark-400 group-hover:text-white transition-colors">
                      {{ cat.name }}
                    </span>
                    <span class="text-dark-600 text-xs ml-auto">({{ cat.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Level Filter -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-dark-300 mb-3">难度等级</h4>
                <div class="space-y-2">
                  <label 
                    v-for="level in levels" 
                    :key="level.id"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input 
                      type="checkbox" 
                      :value="level.id"
                      v-model="selectedLevels"
                      class="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
                    >
                    <span class="text-dark-400 group-hover:text-white transition-colors">
                      {{ level.name }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Price Filter -->
              <div>
                <h4 class="text-sm font-semibold text-dark-300 mb-3">价格范围</h4>
                <div class="space-y-2">
                  <label 
                    v-for="price in priceRanges" 
                    :key="price.id"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input 
                      type="radio" 
                      name="price"
                      :value="price.id"
                      v-model="selectedPrice"
                      class="w-4 h-4 border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
                    >
                    <span class="text-dark-400 group-hover:text-white transition-colors">
                      {{ price.name }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Reset Button -->
              <button 
                @click="resetFilters"
                class="w-full mt-6 py-2 text-sm text-dark-400 hover:text-white border border-dark-700 rounded-lg hover:border-dark-600 transition-colors"
              >
                重置筛选
              </button>
            </div>
          </aside>

          <!-- Course Grid -->
          <div class="flex-1">
            <!-- Sort Bar -->
            <div class="flex items-center justify-between mb-6">
              <p class="text-dark-400">
                共 <span class="text-white font-semibold">{{ filteredCourses.length }}</span> 门课程
              </p>
              <select 
                v-model="sortBy"
                class="bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-dark-300 focus:outline-none focus:border-primary-500"
              >
                <option value="popular">最受欢迎</option>
                <option value="newest">最新上线</option>
                <option value="rating">评分最高</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
              </select>
            </div>

            <!-- Courses -->
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <NuxtLink 
                v-for="course in filteredCourses" 
                :key="course.id"
                :to="`/courses/${course.id}`"
                class="card card-hover overflow-hidden group"
              >
                <!-- Course Image -->
                <div class="relative aspect-video overflow-hidden">
                  <div 
                    class="absolute inset-0 bg-gradient-to-br"
                    :class="course.gradient"
                  ></div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <!-- Badge -->
                  <div class="absolute top-3 left-3">
                    <span 
                      class="px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="course.levelClass"
                    >
                      {{ course.level }}
                    </span>
                  </div>
                </div>

                <!-- Course Content -->
                <div class="p-5">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs text-primary-400">{{ course.category }}</span>
                    <span class="w-1 h-1 rounded-full bg-dark-600"></span>
                    <span class="text-xs text-dark-500">{{ course.lessons }}课时</span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-1">
                    {{ course.title }}
                  </h3>
                  <p class="text-dark-400 text-sm mb-4 line-clamp-2">
                    {{ course.description }}
                  </p>
                  <div class="flex items-center justify-between pt-3 border-t border-dark-700/50">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm text-dark-300">{{ course.rating }}</span>
                    </div>
                    <span class="text-lg font-bold text-primary-400">{{ course.price }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div v-if="filteredCourses.length === 0" class="text-center py-16">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
                <svg class="w-10 h-10 text-dark-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">没有找到相关课程</h3>
              <p class="text-dark-400 mb-6">请尝试调整筛选条件</p>
              <button @click="resetFilters" class="btn-primary text-sm">
                重置筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '课程中心 - 智启教育',
  description: '探索智启教育的AI课程，从Python编程到机器学习，从入门到进阶，系统化学习人工智能。'
})

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedLevels = ref<string[]>([])
const selectedPrice = ref('all')
const sortBy = ref('popular')

const categories = [
  { id: 'ai', name: '人工智能', count: 15 },
  { id: 'robot', name: '机器人编程', count: 12 },
  { id: 'scratch', name: 'Scratch', count: 8 },
  { id: 'python', name: 'Python', count: 20 },
  { id: 'web', name: '网页开发', count: 10 },
]

const levels = [
  { id: 'beginner', name: '入门' },
  { id: 'intermediate', name: '中级' },
  { id: 'advanced', name: '进阶' },
]

const priceRanges = [
  { id: 'all', name: '全部' },
  { id: 'free', name: '免费' },
  { id: 'under-1000', name: '1000元以下' },
  { id: '1000-2000', name: '1000-2000元' },
  { id: 'above-2000', name: '2000元以上' },
]

const courses = [
  {
    id: 1,
    title: 'Python人工智能入门',
    description: '从零开始学习Python编程，掌握AI基础知识，完成你的第一个智能项目',
    category: '人工智能',
    categoryId: 'ai',
    level: '入门',
    levelId: 'beginner',
    levelClass: 'bg-green-500/20 text-green-400',
    lessons: 48,
    price: '¥1,299',
    priceNum: 1299,
    rating: 4.9,
    students: 2847,
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    id: 2,
    title: '机器人编程实战营',
    description: '动手搭建和编程控制机器人，培养工程思维和创新能力',
    category: '机器人编程',
    categoryId: 'robot',
    level: '中级',
    levelId: 'intermediate',
    levelClass: 'bg-yellow-500/20 text-yellow-400',
    lessons: 36,
    price: '¥1,699',
    priceNum: 1699,
    rating: 4.8,
    students: 1923,
    gradient: 'from-secondary-500 to-secondary-700',
  },
  {
    id: 3,
    title: 'Scratch创意编程',
    description: '适合6-12岁儿童的图形化编程课程，激发创造力和逻辑思维',
    category: 'Scratch',
    categoryId: 'scratch',
    level: '入门',
    levelId: 'beginner',
    levelClass: 'bg-green-500/20 text-green-400',
    lessons: 24,
    price: '¥899',
    priceNum: 899,
    rating: 4.9,
    students: 4521,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'Python数据科学',
    description: '深入学习数据分析与可视化，掌握NumPy、Pandas等核心工具',
    category: 'Python',
    categoryId: 'python',
    level: '进阶',
    levelId: 'advanced',
    levelClass: 'bg-red-500/20 text-red-400',
    lessons: 56,
    price: '¥1,899',
    priceNum: 1899,
    rating: 4.7,
    students: 1456,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 5,
    title: '机器学习基础',
    description: '系统学习机器学习算法原理与实践，为深度学习打下坚实基础',
    category: '人工智能',
    categoryId: 'ai',
    level: '进阶',
    levelId: 'advanced',
    levelClass: 'bg-red-500/20 text-red-400',
    lessons: 64,
    price: '¥2,299',
    priceNum: 2299,
    rating: 4.8,
    students: 982,
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 6,
    title: 'Python游戏开发',
    description: '用Python创建有趣的游戏，在玩乐中学习编程的核心概念',
    category: 'Python',
    categoryId: 'python',
    level: '中级',
    levelId: 'intermediate',
    levelClass: 'bg-yellow-500/20 text-yellow-400',
    lessons: 32,
    price: '¥1,199',
    priceNum: 1199,
    rating: 4.9,
    students: 2134,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 7,
    title: '深度学习与神经网络',
    description: '深入理解神经网络原理，掌握TensorFlow和PyTorch框架',
    category: '人工智能',
    categoryId: 'ai',
    level: '进阶',
    levelId: 'advanced',
    levelClass: 'bg-red-500/20 text-red-400',
    lessons: 72,
    price: '¥2,699',
    priceNum: 2699,
    rating: 4.9,
    students: 756,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 8,
    title: '网页开发入门',
    description: '学习HTML、CSS和JavaScript，创建你的第一个网站',
    category: '网页开发',
    categoryId: 'web',
    level: '入门',
    levelId: 'beginner',
    levelClass: 'bg-green-500/20 text-green-400',
    lessons: 40,
    price: '¥999',
    priceNum: 999,
    rating: 4.8,
    students: 3245,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 9,
    title: '机器人传感器与控制',
    description: '学习各种传感器原理和机器人控制算法，实现智能避障和导航',
    category: '机器人编程',
    categoryId: 'robot',
    level: '中级',
    levelId: 'intermediate',
    levelClass: 'bg-yellow-500/20 text-yellow-400',
    lessons: 44,
    price: '¥1,599',
    priceNum: 1599,
    rating: 4.7,
    students: 1123,
    gradient: 'from-amber-500 to-orange-600',
  },
]

const filteredCourses = computed(() => {
  let result = [...courses]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(c => selectedCategories.value.includes(c.categoryId))
  }

  // Level filter
  if (selectedLevels.value.length > 0) {
    result = result.filter(c => selectedLevels.value.includes(c.levelId))
  }

  // Price filter
  if (selectedPrice.value !== 'all') {
    result = result.filter(c => {
      switch (selectedPrice.value) {
        case 'free': return c.priceNum === 0
        case 'under-1000': return c.priceNum < 1000
        case '1000-2000': return c.priceNum >= 1000 && c.priceNum <= 2000
        case 'above-2000': return c.priceNum > 2000
        default: return true
      }
    })
  }

  // Sort
  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => b.students - a.students)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'price-low':
      result.sort((a, b) => a.priceNum - b.priceNum)
      break
    case 'price-high':
      result.sort((a, b) => b.priceNum - a.priceNum)
      break
  }

  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedLevels.value = []
  selectedPrice.value = 'all'
  sortBy.value = 'popular'
}
</script>

