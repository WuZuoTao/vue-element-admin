const list = [
  {
    nick: '张三',
    phone: 1549778966,
    name: '北京',
    subject: '数学',
    job: '教师',
    year: 3,
    updateTime: '2021-11-11 14:04:51'
  },
  {
    nick: '张五',
    phone: 1359778966,
    name: '北京',
    subject: '语文',
    job: '教师',
    year: 1,
    updateTime: '2021-11-11 13:05:67'
  },
  {
    nick: '张六',
    phone: 1549778966,
    name: '北京',
    subject: '英语',
    job: '教师',
    year: 6,
    updateTime: '2021-11-11 14:53:04'
  },
  {
    nick: '李四',
    phone: 1549778966,
    name: '北京',
    subject: 'Java',
    job: '后端工程师',
    year: 10,
    updateTime: '2021-11-11 15:44:32'
  },
  {
    nick: '王五',
    phone: 1749778966,
    name: '北京',
    subject: 'JavaScript',
    job: '前端工程师',
    year: 8,
    updateTime: '2021-11-11 15:44:32'
  }
]

module.exports = [
  {
    url: '/vue-admin-template/personal-data/list',
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

