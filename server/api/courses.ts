// 模拟课程数据 API
export default defineEventHandler((event) => {
  // 获取查询参数
  const query = getQuery(event)
  const category = query.category as string
  const search = query.search as string

  // 模拟数据库数据
  const allCourses = [
    {
      id: 1,
      title: 'Python人工智能入门',
      description: '从零开始学习Python编程，掌握AI基础知识',
      category: '人工智能',
      categoryId: 'ai',
      level: '入门',
      levelId: 'beginner',
      lessons: 48,
      price: 1299,
      priceText: '¥1,299',
      rating: 4.9,
      students: 2847,
      instructor: '李明博士',
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      id: 2,
      title: '机器人编程实战营',
      description: '动手搭建和编程控制机器人，培养工程思维',
      category: '机器人编程',
      categoryId: 'robot',
      level: '中级',
      levelId: 'intermediate',
      lessons: 36,
      price: 1699,
      priceText: '¥1,699',
      rating: 4.8,
      students: 1923,
      instructor: '王小明',
      gradient: 'from-secondary-500 to-secondary-700',
    },
    {
      id: 3,
      title: 'Scratch创意编程',
      description: '适合6-12岁儿童的图形化编程课程',
      category: 'Scratch',
      categoryId: 'scratch',
      level: '入门',
      levelId: 'beginner',
      lessons: 24,
      price: 899,
      priceText: '¥899',
      rating: 4.9,
      students: 4521,
      instructor: '张老师',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 4,
      title: 'Python数据科学',
      description: '深入学习数据分析与可视化',
      category: 'Python',
      categoryId: 'python',
      level: '进阶',
      levelId: 'advanced',
      lessons: 56,
      price: 1899,
      priceText: '¥1,899',
      rating: 4.7,
      students: 1456,
      instructor: '陈教授',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 5,
      title: '机器学习基础',
      description: '系统学习机器学习算法原理与实践',
      category: '人工智能',
      categoryId: 'ai',
      level: '进阶',
      levelId: 'advanced',
      lessons: 64,
      price: 2299,
      priceText: '¥2,299',
      rating: 4.8,
      students: 982,
      instructor: '刘博士',
      gradient: 'from-violet-500 to-purple-700',
    },
    {
      id: 6,
      title: 'Python游戏开发',
      description: '用Python创建有趣的游戏',
      category: 'Python',
      categoryId: 'python',
      level: '中级',
      levelId: 'intermediate',
      lessons: 32,
      price: 1199,
      priceText: '¥1,199',
      rating: 4.9,
      students: 2134,
      instructor: '赵老师',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ]

  // 过滤数据
  let result = allCourses

  if (category && category !== 'all') {
    result = result.filter(c => c.categoryId === category)
  }

  if (search) {
    const keyword = search.toLowerCase()
    result = result.filter(c => 
      c.title.toLowerCase().includes(keyword) ||
      c.description.toLowerCase().includes(keyword)
    )
  }

  // 模拟网络延迟
  // await new Promise(resolve => setTimeout(resolve, 500))

  return {
    success: true,
    data: result,
    total: result.length
  }
})

