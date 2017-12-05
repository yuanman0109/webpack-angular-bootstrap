var configCenterRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    //支付管理相关路由
    .state('configCenter', {
      abstract: true,
      url: '/configCenter',
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
                    // load whole module
                    let module = require('../configCenter');
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

    // 支付审核详情
    .state('configCenter.paymentVerifyDetails', {
      url: '/paymentVerify/:id',
      controller: 'PaymentVerifyDetailsCtrl as ctrl',
      params: {'tabIndex': {}},
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/verifyDetails.html');
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
                let module = require('../controller/verifyDetails');
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
    // 支付审核 支付进件审核
    .state('configCenter.paymentVerify', {
      url: '/paymentVerify?searchWord&tabIndex&status&pageNo&cityCode&businessLinkman&businessLinkmanMobile&ownerCardNo&businessLicenseNo&applicantUser&isNewAdd&settleMethod&connectionOrg&selDisabled&bankCardNo&beginDate&endDate&auditBeginTime&auditEndTime',
      // params: {'tabIndex': {}},
      controller: 'PaymentVerfiyCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/verifyList.html');
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
                let module = require('../controller/verify');
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
    // 支付审核详情 更多辅助
    .state('configCenter.moreAssist', {
      url: '/moreAssist/:id',
      controller: 'MoreAssistCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/moreAssist.html');
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
                let module = require('../controller/moreAssist');
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
    // 支付二维码
    .state('configCenter.qrcode', {
      url: '/qrcode',
      controller: 'PaymentQrcodeCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/qrcodeList.html');
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
                let module = require('../controller/qrcode.js');
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

    // 支付模板添加
    .state('configCenter.templateAdd', {
      url: '/template/add',
      controller: 'PaymentTemplateDetailsCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/templateDetails.new.html');
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
                let module = require('../controller/templateDetails');
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

    // 支付模板更新
    .state('configCenter.templateUpdate', {
      url: '/template/:id',
      controller: 'PaymentTemplateDetailsCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/templateDetails.new.html');
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
                let module = require('../controller/templateDetails');
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

    // 支付模板
    .state('configCenter.template', {
      url: '/template?pageNo&businessId&type&name',
      controller: 'PaymentTemplateCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/templateList.new.html');
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
                let module = require('../controller/template');
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
    // 餐厅列表
    .state('configCenter.restaurantList', {
      url: '/restaurant?pageNo&searchStr&brandName',
      controller: 'RestaurantListCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/restaurantList.html');
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
                let module = require('../controller/restaurantList');
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
    //支付配置
    .state('configCenter.paymentConfigList', {
      url: '/paymentConfig/:storeId',
      controller: 'paymentConfigListCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/paymentConfigList.html');
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
                let module = require('../controller/paymentConfigList');
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
    //支付配置详情
    .state('configCenter.paymentConfigDetail', {
      url: '/paymentConfigDetail/:storeId/:id',
      controller: 'paymentConfigDetailCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/paymentConfigDetail.html');
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
                let module = require('../controller/paymentConfigDetail');
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
    // 快餐进件
    .state('configCenter.fastFoodList', {
      url: '/fastFood?applicat&applicationEndTime&applicationStartTime&auditEndTime&auditStartTime&auditUserId&cityCode&name&pageNo&pageSize&status&tabIndex',
      controller: 'FastFoodListCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/fastFoodList.html');
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
                let module = require('../controller/fastFood');
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
    // 快餐进件详情
    .state('configCenter.fastFoodDetails', {
      url: '/fastFoodDetail/:id',
      params: {'tabIndex': {}},
      controller: 'fastFoodDetailCtrl as ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/fastFoodVerifyDetail.html');
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
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
configCenterRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default configCenterRouter;