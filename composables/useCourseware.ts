/**
 * 课件管理
 */

// 课件页面
export interface CoursewarePage {
  id: number
  title?: string
  imageUrl: string  // 页面图片（PPT 转图片）
  notes?: string    // 备注/讲义
}

// 课件
export interface Courseware {
  id: string
  title: string
  subject: string
  grade: string
  coverImage: string
  pages: CoursewarePage[]
  createdAt: string
}

// 模拟课件数据
const mockCoursewareList: Courseware[] = [
  {
    id: 'course-001',
    title: '动物管理员玛塔',
    subject: '第2课',
    grade: '玛塔教育版·第一阶',
    coverImage: 'https://picsum.photos/seed/mata1/400/300',
    createdAt: '2024-01-15',
    pages: [
      { id: 1, title: '动物管理员玛塔', imageUrl: 'https://picsum.photos/seed/mata-p1/1200/750', notes: '本节课，玛塔机器人作为动物管理员帮助人类管理动物，学生需要学习基本动作指令，帮助完成送食物到动物那里。通过体验动态控上的按钮，亲自解决游戏关卡上的题目，让学生进一步一步地掌握及熟悉各自在。' },
      { id: 2, title: '一、知识导入', imageUrl: 'https://picsum.photos/seed/mata-p2/1200/750', notes: '引导学生认识方向指令：前进、后退、左转、右转' },
      { id: 3, title: '认识方向指令', imageUrl: 'https://picsum.photos/seed/mata-p3/1200/750', notes: '通过图片展示四个方向指令的含义' },
      { id: 4, title: '二、任务闯关', imageUrl: 'https://picsum.photos/seed/mata-p4/1200/750' },
      { id: 5, title: '任务一：送香蕉给猴子', imageUrl: 'https://picsum.photos/seed/mata-p5/1200/750', notes: '引导学生规划路线，使用前进和转向指令' },
      { id: 6, title: '任务二：送竹子给熊猫', imageUrl: 'https://picsum.photos/seed/mata-p6/1200/750' },
      { id: 7, title: '任务三：送鱼给企鹅', imageUrl: 'https://picsum.photos/seed/mata-p7/1200/750' },
      { id: 8, title: '三、总结延伸', imageUrl: 'https://picsum.photos/seed/mata-p8/1200/750', notes: '复习本节课学习的四个方向指令，强调左转和右转只改变方向不移动位置' },
      { id: 9, title: '还记得它们的名字吗？', imageUrl: 'https://picsum.photos/seed/mata-p9/1200/750', notes: '测试学生对方向指令的掌握程度' },
      { id: 10, title: '课后作业', imageUrl: 'https://picsum.photos/seed/mata-p10/1200/750' },
    ]
  },
  {
    id: 'course-002',
    title: 'Scratch 入门：小猫跳舞',
    subject: '第1课',
    grade: 'Scratch编程·初级',
    coverImage: 'https://picsum.photos/seed/scratch1/400/300',
    createdAt: '2024-01-20',
    pages: [
      { id: 1, title: 'Scratch 入门', imageUrl: 'https://picsum.photos/seed/scratch-p1/1200/750', notes: '介绍 Scratch 编程环境' },
      { id: 2, title: '认识 Scratch 界面', imageUrl: 'https://picsum.photos/seed/scratch-p2/1200/750', notes: '舞台区、角色区、积木区、代码区' },
      { id: 3, title: '角色和舞台', imageUrl: 'https://picsum.photos/seed/scratch-p3/1200/750' },
      { id: 4, title: '积木块介绍', imageUrl: 'https://picsum.photos/seed/scratch-p4/1200/750', notes: '运动、外观、声音、事件等积木分类' },
      { id: 5, title: '第一个程序：让小猫动起来', imageUrl: 'https://picsum.photos/seed/scratch-p5/1200/750' },
      { id: 6, title: '添加音乐和特效', imageUrl: 'https://picsum.photos/seed/scratch-p6/1200/750' },
      { id: 7, title: '课堂练习', imageUrl: 'https://picsum.photos/seed/scratch-p7/1200/750' },
      { id: 8, title: '课后作业', imageUrl: 'https://picsum.photos/seed/scratch-p8/1200/750' },
    ]
  },
  {
    id: 'course-003',
    title: 'Python 基础：变量与数据类型',
    subject: '第3课',
    grade: 'Python编程·入门',
    coverImage: 'https://picsum.photos/seed/python1/400/300',
    createdAt: '2024-02-01',
    pages: [
      { id: 1, title: 'Python 变量', imageUrl: 'https://picsum.photos/seed/python-p1/1200/750', notes: '变量是程序中存储数据的容器' },
      { id: 2, title: '什么是变量', imageUrl: 'https://picsum.photos/seed/python-p2/1200/750', notes: '变量命名规则、赋值操作' },
      { id: 3, title: '数据类型概述', imageUrl: 'https://picsum.photos/seed/python-p3/1200/750' },
      { id: 4, title: '整数和浮点数', imageUrl: 'https://picsum.photos/seed/python-p4/1200/750', notes: 'int 和 float 类型的使用' },
      { id: 5, title: '字符串', imageUrl: 'https://picsum.photos/seed/python-p5/1200/750', notes: '字符串的定义、拼接、格式化' },
      { id: 6, title: '布尔值', imageUrl: 'https://picsum.photos/seed/python-p6/1200/750' },
      { id: 7, title: '类型转换', imageUrl: 'https://picsum.photos/seed/python-p7/1200/750' },
      { id: 8, title: '练习题', imageUrl: 'https://picsum.photos/seed/python-p8/1200/750' },
    ]
  },
  {
    id: 'course-004',
    title: '机器人基础：传感器认知',
    subject: '第4课',
    grade: '机器人编程·基础',
    coverImage: 'https://picsum.photos/seed/robot1/400/300',
    createdAt: '2024-02-15',
    pages: [
      { id: 1, title: '传感器的世界', imageUrl: 'https://picsum.photos/seed/robot-p1/1200/750' },
      { id: 2, title: '什么是传感器', imageUrl: 'https://picsum.photos/seed/robot-p2/1200/750', notes: '传感器是机器人感知世界的眼睛和耳朵' },
      { id: 3, title: '常见传感器类型', imageUrl: 'https://picsum.photos/seed/robot-p3/1200/750' },
      { id: 4, title: '超声波传感器', imageUrl: 'https://picsum.photos/seed/robot-p4/1200/750', notes: '测量距离、避障' },
      { id: 5, title: '红外传感器', imageUrl: 'https://picsum.photos/seed/robot-p5/1200/750' },
      { id: 6, title: '实践：避障机器人', imageUrl: 'https://picsum.photos/seed/robot-p6/1200/750' },
    ]
  }
]

export const useCourseware = () => {
  // 当前选中的课件
  const currentCourseware = useState<Courseware | null>('current-courseware', () => null)
  // 当前页码（从 0 开始）
  const currentPageIndex = useState<number>('current-page-index', () => 0)

  // 获取课件列表
  const getCoursewareList = async (): Promise<Courseware[]> => {
    // TODO: 替换为真实接口
    // const http = useHttp()
    // return await http.get('/api/courseware')
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockCoursewareList
  }

  // 获取单个课件
  const getCourseware = async (id: string): Promise<Courseware | null> => {
    // TODO: 替换为真实接口
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockCoursewareList.find(c => c.id === id) || null
  }

  // 打开课件
  const openCourseware = (courseware: Courseware) => {
    currentCourseware.value = courseware
    currentPageIndex.value = 0
  }

  // 关闭课件
  const closeCourseware = () => {
    currentCourseware.value = null
    currentPageIndex.value = 0
  }

  // 当前页面
  const currentPage = computed(() => {
    if (!currentCourseware.value) return null
    return currentCourseware.value.pages[currentPageIndex.value]
  })

  // 总页数
  const totalPages = computed(() => {
    return currentCourseware.value?.pages.length || 0
  })

  // 上一页
  const prevPage = () => {
    if (currentPageIndex.value > 0) {
      currentPageIndex.value--
    }
  }

  // 下一页
  const nextPage = () => {
    if (currentCourseware.value && currentPageIndex.value < currentCourseware.value.pages.length - 1) {
      currentPageIndex.value++
    }
  }

  // 跳转到指定页
  const goToPage = (index: number) => {
    if (currentCourseware.value && index >= 0 && index < currentCourseware.value.pages.length) {
      currentPageIndex.value = index
    }
  }

  // 是否有上一页
  const hasPrev = computed(() => currentPageIndex.value > 0)

  // 是否有下一页
  const hasNext = computed(() => {
    return currentCourseware.value ? currentPageIndex.value < currentCourseware.value.pages.length - 1 : false
  })

  return {
    currentCourseware,
    currentPageIndex,
    currentPage,
    totalPages,
    getCoursewareList,
    getCourseware,
    openCourseware,
    closeCourseware,
    prevPage,
    nextPage,
    goToPage,
    hasPrev,
    hasNext
  }
}

