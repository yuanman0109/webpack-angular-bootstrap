var customerRouter = function ($urlRouterProvider, $stateProvider) {
  $stateProvider
    //客户管理相关路由
    .state('customer', {
      abstract: true,
      url: '/customer',
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
                let module = require('../customer');
                $ocLazyLoad.load({name: 'customer'});
                resolve(module.controller);
              });
            });
          }
        ]
      }
    })
  //客户管理列表
    .state('customer.customerLists', {
      url: '/customerLists',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/customerLists.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  //客户详情
    .state('customer.customerDetail', {
      url: '/customerDetail?id',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/customerDetail.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 添加门店
    .state('customer.addStore', {
      url: '/addStore',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/appendStore.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ],
      breadcrumb: '添加门店'
    })
  // 修改门店
    .state('customer.modifyStore', {
      url: '/modifyStore?id',
      breadcrumb: '修改门店',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/appendStore.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 客户管理
    .state('customer.customerManager', {
      url: '/customerManager',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/customerManager.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 添加企业
    .state('customer.addComp', {
      url: '/addComp',
      breadcrumb: '添加企业',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/addComp.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 修改企业
    .state('customer.modifyComp', {
      url: '/modifyComp?id',
      breadcrumb: '修改企业',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/addComp.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    })
  // 公司详情
    .state('customer.compDetail', {
      url: '/compDetail?id',
      templateProvider: [
        '$q',
        function ($q) {
          let deferred = $q.defer();
          require.ensure([], function () {
            let template = require('../views/compDetail.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ]
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
customerRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default customerRouter;
