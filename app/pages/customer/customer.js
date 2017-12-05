'use strict';

import CustomerListsCtrl from './controller/customerLists.js'
import CustomerDetailCtrl from './controller/customerDetail.js'
import addStoreCtrl from './controller/addStore.js'
import AddCompCtrl from './controller/addComp.js'
import CompDetailCtrl from './controller/compDetail.js'

import CusService from './service/cusService.js'
import CompService from './service/compService.js'
//导入echart指令
import Echart from '../../common/directive/mapDirective.js'

export default angular.module('customer',[Echart])
.controller('customerLists',CustomerListsCtrl)
.controller('customerDetailCtrl',CustomerDetailCtrl)
.controller('AddStoreCtrl',addStoreCtrl)
.controller('AddCompCtrl',AddCompCtrl)
.controller('CompDetailCtrl',CompDetailCtrl)
.service('CusService',CusService)
.service('CompService',CompService)
.name