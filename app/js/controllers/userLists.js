export default class UserListsCtrl{
    constructor(){
        this.totalItems = 64;
        this.currentPage = 4;
        this.maxSize = 5;
        this.bigTotalItems = 175;
        this.bigCurrentPage = 1;
    }
    pageChanged() {
        console.log('Page changed to: ' + this.currentPage);
    };
}