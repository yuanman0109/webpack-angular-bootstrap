var toolRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    // 工具中心相关路由
    .state('tool', {
      abstrate: true,
      url: '/tool',
      parent: 'root',
      views: {
        'main@': {
          template: require('../../../common/views/common.html')
        }
      },
      resolve: {
        loadController: [
          '$q',
          '$ocLazyLoad',
          ($q, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                // load whole module
                let module = require('../tool');
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
    // 支付订单查询
    .state('tool.payment', {
      url: '/payment',
      controller: 'toolPaymentCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/payment.html'));
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
                //load payment module
                let module = require('../controller/payment.js');
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
    //集成登录
    .state('tool.integrate', {
      url: '/integrate',
      controller: 'toolInteCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/integrate.html'));
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
                // load integrate
                let module = require('../controller/integrate.js');
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
    //快餐列表
    .state('tool.fastFood', {
      url: '/fastFood?status&type&payType&pageNo&storeId&shopName&no&beginTime&endTime',
      controller: 'fastFoodCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/fastFood.html'));
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
                //load controller
                let module = require('../controller/fastFood.js');
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
    //支付订单列表
    .state('tool.payOrderList', {
      url: '/payOrderList?channel&payType&pageNo&shopId&shopName&search&payedTimeStart&payedTimeEnd',
      controller: 'payOrderListCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/payOrderList.html'));
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
                //load controller
                let module = require('../controller/payOrderList.js');
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
    //快餐列表详情
    .state('tool.fastFoodDetail', {
      url: '/fastFoodDetail/:id/:storeId',
      controller: 'fastFoodDetailCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/fastFoodDetail.html'));
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
                let module = require('../controller/fastFoodDetail');
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
    //支付订单详情
    .state('tool.payOrderDetail', {
      url: '/payOrderDetail/:id',
      controller: 'payOrderDetailCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/payOrderDetail.html'));
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
                let module = require('../controller/payOrderDetail');
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

toolRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default toolRouter;