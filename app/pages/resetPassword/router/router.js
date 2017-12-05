var resetPasswordRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider.state('resetPassword', {
    abstract: true,
    url: '/resetPassword',
    'header@': {},
    'sidebar@': {},
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
              let module = require('../resetPassword');
              $ocLazyLoad.load({
                name: 'resetPassword'
              });
              resolve(module.controller);
            });
          });
        }
      ]
    }
  }).state('resetPassword.step1', {
    url: '/step_1',
    controller: 'ResetPasswordCtrl',
    controllerAs: 'ctrl',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer();
        require.ensure([], function() {
          let template = require('../views/resetPassword_1.html');
          deferred.resolve(template);
        });
        return deferred.promise;
      }
    ]
  }).state('resetPassword.step2', {
    url: '/step_2',
    controller: 'ResetPasswordCtrlTwo',
    controllerAs: 'ctrl',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer();
        require.ensure([], function() {
          let template = require('../views/resetPassword_2.html');
          deferred.resolve(template);
        });
        return deferred.promise;
      }
    ]
  });
};
resetPasswordRouter.$inject = ['$urlRouterProvider', '$stateProvider'];
export default resetPasswordRouter;