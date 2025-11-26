<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
            名师团队
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            汇聚全球<span class="text-gradient">顶尖教育专家</span>
          </h1>
          <p class="text-xl text-dark-300">
            来自清华、北大、MIT等世界顶尖学府的教育专家，为你的学习之旅保驾护航
          </p>
        </div>
      </div>
    </section>

    <!-- Teachers Grid -->
    <section class="py-16 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
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

        <!-- Teachers -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="teacher in filteredTeachers" 
            :key="teacher.name"
            class="card card-hover overflow-hidden group"
          >
            <!-- Header with gradient -->
            <div class="h-24 bg-gradient-to-br" :class="teacher.gradient"></div>
            
            <!-- Avatar -->
            <div class="relative -mt-12 px-6">
              <div class="w-24 h-24 rounded-full bg-dark-800 border-4 border-dark-900 flex items-center justify-center mx-auto">
                <span class="text-3xl font-bold text-gradient">{{ teacher.initials }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 pt-4 text-center">
              <h3 class="text-xl font-bold text-white mb-1">{{ teacher.name }}</h3>
              <p class="text-primary-400 text-sm mb-2">{{ teacher.role }}</p>
              <p class="text-dark-500 text-xs mb-4">{{ teacher.institution }}</p>
              <p class="text-dark-400 text-sm mb-6 line-clamp-3">{{ teacher.bio }}</p>

              <!-- Stats -->
              <div class="flex justify-center gap-6 pt-4 border-t border-dark-700/50">
                <div class="text-center">
                  <div class="text-lg font-bold text-white">{{ teacher.courses }}</div>
                  <div class="text-xs text-dark-500">课程</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-white">{{ teacher.students }}</div>
                  <div class="text-xs text-dark-500">学员</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-yellow-400">{{ teacher.rating }}</div>
                  <div class="text-xs text-dark-500">评分</div>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap justify-center gap-2 mt-4">
                <span 
                  v-for="tag in teacher.tags" 
                  :key="tag"
                  class="px-2 py-1 rounded-full bg-dark-800 text-dark-400 text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join as Teacher CTA -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-900 to-secondary-900/30"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="card p-12 max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            成为智启教育讲师
          </h2>
          <p class="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            如果你是AI、编程或教育领域的专家，欢迎加入我们的讲师团队，一起为下一代创造更好的教育
          </p>
          <div class="flex flex-wrap justify-center gap-6 mb-8">
            <div class="flex items-center gap-2 text-dark-400">
              <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>灵活的授课时间</span>
            </div>
            <div class="flex items-center gap-2 text-dark-400">
              <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>有竞争力的薪酬</span>
            </div>
            <div class="flex items-center gap-2 text-dark-400">
              <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>专业的制作团队</span>
            </div>
          </div>
          <button class="btn-primary">
            申请成为讲师
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '教师团队 - 智启教育',
  description: '认识智启教育的专业讲师团队，来自清华、北大、MIT等世界顶尖学府的教育专家。'
})

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部讲师' },
  { id: 'ai', name: '人工智能' },
  { id: 'robot', name: '机器人' },
  { id: 'python', name: 'Python' },
  { id: 'web', name: '网页开发' },
]

const teachers = [
  {
    name: '李明博士',
    initials: '李',
    role: 'AI算法专家',
    institution: '清华大学',
    categoryId: 'ai',
    bio: '前Google AI研究员，专注深度学习领域研究15年，发表顶级论文50+篇',
    courses: 12,
    students: '5.2k',
    rating: 4.9,
    gradient: 'from-primary-500 to-primary-700',
    tags: ['深度学习', '机器学习', 'TensorFlow'],
  },
  {
    name: '王小红',
    initials: '王',
    role: '机器人专家',
    institution: '北京大学',
    categoryId: 'robot',
    bio: 'ROS核心开发者，机器人教育推广先驱，曾主导多个国家级机器人项目',
    courses: 8,
    students: '3.8k',
    rating: 4.8,
    gradient: 'from-secondary-500 to-secondary-700',
    tags: ['ROS', '传感器', '控制系统'],
  },
  {
    name: '张伟教授',
    initials: '张',
    role: '计算机科学家',
    institution: 'MIT',
    categoryId: 'python',
    bio: 'ACM杰出科学家，Python教育专家，畅销书《Python编程艺术》作者',
    courses: 15,
    students: '8.1k',
    rating: 4.9,
    gradient: 'from-accent-500 to-accent-700',
    tags: ['Python', '算法', '数据结构'],
  },
  {
    name: '陈思雨',
    initials: '陈',
    role: '数据科学家',
    institution: '斯坦福大学',
    categoryId: 'ai',
    bio: '前Netflix数据团队负责人，机器学习实战派，专注推荐系统研究',
    courses: 10,
    students: '4.5k',
    rating: 4.8,
    gradient: 'from-orange-500 to-red-500',
    tags: ['数据分析', '推荐系统', 'Pandas'],
  },
  {
    name: '刘博',
    initials: '刘',
    role: '神经网络专家',
    institution: '浙江大学',
    categoryId: 'ai',
    bio: '专注于计算机视觉研究，开发多个开源深度学习框架',
    courses: 6,
    students: '2.8k',
    rating: 4.7,
    gradient: 'from-violet-500 to-purple-700',
    tags: ['PyTorch', 'CNN', '图像识别'],
  },
  {
    name: '赵老师',
    initials: '赵',
    role: '游戏开发专家',
    institution: '北京邮电大学',
    categoryId: 'python',
    bio: '10年游戏开发经验，擅长将编程知识融入游戏化教学',
    courses: 9,
    students: '4.1k',
    rating: 4.9,
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Pygame', '游戏设计', '创意编程'],
  },
  {
    name: '孙晓芳',
    initials: '孙',
    role: '前端专家',
    institution: '上海交通大学',
    categoryId: 'web',
    bio: '前字节跳动前端架构师，Vue.js核心贡献者',
    courses: 11,
    students: '5.6k',
    rating: 4.8,
    gradient: 'from-rose-500 to-pink-600',
    tags: ['Vue.js', 'React', 'TypeScript'],
  },
  {
    name: '周明远',
    initials: '周',
    role: 'IoT专家',
    institution: '哈尔滨工业大学',
    categoryId: 'robot',
    bio: '物联网技术专家，Arduino和树莓派教育课程开创者',
    courses: 7,
    students: '2.3k',
    rating: 4.7,
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Arduino', '树莓派', '传感器'],
  },
]

const filteredTeachers = computed(() => {
  if (activeCategory.value === 'all') return teachers
  return teachers.filter(t => t.categoryId === activeCategory.value)
})
</script>

