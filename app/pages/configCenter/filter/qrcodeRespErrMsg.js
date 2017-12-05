// 按钮code
class respErrMsg {
  static respErrMsg(input) {
    switch (input) {
      case 'S400':
        return '参数不正确';

      case 'S404':
        return '资源不存在';

      case 'S405':
        return 'http method不支持';

      case 'S409':
        return '参数冲突';

      case 'S500':
        return '业务错误';

      default:
        return '';
    }
  }
  static qrcodeType(input) {
    switch (input) {
      case 'PAY':
        return '支付';

      case 'DESK_PAY1':
        return '点餐(正)';

      case 'DESK_PAY2':
        return '点餐(快)';

      default:
        return '';
    }
  }
}
export default respErrMsg;