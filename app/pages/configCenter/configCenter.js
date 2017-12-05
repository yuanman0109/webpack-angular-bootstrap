'use strict';

import paymentQrcodeService from './service/qrcodeService';
import paymentTemplateService from './service/templateService';
import PaymentConfigService from './service/paymentConfigService';
import vertifyService from './service/vertify';
import FastFoodVerifyService from './service/fastFoodVerifyService';
import RestaurantService from './service/restaurantService';
import VertifyTable from './directive/vertifyTable';
import QrcodeTabUl from './directive/qrcodeTabUl';
import FastFoodTable from './directive/fastFoodTable';
import ImgOnLoad from './directive/imgOnLoad';
import Status from './filter/status';
import qrcodefilter from './filter/qrcodeRespErrMsg';
import uploadMsg from './filter/uploadTemp';
import template from './filter/template';
import FastFood from './filter/fastfood';
import PaymentConfig from './filter/paymentConfig';
import MiddImg from './filter/middImg';

export default angular.module('payment', [])
  .service('paymentQrcodeService', paymentQrcodeService)
  .service('paymentTemplateService', paymentTemplateService)
  .service('PaymentConfigService', PaymentConfigService)
  .service('vertifyService', vertifyService)
  .service('FastFoodVerifyService', FastFoodVerifyService)
  .service('RestaurantService', RestaurantService)
  .filter('qrcodeType', () => {
    return qrcodefilter.qrcodeType;
  })
  .filter('qrcodeRespErrMsg', () => {
    return qrcodefilter.respErrMsg;
  })
  .filter('uploadMsg', uploadMsg)
  .filter('configStatusFilter', () => {
    return Status.statusFilter;
  })
  .filter('cardType', () => {
    return Status.cardType;
  })
  .filter('ownerType', () => {
    return Status.ownerType;
  })
  .filter('buzinessType', () => {
    return Status.buzinessType;
  })
  .filter('previewURL', () => {
    return Status.previewURL;
  })
  .filter('businessTypeFilter', () => {
    return template.businessTypeFilter;
  })
  .filter('businessTypeName', () => {
    return template.businessTypeName;
  })
  .filter('TemplType', () => {
    return template.TemplType;
  })
  .filter('FastFoodCaseStatus', () => {
    return FastFood.CaseStatus;
  })
  .filter('FastFoodStatus', () => {
    return FastFood.Status;
  })
  .filter('FastFoodLogStatus', () => {
    return FastFood.LogStatus;
  })
  .filter('FastFoodRespErrMsg', () => {
    return FastFood.RespErrMsg;
  })
  .filter('PaymentConnectionOrg', () => {
    return PaymentConfig.ConnectionOrg;
  })
  .filter('PaymentConnectionMode', () => {
    return PaymentConfig.ConnectionMode;
  })
  .filter('PaymentPayMode', () => {
    return PaymentConfig.PayMode;
  })
  .filter('PaymentConfigRespErr', () => {
    return PaymentConfig.RespErr;
  })
  .filter('MiddImg', MiddImg)
  .directive('vertifyTable', () => {
    return new VertifyTable();
  })
  .directive('qrcodeTabUl', () => {
    return new QrcodeTabUl();
  })
  .directive('fastFoodTable', () => {
    return new FastFoodTable();
  })
  .directive('imgonload', () => {
    return new ImgOnLoad();
  })
  .name;