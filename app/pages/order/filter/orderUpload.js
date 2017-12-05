export default function orderUpload() {
  return function (input) {
    switch (input) {
      case 'FILE_OO1':
        return '文件不能为空';
      case 'FILE_OO2':
        return '所校验的类型不存在';
      case 'FILE_OO3':
        return '文件大小超限';
      case 'FILE_OO4':
        return '文件类型不正确*';
      case 'FILE_OO5':
        return '文件分辨率不符合规范';
      case 'BC101':
        return '已经存在该模板，请勿重复添加！';
      default:
        return '';
    }
  };
}