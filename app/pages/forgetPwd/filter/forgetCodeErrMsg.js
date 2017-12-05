// ERR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 400:
        return '密码不能为空';
      case 404:
        return '验证码不存在或已经过期';
      default:
        return '';
    }
  };
}