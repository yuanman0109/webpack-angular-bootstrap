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
        return '参数冲突';
      case 'S500':
        return '业务错误';
      case 'AppVersion001':
        return '版本号必须大于以前版本';
      default:
        return '';
    }
  };
}