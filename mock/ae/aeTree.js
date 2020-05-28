import Mock from 'mockjs'

function getTreeData() {
  return Mock.mock({
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
}

export default [
  {
    url: '/ddr/ae/tree',
    type: 'post',
    response: config => {
      console.log(config.body)
      const items = getTreeData().items
      return {
        code: 20000,
        data: {
          total: items.length,
          treeData: items
        }
      }
    }
  }, {
    url: '/ddr/ae/upload',
    type: 'post',
    req: config => {
      console.log(config.body)
    },
    response: config => {
      const items = getTreeData().items
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
