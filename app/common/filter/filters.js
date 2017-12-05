import angular from 'angular';
import btnCode from './button/btnCode';
import menuState from './router/menuState';
import menuCode from './router/menuCode';
import menuIcon from './router/menuIcon';
import respErrMsg from './response/respErrMsg';
import respCodeMsg from './response/respCodeMsg';
import respUploadMsg from './response/respUploadMsg';
import maxString from './maxstring/maxString.js';
export default angular.module('filter', [])
  //按钮code
  .filter('btnCode', btnCode)
  //菜单State
  .filter('menuState', menuState)
  //菜单code
  .filter('menuCode', menuCode)
  //菜单Icon
  .filter('menuIcon', menuIcon)
  // respErrMsg
  .filter('respErrMsg', respErrMsg)
  // respCodeMsg
  .filter('respCodeMsg', respCodeMsg)
  // respUploadMsg
  .filter('respUploadMsg', respUploadMsg)
  //自定义筛选 
  .filter('imgUrl', function() {
    return function(value) {
      if (value) {
        var imgurl = '/file/image?code=' + value;
        return imgurl;
      } else {
        return null;
      }
    };
  })
  .filter('imgUrlWithToken', function() {
    return function(value) {
      if (value) {
        var imgurl = value + '?access_token=' + localStorage.token + '&action=PREVIEW';
        return imgurl;
      } else {
        return null;
      }
    };
  })
  //千分之
  .filter('thousandth', function() {
    return function(val) {
      if (val) {
        return val / 1000;
      } else {
        return null;
      }
    };
  })
  // 最大字符串
  .filter('maxString', maxString)
  .name;