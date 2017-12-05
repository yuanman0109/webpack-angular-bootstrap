var forgetPwdRouter = function($urlRouterProvider, $stateProvider) {
  $stateProvider.state('forgetPass', {
    abstract: true,
    url: '/forgetPass',
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
              // load whole module
              let module = require('../forgetPwd.js')
              $ocLazyLoad.load({
                name: 'forgetPwd'
              })
              resolve(module.controller)
            })
          })
        }
      ]
    }
  }).state('forgetPass.step1', {
    url: '/step_1',
    controller: 'ForgetPasswordCtrl',
    controllerAs: 'ctrl',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer()
        require.ensure([], function() {
          let template = require('../views/forgetPass_1.html')
          deferred.resolve(template)
        })
        return deferred.promise
      }
    ]
  }).state('forgetPass.step2', {
    url: '/step_2',
    controller: 'ForgetPasswordCtrl',
    controllerAs: 'ctrl',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer()
        require.ensure([], function() {
          let template = require('../views/forgetPass_2.html')
          deferred.resolve(template)
        })
        return deferred.promise
      }
    ]
  }).state('forgetPass.step3', {
    url: '/step_3/:code',
    controller: 'ForgetPasswordCtrl',
    controllerAs: 'ctrl',
    code: '',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer()
        require.ensure([], function() {
          let template = require('../views/forgetPass_3.html')
          deferred.resolve(template)
        })
        return deferred.promise
      }
    ]
  }).state('forgetPass.step4', {
    url: '/step_4',
    controller: 'ForgetPasswordCtrl',
    controllerAs: 'ctrl',
    templateProvider: [
      '$q',
      function($q) {
        let deferred = $q.defer()
        require.ensure([], function() {
          let template = require('../views/forgetPass_4.html')
          deferred.resolve(template)
        })
        return deferred.promise
      }
    ]
  })
}
//注入一定要加，否则压缩js会报错，其他服务同样
forgetPwdRouter.$inject = ['$urlRouterProvider', '$stateProvider']
export default forgetPwdRouter