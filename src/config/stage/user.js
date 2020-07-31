const userRouter = {
  route: null,
  name: null,
  title: '用户管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont el-icon-user',
  filePath: 'view/user/', // 文件路径
  inNav: true,
  order: 3,
  children: [
    {
      title: '用户列表',
      type: 'view',
      name: 'UserList',
      route: '/user/list',
      filePath: 'view/user/user-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }, {
      title: '新增用户',
      type: 'view',
      name: 'UserCreate',
      route: '/user/create',
      filePath: 'view/user/user-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default userRouter
