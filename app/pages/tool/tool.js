'use strict';
// import toolPaymentCtrl from './controller/payment';
// import toolInteCtrl from './controller/integrate';
import toolService from './service/tool.service';
import fastFoodOrder from './filter/fastFoodOrder';
export default angular.module('tool', [])
  // .controller('toolPaymentCtrl', toolPaymentCtrl)
  // .controller('toolInteCtrl', toolInteCtrl)
  .service('toolService', toolService)
  .filter('typeClass', () => {
    return fastFoodOrder.typeClass;
  })
  .filter('payTypeClass', () => {
    return fastFoodOrder.payTypeClass;
  })
  .filter('statusClass', () => {
    return fastFoodOrder.statusClass;
  })
  .name;