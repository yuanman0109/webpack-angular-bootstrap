'use strict';

import storeVerifyCtrl from './controller/verify';
import storeVerifyDetailsCtrl from './controller/verifyDetails';
import businessTypeCtrl from './controller/businessType';
import VerifyTable from './directive/verifyTable';
import coordinate from './directive/coordinate';
import businessType from './directive/businessType';
import storeService from './service/store.service';
import CusService from './service/cusService';
import CompService from './service/compService.js';
import ClueService from './service/clueService.js';
import storeRespErrMsg from './filter/respErrMsg';
import addStoreErrMsg from './filter/addStoreErrMsg';
import addCompErrMsg from './filter/addCompErrMsg';
import storeScale from './filter/scale';
// datetimepicker插件
import 'node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css';
import moment from 'node_modules/moment/moment.js';
import 'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js';
import 'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js';
window.moment = moment;
export default angular.module('store', ['ui.bootstrap.datetimepicker'])
  .controller('storeVerifyCtrl', storeVerifyCtrl)
  .controller('storeVerifyDetailsCtrl', storeVerifyDetailsCtrl)
  .controller('businessTypeCtrl', businessTypeCtrl)
  .directive('coordinate', ['DialogService', coordinate])
  .directive('businessType', businessType)
  .directive('verifyTable', () => {
    return new VerifyTable();
  })
  .service('storeService', storeService)
  .service('CusService', CusService)
  .service('CompService', CompService)
  .service('ClueService', ClueService)
  .filter('storeRespErrMsg', storeRespErrMsg)
  .filter('addStoreErrMsg', addStoreErrMsg)
  .filter('addCompErrMsg', addCompErrMsg)
  .filter('storeScale', storeScale)
  .name;