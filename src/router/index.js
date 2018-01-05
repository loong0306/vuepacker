export default [
  {
    name: 'Index',
    path: '/',
    redirect: {name: 'IndexPage'}
  },
  {
    meta: {
      name: '首页'
    },
    name: 'IndexPage',
    path: '/',
    component: resolve => require(['views/index'], resolve),
    children: [
    ]
  },
  {
    path: '*',
    meta: {
      noRequestApprove: true
    },
    component: resolve => require(['views/error/404'], resolve)
  }
]
