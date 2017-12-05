'use strict';

import ResetPasswordCtrl from './controller/resetPasswordCtrl';
import ResetPasswordCtrlTwo from './controller/resetPasswordCtrl_2';
import ResetPasswordService from './service/resetPasswordService';

export default angular.module('resetPassword', [])
  .controller('ResetPasswordCtrl', ResetPasswordCtrl)
  .controller('ResetPasswordCtrlTwo', ResetPasswordCtrlTwo)
  .service('ResetPasswordService', ResetPasswordService)
  .name;