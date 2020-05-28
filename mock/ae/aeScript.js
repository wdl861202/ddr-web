import Mock from 'mockjs'

function getAEsql(param) {
  return Mock.mock(
    param + ' : select * from @sentence(1)'
  )
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

const tableHeaders = [
  {
    prop: 'id',
    label: 'ID',
    width: 140
  }, {
    prop: 'portfolioCode',
    label: '代码',
    width: 140
  }, {
    prop: 'portfolioName',
    label: '名称',
    width: 140
  }
]

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
          tableData: items,
          tableHeaders: tableHeaders
        }
      }
    }
  },
  {
    url: '/ddr/ae/save',
    type: 'post',
    req: config => {
      console.log(config.body)
    },
    response: config => {
      return {
        code: 20000,
        data: {
          sql: getAEsql('aeSave')
        }
      }
    }
  },
  {
    url: '/ddr/ae/load',
    type: 'post',
    req: config => {
      console.log(config.body)
    },
    response: config => {
      return {
        code: 20000,
        data: {
          sql: getAEsql('aeLoad')
        }
      }
    }
  }
]
