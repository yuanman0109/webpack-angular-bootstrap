'use strict'
import ForgetPasswordCtrl from './controller/forgetPasswordCtrl'
import ForgetPwdService from './service/forgetPwd'
import EmailCodeErrMsg from './filter/EmailCodeErrMsg'
import ForgetCodeErrMsg from './filter/forgetCodeErrMsg'
export default angular
  .module('forgetPwd', [])
  .controller('ForgetPasswordCtrl', ForgetPasswordCtrl)
  .service('ForgetPwdService', ForgetPwdService)
  .filter('EmailCodeErrMsg', EmailCodeErrMsg)
  .filter('ForgetCodeErrMsg', ForgetCodeErrMsg)
  .name