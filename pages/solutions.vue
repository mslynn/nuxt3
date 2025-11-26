<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-sm font-medium mb-4">
            解决方案
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            全方位<span class="text-gradient">AI教育解决方案</span>
          </h1>
          <p class="text-xl text-dark-300">
            为学校、机构和企业提供定制化的AI教育解决方案，助力人才培养
          </p>
        </div>
      </div>
    </section>

    <!-- Solutions Grid -->
    <section class="py-16 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8">
          <div 
            v-for="solution in solutions" 
            :key="solution.title"
            class="card card-hover overflow-hidden group"
          >
            <div class="grid md:grid-cols-2">
              <!-- Image -->
              <div 
                class="aspect-square md:aspect-auto bg-gradient-to-br flex items-center justify-center p-8"
                :class="solution.gradient"
              >
                <component :is="solution.icon" class="w-24 h-24 text-white/80" />
              </div>
              
              <!-- Content -->
              <div class="p-8">
                <span 
                  class="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                  :class="solution.badgeClass"
                >
                  {{ solution.badge }}
                </span>
                <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {{ solution.title }}
                </h3>
                <p class="text-dark-400 mb-6">{{ solution.description }}</p>
                <ul class="space-y-2 mb-6">
                  <li 
                    v-for="feature in solution.features" 
                    :key="feature"
                    class="flex items-center gap-2 text-dark-300 text-sm"
                  >
                    <svg class="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
                <button class="text-primary-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  了解更多
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            合作流程
          </span>
          <h2 class="section-title text-white">简单四步，开启合作</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(step, index) in steps" 
            :key="step.title"
            class="relative"
          >
            <!-- Connector Line -->
            <div 
              v-if="index < steps.length - 1"
              class="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary-500/50 to-transparent"
            ></div>
            
            <div class="card p-8 text-center relative z-10">
              <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                <span class="text-4xl font-bold text-gradient">{{ index + 1 }}</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ step.title }}</h3>
              <p class="text-dark-400 text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="py-20 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
            合作伙伴
          </span>
          <h2 class="section-title text-white">他们选择了智启教育</h2>
          <p class="section-subtitle">
            与全国500+学校和教育机构建立深度合作
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div 
            v-for="partner in partners" 
            :key="partner"
            class="card p-6 flex items-center justify-center h-24"
          >
            <span class="text-dark-400 font-display font-bold">{{ partner }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-900 to-secondary-900/30"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            定制您的专属解决方案
          </h2>
          <p class="text-xl text-dark-300 mb-10">
            我们的专业团队将根据您的需求，为您量身定制最适合的AI教育方案
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">
              预约咨询
            </button>
            <button class="btn-secondary">
              下载方案手册
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '解决方案 - 智启教育',
  description: '智启教育为学校、机构和企业提供全方位的AI教育解决方案，助力人才培养和数字化转型。'
})

// Icons
const SchoolIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>`
}

const InstitutionIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`
}

const EnterpriseIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
}

const GovernmentIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>`
}

const solutions = [
  {
    title: 'K12学校解决方案',
    badge: '教育',
    badgeClass: 'bg-primary-500/20 text-primary-400',
    description: '为中小学提供完整的AI教育课程体系和教学支持，培养学生的科技素养和创新能力。',
    features: [
      '系统化课程体系',
      '教师培训支持',
      '配套教学设备',
      '学习数据分析',
    ],
    gradient: 'from-primary-500 to-primary-700',
    icon: SchoolIcon,
  },
  {
    title: '教培机构解决方案',
    badge: '机构',
    badgeClass: 'bg-secondary-500/20 text-secondary-400',
    description: '为培训机构提供课程授权、师资培训和运营支持，快速开展AI编程教育业务。',
    features: [
      '课程授权合作',
      '师资认证培训',
      '招生运营支持',
      '品牌联合推广',
    ],
    gradient: 'from-secondary-500 to-secondary-700',
    icon: InstitutionIcon,
  },
  {
    title: '企业培训解决方案',
    badge: '企业',
    badgeClass: 'bg-accent-500/20 text-accent-400',
    description: '为企业提供AI技能培训，帮助员工掌握人工智能技术，推动企业数字化转型。',
    features: [
      '定制化课程内容',
      '企业内训服务',
      '技能认证体系',
      '项目实战指导',
    ],
    gradient: 'from-accent-500 to-accent-700',
    icon: EnterpriseIcon,
  },
  {
    title: '政府/公益项目',
    badge: '公益',
    badgeClass: 'bg-yellow-500/20 text-yellow-400',
    description: '与政府和公益组织合作，推动AI教育普及，让更多孩子享受优质教育资源。',
    features: [
      '公益课程捐赠',
      '教育扶贫项目',
      '科普活动支持',
      '政策咨询服务',
    ],
    gradient: 'from-yellow-500 to-orange-600',
    icon: GovernmentIcon,
  },
]

const steps = [
  {
    title: '需求沟通',
    description: '深入了解您的教育需求和目标，进行初步评估',
  },
  {
    title: '方案定制',
    description: '根据需求量身定制解决方案，包括课程、师资、设备等',
  },
  {
    title: '落地实施',
    description: '专业团队协助方案落地，提供全程技术支持',
  },
  {
    title: '持续服务',
    description: '定期回访和优化，确保项目持续高效运行',
  },
]

const partners = [
  '清华附中',
  '北大附中',
  '人大附中',
  '深圳中学',
  '上海中学',
  '南京外国语',
  '成都七中',
  '武汉外国语',
  '广州执信',
  '杭州学军',
  '天津一中',
  '重庆一中',
]
</script>

