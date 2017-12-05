var storeRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    //门店管理相关路由  -->  现在客户管理
    .state('store', {
      abstract: true,
      url: '/store',
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
                let module = require('../store');
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
    // 门店列表
    .state('store.list', {
      url: '/list?dishStyleCode&customerTypeCode&flag&status&attribution&searchStr&storeProperty&provinceCode&cityCode&districtCode&pageNo&beginTime&endTime',
      controller: 'storeListCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/list.html'));
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
                let module = require('../controller/list.js');
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
    //添加门店
    .state('store.addStore', {
      url: '/addStore',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addStore.html'));
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
                let module = require('../controller/addStore.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '添加门店'
    })
    //修改门店
    .state('store.modifyStore', {
      url: '/modifyStore?id',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addStore.html'));
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
                let module = require('../controller/addStore.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '修改门店'
    })
    //门店详情
    .state('store.storeDetail', {
      url: '/storeDetail?id&tabIndex',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/storeDetail.html'));
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
                let module = require('../controller/storeDetail.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '门店详情'
    })
    //添加企业
    .state('store.addComp', {
      url: '/addComp',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addComp.html'));
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
                let module = require('../controller/addComp.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '添加企业'
    })
    //修改企业
    .state('store.modifyComp', {
      url: '/modifyComp?id',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addComp.html'));
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
                let module = require('../controller/addComp.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '修改企业'
    })
    //企业模式
    .state('store.compList', {
      url: '/compList',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/compLists.html'));
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
                let module = require('../controller/compLists.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '企业列表'
    })
    //企业详情
    .state('store.compDetail', {
      url: '/compDetail?id',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/compDetail.html'));
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
                let module = require('../controller/compDetail.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '企业详情'
    })
    // 门店审核详情
    .state('store.verifyDetails', {
      url: '/verify/:id',
      controller: 'storeVerifyDetailsCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/verifyDetails.html'));
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
                let module = require('../controller/verifyDetails.js');
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
    // 门店审核  建店审核
    .state('store.verify', {
      url: '/verify?query',
      controller: 'storeVerifyCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/verifyList.html'));
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
                let module = require('../controller/verify.js');
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
    //客户管理  一键转店
    .state('store.changeStore', {
      url: '/changeStore',
      controller: 'ChangeStoreCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/changeStore.html'));
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
                let module = require('../controller/changeStore.js');
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
     // 联系人管理
    .state('store.manageList', {
      url: '/manageList',
      controller: 'storeManageListCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/manageList.html'));
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
                let module = require('../controller/manageList.js');
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
    // 私海列表
    .state('store.privateSeaList', {
      url: '/privateSeaList?serviceStatus&name&serviceUser&provinceCode&cityCode&districtCode&pageNo&startTime&endTime',
      controller: 'privateSeaListCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/privateSeaList.html'));
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
                let module = require('../controller/privateSeaList.js');
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
    //编辑私海
    .state('store.editPrivateSea', {
      url: '/editPrivateSea?id&businessId',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/editPrivateSea.html'));
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
                let module = require('../controller/editPrivateSea.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      }
      // breadcrumb: '添加门店'
    })
    // 线索列表
    .state('store.clueList', {
      url: '/clueList?clueStatus&city&provinceCode&source&searchStr&pageNo&beginTime&endTime',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/clueList.html'));
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
                let module = require('../controller/clueList.js');
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
    //编辑线索
    .state('store.editClue', {
      url: '/editClue?id',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/editClue.html'));
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
                let module = require('../controller/editClue.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      }
      // breadcrumb: '添加门店'
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
storeRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default storeRouter;