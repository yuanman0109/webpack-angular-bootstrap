'use strict';
import ChargesOrderService from './service/chargesOrderService.js';
import ChargesConfigService from './service/chargesConfigService.js';
import TrialOrdersService from './service/trialOrdersService';
import chargeStatus from './filter/statusFilter.js';
export default angular.module('manageOrder', [])
  .service('ChargesOrderService', ChargesOrderService)
  .service('ChargesConfigService', ChargesConfigService)
  .service('TrialOrdersService', TrialOrdersService)
  .filter('statusFilter', () => {
    return chargeStatus.statusFilter;
  })
  .filter('payTypeFilter', () => {
    return chargeStatus.payTypeFilter;
  })
  .filter('topMenuFilter', () => {
    return chargeStatus.topMenuFilter;
  })
  .filter('configTopFilter', () => {
    return chargeStatus.configTopFilter;
  })
  .filter('businessTypeFilter', () => {
    return chargeStatus.businessTypeFilter;
  })
  .filter('validPeriodFilter', () => {
    return chargeStatus.validPeriodFilter;
  })
  .filter('validHttpCode', () => {
    return chargeStatus.validHttpCode;
  })
  .name;