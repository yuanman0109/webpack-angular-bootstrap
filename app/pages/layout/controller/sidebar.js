  'use strict';
  const _init_ = Symbol('_init_');

  export default class sidebar {
    constructor($scope, $rootScope, $state, $stateParams, $http, $filter, PublicServer) {
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.PublicServer = PublicServer;
      this.$filter = $filter;
      this[_init_]();
    }[_init_]() {
      let _that = this;
      _that.$rootScope.sidebarBt = false;
      _that.$scope.isShowMenuList = false;
      _that.$rootScope.isLoading = false;
      //判断操作系统
      const os = window.navigator.platform.substring(0, 3);
      if (os === 'Win') {
        _that.isWin = true;
      } else {
        _that.isWin = false;
      }
    }
    
    sidebarSwitch() {
      this.$scope.isShowMenuList = !this.$scope.isShowMenuList;
      this.$rootScope.sidebarBt = !this.$rootScope.sidebarBt;
    }
  }
  sidebar.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$http',
    '$filter',
    'PublicServer'
  ];