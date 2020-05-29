import Layout from '@/layout'

const atRouter = {
  path: '/at',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'AT',
      component: () => import('@/views/at/ATPage'),
      meta: { title: 'AT', icon: 'form' }
    }
  ]

}

export default atRouter
