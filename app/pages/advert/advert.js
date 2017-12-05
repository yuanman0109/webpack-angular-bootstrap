'use strict';

import AdvRespErrMsg from './filter/respErrMsg';

import AdvertService from './service/advertService.js';
export default angular
  .module('advert', [])
  .service('AdvertService', AdvertService)
  .filter('AdvRespErrMsg', AdvRespErrMsg)
  .name;