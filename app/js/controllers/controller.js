import angular from 'angular';
import UserListsCtrl from './userLists.js';
import ModalDemoCtrl from './networkManagerCtrl.js';
export default angular.module('ControllerModule',[])
.controller('userListsCtrl',UserListsCtrl)
.controller('ModalDemoCtrl',ModalDemoCtrl)
.name