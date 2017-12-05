// 显示图片600*600
export default function middImg() {
  return function (url) {
    let fileIndex = url.indexOf('/file/download/');
    let groupIndex = url.indexOf('/group1/');
    if (groupIndex > 0) {
      return url.replace(url.charAt(url.lastIndexOf('.')), '_600x600.');
    } else if (fileIndex > 0) {
      return url + '&width=600';
    }
  };
}