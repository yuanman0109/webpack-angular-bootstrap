//定义私有方法_init_
const _init_ = Symbol('_init_');
export default class CustomerListsCtrl{
    constructor($http,$uibModal,CusService,basicConfig){
        this.$uibModal=$uibModal;
        this.CusService=CusService;
        this.basicConfig=basicConfig;
        this.totalItems=0;
        this.$http=$http;
        this.customerLists=[];
        this.provinceLists=[];
        this.cityLists=[];
        this.countyLists=[];
        this.dishesLists=[];
        this.typeLists=[];
        this.statusLists=[];
        this.isAsc=false;
        this.isDesc=false;
        this.sort=1;
        this.searchData={
            province:null,
            city:null,
            county:null,
            customerSource:null,
            customerType:null,
            deviceStatus:null,
            dishStyleCode:null,
            name:null,
            sortCol:null
        }
        this[_init_]();
    }
    [_init_](){
       this.getCustomerlists({pageNo:1});
       this.getDisheslist();
       this.getTypelist();
       this.getCusNetStatus();
    }
    //获取客户列表
    getCustomerlists(param,fn){
        let _that = this;
        param.pageSize=10;
        _that.CusService.getCustomerlists(param).then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.customerLists=data.data.data;
                _that.totalItems=data.data.totalRecords;
                console.log(_that.customerLists);
                if(fn) fn();
            })
        },_that.basicConfig.errorCallback)
    }
    //搜索
    searchCusList(fn){
        let _that=this;
        _that.searchData.pageNo=1;
        this.getCustomerlists(_that.searchData,fn);
    }
    //排序
    sortBt(){
        let _that=this;
        if(_that.sort==1){
            _that.searchData.sortCol='code_asc'
            _that.searchCusList(function(){
                _that.isAsc=true;
                _that.isDesc=false;
                _that.sort+=1;
            });
        };
        if(_that.sort==2){
            _that.searchData.sortCol='code_desc'
            _that.searchCusList(function(){
                _that.isAsc=false;
                _that.isDesc=true;
                _that.sort+=1;
            });
        };
        if(_that.sort==3){
            _that.searchData.sortCol=''
            _that.searchCusList(function(){
                _that.isAsc=false;
                _that.isDesc=false;
                _that.sort=1;
            });
        };
    }
    //获取菜系列表
    getDisheslist(){
        let _that=this;
        _that.CusService.getDisheslist().then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.dishesLists=data.data;
            },_that.basicConfig.errorCallback)
        })
    }
    //获取分类列表
    getTypelist(){
        let _that=this;
        _that.CusService.getTypelist().then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.typeLists=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //获取客户网络状态
    getCusNetStatus(){
        let _that=this;
        _that.CusService.getCusNetStatus().then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.statusLists=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //翻页
    pageChanged(){
        this.searchData.pageNo=this.currentPage;
        this.getCustomerlists(this.searchData);
    };
    //删除
    deleteCustomer(store){
        let _that=this;
        let id=store.id;
        let fn=function ($uibModalInstance) {
                            var $ctrl = this;
                            $ctrl.name=store.name;
                            $ctrl.ok = function(){
                                $uibModalInstance.close();
                            };
                            $ctrl.cancel = function () {
                                $uibModalInstance.dismiss();
                            };
                        };
        fn.$inject=['$uibModalInstance'];
        this.$uibModal.open({
            templateUrl: 'deleteCustom.html',
            controller: fn,
            controllerAs: '$ctrl',
        }).result.then(function(){
              _that.CusService.deleteCustomer(id).then(function(data){
                _that.basicConfig.callback(data,function(data){
                    //查找当前数据所在数组的索引
                    angular.forEach( _that.customerLists,function(val,index){
                        angular.forEach(val.stores,function (v,i) { 
                            if(v.id==id){
                                _that.customerLists[index].stores.splice(i,1);
                            }
                        });
                    });
                })
            },_that.basicConfig.errorCallback)
        },function () {
            console.log('cancle');
        })
    };
};
CustomerListsCtrl.$inject=['$http','$uibModal','CusService','basicConfig']