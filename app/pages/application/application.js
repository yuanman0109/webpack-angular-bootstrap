'use strict';

import AppService from './service/appService.js';
import problemFeedbackService from './service/problemFeedback.service';
import msgService from './service/msgService';
import winmsd from './filter/winmsdScale';
import faqFilter from './filter/faqFilter';
import addRespErrMsg from './filter/respErrMsg';
import problemFeedback from './filter/problemFeedback.filter';
import SelAllApp from './directive/selallApp';
import SelMsgType from './directive/selMsgType';

export default angular.module('application', [])
  .service('problemFeedbackService', problemFeedbackService)
  .service('AppService', AppService)
  .service('MsgService', msgService)
  .filter('winmsd', winmsd)
  .filter('addRespErrMsg', addRespErrMsg)
  .filter('problemFeedbackType', () => {
    return problemFeedback.problemFeedbackType;
  })
  .filter('faqFilterName', () => {
    return faqFilter.faqFilterName;
  })
  //所有应用产品选择器
  .directive('selAllapp', () => { return new SelAllApp(); })
  //消息类型选择器
  .directive('selMsgType', () => { return new SelMsgType(); })
  .name;