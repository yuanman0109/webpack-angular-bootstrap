import AuthInterceptor from './authInterceptor';
import LoadingInterceptor from './loadingInterceptor';
import StackdriverErrorReporter from 'common/factory/stack-errors';
export default angular.module('factorys', [])
  .factory('loadingInterceptor', ['$q', '$rootScope', '$timeout', LoadingInterceptor])
  .factory('authInterceptor', ['$q', '$location', AuthInterceptor])
  .factory('permissions', ['$state', '$filter', '$rootScope', '$location', function($state, $filter, $rootScope, $location) {
    return {
      hasPermission: function(state) {
        let menutDataArr = $rootScope.menutData,
            btnDataArr = $rootScope.btnData;
            
        /**
         * 定义用户权限的数组
         * 添加菜单列表权限
         *  添加按钮权限
         */
        let permissionList = [];
        angular.forEach(menutDataArr, function(vule, index) {
          permissionList.push(vule.code);
          angular.forEach(vule.children, function(v, i) {
            permissionList.push(v.code);
          });
        });
        angular.forEach(btnDataArr, function(vule, index) {
          permissionList.push(vule.code);
        });       
        /**
         * 匹配路由state是否菜单权限       
         */
           
        var permissionMenuCode = $filter('menuCode')(state);
        var permissionBtnCode = $filter('btnCode')(state);  
        $rootScope.MenuCode = permissionMenuCode || permissionBtnCode; 

        if (permissionList.indexOf(permissionMenuCode) === -1 && permissionList.indexOf(permissionBtnCode) === -1) {
          return false;
        } else {          
          return true;
        }
      }
    };
  }])
  .factory('MenuActive', ['$filter', '$rootScope', ($filter, $rootScope) => {
    return {
      // 设置菜单高亮展开
      setMenuOpen: function(state) {
        if (!$rootScope.menutData) {
          return false;
        };
        // 获取选择菜单高亮的code
        let permissionMenuCode = $filter('menuCode')(state);
        let permissionBtnCode = $filter('btnCode')(state);  
        $rootScope.MenuCode = permissionMenuCode || permissionBtnCode;  
        // 遍历菜单目录，获取高亮菜单index
        let index = $rootScope.menutData.findIndex(function(value, index, arr) {
          if (state) {
            if ($rootScope.MenuCode.includes('ORDER_MGR') && value.code === 'ORDER') {
              return false;
            } else {
              return $rootScope.MenuCode.includes(value.code);
            }
          } else {
            return false;
          }
        }); 
        // 设置高亮的菜单属性isopen = true
        if (index === -1) {
          $rootScope.menutData[0].isopen = true;
        } else {
          $rootScope.menutData[index].isopen = true;
        }
      }
    };
  }])
  .factory('$exceptionHandler', ['$log', function($log) {
    var StackdriverErrors = new StackdriverErrorReporter();
    StackdriverErrors.start({
      projectId: 'bss',
      reportUncaughtExceptions: false,
      service: 'angular_inner',
      key: version,
      baseAPIUrl: 'http://10.10.1.14:6003/projects/',
      emails: ['zhutiegen@niwodai.net', '987257981@qq.com']
    });    
    return function(exception, cause) {
      if (isBulidTest) {
        StackdriverErrors.report(exception);
      }            
      $log.error('Reported error:', exception, cause);
    };
  }])
  .name;