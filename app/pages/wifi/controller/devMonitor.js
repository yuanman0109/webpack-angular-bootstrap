//定义私有方法_init_
const _init_ = Symbol('_init_');
export default class DevMonitorCtrl {
	constructor($http, $uibModal, DevMService, basicConfig) {
			this.$uibModal = $uibModal;
			this.DevMService = DevMService;
			this.basicConfig = basicConfig;
			this.totalItems = 0;
			this.$http = $http;
			this.devsList = []; //设备列表
			this.provinceLists = []; //省列表
			this.cityLists = []; //城市列表
			this.countyLists = []; //区、县列表
			this.modelLists = []; //设备型号列表
			this.typeLists = [];
			this.statusLists = []; //设备状态列表
			this.gatewayMACList = []; //设备mac地址列表
			this.choseArr = []; //选择数组
			this.str = ""; //
			this.allCheck = false; //是否点击了全选，是为a
			this.x = false; //默认未选中
			this.searchData = { //搜索字段init
				province: null,
				city: null,
				county: null,
				model: null,
				status: null,
				beginTime: null,
				endTime: null,
				searchWord: null,
			}
			this[_init_]();
		}
		[_init_]() {
			this.getDevlist({
				pageNo: 1
			});
		}
		//获取设备列表
	getDevlist(parme) {
			let _that = this;
			_that.parme = parme;
			_that.DevMService.getDevlist(_that.parme).then(function(data) {
				_that.basicConfig.callback(data, function(data) {
					_that.devsList = data.data.data;
					_that.totalItems = data.data.totalRecords;
					console.log(data);
				})
			}, _that.basicConfig.errorCallback)
		}
		//  查询
	searchList() {
		let _that = this;
		_that.searchData.pageNo = 1;
		_that.getDevlist(_that.searchData);
	}

	//翻页
	pageChanged() {
		this.searchData.pageNo = this.currentPage;
		this.getDevlist(this.searchData);
	};

	//设备重启
	rebootDev(gatewayMACList, type) {
		let _that = this;
		let fn = function($uibModalInstance) {
			var $ctrl = this;
			$ctrl.gatewayMACList = gatewayMACList;
			$ctrl.title = '重启';
			//确定
			$ctrl.ok = function() {
				$uibModalInstance.close();
			};
			//取消
			$ctrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		};
		fn.$inject = ['$uibModalInstance'];
		this.$uibModal.open({
			templateUrl: 'rebootDev.html',
			controller: fn,
			controllerAs: '$ctrl',
		}).result.then(function() {
			_that.DevMService.rebootDev(gatewayMACList, type).then(function(data) {
				_that.basicConfig.callback(data, function(data) {
					console.log(data);
					_that.getDevlist({
						pageNo: 1
					});
				})
			}, _that.basicConfig.errorCallback)
		}, function() {
			console.log('cancle');
		})

	}

	//设备解绑
	unbindDev(gatewayMACList, type) {
		let _that = this;
		let fn = function($uibModalInstance) {
			var $ctrl = this;
			$ctrl.gatewayMACList = gatewayMACList;
			$ctrl.title = '解绑';
			//确定
			$ctrl.ok = function() {
				$uibModalInstance.close();
			};
			//取消
			$ctrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		};
		fn.$inject = ['$uibModalInstance'];
		this.$uibModal.open({
			templateUrl: 'rebootDev.html',
			controller: fn,
			controllerAs: '$ctrl',
		}).result.then(function() {
			_that.DevMService.deleteDev(gatewayMACList, type).then(function(data) {
				_that.basicConfig.callback(data, function(data) {
					console.log(data);
					_that.getDevlist({
						pageNo: 1
					});
				})
			}, _that.basicConfig.errorCallback)
		}, function() {
			console.log('cancle');
		})

	}

	//单选
	chk(mac, ischeck, list) { //单选或者多选
		let _that = this;
		if(_that.allCheck == true) { //在全选的基础上操作
			_that.str = _that.choseArr.join(',') + ',';
		}
		if(ischeck == true) { //选中
			_that.str = _that.str + mac + ',';
			if(_that.choseArr.length == list.length) {
				_that.allCheck = true;
			}

		} else {
			_that.str = _that.str.replace(mac + ',', ''); //取消选中
			_that.allCheck = false;

		}
		_that.choseArr = (_that.str.substr(0, _that.str.length - 1)).split(',');
		if(_that.str == '') { //判断
			_that.choseArr = [];
		}
	};

	//全选
	all(isallCheck, list) { //全选
		let _that = this;
		_that.choseArr = [];
		_that.str = '';
		if(isallCheck == true) {
			_that.x = true;
			for(let i = 0; i < list.length; i++) {
				_that.str = _that.str + list[i].gatewayMAC + ',';
			}
			_that.choseArr = (_that.str.substr(0, _that.str.length - 1)).split(',');
		} else {
			_that.x = false;
			_that.choseArr = [];
			_that.allCheck = false;
		}
		console.log(_that.choseArr);
	};

	//单设备解绑
	sinUnbindDev(gatewayMAC) {
		let _that = this;
		_that.gatewayMACList = new Array();
		_that.gatewayMACList.push(gatewayMAC);
		_that.unbindDev(_that.gatewayMACList, 'single');
	}

	//单设备重启
	sinRebootDev(gatewayMAC) {
		let _that = this;
		_that.gatewayMACList = new Array();
		_that.gatewayMACList.push(gatewayMAC);
		_that.rebootDev(_that.gatewayMACList, 'single');
	}

	//批量解绑
	deleteDevList() {
		let _that = this;
		_that.gatewayMACList = [];
		_that.gatewayMACList = _that.choseArr;
		console.log(_that.gatewayMACList);
		_that.unbindDev(_that.gatewayMACList, 'multiple');
	}

	//批量重启
	rebootDevList() {
		let _that = this;
		_that.gatewayMACList = [];
		_that.gatewayMACList = _that.choseArr;
		_that.rebootDev(_that.gatewayMACList, 'multiple');
	}

	//  //批量配置
	//  configDevList(){
	//  	let _that = this;
	//  	_that.gatewayMACList=[];
	//      _that.DevMService.configDevList(_that.gatewayMACList).then(function(data){
	//          _that.basicConfig.callback(data,function(data){
	//				console.log(data);
	//          })
	//      },_that.basicConfig.errorCallback)
	//  }
	//  //批量导出
	//  exportDevList(){
	//  	let _that = this;
	//  	_that.gatewayMACList=[];
	//      _that.DevMService.exportDevList(_that.gatewayMACList).then(function(data){
	//          _that.basicConfig.callback(data,function(data){
	//				console.log(data);
	//          })
	//      },_that.basicConfig.errorCallback)
	//  }
	//单设备添加
	addDev(){
		let _that = this;
		let fn = function($http, $uibModalInstance, DevMService, basicConfig) {
			let $ctrl = this;
			$ctrl.DevMService = DevMService;
			$ctrl.basicConfig = basicConfig;

			//    获取配置信息
			$ctrl.addDev = function() {
				console.log($ctrl.dev);
				_that.DevMService.sigleAddDev($ctrl.dev).then(function(data) {
					_that.basicConfig.callback(data, function(data) {
						console.log(data);
						$uibModalInstance.close();
					})
				}, $ctrl.basicConfig.errorCallback)
			}
			
			
			$ctrl.ok = function() {
				$ctrl.addDev();
				
			};
			$ctrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		};

		fn.$inject = ['$http', '$uibModalInstance', 'DevMService', 'basicConfig'];

		let modalInstance = _that.$uibModal.open({
			templateUrl: 'addDev.html', //创建的视图，即modal对应的html文件
			size: "sm", //大小配置不能自定义大小，只能是sm，md，lg等这些值
			controller: fn,
			controllerAs: '$ctrl',
			resolve: { //定义一个成员并将他传递给$modal指定的控制器，相当于routes的一个reslove属性，如果需要传递一个objec对象，需要使用angular.copy()，注意黄色背景区域
				items: function() {
					return "";
				}
			}
		}).result.then(function(selectedItem) { //$modalInstance.close()正常关闭后执行的函数
			
			
		}, function() { //$modalInstance.dismiss('cancel')后执行的函数，取消或退出执行的函数
		
		
		})
		
		
	}



	//	查看设备详情
	devDetail(id) {

		let _that = this;
		_that.id = id;
		_that.id = 136;
		let fn = function($http, $uibModalInstance, DevMService, basicConfig) {
			let $ctrl = this;
			$ctrl.DevMService = DevMService;
			$ctrl.basicConfig = basicConfig;
			$ctrl.configInfo = [];
			$ctrl.connUserList = [];
			$ctrl.LogList = [];
			//    获取配置信息
			$ctrl.getDevdetails = function(id) {
					_that.DevMService.getDevdetails(id).then(function(data) {
						_that.basicConfig.callback(data, function(data) {
							$ctrl.configInfo = data.data;
							console.log(data);
						})
					}, $ctrl.basicConfig.errorCallback)
				}
				//获取连接用户
			$ctrl.getconnectedUser = function() {
					_that.DevMService.getconnectedUser().then(function(data) {
						_that.basicConfig.callback(data, function(data) {
							$ctrl.connUserList = data.data;
							console.log(data);
						})
					}, $ctrl.basicConfig.errorCallback)
				}
				//获取设备日志
			$ctrl.getdevLog = function() {
				_that.DevMService.getdevLog().then(function(data) {
					_that.basicConfig.callback(data, function(data) {
						$ctrl.LogList = data.data;
						console.log(data);
					})
				}, $ctrl.basicConfig.errorCallback)
			}
			$ctrl.getDevdetails(_that.id);
			$ctrl.getconnectedUser();
			$ctrl.getdevLog();

			$ctrl.ok = function() {
				$uibModalInstance.close();
			};
			$ctrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		};

		fn.$inject = ['$http', '$uibModalInstance', 'DevMService', 'basicConfig'];

		let modalInstance = _that.$uibModal.open({
			templateUrl: 'devModelContent.html', //创建的视图，即modal对应的html文件
			size: "lg", //大小配置不能自定义大小，只能是sm，md，lg等这些值
			controller: fn,
			controllerAs: '$ctrl',
			resolve: { //定义一个成员并将他传递给$modal指定的控制器，相当于routes的一个reslove属性，如果需要传递一个objec对象，需要使用angular.copy()，注意黄色背景区域
				items: function() {
					return "";
				}
			}
		}).result.then(function(selectedItem) { //$modalInstance.close()正常关闭后执行的函数
			console.log(1);
		}, function() { //$modalInstance.dismiss('cancel')后执行的函数，取消或退出执行的函数
			console.log(2);
		})

	};

	//	查看设备配置
	devConfig(id) {
		let _that = this;
		_that.id = id;
		let fn = function($http, $uibModalInstance, DevMService, basicConfig) {
			let $ctrl = this;
			$ctrl.Is5g20 = true;
			$ctrl.DevMService = DevMService;
			$ctrl.basicConfig = basicConfig;
			$ctrl.configInfo = [];
			$ctrl.connUserList = [];
			$ctrl.LogList = [];
			$ctrl.devcongfig = [];
			//    获取配置信息
			$ctrl.getdevConfig = function(id) {
					_that.DevMService.getdevConfig(id).then(function(data) {
						_that.basicConfig.callback(data, function(data) {
							$ctrl.devconfig = data.data;
							console.log(data);
						})
					}, $ctrl.basicConfig.errorCallback)
				}
				//获取配置信息下拉选项
			$ctrl.getdevConfigOption = function(id) {
				_that.DevMService.getdevConfigOption().then(function(data) {
					_that.basicConfig.callback(data, function(data) {
						$ctrl.devconfigOption = data.data;
						console.log(data);
					})
				}, $ctrl.basicConfig.errorCallback)
			}

			$ctrl.change5g = function(val) {
				console.log(val);
				switch(val) {
					case '20':
						return $ctrl.Is5g20 = true, $ctrl.Is5g40 = false
						break;
					case '40':
						return $ctrl.Is5g20 = false, $ctrl.Is5g40 = true
						break;
					case '自动':
						return $ctrl.Is5g20 = false, $ctrl.Is5g40 = false
						break;
					case 'undefined':
						return $ctrl.Is5g20 = false, $ctrl.Is5g40 = false
						break;
						defult:
							return $ctrl.Is5g20 = false, $ctrl.Is5g40 = false
						break;
				}

			}

			$ctrl.getdevConfig(_that.id);
			$ctrl.getdevConfigOption();

			$ctrl.ok = function() {
				$uibModalInstance.close();
			};
			$ctrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		};

		fn.$inject = ['$http', '$uibModalInstance', 'DevMService', 'basicConfig'];

		let modalInstance = _that.$uibModal.open({
			templateUrl: 'devModelConfig.html', //创建的视图，即modal对应的html文件
			size: "lg", //大小配置不能自定义大小，只能是sm，md，lg等这些值
			controller: fn,
			controllerAs: '$ctrl',
			resolve: { //定义一个成员并将他传递给$modal指定的控制器，相当于routes的一个reslove属性，如果需要传递一个objec对象，需要使用angular.copy()，注意黄色背景区域
				items: function() {
					return "";
				}
			}
		}).result.then(function(selectedItem) { //$modalInstance.close()正常关闭后执行的函数
			console.log(1);
		}, function() { //$modalInstance.dismiss('cancel')后执行的函数，取消或退出执行的函数
			console.log(2);
		})
	};

};
DevMonitorCtrl.$inject = ['$http', '$uibModal', 'DevMService', 'basicConfig']