<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-dark-950">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-transparent"></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
          核心优势
        </span>
        <h2 class="section-title">
          <span class="text-white">为什么选择</span>
          <span class="text-gradient">智启教育</span>
        </h2>
        <p class="section-subtitle">
          我们融合最先进的AI技术与创新教学方法，打造独特的学习体验
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="card card-hover p-8 group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="feature-icon mb-6 group-hover:scale-110 transition-transform duration-500">
            <component :is="feature.icon" class="w-8 h-8 text-primary-400" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
          <p class="text-dark-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Bottom Feature Highlight -->
      <div class="mt-16 card p-8 lg:p-12">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-sm font-medium mb-4">
              智能学习系统
            </span>
            <h3 class="text-3xl font-bold text-white mb-4">
              AI驱动的个性化学习路径
            </h3>
            <p class="text-dark-400 leading-relaxed mb-6">
              我们的AI系统会实时分析学生的学习进度、兴趣偏好和能力水平，自动调整课程难度和内容，确保每个孩子都能在最适合自己的节奏中成长。
            </p>
            <ul class="space-y-3">
              <li v-for="item in aiFeatures" :key="item" class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg class="w-3 h-3 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-dark-300">{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="aspect-video rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 p-6 overflow-hidden">
              <!-- Learning Dashboard Preview -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-white font-semibold">学习进度</span>
                  <span class="text-primary-400">85%</span>
                </div>
                <div class="h-3 bg-dark-700 rounded-full overflow-hidden">
                  <div class="h-full w-[85%] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mt-6">
                  <div class="bg-dark-700/50 rounded-xl p-4 text-center">
                    <div class="text-2xl font-bold text-primary-400">12</div>
                    <div class="text-xs text-dark-400">已完成课程</div>
                  </div>
                  <div class="bg-dark-700/50 rounded-xl p-4 text-center">
                    <div class="text-2xl font-bold text-accent-400">48</div>
                    <div class="text-xs text-dark-400">学习小时</div>
                  </div>
                  <div class="bg-dark-700/50 rounded-xl p-4 text-center">
                    <div class="text-2xl font-bold text-secondary-400">A+</div>
                    <div class="text-xs text-dark-400">能力评级</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decorative -->
            <div class="absolute -z-10 -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-secondary-500/20 rounded-3xl blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Feature icons as inline components
const RobotIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
}

const BrainIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
}

const CodeIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
}

const TeamIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
}

const ChartIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
}

const ShieldIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`
}

const features = [
  {
    icon: RobotIcon,
    title: 'AI智能辅导',
    description: '24/7全天候AI助教，实时解答学习疑问，提供个性化学习建议和即时反馈。'
  },
  {
    icon: BrainIcon,
    title: '项目式学习',
    description: '通过真实项目驱动学习，让孩子在实践中掌握知识，培养解决问题的能力。'
  },
  {
    icon: CodeIcon,
    title: '零基础友好',
    description: '精心设计的课程体系，从图形化编程到专业代码，循序渐进适合各年龄段。'
  },
  {
    icon: TeamIcon,
    title: '名师团队',
    description: '汇聚清华、北大、MIT等顶尖学府专家，提供最前沿的AI教育内容。'
  },
  {
    icon: ChartIcon,
    title: '学习追踪',
    description: '完善的学习数据分析系统，实时追踪学习进度，可视化呈现成长轨迹。'
  },
  {
    icon: ShieldIcon,
    title: '安全护航',
    description: '严格的内容审核机制和数据安全保障，为孩子创造绿色健康的学习环境。'
  }
]

const aiFeatures = [
  '智能推荐适合的课程内容',
  '自适应调整学习难度',
  '实时能力评估与反馈',
  '个性化学习计划生成'
]
</script>

