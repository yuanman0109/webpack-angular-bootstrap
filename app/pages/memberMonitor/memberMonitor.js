'use strict';
import monitorService from './service/monitor.service';
import stateChange from './filter/stateChange';

export default angular.module('memberMonitor', [])
  .service('monitorService', monitorService)
  .filter('couponType', () => {
    return stateChange.couponType;
  })
  .filter('couponStatus', () => {
    return stateChange.couponStatus;
  })
  .name;