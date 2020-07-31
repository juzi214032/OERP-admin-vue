const exam = {
  route: null,
  name: null,
  title: '考试管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont el-icon-c-scale-to-original',
  filePath: 'view/exam/', // 文件路径
  inNav: true,
  order: 2,
  children: [
    {
      title: '考试列表',
      type: 'view',
      name: 'ExamList',
      route: '/exam/list',
      filePath: 'view/exam/exam-list.vue',
      inNav: true,
      icon: 'iconfont el-icon-c-scale-to-original',
    }
  ],
}

export default exam
