const list = [
  { value: '1', region: '水里' },
  { value: '2', region: '天上' },
  { value: '3', region: '地下' }
]

module.exports = [
  {
    url: '/vue-admin-template/rendurless/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: list.length,
          items: list
        }
      }
    }
  }
]

