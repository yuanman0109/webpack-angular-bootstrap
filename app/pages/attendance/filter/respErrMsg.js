// ERROR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 'S400':
        return '参数不正确';
      case 'S404':
        return '资源不存在';
      case 'S405':
        return 'http method不支持';
      case 'S409':
        return '门店或企业或品牌名称重复或已经存在';
      case 'S500':
        return '业务错误';
      default:
        return '';
    }
  };
}