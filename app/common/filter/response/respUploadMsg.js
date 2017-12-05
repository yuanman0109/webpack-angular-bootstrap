// respCode
export default function respUploadMsg() {
  return function(code) {
    switch (code) {
      case 'FILE_OO1':
        return '文件不能为空';
      case 'FILE_OO2':
        return '所校验的类型不存在';
      case 'FILE_OO3':
        return '文件大小超限';
      case 'FILE_OO4':
        return '文件类型不正确';
      case 'FILE_OO5':
        return '文件高宽不符合范围';
      default:
        return '';
    }
  };
}