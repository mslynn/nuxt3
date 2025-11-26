<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern">
        <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            联系我们
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            期待与您<span class="text-gradient">沟通交流</span>
          </h1>
          <p class="text-xl text-dark-300">
            有任何问题或建议，欢迎随时与我们联系
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-dark-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="card p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">公司地址</h3>
                  <p class="text-dark-400 text-sm">北京市海淀区中关村科技园<br>创新大厦A座18层</p>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">电子邮件</h3>
                  <p class="text-dark-400 text-sm">
                    商务合作：business@aiedu.com<br>
                    客户服务：support@aiedu.com
                  </p>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">联系电话</h3>
                  <p class="text-dark-400 text-sm">
                    客服热线：400-888-8888<br>
                    工作时间：周一至周五 9:00-18:00
                  </p>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">在线客服</h3>
                  <p class="text-dark-400 text-sm">
                    微信公众号：智启教育<br>
                    在线咨询：7x24小时
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-white mb-6">发送消息</h2>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-dark-300 text-sm font-medium mb-2">姓名</label>
                    <input 
                      v-model="form.name"
                      type="text" 
                      placeholder="您的姓名"
                      class="input-field"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-dark-300 text-sm font-medium mb-2">邮箱</label>
                    <input 
                      v-model="form.email"
                      type="email" 
                      placeholder="your@email.com"
                      class="input-field"
                      required
                    >
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-dark-300 text-sm font-medium mb-2">电话</label>
                    <input 
                      v-model="form.phone"
                      type="tel" 
                      placeholder="您的联系电话"
                      class="input-field"
                    >
                  </div>
                  <div>
                    <label class="block text-dark-300 text-sm font-medium mb-2">咨询类型</label>
                    <select v-model="form.type" class="input-field">
                      <option value="general">一般咨询</option>
                      <option value="course">课程咨询</option>
                      <option value="business">商务合作</option>
                      <option value="support">技术支持</option>
                      <option value="feedback">意见反馈</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-dark-300 text-sm font-medium mb-2">主题</label>
                  <input 
                    v-model="form.subject"
                    type="text" 
                    placeholder="消息主题"
                    class="input-field"
                    required
                  >
                </div>

                <div>
                  <label class="block text-dark-300 text-sm font-medium mb-2">消息内容</label>
                  <textarea 
                    v-model="form.message"
                    rows="5"
                    placeholder="请详细描述您的问题或建议..."
                    class="input-field resize-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  class="btn-primary"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">发送消息</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    发送中...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">常见问题</h2>
          <p class="text-dark-400">快速找到您需要的答案</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="card overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full p-6 flex items-center justify-between hover:bg-dark-800/30 transition-colors text-left"
            >
              <span class="text-white font-medium pr-4">{{ faq.question }}</span>
              <svg 
                class="w-5 h-5 text-dark-400 flex-shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': openFaqs.includes(index) }"
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
              <div v-if="openFaqs.includes(index)" class="px-6 pb-6">
                <p class="text-dark-400 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '联系我们 - 智启教育',
  description: '联系智启教育，获取课程咨询、商务合作和技术支持。'
})

const isSubmitting = ref(false)
const openFaqs = ref<number[]>([])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  type: 'general',
  subject: '',
  message: '',
})

const toggleFaq = (index: number) => {
  const idx = openFaqs.value.indexOf(index)
  if (idx > -1) {
    openFaqs.value.splice(idx, 1)
  } else {
    openFaqs.value.push(index)
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  alert('消息已发送，我们会尽快与您联系！')
  // Reset form
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    type: 'general',
    subject: '',
    message: '',
  })
}

const faqs = [
  {
    question: '如何开始学习课程？',
    answer: '注册账户后，您可以浏览课程中心选择感兴趣的课程。购买后即可在个人中心访问课程内容，支持电脑和手机随时学习。'
  },
  {
    question: '课程是否支持退款？',
    answer: '我们提供7天无理由退款服务。如果您对课程不满意，可以在购买后7天内申请全额退款，已学习超过30%的课程除外。'
  },
  {
    question: '如何获取学习证书？',
    answer: '完成课程所有章节学习并通过最终测验后，您将自动获得电子结课证书。证书可在个人中心下载和分享。'
  },
  {
    question: '有没有试听课程？',
    answer: '大部分课程都提供免费试听章节，您可以在课程详情页查看。注册账户后即可免费观看试听内容。'
  },
  {
    question: '如何联系讲师答疑？',
    answer: '购买课程后，您可以在课程讨论区提问，讲师会在24小时内回复。部分课程还提供专属学习群，可以与讲师实时互动。'
  },
]
</script>

