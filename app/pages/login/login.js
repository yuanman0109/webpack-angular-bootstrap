'use strict';
import LoginCtrl from './controller/loginCtrl.js';
import loginErrMsg from './filter/respErrMsg';
export default angular
  .module('Login', [])
  .controller('LoginCtrl', LoginCtrl)
  .filter('loginErrMsg', loginErrMsg)
  .name;