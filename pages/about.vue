<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            关于我们
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            用<span class="text-gradient">科技</span>重新定义教育
          </h1>
          <p class="text-xl text-dark-300">
            智启教育致力于为青少年提供最前沿的人工智能教育，培养面向未来的创新型科技人才
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="inline-block px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-sm font-medium mb-4">
              我们的使命
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              让每个孩子都能拥抱AI时代
            </h2>
            <p class="text-dark-300 leading-relaxed mb-6">
              在人工智能快速发展的今天，编程和AI素养已成为面向未来的核心能力。智启教育成立于2018年，我们的使命是让每个孩子都能够接触到优质的AI教育资源，掌握未来所需的技能。
            </p>
            <p class="text-dark-300 leading-relaxed">
              我们相信，教育的本质不是灌输知识，而是点燃火焰。通过创新的教学方法和先进的技术手段，我们希望激发每个孩子的创造力和探索精神。
            </p>
          </div>
          <div class="relative">
            <div class="card p-8 bg-gradient-to-br from-dark-800/80 to-dark-900/80">
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center p-6 rounded-xl bg-dark-800/50">
                  <div class="text-4xl font-bold text-primary-400 mb-2">2018</div>
                  <div class="text-dark-400 text-sm">成立年份</div>
                </div>
                <div class="text-center p-6 rounded-xl bg-dark-800/50">
                  <div class="text-4xl font-bold text-secondary-400 mb-2">50+</div>
                  <div class="text-dark-400 text-sm">城市覆盖</div>
                </div>
                <div class="text-center p-6 rounded-xl bg-dark-800/50">
                  <div class="text-4xl font-bold text-accent-400 mb-2">500+</div>
                  <div class="text-dark-400 text-sm">合作学校</div>
                </div>
                <div class="text-center p-6 rounded-xl bg-dark-800/50">
                  <div class="text-4xl font-bold text-yellow-400 mb-2">50万+</div>
                  <div class="text-dark-400 text-sm">服务学员</div>
                </div>
              </div>
            </div>
            <div class="absolute -z-10 -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-sm font-medium mb-4">
            核心价值观
          </span>
          <h2 class="section-title text-white">我们坚信的价值</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="value in values" 
            :key="value.title"
            class="card card-hover p-8 text-center"
          >
            <div 
              class="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              :class="value.bgClass"
            >
              <component :is="value.icon" class="w-8 h-8" :class="value.iconClass" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ value.title }}</h3>
            <p class="text-dark-400 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            发展历程
          </span>
          <h2 class="section-title text-white">我们的故事</h2>
        </div>

        <div class="relative max-w-4xl mx-auto">
          <!-- Timeline Line -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>

          <div class="space-y-12">
            <div 
              v-for="(event, index) in timeline" 
              :key="event.year"
              class="relative flex items-center gap-8"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- Year Badge -->
              <div class="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary-500 border-4 border-dark-950"></div>
              
              <!-- Content -->
              <div class="flex-1 ml-20 md:ml-0" :class="index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'">
                <div class="card p-6">
                  <span class="text-primary-400 font-bold text-lg">{{ event.year }}</span>
                  <h3 class="text-xl font-bold text-white mt-2 mb-2">{{ event.title }}</h3>
                  <p class="text-dark-400 text-sm">{{ event.description }}</p>
                </div>
              </div>
              
              <div class="hidden md:block flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
            核心团队
          </span>
          <h2 class="section-title text-white">认识我们的领导团队</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            v-for="member in team" 
            :key="member.name"
            class="card card-hover p-8 text-center"
          >
            <div class="relative w-28 h-28 mx-auto mb-6">
              <div 
                class="w-full h-full rounded-full bg-gradient-to-br"
                :class="member.gradient"
              ></div>
              <div class="absolute inset-2 rounded-full bg-dark-800 flex items-center justify-center">
                <span class="text-3xl font-bold text-gradient">{{ member.initials }}</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-1">{{ member.name }}</h3>
            <p class="text-primary-400 text-sm mb-3">{{ member.role }}</p>
            <p class="text-dark-400 text-sm">{{ member.bio }}</p>
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
            加入我们，共创未来
          </h2>
          <p class="text-xl text-dark-300 mb-10">
            无论你是想学习AI的学生，还是热爱教育的人才，我们都欢迎你的加入
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/courses" class="btn-primary">
              开始学习
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              联系我们
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '关于我们 - 智启教育',
  description: '了解智启教育的使命、价值观和发展历程，认识我们的核心团队。'
})

// Icons
const InnovationIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
}

const QualityIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>`
}

const StudentIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>`
}

const GlobalIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>`
}

const values = [
  {
    title: '创新驱动',
    description: '不断探索教育科技的前沿，用创新的方法解决传统教育的痛点',
    icon: InnovationIcon,
    bgClass: 'bg-primary-500/20',
    iconClass: 'text-primary-400',
  },
  {
    title: '品质至上',
    description: '严格把控课程质量，每一门课程都经过精心打磨和反复优化',
    icon: QualityIcon,
    bgClass: 'bg-secondary-500/20',
    iconClass: 'text-secondary-400',
  },
  {
    title: '以学生为本',
    description: '始终将学生的成长放在首位，提供个性化的学习体验',
    icon: StudentIcon,
    bgClass: 'bg-accent-500/20',
    iconClass: 'text-accent-400',
  },
  {
    title: '开放共享',
    description: '推动AI教育的普及，让更多孩子享受到优质的教育资源',
    icon: GlobalIcon,
    bgClass: 'bg-yellow-500/20',
    iconClass: 'text-yellow-400',
  },
]

const timeline = [
  {
    year: '2018',
    title: '智启教育成立',
    description: '在北京中关村成立，开始专注于青少年AI编程教育',
  },
  {
    year: '2019',
    title: '首个线上平台上线',
    description: '推出在线学习平台，服务范围扩展至全国',
  },
  {
    year: '2020',
    title: '完成A轮融资',
    description: '获得知名教育投资机构的青睐，加速产品研发',
  },
  {
    year: '2021',
    title: 'AI智能辅导系统发布',
    description: '推出业界领先的AI智能辅导系统，实现个性化学习',
  },
  {
    year: '2022',
    title: '合作学校突破500所',
    description: '与全国超过500所中小学建立合作关系',
  },
  {
    year: '2023',
    title: '服务学员超过50万',
    description: '累计服务学员突破50万，成为行业领导品牌',
  },
]

const team = [
  {
    name: '张华',
    initials: '张',
    role: '创始人 & CEO',
    bio: '前Google工程师，清华大学计算机系博士，专注AI教育创新',
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    name: '李薇',
    initials: '李',
    role: '联合创始人 & COO',
    bio: '北大MBA，曾任新东方教育集团VP，15年教育行业经验',
    gradient: 'from-secondary-400 to-secondary-600',
  },
  {
    name: '王强',
    initials: '王',
    role: 'CTO',
    bio: '前阿里巴巴技术专家，MIT计算机硕士，专注教育科技研发',
    gradient: 'from-accent-400 to-accent-600',
  },
]
</script>

