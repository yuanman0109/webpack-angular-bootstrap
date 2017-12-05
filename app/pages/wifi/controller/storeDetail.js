// 定义私有方法_init_
const _init_ =Symbol('_init_');
export default class StoreDetailCtrl{
	constructor($http,$uibModal,StoreMService,DevMService,basicConfig){
		this.$http = $http;
		this.$uibModal = $uibModal;
		this.DevMService = DevMService;
		this.StoreMService = StoreMService;
		this.basicConfig = basicConfig;
		this.storeDetail={};
		this[_init_]();
	}
	[_init_](){
		this.getStoreDetail({pageNo:1});
	}

	//获取门店列表
	getStoreDetail(param){
		let _that =this;
		_that.param = param;
		_that.StoreMService.getStoreDetail(_that.param).then(function(data){
			_that.basicConfig.callback(data,function(data){
				_that.storesList = data.data.data;
				console.log(data);
			})
		},_that.basicConfig.errorCallback)
	} 
};
StoreDetailCtrl.$inject=['$http','$uibModal','StoreMService','DevMService','basicConfig'];