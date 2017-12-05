// email ERR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 400:
        return '邮件为空或邮件格式不对';
      case 404:
        return '此邮箱不存在';
      case 409:
        return '邮件已经发送，请不要在有效期内重复发送';
      case 500:
        return '邮件发送失败，请稍后重新发送';
      default:
        return '';
    }
  };
}