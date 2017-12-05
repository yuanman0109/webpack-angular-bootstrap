export default function LoadingInterceptor($q, $rootScope, $timeout) {
  return {
    response: function(response) {
      for (var i = 0; i < $rootScope.initUrl.length; i++) {
        if (response.config.url === $rootScope.initUrl[i]) {
          $rootScope
            .initUrl
            .splice(i, 1);
          break;
        }
      }
      if ($rootScope.initUrl.length === 0 && $rootScope.isLoading) {
        $timeout(function() {
          $rootScope.isLoading = false;
        }, 1000);
      }
      return response;
    },
    responseError: function(response) {
      for (var i = 0; i < $rootScope.initUrl.length; i++) {
        if (response.config.url === $rootScope.initUrl[i]) {
          $rootScope
            .initUrl
            .splice(i, 1);
          break;
        }
      }
      if ($rootScope.initUrl.length === 0 && $rootScope.isLoading) {
        $timeout(function() {
          $rootScope.isLoading = false;
        }, 1000);
      }
      return $q.reject(response);
    }
  };
}