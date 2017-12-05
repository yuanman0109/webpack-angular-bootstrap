var advertRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    //广告管理相关路由
    .state('advert', {
      abstract: true,
      url: '/advert',
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
                let module = require('../advert');
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
    // 广告列表
    .state('advert.advertList', {
      url: '/advertList',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/advertList.html');
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
                // load whole module
                let module = require('../controller/advertList');
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
    // 添加广告
    .state('advert.addAdvert', {
      url: '/addAdvert',
      breadcrumb: '添加广告',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addAdvert.html');
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
                // load whole module
                let module = require('../controller/addAdvert');
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
    // 修改广告
    .state('advert.modifyAdvert', {
      url: '/modifyAdvert?id',
      breadcrumb: '修改广告',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addAdvert.html');
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
                // load whole module
                let module = require('../controller/addAdvert');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve(module.controller);
              });
            });
          }
        ]
      }
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
advertRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default advertRouter;