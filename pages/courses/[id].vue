<template>
  <div v-if="course">
    <!-- Course Header -->
    <section class="pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Course Info -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <NuxtLink to="/courses" class="text-dark-400 hover:text-white transition-colors">
                课程中心
              </NuxtLink>
              <span class="text-dark-600">/</span>
              <span class="text-primary-400">{{ course.category }}</span>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              {{ course.title }}
            </h1>
            
            <p class="text-xl text-dark-300 mb-6">
              {{ course.description }}
            </p>

            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-6 mb-8">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-white font-semibold">{{ course.rating }}</span>
                <span class="text-dark-400">({{ course.reviews }}条评价)</span>
              </div>
              <div class="flex items-center gap-2 text-dark-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{{ course.students }}名学员</span>
              </div>
              <div class="flex items-center gap-2 text-dark-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ course.duration }}</span>
              </div>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="course.levelClass"
              >
                {{ course.level }}
              </span>
            </div>

            <!-- Instructor -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl">
                {{ course.instructor.initials }}
              </div>
              <div>
                <p class="text-white font-semibold">{{ course.instructor.name }}</p>
                <p class="text-dark-400 text-sm">{{ course.instructor.title }}</p>
              </div>
            </div>
          </div>

          <!-- Purchase Card -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-24">
              <!-- Preview -->
              <div class="relative aspect-video rounded-xl overflow-hidden mb-6">
                <div 
                  class="absolute inset-0 bg-gradient-to-br"
                  :class="course.gradient"
                ></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <button class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="mb-6">
                <div class="flex items-baseline gap-3">
                  <span class="text-4xl font-bold text-white">{{ course.price }}</span>
                  <span class="text-xl text-dark-500 line-through">{{ course.originalPrice }}</span>
                </div>
                <p class="text-accent-400 text-sm mt-1">限时优惠，立省{{ course.discount }}</p>
              </div>

              <!-- Actions -->
              <div class="space-y-3 mb-6">
                <button class="w-full btn-primary">
                  立即购买
                </button>
                <button class="w-full btn-secondary">
                  加入购物车
                </button>
              </div>

              <!-- Features -->
              <ul class="space-y-3">
                <li v-for="feature in purchaseFeatures" :key="feature" class="flex items-center gap-3 text-dark-300 text-sm">
                  <svg class="w-5 h-5 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Content -->
    <section class="py-16 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 space-y-12">
            <!-- What You'll Learn -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-white mb-6">你将学到什么</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div 
                  v-for="item in course.learningOutcomes" 
                  :key="item"
                  class="flex items-start gap-3"
                >
                  <svg class="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-dark-300">{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- Course Curriculum -->
            <div>
              <h2 class="text-2xl font-bold text-white mb-6">课程大纲</h2>
              <div class="space-y-4">
                <div 
                  v-for="(section, index) in course.curriculum" 
                  :key="section.title"
                  class="card overflow-hidden"
                >
                  <button 
                    @click="toggleSection(index)"
                    class="w-full p-5 flex items-center justify-between hover:bg-dark-800/30 transition-colors"
                  >
                    <div class="flex items-center gap-4">
                      <span class="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 font-semibold text-sm">
                        {{ index + 1 }}
                      </span>
                      <div class="text-left">
                        <h3 class="text-white font-semibold">{{ section.title }}</h3>
                        <p class="text-dark-500 text-sm">{{ section.lessons }}节课 · {{ section.duration }}</p>
                      </div>
                    </div>
                    <svg 
                      class="w-5 h-5 text-dark-400 transition-transform duration-300"
                      :class="{ 'rotate-180': openSections.includes(index) }"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div v-if="openSections.includes(index)" class="border-t border-dark-700/50">
                      <ul class="p-4 space-y-2">
                        <li 
                          v-for="lesson in section.items" 
                          :key="lesson.title"
                          class="flex items-center justify-between p-3 rounded-lg hover:bg-dark-800/30 transition-colors"
                        >
                          <div class="flex items-center gap-3">
                            <svg class="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-dark-300 text-sm">{{ lesson.title }}</span>
                          </div>
                          <span class="text-dark-500 text-sm">{{ lesson.duration }}</span>
                        </li>
                      </ul>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <!-- Requirements -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-white mb-6">学习要求</h2>
              <ul class="space-y-3">
                <li 
                  v-for="req in course.requirements" 
                  :key="req"
                  class="flex items-start gap-3"
                >
                  <svg class="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span class="text-dark-300">{{ req }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Course Stats -->
            <div class="card p-6">
              <h3 class="text-lg font-bold text-white mb-4">课程信息</h3>
              <ul class="space-y-4">
                <li class="flex items-center justify-between">
                  <span class="text-dark-400">课程时长</span>
                  <span class="text-white">{{ course.duration }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-dark-400">课时数量</span>
                  <span class="text-white">{{ course.totalLessons }}节</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-dark-400">难度等级</span>
                  <span class="text-white">{{ course.level }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-dark-400">更新时间</span>
                  <span class="text-white">{{ course.lastUpdated }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-dark-400">语言</span>
                  <span class="text-white">中文</span>
                </li>
              </ul>
            </div>

            <!-- Related Courses -->
            <div class="card p-6">
              <h3 class="text-lg font-bold text-white mb-4">相关课程</h3>
              <div class="space-y-4">
                <NuxtLink 
                  v-for="related in relatedCourses" 
                  :key="related.id"
                  :to="`/courses/${related.id}`"
                  class="flex gap-4 group"
                >
                  <div 
                    class="w-20 h-14 rounded-lg bg-gradient-to-br flex-shrink-0"
                    :class="related.gradient"
                  ></div>
                  <div>
                    <h4 class="text-white text-sm font-medium group-hover:text-primary-400 transition-colors line-clamp-2">
                      {{ related.title }}
                    </h4>
                    <p class="text-dark-500 text-xs mt-1">{{ related.price }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const courseId = computed(() => Number(route.params.id))

const openSections = ref<number[]>([0])

const toggleSection = (index: number) => {
  const idx = openSections.value.indexOf(index)
  if (idx > -1) {
    openSections.value.splice(idx, 1)
  } else {
    openSections.value.push(index)
  }
}

// Mock course data
const course = computed(() => ({
  id: courseId.value,
  title: 'Python人工智能入门',
  description: '从零开始学习Python编程，掌握AI基础知识，通过实战项目完成你的第一个智能应用。本课程将带你了解人工智能的核心概念和实际应用。',
  category: '人工智能',
  level: '入门',
  levelClass: 'bg-green-500/20 text-green-400',
  price: '¥1,299',
  originalPrice: '¥1,999',
  discount: '¥700',
  rating: 4.9,
  reviews: 486,
  students: 2847,
  duration: '48小时',
  totalLessons: 120,
  lastUpdated: '2024年3月',
  gradient: 'from-primary-500 to-primary-700',
  instructor: {
    name: '李明博士',
    initials: '李',
    title: '清华大学计算机系教授 · AI算法专家',
  },
  learningOutcomes: [
    '掌握Python编程基础语法和数据结构',
    '理解人工智能的核心概念和应用场景',
    '学会使用NumPy、Pandas进行数据处理',
    '掌握机器学习的基本算法原理',
    '完成3个实战AI项目',
    '获得AI领域职业发展指导',
    '学会使用TensorFlow构建神经网络',
    '掌握数据可视化技术',
  ],
  requirements: [
    '无需编程基础，零基础可学',
    '需要一台能上网的电脑（Windows/Mac/Linux均可）',
    '每周建议投入5-10小时学习时间',
    '保持好奇心和学习热情',
  ],
  curriculum: [
    {
      title: 'Python编程基础',
      lessons: 20,
      duration: '8小时',
      items: [
        { title: '课程介绍与环境搭建', duration: '15分钟' },
        { title: 'Python基础语法', duration: '30分钟' },
        { title: '变量与数据类型', duration: '25分钟' },
        { title: '条件语句与循环', duration: '35分钟' },
        { title: '函数与模块', duration: '40分钟' },
      ]
    },
    {
      title: '数据处理与分析',
      lessons: 25,
      duration: '10小时',
      items: [
        { title: 'NumPy数组操作', duration: '45分钟' },
        { title: 'Pandas数据处理', duration: '50分钟' },
        { title: '数据清洗实战', duration: '40分钟' },
        { title: '数据可视化基础', duration: '35分钟' },
      ]
    },
    {
      title: '机器学习入门',
      lessons: 30,
      duration: '12小时',
      items: [
        { title: '机器学习概述', duration: '30分钟' },
        { title: '监督学习算法', duration: '45分钟' },
        { title: '无监督学习算法', duration: '40分钟' },
        { title: '模型评估与优化', duration: '50分钟' },
      ]
    },
    {
      title: '深度学习基础',
      lessons: 25,
      duration: '10小时',
      items: [
        { title: '神经网络原理', duration: '40分钟' },
        { title: 'TensorFlow入门', duration: '45分钟' },
        { title: '构建你的第一个神经网络', duration: '55分钟' },
        { title: '图像识别实战', duration: '60分钟' },
      ]
    },
    {
      title: '综合项目实战',
      lessons: 20,
      duration: '8小时',
      items: [
        { title: '项目1：智能推荐系统', duration: '120分钟' },
        { title: '项目2：情感分析应用', duration: '90分钟' },
        { title: '项目3：图像分类器', duration: '100分钟' },
      ]
    },
  ]
}))

const purchaseFeatures = [
  '永久访问课程内容',
  '120节高清视频课程',
  '配套练习与作业',
  '专属学习社群',
  '讲师答疑服务',
  '结课证书',
]

const relatedCourses = [
  {
    id: 5,
    title: '机器学习基础',
    price: '¥2,299',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 4,
    title: 'Python数据科学',
    price: '¥1,899',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 7,
    title: '深度学习与神经网络',
    price: '¥2,699',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

useSeoMeta({
  title: () => `${course.value.title} - 智启教育`,
  description: () => course.value.description,
})
</script>

