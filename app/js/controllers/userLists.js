export default class UserListsCtrl{
    constructor($http){
        this.totalItems =20;
        this.$http=$http;
    }
    addAccount(){
        this.$http({
            url:'http://10.15.111.5:8080/user/list.htm',
            method:'GET'
        }).success(function(data){
            console.log(data);
        }).error(function(){
            console.log('error');
        })
    }
    pageChanged() {
        console.log('Page changed to: ' + this.currentPage);
    };
}
UserListsCtrl.$inject=['$http']