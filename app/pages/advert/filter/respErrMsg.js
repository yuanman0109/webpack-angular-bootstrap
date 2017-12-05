// ERR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 'AD_001':
        return '数据不存在或只有未开始投放的广告才能删除'
      case 'AD_002':
        return '开始时间不能在结束时间之后'
      case 'AD_003':
        return '广告链接请以http和https开头 '
      case 'AD_004':
        return '广告数据不存在'
      case 'AD_005':
        return '已到期的不能修改'
      case 'AD_007':
        return '请输入正确的state参数，只允许ON和OFF!'
      case 'AD_008':
        return '只有中止的且还没到期才能继续投放'
      case 'AD_009':
        return '只有投放中且在投放开始时间和结束时间之间才能中止'
      case 'S400':
        return '参数不正确'
      case 'S404':
        return '资源不存在'
      case 'S405':
        return 'http method不支持'
      case 'S409':
        return '参数冲突'
      case 'S500':
        return '业务错误'
      default:
        return ''
    }
  }
}