var router=function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.
    state('userLists',{
        url:"/userLists",
        templateUrl:'/app/views/userLists.html'
    }).
    state('page2',{
        url:"/page2",
        templateUrl:'/app/views/page2.html'
    }).
    state('form',{
        url:'/form',
        templateUrl:'/app/views/form.html'
    })
};
export default router;