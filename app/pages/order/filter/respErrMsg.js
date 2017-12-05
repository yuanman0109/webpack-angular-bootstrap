//ERR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 'Order001':
        return '原接单人没有未处理工单';
      case 'S400':
        return '参数不正确';
      case 'S404':
        return '资源不存在';
      case 'S409':
        return '参数冲突';
      case 'S500':
        return '业务错误';
      default:
        return '';
    }
  };
}