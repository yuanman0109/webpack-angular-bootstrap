// ERR
export default function respErrMsg() {
  return function (input) {
    switch (input) {
      case 'user not found':
        return '账户密码不正确';
      case 'unauthorized':
        return '账户密码不正确';
      case 'invalid_client':
        return '无效的客户端登录';
      case 'invalid_grant':
        return '用户已经被禁用';
      default:
        return '';
    }
  };
}