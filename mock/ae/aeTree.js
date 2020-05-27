import Mock from 'mockjs'

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    label: '@sentence(1)',
    'children|1-3': [
      {
        id: '@id',
        label: '@sentence(1)'
      }
    ]
  }]
})

export default [
  {
    url: '/ddr/ae/tree',
    type: 'post',
    response: config => {
      console.log(config.body)
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          treeData: items
        }
      }
    }
  }
]
