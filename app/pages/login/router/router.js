var loginRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    views: {
      'header@': {},
      'sidebar@': {},
      'main@': {
        templateProvider: [
          '$q',
          function($q) {
            let deferred = $q.defer();
            require.ensure([], function() {
              let template = require('../views/login.html');
              deferred.resolve(template);
            });
            return deferred.promise;
          }
        ],
        resolve: {
          loadController: [
            '$q',
            '$ocLazyLoad',
            'PublicServer',            
            'LoginService',            
            '$rootScope',
            '$filter',
            ($q, $ocLazyLoad, PublicServer, LoginService, $rootScope, $filter) => {
              let deferred = $q.defer();
              if (localStorage.token) {
                //获取菜单权限列表
                PublicServer
                  .getMenu()
                  .then(data => {
                   // console.log(data);
                    $rootScope.menutData = data;                   
                    if ($rootScope.menutData.length) {
                      // 前端本地开放调试路由
                      // $rootScope.menutData.push({code: 'ATTENDANCE', id: null, isReferenced: null, name: '考勤管理', children: [{id: null, code: 'ATTENDANCE_01', name: '考勤打卡设置', isReferenced: null}, {id: null, code: 'ATTENDANCE_02', name: '考勤打卡报表', isReferenced: null}]});
            
                      LoginService.getpage($rootScope);                   
                     //获取按钮权限列表
                      PublicServer.getBtn().then(() => {
                        deferred.reject({
                          authorized: true
                        });
                      });
                    } else {
                      $rootScope.defaultPage = 'login';
                      deferred.reject({
                        authorized: true
                      });
                    }
                    console.log($rootScope.menutData);
                  }, () => {
                    require.ensure([], () => {
                      let module = require('../login.js');
                      $ocLazyLoad.load({
                        name: module.default
                      });
                      deferred.resolve(true);
                    });
                  });
              } else {
                require.ensure([], () => {
                  let module = require('../login.js');
                  $ocLazyLoad.load({
                    name: module.default
                  });
                  deferred.resolve(true);
                });
              }
              return deferred.promise;
            }
          ]
        }
      }
    }
  });
};
//注入一定要加，否则压缩js会报错，其他服务同样
loginRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default loginRouter;