var applicationRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    //运营中心相关路由
    .state('application', {
      abstract: true,
      url: '/application',
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
                    let module = require('../application');
                    $ocLazyLoad.load({
                      name: 'application'
                    });
                    resolve(module.controller);
                  });
                });
              }
            ]
          }
        }
      }
    })
    .state('application.appList', {
      url: '/appList?name&displayVersion&pageNo&startTime&endTime',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/appLists.html');
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
                let module = require('../controller/appList');
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
    .state('application.appDetail', {
      url: '/appDetail?id',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/appDetail.html');
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
                let module = require('../controller/appDetail');
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
    .state('application.addApp', {
      url: '/addApp',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addApp.html');
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
                let module = require('../controller/addApp');
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
    // 意见反馈
    .state('application.feedback', {
      url: '/feedback?content&orgName&user&version&pageNo',
      controller: 'feedbackCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/feedback.html');
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
                // load feedback module
                let module = require('../controller/feedback');
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
    // 问题反馈
    .state('application.problemFeedback', {
      url: '/problemFeedback',
      controller: 'problemFeedbackCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q',
        function($q) {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/problemFeedback.html');
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
                // load feedback module
                let module = require('../controller/problemFeedback');
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
    .state('application.winmsd', {
      url: '/winmsd',
      controller: 'winmsdCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/winmsd.html');
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
              // load winmsd module
                let module = require('../controller/winmsd');
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
    .state('application.addMessage', {
      url: '/addMessage',
      controller: 'addMessageCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addMessage.html');
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
              // load addMessage module
              require.ensure([], () => {
                let module = require('../controller/addMessage');
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
    .state('application.msgDetail', {
      url: '/msgDetail/?id',
      controller: 'msgDetailCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/msgDetail.html');
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
              // load addMessage module
              require.ensure([], () => {
                let module = require('../controller/msgDetail');
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
    // FAQ列表
    .state('application.faqList', {
      url: '/faqList?ownerProduct&questionType&status&title&pageNo',
      controller: 'faqListCtrl as ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/faqList.html');
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
                let module = require('../controller/faqList');
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
    // 新增FAQ&&编辑FAQ
    .state('application.addFaq', {
      url: '/theFaq/:faqId?pageType',
      controller: 'addFaqCtrl as ctrl',      
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/addFaq.html');
            deferred.resolve(template);
          });
          return deferred.promise;
        }
      ],
      resolve: {
        loadController: [
          '$q',
          '$$animateJs',
          '$ocLazyLoad',
          ($q, $$animateJs, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                let module = require('../controller/addFaq');
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
    // FAQ问题类型
    .state('application.faqType', {
      url: '/faqType',
      controller: 'faqTypeCtrl as ctrl',      
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            let template = require('../views/faqType.html');
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
                let module = require('../controller/faqType');
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
applicationRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default applicationRouter;