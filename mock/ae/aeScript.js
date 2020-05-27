import Mock from 'mockjs'

function getAEsql() {
  return Mock.mock({
    sql: 'select * from @sentence(1)'
  })
}

function getTableData() {
  return Mock.mock({
    'items|5': [{
      id: '@id',
      portfolioCode: '@sentence(1)',
      portfolioName: '@csentence(1)'
    }]
  })
}

export default [
  {
    url: '/ddr/ae/run',
    type: 'post',
    response: config => {
      console.log(config.body)
      const items = getTableData().items
      return {
        code: 20000,
        data: {
          total: items.length,
          tableData: items
        }
      }
    }
  },
  {
    url: '/ddr/ae/upload',
    type: 'post',
    req: config => {
      console.log(config.body)
    },
    response: config => {
      return {
        code: 20000,
        data: {
          sql: getAEsql()
        }
      }
    }
  }
]
