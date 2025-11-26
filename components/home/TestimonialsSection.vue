<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
    <div class="absolute top-1/2 left-0 w-1/2 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
    <div class="absolute top-1/2 right-0 w-1/2 h-96 bg-secondary-500/5 rounded-full blur-3xl -translate-y-1/2"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-4">
          学员评价
        </span>
        <h2 class="section-title">
          <span class="text-white">听听他们怎么说</span>
        </h2>
        <p class="section-subtitle">
          来自全国各地学员和家长的真实反馈
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.name"
          class="card p-8 relative"
        >
          <!-- Quote Icon -->
          <div class="absolute top-6 right-6 text-dark-700">
            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <!-- Rating -->
          <div class="flex gap-1 mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <!-- Content -->
          <p class="text-dark-300 leading-relaxed mb-6">
            "{{ testimonial.content }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-4">
            <div 
              class="w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold"
              :class="testimonial.gradient"
            >
              {{ testimonial.initials }}
            </div>
            <div>
              <div class="text-white font-semibold">{{ testimonial.name }}</div>
              <div class="text-dark-500 text-sm">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: '张先生',
    initials: '张',
    role: '学员家长',
    content: '孩子在这里学习Python已经半年了，从完全零基础到现在能独立完成小项目，进步非常明显。老师很专业，课程设计也很科学。',
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    name: '小明同学',
    initials: '明',
    role: '12岁学员',
    content: '我最喜欢机器人编程课了！老师讲得特别有趣，我已经能让机器人跳舞了！以后我要成为一名AI工程师！',
    gradient: 'from-secondary-400 to-secondary-600',
  },
  {
    name: '李女士',
    initials: '李',
    role: '学员家长',
    content: '选择智启教育是正确的决定。孩子不仅学会了编程，更重要的是培养了逻辑思维能力，对其他科目的学习也有很大帮助。',
    gradient: 'from-accent-400 to-accent-600',
  },
  {
    name: '王同学',
    initials: '王',
    role: '15岁学员',
    content: '机器学习课程让我打开了新世界的大门！虽然有些难度，但李明博士讲得深入浅出，现在我已经能理解很多AI概念了。',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    name: '刘先生',
    initials: '刘',
    role: '学员家长',
    content: '平台的学习追踪系统很棒，我能随时了解孩子的学习进度。AI助教功能也很实用，孩子遇到问题随时能得到解答。',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    name: '小红同学',
    initials: '红',
    role: '10岁学员',
    content: 'Scratch课程太好玩了！我做了好多小游戏，还分享给同学们玩。现在我是班里的"小程序员"！',
    gradient: 'from-pink-400 to-rose-500',
  },
]
</script>

