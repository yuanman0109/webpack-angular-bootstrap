var layoutRouter = function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider.state('root', {
    abstract: true,
    url: '',
    views: {
      'header': {
        templateProvider: [
          '$q',
          function($q) {
            let deferred = $q.defer();
            require.ensure([], function() {
              let template = require('../views/header.html');
              deferred.resolve(template);
            });
            return deferred.promise;
          }
        ],
        controller: 'header',
        controllerAs: 'ctrl',
        resolve: {
          loadController: [
            '$q',
            '$ocLazyLoad',
            ($q, $ocLazyLoad) => {
              return $q((resolve) => {
                require.ensure([], () => {
                  // load whole module
                  let module = require('../layout');
                  $ocLazyLoad.load({
                    name: 'layout'
                  });
                  resolve(module.controller);
                });
              });
            }
          ]
        }
      },
      'sidebar': {
        templateProvider: [
          '$q',
          function($q) {
            let deferred = $q.defer();
            require.ensure([], function() {
              let template = require('../views/sidebar.html');
              deferred.resolve(template);
            });
            return deferred.promise;
          }
        ],
        controller: 'sidebar',
        controllerAs: 'ctrl'
      }
    }
  })
  //广告管理相关路由
  .state('noAccess', {
    url: '/noAccess',
    parent: 'root',
    views: {
      'sidebar@': {},
      'main@': {
        templateProvider: ['$q', function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/noAccess.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }]
        // resolve: {
        //   loadController: ['$q', '$ocLazyLoad',
        //     ($q, $ocLazyLoad) => {
        //       return $q((resolve) => {
        //         require.ensure([], () => {
        //           // load whole module
        //           let module = require('../controller/noAccess');
        //           $ocLazyLoad.load({
        //             name: module.default
        //           });
        //           resolve();
        //         });
        //       });
        //     }
        //   ]
        // }
      }
    }
  })
  //消息中心相关路由
  .state('messageCenter', {
    url: '/messageCenter',
    parent: 'root',
    views: {
      // 'sidebar@': {},
      'main@': {
        templateProvider: ['$q', function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/messageCenter.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }],
        resolve: {
          loadController: ['$q', '$ocLazyLoad',
            ($q, $ocLazyLoad) => {
              return $q((resolve) => {
                require.ensure([], () => {
                  // load whole module
                  let module = require('../controller/messageCenter');
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
  });
};
//注入一定要加，否则压缩js会报错，其他服务同样
layoutRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default layoutRouter;