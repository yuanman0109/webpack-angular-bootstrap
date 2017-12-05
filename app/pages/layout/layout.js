'use strict';
import header from './controller/header';
import sidebar from './controller/sidebar';
import HeaderService from './service/headerService';
import MessageTab from './directive/messageTab';
import messageType from './filter/messageType';
export default angular.module('layout', [])
  .controller('header', header)
  .controller('sidebar', sidebar)
  .service('HeaderService', HeaderService)
  .directive('messageTab', () => {
    return new MessageTab();
  })
  .filter('messageType', messageType)
  .name;