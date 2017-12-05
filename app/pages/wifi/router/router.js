var wifiRouter = function ($urlRouterProvider, $stateProvider) {
  $stateProvider
  // 工单中心相关路由
     
  //wifi管理相关路由
    .state('wifi', {
      abstract: true,
      url: '/wifi',
      parent: 'root',
      views: {
        'main@': {
          template: require('../../../common/views/common.html')
        }
      },
      resolve: {
        loadController: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
            // load whole module
              let module = require('../wifi');
              $ocLazyLoad.load({name: 'wifi'});
              resolve(module.controller);
            });
          });
        }
      }
    })
  // 设备模式
    .state('wifi.devMonitor', {
      url: '/devMonitor',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/devMonitor.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // wifi门店模式
    .state('wifi.storeModel', {
      url: '/storeModel',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/storeModel.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // wifi门店详情
    .state('wifi.storeDetail', {
      url: '/storeDetail',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/storeDetail.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 网络管理
    .state('wifi.networkManager', {
      url: '/networkManager',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/networkManager.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
wifiRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default wifiRouter;
