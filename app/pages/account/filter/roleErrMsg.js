// ERROR
export default function roleErrMsg() {
  return function(input) {
    switch (input) {
      case 'S400':
        return '参数不正确';
      case 'S404':
        return '资源不存在';
      case 'S405':
        return 'http method不支持';
      case 'S409':
        return '角色已存在，请勿重复添加！';
      case 'S500':
        return '业务错误';
      default:
        return '';
    }
  };
}