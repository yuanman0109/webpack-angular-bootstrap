export default class UserListsCtrl{
    constructor($http){
        this.totalItems =70;
        this.$http=$http;
    }
    addAccount(){
        this.$http({
            url:'http://10.15.111.5:8080/user/list.htm',
            method:'GET'
        }).then(function(data){
            console.log(data);
        },function(err){
            console.log(err);
        })
    }
    pageChanged() {
        console.log('Page changed to: ' + this.currentPage);
    };
}
UserListsCtrl.$inject=['$http']