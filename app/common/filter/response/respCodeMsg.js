// respCode
export default function respCodeMsg() {
  return function(input) {
    switch (input) {
      case 'S200':
        return '系统正常';
      case 'S403':
        return '无权限';
      case 'S408':
        return '系统繁忙,请稍等';
      case 'S400':
        return '参数不正确';
      case 'S404':
        return '资源不存在';
      default:
        return '';
    }
  };
}