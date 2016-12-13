import './style/dashboard.scss';
import './style/comm.scss';
import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import routerconfig from './js/routers/router.js';
import controllerModule from './js/controllers/controller.js'
export default angular.module('app',['ui.router','ui.bootstrap','ngAnimate',controllerModule]).config(routerconfig)
// .run([
//       "$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
//         $rootScope.$state = $state;
//         return $rootScope.$stateParams = $stateParams;
//       }
// ])
.controller('appCtrl', function ($scope,$state,$stateParams) {
  $scope.$state=$state;
}).name