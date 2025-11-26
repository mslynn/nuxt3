<template>
  <div class="pt-32 pb-16 min-h-screen bg-dark-950">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          数据请求演示
        </h1>
        <p class="text-dark-400">
          演示 useFetch 从后端 API 获取数据
        </p>
      </div>

      <!-- 筛选控制 -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- 分类筛选 -->
          <div class="flex items-center gap-2">
            <span class="text-dark-400">分类：</span>
            <select 
              v-model="category" 
              class="input-field w-40"
            >
              <option value="all">全部</option>
              <option value="ai">人工智能</option>
              <option value="robot">机器人</option>
              <option value="python">Python</option>
              <option value="scratch">Scratch</option>
            </select>
          </div>

          <!-- 搜索框 -->
          <div class="flex items-center gap-2">
            <span class="text-dark-400">搜索：</span>
            <input 
              v-model="search"
              type="text"
              placeholder="输入关键词..."
              class="input-field w-48"
            />
          </div>

          <!-- 刷新按钮 -->
          <button 
            @click="refresh"
            class="btn-secondary text-sm"
            :disabled="pending"
          >
            {{ pending ? '加载中...' : '刷新数据' }}
          </button>
        </div>

        <!-- 显示请求参数 -->
        <div class="mt-4 p-3 rounded-lg bg-dark-800 text-sm">
          <span class="text-dark-500">请求地址：</span>
          <code class="text-primary-400">/api/courses?category={{ category }}&search={{ search }}</code>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="pending" class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-dark-400 mt-4">加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="card p-8 text-center">
        <div class="text-red-400 text-xl mb-2">😵 出错了</div>
        <p class="text-dark-400">{{ error.message }}</p>
        <button @click="refresh" class="btn-primary mt-4 text-sm">重试</button>
      </div>

      <!-- 数据展示 -->
      <div v-else>
        <!-- 统计信息 -->
        <div class="mb-6 text-dark-400">
          共 <span class="text-white font-bold">{{ data?.total || 0 }}</span> 门课程
        </div>

        <!-- 课程列表 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="course in data?.data" 
            :key="course.id"
            class="card card-hover overflow-hidden"
          >
            <!-- 课程封面 -->
            <div 
              class="h-32 bg-gradient-to-br flex items-center justify-center"
              :class="course.gradient"
            >
              <span class="text-white/80 text-4xl font-bold">{{ course.id }}</span>
            </div>

            <!-- 课程信息 -->
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs text-primary-400">{{ course.category }}</span>
                <span class="w-1 h-1 rounded-full bg-dark-600"></span>
                <span class="text-xs text-dark-500">{{ course.lessons }}课时</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">{{ course.title }}</h3>
              <p class="text-dark-400 text-sm mb-4 line-clamp-2">{{ course.description }}</p>
              
              <div class="flex items-center justify-between pt-3 border-t border-dark-700/50">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-dark-300">{{ course.rating }}</span>
                </div>
                <span class="text-lg font-bold text-primary-400">{{ course.priceText }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 无数据 -->
        <div v-if="data?.data?.length === 0" class="text-center py-20">
          <div class="text-4xl mb-4">🔍</div>
          <p class="text-dark-400">没有找到相关课程</p>
        </div>
      </div>

      <!-- 代码展示 -->
      <div class="card p-6 mt-12">
        <h2 class="text-xl font-bold text-white mb-4">📝 核心代码</h2>
        <pre class="bg-dark-800 rounded-xl p-4 overflow-x-auto text-sm"><code class="text-dark-300">// 响应式查询参数
const category = ref('all')
const search = ref('')

// useFetch 自动监听参数变化，重新请求
const { data, pending, error, refresh } = await useFetch('/api/courses', {
  query: {
    category,  // 响应式参数
    search     // 修改时自动重新请求
  }
})

// 返回值说明：
// data    - 响应数据
// pending - 是否加载中
// error   - 错误信息
// refresh - 手动刷新函数</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '数据请求演示 - 智启教育'
})

// 查询参数（响应式）
const category = ref('all')
const search = ref('')

// useFetch 会自动监听 query 参数变化
// 当 category 或 search 改变时，自动重新请求
const { data, pending, error, refresh } = await useFetch('/api/courses', {
  query: {
    category,
    search
  },
  // 可选配置
  // lazy: true,        // 延迟加载（不阻塞页面渲染）
  // server: false,     // 仅客户端请求
  // watch: false,      // 不自动监听参数变化
})
</script>

