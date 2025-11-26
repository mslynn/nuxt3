<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-hero-pattern">
      <div class="absolute inset-0 bg-mesh-gradient opacity-80"></div>
      
      <!-- Animated Grid -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(51, 166, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 166, 255, 0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      
      <!-- Floating Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl animate-float"></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
            <span class="text-primary-300 text-sm font-medium">2024年度最佳AI教育平台</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span class="text-white">用</span>
            <span class="text-gradient">AI</span>
            <span class="text-white">点亮</span>
            <br>
            <span class="text-white">未来教育之路</span>
          </h1>
          
          <p class="text-xl text-dark-300 max-w-xl mx-auto lg:mx-0 mb-10 animate-slide-up animate-delay-200">
            融合人工智能与创新教育理念，为6-18岁青少年打造沉浸式编程学习体验，培养面向未来的科技创新人才
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animate-delay-300">
            <NuxtLink to="/courses" class="btn-primary">
              <span>探索课程</span>
              <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <button @click="openDemo" class="btn-secondary">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>观看演示</span>
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="mt-12 pt-8 border-t border-dark-700/50 animate-fade-in animate-delay-500">
            <p class="text-dark-500 text-sm mb-4">受到众多学校和机构的信赖</p>
            <div class="flex items-center justify-center lg:justify-start gap-8 opacity-60">
              <div class="text-dark-400 font-display font-bold text-lg">清华附中</div>
              <div class="text-dark-400 font-display font-bold text-lg">北大附中</div>
              <div class="text-dark-400 font-display font-bold text-lg">人大附中</div>
              <div class="text-dark-400 font-display font-bold text-lg hidden sm:block">深圳中学</div>
            </div>
          </div>
        </div>

        <!-- 3D Visual -->
        <div class="relative hidden lg:block animate-fade-in animate-delay-400">
          <div class="relative w-full aspect-square max-w-lg mx-auto">
            <!-- Main Card -->
            <div class="absolute inset-0 card p-8 animate-float">
              <div class="relative h-full rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 p-6 overflow-hidden">
                <!-- Code Preview -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2 mb-4">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="ml-2 text-dark-500 text-sm">ai_learning.py</span>
                  </div>
                  <code class="block text-sm">
                    <span class="text-secondary-400">import</span> <span class="text-accent-400">tensorflow</span> <span class="text-secondary-400">as</span> <span class="text-white">tf</span>
                  </code>
                  <code class="block text-sm">
                    <span class="text-secondary-400">from</span> <span class="text-accent-400">robot_sdk</span> <span class="text-secondary-400">import</span> <span class="text-white">Robot</span>
                  </code>
                  <code class="block text-sm mt-4">
                    <span class="text-secondary-400">class</span> <span class="text-primary-400">AIRobot</span><span class="text-white">(Robot):</span>
                  </code>
                  <code class="block text-sm pl-4">
                    <span class="text-secondary-400">def</span> <span class="text-primary-400">learn</span><span class="text-white">(self, data):</span>
                  </code>
                  <code class="block text-sm pl-8">
                    <span class="text-white">model = tf.keras.Sequential()</span>
                  </code>
                  <code class="block text-sm pl-8">
                    <span class="text-dark-500"># 让机器人学会思考...</span>
                  </code>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 card flex items-center justify-center animate-float-slow">
              <div class="text-center">
                <div class="text-3xl font-bold text-gradient">AI</div>
                <div class="text-xs text-dark-400">人工智能</div>
              </div>
            </div>

            <div class="absolute -bottom-4 -left-4 w-28 h-28 card flex items-center justify-center animate-float">
              <svg class="w-12 h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <div class="absolute top-1/2 -right-8 w-20 h-20 card flex items-center justify-center animate-float-slow">
              <svg class="w-10 h-10 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center p-2">
        <div class="w-1.5 h-3 bg-primary-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openDemo = () => {
  // In a real app, this would open a video modal
  alert('演示视频功能即将上线！')
}
</script>

