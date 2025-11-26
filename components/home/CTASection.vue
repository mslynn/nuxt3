<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-900 to-secondary-900/30"></div>
    <div class="absolute inset-0 bg-mesh-gradient opacity-50"></div>
    
    <!-- Animated Elements -->
    <div class="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl animate-float-slow"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8">
          <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
          <span class="text-accent-400 text-sm font-medium">限时优惠 · 新用户专享</span>
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          开启你的
          <span class="text-gradient">AI学习之旅</span>
        </h2>
        
        <p class="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
          立即注册，免费体验价值299元的入门课程，让AI点亮孩子的未来
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <NuxtLink to="/register" class="btn-primary text-lg px-10 py-4">
            免费开始学习
            <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/courses" class="btn-secondary text-lg px-10 py-4">
            浏览课程
          </NuxtLink>
        </div>

        <!-- Trust Elements -->
        <div class="flex flex-wrap items-center justify-center gap-8 text-dark-400">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>免费试学</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>随时退款</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>终身学习</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>24/7支持</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

