<template>
  <div class="demo-page">
    <ClientOnly>
      <CoursewareRevealPlayer 
        :courseware="demoCourseware"
        @close="goBack"
        @slideChange="onSlideChange"
      />
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Courseware } from '~/composables/useRevealPlayer'

definePageMeta({
  layout: false
})
const router = useRouter()

const demoCourseware: Courseware = {
  id: 'demo-1',
  title: '第2课 动物管理员玛塔',
  slides: [
    {
      type: 'title',
      title: '第2课 动物管理员玛塔',
      subtitle: '课堂课件（示意）',
      backgroundColor: '#f7f9fb'
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            三、总结延伸
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">还记得它们的名字吗？</h2>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 800px; margin: 0 auto;">
            <div style="background: #83b925; border-radius: 12px; padding: 20px; color: white; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">↑</div>
              <div style="font-weight: bold;">前进</div>
            </div>
            <div style="background: #83b925; border-radius: 12px; padding: 20px; color: white; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">↓</div>
              <div style="font-weight: bold;">后退</div>
            </div>
            <div style="background: #83b925; border-radius: 12px; padding: 20px; color: white; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">←</div>
              <div style="font-weight: bold;">左转</div>
            </div>
            <div style="background: #83b925; border-radius: 12px; padding: 20px; color: white; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">→</div>
              <div style="font-weight: bold;">右转</div>
            </div>
          </div>
        </div>
      `
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            四、练一练
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">按照指令走到终点</h2>
          <div style="width: 80%; max-width: 960px; height: 360px; background: #fff; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.08); display:flex; align-items:center; justify-content:center; color:#999; font-size:18px; margin: 0 auto;">
            这里放示意图/棋盘截图
          </div>
        </div>
      `
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            五、巩固
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">请说出每个指令的作用</h2>
          <ul style="margin-top:20px; line-height:2; font-size:20px; color:#333; text-align: left; max-width: 600px; margin: 0 auto;">
            <li>前进：向前移动一格</li>
            <li>后退：向后移动一格</li>
            <li>左转：原地左转 90°</li>
            <li>右转：原地右转 90°</li>
          </ul>
        </div>
      `
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            六、示例流程
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">试着组合指令完成任务</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; width:80%; max-width:960px; margin: 0 auto;">
            <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 10px 20px rgba(0,0,0,0.08); text-align: left;">
              <h3 style="margin-bottom:12px; color: #333;">任务 A</h3>
              <p style="color:#555;">前进 → 前进 → 右转 → 前进</p>
            </div>
            <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 10px 20px rgba(0,0,0,0.08); text-align: left;">
              <h3 style="margin-bottom:12px; color: #333;">任务 B</h3>
              <p style="color:#555;">左转 → 前进 → 前进 → 右转 → 前进</p>
            </div>
          </div>
        </div>
      `
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            七、课堂互动
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">小组讨论：还能组成哪些路径？</h2>
          <p style="margin-top:20px; color:#555; font-size:20px;">请在 2 分钟内写出三个不同的指令组合，并说明用途。</p>
        </div>
      `
    },
    {
      type: 'custom',
      backgroundColor: '#f7f9fb',
      html: `
        <div style="text-align: center; padding: 40px;">
          <div style="display: inline-block; background: #f9c840; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 30px; color: #333;">
            八、小结
          </div>
          <h2 style="color: #333; font-size: 32px; margin-bottom: 40px;">今天学到了什么？</h2>
          <ul style="margin-top:20px; line-height:2; font-size:20px; color:#333; text-align: left; max-width: 600px; margin: 0 auto;">
            <li>四个基本指令的含义</li>
            <li>如何组合指令完成任务</li>
            <li>与同伴合作交流的经验</li>
          </ul>
        </div>
      `
    }
  ]
}

const onSlideChange = (index: number) => {
  console.log('当前幻灯片:', index + 1)
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.demo-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background: #1a1a2e;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}
</style>
