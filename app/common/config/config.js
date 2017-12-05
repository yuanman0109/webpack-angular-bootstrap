export default angular.module('ngConfig', [])
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .config([
    '$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
      $httpProvider.interceptors.push('authInterceptor');
    }
  ])
  .name;