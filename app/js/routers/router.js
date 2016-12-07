var router=function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.
    state('page1',{
        url:"/page1",
        templateUrl:'/app/views/page1.html'
    }).
    state('page2',{
        url:"/page2",
        templateUrl:'/app/views/page2.html'
    })
};
export default router;