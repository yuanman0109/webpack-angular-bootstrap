'use strict';
import UserService from './service/userService.js';
import RoleService from './service/roleService.js';
import roleErrMsg from './filter/roleErrMsg';
export default angular.module('account', [])
  .service('UserService', UserService)
  .service('RoleService', RoleService)
  .filter('RoleErrMsg', roleErrMsg)
  .name;