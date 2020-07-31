const apply = {
  route: null,
  name: null,
  title: '报名管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont el-icon-collection-tag',
  filePath: 'view/apply/', // 文件路径
  inNav: true,
  order: 1,
  children: [
    {
      title: '报名记录',
      type: 'view',
      name: 'ApplyList',
      route: '/apply/list',
      filePath: 'view/apply/apply-list.vue',
      inNav: true,
      icon: 'iconfont el-icon-collection-tag',
    }
  ],
}

export default apply
