<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <span class="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-sm font-medium mb-4">
            精品课程
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            探索热门<span class="text-gradient">AI课程</span>
          </h2>
          <p class="text-dark-400 max-w-xl">
            从入门到进阶，系统化的课程体系助你成为AI时代的创新者
          </p>
        </div>
        <NuxtLink to="/courses" class="btn-secondary self-start lg:self-auto">
          查看全部课程
          <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Course Categories -->
      <div class="flex flex-wrap gap-3 mb-10">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :class="activeCategory === category.id 
            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
            : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50 hover:text-white'"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Courses Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="course in filteredCourses" 
          :key="course.id"
          class="card card-hover overflow-hidden group"
        >
          <!-- Course Image -->
          <div class="relative aspect-video overflow-hidden">
            <div 
              class="absolute inset-0 bg-gradient-to-br"
              :class="course.gradient"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="course.icon" class="w-20 h-20 text-white/80" />
            </div>
            <!-- Overlay -->
            <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <NuxtLink :to="`/courses/${course.id}`" class="btn-primary text-sm">
                了解详情
              </NuxtLink>
            </div>
            <!-- Badge -->
            <div class="absolute top-4 left-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="course.levelClass"
              >
                {{ course.level }}
              </span>
            </div>
            <!-- Price -->
            <div class="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span class="text-white font-bold">{{ course.price }}</span>
            </div>
          </div>

          <!-- Course Content -->
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs text-dark-400">{{ course.category }}</span>
              <span class="w-1 h-1 rounded-full bg-dark-600"></span>
              <span class="text-xs text-dark-400">{{ course.lessons }}课时</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {{ course.title }}
            </h3>
            <p class="text-dark-400 text-sm mb-4 line-clamp-2">
              {{ course.description }}
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-dark-700/50">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400"></div>
                <span class="text-sm text-dark-300">{{ course.instructor }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm text-dark-300">{{ course.rating }}</span>
                <span class="text-xs text-dark-500">({{ course.students }}人)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部课程' },
  { id: 'ai', name: '人工智能' },
  { id: 'robot', name: '机器人编程' },
  { id: 'scratch', name: 'Scratch' },
  { id: 'python', name: 'Python' },
]

// Icons
const AIIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
}

const RobotIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
}

const CodeIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
}

const PuzzleIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>`
}

const ChipIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>`
}

const DataIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>`
}

const courses = [
  {
    id: 1,
    title: 'Python人工智能入门',
    description: '从零开始学习Python编程，掌握AI基础知识，完成你的第一个智能项目',
    category: '人工智能',
    categoryId: 'ai',
    level: '入门',
    levelClass: 'bg-green-500/20 text-green-400',
    lessons: 48,
    price: '¥1,299',
    instructor: '李明博士',
    rating: 4.9,
    students: 2847,
    gradient: 'from-primary-500 to-primary-700',
    icon: AIIcon,
  },
  {
    id: 2,
    title: '机器人编程实战营',
    description: '动手搭建和编程控制机器人，培养工程思维和创新能力',
    category: '机器人编程',
    categoryId: 'robot',
    level: '中级',
    levelClass: 'bg-yellow-500/20 text-yellow-400',
    lessons: 36,
    price: '¥1,699',
    instructor: '王小明',
    rating: 4.8,
    students: 1923,
    gradient: 'from-secondary-500 to-secondary-700',
    icon: RobotIcon,
  },
  {
    id: 3,
    title: 'Scratch创意编程',
    description: '适合6-12岁儿童的图形化编程课程，激发创造力和逻辑思维',
    category: 'Scratch',
    categoryId: 'scratch',
    level: '入门',
    levelClass: 'bg-green-500/20 text-green-400',
    lessons: 24,
    price: '¥899',
    instructor: '张老师',
    rating: 4.9,
    students: 4521,
    gradient: 'from-orange-500 to-red-500',
    icon: PuzzleIcon,
  },
  {
    id: 4,
    title: 'Python数据科学',
    description: '深入学习数据分析与可视化，掌握NumPy、Pandas等核心工具',
    category: 'Python',
    categoryId: 'python',
    level: '进阶',
    levelClass: 'bg-red-500/20 text-red-400',
    lessons: 56,
    price: '¥1,899',
    instructor: '陈教授',
    rating: 4.7,
    students: 1456,
    gradient: 'from-cyan-500 to-blue-600',
    icon: DataIcon,
  },
  {
    id: 5,
    title: '机器学习基础',
    description: '系统学习机器学习算法原理与实践，为深度学习打下坚实基础',
    category: '人工智能',
    categoryId: 'ai',
    level: '进阶',
    levelClass: 'bg-red-500/20 text-red-400',
    lessons: 64,
    price: '¥2,299',
    instructor: '刘博士',
    rating: 4.8,
    students: 982,
    gradient: 'from-violet-500 to-purple-700',
    icon: ChipIcon,
  },
  {
    id: 6,
    title: 'Python游戏开发',
    description: '用Python创建有趣的游戏，在玩乐中学习编程的核心概念',
    category: 'Python',
    categoryId: 'python',
    level: '中级',
    levelClass: 'bg-yellow-500/20 text-yellow-400',
    lessons: 32,
    price: '¥1,199',
    instructor: '赵老师',
    rating: 4.9,
    students: 2134,
    gradient: 'from-emerald-500 to-teal-600',
    icon: CodeIcon,
  },
]

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') return courses
  return courses.filter(c => c.categoryId === activeCategory.value)
})
</script>

