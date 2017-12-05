export default angular
  .module('ngRun', [])
  .run([
    '$filter',
    '$rootScope',
    '$state',
    '$stateParams',
    'PublicServer',
    'permissions',  
    'MenuActive', 
    function($filter, $rootScope, $state, $stateParams, PublicServer, permissions, MenuActive) {  
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //如果是login、forgetPass、resetPassword、noAccess页面，直接退出
        if (toState.name === 'login' || toState.name.startsWith('forgetPass') || toState.name.startsWith('resetPassword') || toState.name === 'noAccess') {          
          return;
        }
        if ($rootScope.menutData) {
          if (!goPage(toState.name)) {
          //无权限  阻止默认跳转
            event.preventDefault();
          } else {
          //有权限，更新（记录）跳转路由为上一页路由
            sessionStorage.prevPage = toState.name; 
            $rootScope.prevPageParams = toParams;
          }
          console.log('已经登录过');
        } else {
          console.log('并没有登录过，或者登录过，但是直接刷新了当前页面');
          //没有菜单数据，阻止默认跳转，更新（记录）跳转路由为上一页路由，跳转登录后自动跳转
          sessionStorage.prevPage = toState.name; 
          $rootScope.prevPageParams = toParams;
          event.preventDefault();
          $state.go('login');
        };         
      });
      function goPage(name) { 
        //如果路由名为noAccess（后端自动跳转无权限单页），允许跳转 
        if (name === 'noAccess' || 'messageCenter') {
          return true;
        } else {
        // 返回是否有权限
          return permissions.hasPermission(name);
        }
      };
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.stateName = toState.name;
        $rootScope.breadcrumb = toState.breadcrumb;
        //设置菜单高亮
        MenuActive.setMenuOpen(toState.name);
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) { 
        event.preventDefault();        
        if (error.authorized) {
          //如果有上一页 则跳转到上一页 && 设置菜单高亮 
          if (sessionStorage.prevPage && goPage(sessionStorage.prevPage)) {            
            try {       
              $state.go(sessionStorage.prevPage, $rootScope.prevPageParams); 
              MenuActive.setMenuOpen(sessionStorage.prevPage);
            } catch (e) {              
              localStorage.clear();
              sessionStorage.clear();
              $state.go('login');
            }
          } else {
            // 如果没有上一页，则跳转默认页
            if ($rootScope.defaultPage === 'login') {
              localStorage.clear();
            }
            
            $state.go($rootScope.defaultPage);
          }
        }
      });
    }
  ])
  .name;