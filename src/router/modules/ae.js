import Layout from '@/layout'

const aeRouter = {
  path: '/ae',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/ae/AEPage'),
      meta: { title: 'AE', icon: 'form' }
    }
  ]

}

export default aeRouter
