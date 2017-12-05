var manageOrderRouter = function ($urlRouterProvider, $stateProvider) {
  $stateProvider
    // 订单管理相关路由
    .state('manageOrder', {
      abstract: true,
      url: '/manageOrder',
      parent: 'root',
      views: {
        'main@': {
          template: require('../../../common/views/common.html'),
          resolve: {
            loadController: [
              '$q',
              '$ocLazyLoad',
              ($q, $ocLazyLoad) => {
                return $q((resolve) => {
                  require.ensure([], () => {
                    let module = require('../manageOrder');
                    $ocLazyLoad.load({
                      name: module.default
                    });
                    resolve();
                  });
                });
              }
            ]
          }
        }
      }
    })
// 服务费订单
    .state('manageOrder.chargesOrder', {
      url: '/chargesOrder?search&payType&status&pageNo&isChangePrice&orderStartTime&orderEndTime',
      controller: 'ChargesOrderCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();          
          require.ensure([], function() {
            let template = require('../views/chargesOrder.html');
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
                let module = require('../controller/chargesOrder');
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
    // 订单详情&&改价
    .state('manageOrder.orderDetail', {
      url: '/orderDetail/:orderId?pageType',
      controller: 'OrderDetailCtrl as ctrl',
      // breadcrumb: '已支付详情',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/orderDetail.html');
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
                let module = require('../controller/orderDetail');
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
// 服务费配置
    .state('manageOrder.chargesConfig', {
      url: '/chargesConfig?businessId&name&pageNo',
      controller: 'ChargesConfigCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/chargesConfig.html');
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
                let module = require('../controller/chargesConfig');
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
    // 新增服务费、编辑服务费、服务费配置详情
    .state('manageOrder.addCharges', {
      url: '/theCharges/:chargeId?pageType',
      controller: 'AddChargesCtrl as ctrl',
      // breadcrumb: '新增服务费',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addCharges.html');
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
                let module = require('../controller/addCharges');
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
    // 试用费设置
    .state('manageOrder.trialFee', {
      url: '/trialFee',
      controller: 'TrialFeeCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/trialFee.html');
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
                let module = require('../controller/trialFee');
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
   // 试用费订单
    .state('manageOrder.trialOrders', {
      url: '/trialOrders?search&payType&status&pageNo&payStartTime&payEndTime&orderStartTime&orderEndTime',
      controller: 'TrialOrdersCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/trialOrders.html');
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
                let module = require('../controller/trialOrders');
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
    // 试用费订单详情
    .state('manageOrder.trialOrderDetail', {
      url: '/trialOrderDetail/:id',
      controller: 'TrialOrderDetailCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/trialOrderDetail.html');
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
                let module = require('../controller/trialOrderDetail');
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

// 加入注入，否则压缩js会报错。
manageOrderRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default manageOrderRouter;