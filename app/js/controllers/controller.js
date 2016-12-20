import angular from 'angular'
import UserListsCtrl from './userLists.js'
import ModalDemoCtrl from './networkManagerCtrl.js'
import echartDirective from '../services/echarts-directive.js'
export default angular.module('ControllerModule',[echartDirective])
.controller('userListsCtrl',UserListsCtrl)
.controller('ModalDemoCtrl',ModalDemoCtrl)
.name