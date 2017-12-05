var attendanceRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    //考勤管理相关路由  -->  现在考勤管理
    .state('attendance', {
      abstract: true,
      url: '/attendance',
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
                let module = require('../attendance');
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
    // 打卡报表
    .state('attendance.list', {
      url: '/list?userName&deptName&imei&punchType&pageNo&startTime&endTime',
      controller: 'attendanceListCtrl',
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

    .state('attendance.set', {
      url: '/setList?attendanceName&pageNo',
      controller: 'attendanceSetCtrl',
      controllerAs: 'ctrl',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/setList.html'));
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
                let module = require('../controller/setList.js');
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
    //添加考勤
    .state('attendance.addAttendance', {
      url: '/addAttendance',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addAttendance.html'));
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
                let module = require('../controller/addAttendance.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '新建考勤打卡设置'
    })
    //修改考勤组
    .state('attendance.modifyAttendance', {
      url: '/modifyAttendance?id',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addAttendance.html'));
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
                let module = require('../controller/addAttendance.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '编辑考勤打卡设置'
    })
    //考勤组详情
    .state('attendance.attendanceDetail', {
      url: '/attendanceDetail?id&pageType',
      templateProvider: [
        '$q', ($q) => {
          let deferred = $q.defer();
          require.ensure([], function() {
            deferred.resolve(require('../views/addAttendance.html'));
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
                let module = require('../controller/addAttendance.js');
                $ocLazyLoad.load({
                  name: module.default
                });
                resolve();
              });
            });
          }
        ]
      },
      breadcrumb: '考勤打卡设置详情'
    });
};
//注入一定要加，否则压缩js会报错，其他服务同样
attendanceRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default attendanceRouter;