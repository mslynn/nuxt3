<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-dark-950"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
          名师团队
        </span>
        <h2 class="section-title">
          <span class="text-white">汇聚顶尖</span>
          <span class="text-gradient">教育专家</span>
        </h2>
        <p class="section-subtitle">
          来自清华、北大、MIT等世界顶尖学府的教育专家，为你的学习保驾护航
        </p>
      </div>

      <!-- Teachers Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="teacher in teachers" 
          :key="teacher.name"
          class="card card-hover p-6 text-center group"
        >
          <!-- Avatar -->
          <div class="relative w-32 h-32 mx-auto mb-6">
            <div 
              class="w-full h-full rounded-full bg-gradient-to-br"
              :class="teacher.gradient"
            ></div>
            <div class="absolute inset-2 rounded-full bg-dark-800 flex items-center justify-center">
              <span class="text-4xl font-bold text-gradient">{{ teacher.initials }}</span>
            </div>
            <!-- Badge -->
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-xs text-dark-300">
              {{ teacher.title }}
            </div>
          </div>

          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
            {{ teacher.name }}
          </h3>
          <p class="text-primary-400 text-sm mb-3">{{ teacher.role }}</p>
          <p class="text-dark-400 text-sm mb-4">{{ teacher.bio }}</p>

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
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <NuxtLink to="/teachers" class="btn-secondary">
          查看全部讲师
          <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const teachers = [
  {
    name: '李明博士',
    initials: '李',
    title: '清华大学',
    role: 'AI算法专家',
    bio: '前Google AI研究员，专注深度学习领域研究15年',
    courses: 12,
    students: '5.2k',
    rating: 4.9,
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    name: '王小红',
    initials: '王',
    title: '北京大学',
    role: '机器人专家',
    bio: 'ROS核心开发者，机器人教育推广先驱',
    courses: 8,
    students: '3.8k',
    rating: 4.8,
    gradient: 'from-secondary-400 to-secondary-600',
  },
  {
    name: '张伟教授',
    initials: '张',
    title: 'MIT',
    role: '计算机科学家',
    bio: 'ACM杰出科学家，Python教育专家',
    courses: 15,
    students: '8.1k',
    rating: 4.9,
    gradient: 'from-accent-400 to-accent-600',
  },
  {
    name: '陈思雨',
    initials: '陈',
    title: '斯坦福大学',
    role: '数据科学家',
    bio: '前Netflix数据团队负责人，机器学习实战派',
    courses: 10,
    students: '4.5k',
    rating: 4.8,
    gradient: 'from-orange-400 to-red-500',
  },
]
</script>

