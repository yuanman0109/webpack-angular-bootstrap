import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'ui-select';
import 'oclazyload';
import $script from 'scriptjs';
//toast插件
import '../node_modules/angularjs-toaster/toaster.min.js';
import '../node_modules/angularjs-toaster/toaster.min.css';

//  style 文件
import './style/style.less';

//导入文件上传模块
import 'ng-file-upload';

// config  配置路由
import ngRouter from './router/router';

// config 登录处理
import ngConfig from './common/config/config';

// 总controller控制器  主入口appCtrl 、公共指令cityLinkCtrl
import controllers from './common/controller/controllers.js';

// Service服务 基础配置服务 PublicService
import Services from './common/service/services.js';

// Directive自定义指令
import Directives from './common/directive/directives.js';

// Filter过滤器
import Filters from './common/filter/filters.js';

// factory工厂模块  认证 authInterceptor 路由权限
import factorys from './common/factory/factorys';

//日历中文包
import ngLocale from './common/utils/ngLocale/ngLocale';

// ngRun
import ngRun from './common/ngRun/ngRun';

import StackdriverErrorReporter from 'common/factory/stack-errors';

//图片预览弹窗
require('./common/utils/ImgModal/index'); 

if (isBulidTest) {
  let StackdriverErrors = new StackdriverErrorReporter();
  StackdriverErrors.start({
    key: version,
    projectId: 'bss',
    baseAPIUrl: 'http://10.10.1.14:6003/projects/',
    service: 'angular_out',
    emails: ['zhutiegen@niwodai.net']   
  });
}
//ckeditor路径
window.CKEDITOR_BASEPATH = '/ckeditor/';
// $sanitize服务
let sanitize = require('angular-sanitize');
let injectArr = ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngFileUpload', 'ivh.treeview', 'oc.lazyLoad', sanitize, 'ui.select', 'toaster', Directives, Services, Filters, factorys, ngLocale, ngRouter, ngConfig, controllers, ngRun, 'imgModal'];

if (isRap) {
  //ng-rap插件，上线时移除(此处只能用require，不能用import)
  require('../node_modules/ng-rap/index.js');
  injectArr.push('ngRap');
};
window.$script = $script;
angular.module('app', injectArr);
// ng-rap配置
if (isRap) {
  // var app = angular.module('app', injectArr);
  // app.config([
  //   '$httpProvider',
  //   'ngRapProvider',
  //   function($httpProvider, ngRapProvider) {
  //     ngRapProvider.script = 'http://10.10.1.11:8090/rap.plugin.js?projectId=14'; // replce your host and project id
  //     ngRapProvider.enable({ mode: 3 });
  //     $httpProvider
  //       .interceptors
  //       .push('rapMockInterceptor');
  //   }
  // ])
}