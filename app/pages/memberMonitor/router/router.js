var monitorRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
  // 会员监控相关路由
    .state('memberMonitor', {
      abstract: true, //为所有子状态提供一个基URL
      url: '/memberMonitor',
      parent: 'root', //指定父子状态关系
      views: {
        'main@': {
          template: require('../../../common/views/common.html')          
        }
      },
      // resolve在state配置参数中，是一个对象，每个value都是一个可以赖得注入函数，并且返回一个promise
      resolve: {
        loadController: [
          '$q',
          '$ocLazyLoad',
          ($q, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                // load whole module
                let module = require('../memberMonitor');
                $ocLazyLoad.load({
                  name: 'memberMonitor'
                });
                resolve(module.controller);
              });
            });
          }
        ]
      }
    })
    // 发券记录
    .state('memberMonitor.voucher', {
      url: '/voucher',
      controller: 'voucherCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/voucher.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ],
      resolve: {
        loadController: [
          '$q',
          '$ocLazyLoad',
          ($q, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                let module = require('../controller/voucher');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      }
    })
    // 验券记录
    .state('memberMonitor.testCoupon', {
      url: '/testCoupon',
      controller: 'testCouponCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/testCoupon.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ],
      resolve: {
        loadController: [
          '$q',
          '$ocLazyLoad',
          ($q, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                let module = require('../controller/testCoupon');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      }
    });
};
// 注入一定要加入，不然压缩的时候会变更
monitorRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default monitorRouter;