var router=function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.
    state('userLists',{
        url:"/userLists",
        templateUrl:'/app/views/userLists.html'
    }).
    state('roleManagerLists',{
        url:"/roleManagerLists",
        templateUrl:'/app/views/roleManagerLists.html'
    }).
    state('customerLists',{
        url:'/customerLists',
        templateUrl:'/app/views/customerLists.html'
    }).
    state('addStore',{
        url:'/addStore',
        templateUrl:'/app/views/addStore.html'
    }).
    state('networkManager',{
        url:'/networkManager',
        templateUrl:'/app/views/networkManager.html'
    })
};
export default router;