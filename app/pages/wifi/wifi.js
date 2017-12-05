'use strict';

import DevMonitorCtrl from './controller/devMonitor'
import StoreModelCtrl from './controller/storeModel'
import networkManagerCtrl from './controller/networkManagerCtrl'
import StoreDetailCtrl from './controller/storeDetail'

import DevMService from './service/devMService'
import StoreMService from './service/storeMService'
export default angular.module('wifi',[])
.controller('DevMonitorCtrl',DevMonitorCtrl)
.controller('StoreModelCtrl',StoreModelCtrl)
.controller('networkManagerCtrl',networkManagerCtrl)
.controller('StoreDetailCtrl',StoreDetailCtrl)
.service('DevMService',DevMService)
.service('StoreMService',StoreMService)
.name
 

