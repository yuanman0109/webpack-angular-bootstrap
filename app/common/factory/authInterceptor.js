export default function authInterceptor($q, $location) {
  return {
    request: function(config) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      if (isRap) {
        if (/\/api/.test(config.url) || /\/sso/.test(config.url)) {
          config.headers['Authorization'] = 'Bearer' + localStorage.token || '';
        }
      } else {
        config.headers['Authorization'] = 'Bearer' + localStorage.token || '';
      }
      return config;
    },
    response: function(response) {
      if (response.data.code === 'S401') {
        console.log('token失效，您需要重新登录！');
        localStorage.clear();
        sessionStorage.clear();
        $location.path('/login');
      }
      return response;
    },
    responseError: function(rejection) {
      if (rejection.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        $location.path('/login');
      } else if (rejection.status === 504) {
        console.log('网关超时');
      }
      return $q.reject(rejection);
    }
  };
}