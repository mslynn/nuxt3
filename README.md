# 智启教育 - AI教育平台

基于 Nuxt3 构建的现代化在线教育网站模板，专注于AI和编程教育。

![Nuxt3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)
![Vue3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)

## ✨ 特性

- 🚀 基于 **Nuxt3** 构建，支持 SSR/SSG
- 🎨 **TailwindCSS** 实现现代化深色主题UI
- 📱 完全响应式设计，适配各种设备
- ⚡ 流畅的页面过渡动画
- 🔍 SEO友好，自动生成meta标签
- 🌐 支持 Google Fonts (Noto Sans SC + Orbitron)

## 📄 页面列表

- **首页** (`/`) - Hero展示、特色功能、课程预览、数据统计、讲师预览、学员评价
- **课程中心** (`/courses`) - 课程列表、筛选功能
- **课程详情** (`/courses/[id]`) - 课程信息、大纲、购买
- **解决方案** (`/solutions`) - K12/机构/企业解决方案
- **教师团队** (`/teachers`) - 讲师展示
- **关于我们** (`/about`) - 公司介绍、发展历程、团队
- **联系我们** (`/contact`) - 联系表单、FAQ
- **登录** (`/login`) - 用户登录
- **注册** (`/register`) - 用户注册

## 🛠️ 技术栈

- **框架**: Nuxt 3
- **UI**: Vue 3 + TailwindCSS
- **字体**: Google Fonts (Noto Sans SC, Orbitron)
- **动画**: CSS Animations + Transitions
- **图标**: 内联 SVG

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm/yarn/pnpm

### 安装依赖

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### 开发模式

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

访问 http://localhost:3000

### 生产构建

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build
```

### 预览生产版本

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview
```

## 📁 项目结构

```
nuxt3/
├── assets/
│   └── css/
│       └── main.css          # 全局样式
├── components/
│   ├── TheHeader.vue         # 导航头部
│   ├── TheFooter.vue         # 页脚
│   └── home/                 # 首页组件
│       ├── HeroSection.vue
│       ├── FeaturesSection.vue
│       ├── CoursesSection.vue
│       ├── StatsSection.vue
│       ├── TeachersPreview.vue
│       ├── TestimonialsSection.vue
│       └── CTASection.vue
├── layouts/
│   └── default.vue           # 默认布局
├── pages/
│   ├── index.vue             # 首页
│   ├── about.vue             # 关于我们
│   ├── teachers.vue          # 教师团队
│   ├── solutions.vue         # 解决方案
│   ├── contact.vue           # 联系我们
│   ├── login.vue             # 登录
│   ├── register.vue          # 注册
│   └── courses/
│       ├── index.vue         # 课程列表
│       └── [id].vue          # 课程详情
├── app.vue                   # 应用入口
├── nuxt.config.ts            # Nuxt配置
├── tailwind.config.js        # TailwindCSS配置
└── package.json
```

## 🎨 设计系统

### 颜色方案

- **Primary**: 蓝色系 (#33a6ff)
- **Secondary**: 紫色系 (#d946ef)
- **Accent**: 绿色系 (#10b981)
- **Dark**: 深色背景系

### 组件类

```css
.btn-primary    /* 主要按钮 */
.btn-secondary  /* 次要按钮 */
.btn-accent     /* 强调按钮 */
.card           /* 卡片容器 */
.card-hover     /* 悬浮效果卡片 */
.glass          /* 毛玻璃效果 */
.text-gradient  /* 渐变文字 */
.input-field    /* 输入框 */
.nav-link       /* 导航链接 */
```

## 🔧 自定义

### 修改品牌颜色

编辑 `tailwind.config.js` 中的 `colors` 配置：

```js
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

### 修改字体

编辑 `nuxt.config.ts` 中的 `googleFonts` 配置：

```ts
googleFonts: {
  families: {
    'Your+Font': [400, 700],
  }
}
```

## 📝 待办事项

- [ ] 添加用户认证功能
- [ ] 集成支付系统
- [ ] 添加课程视频播放器
- [ ] 实现学习进度追踪
- [ ] 添加评论系统
- [ ] 国际化支持

## 📄 许可证

MIT License

---

Made with ❤️ by 智启教育

