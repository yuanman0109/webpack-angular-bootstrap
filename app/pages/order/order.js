'use strict';
import orderService from './service/order.service';
import OrderRespErrMsg from './filter/respErrMsg';
import orderErrMsg from './filter/orderErrMsg';
import orderUpload from './filter/orderUpload';
import stateChange from './filter/stateChange';

export default angular.module('order', [])
  .service('orderService', orderService)
  .filter('OrderRespErrMsg', OrderRespErrMsg)
  .filter('orderErrMsg', orderErrMsg)
  .filter('orderUpload', orderUpload)
  .filter('stateChange', stateChange)
  .name;