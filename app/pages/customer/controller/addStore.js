export default class AddStoreCtrl{
    constructor($uibModal,$log,$http,$timeout,$location,$stateParams,CusService,basicConfig,PublicServer,$state,$filter){
        this.$uibModal=$uibModal;
        this.$log=$log;
        this.$http=$http;
        this.$timeout=$timeout;
        this.$location=$location;
        this.$stateParams=$stateParams;
        this.$state=$state;
        this.$filter=$filter;
        this.CusService=CusService;
        this.PublicServer=PublicServer;
        this.basicConfig=basicConfig;
        this.tabIndex=0;
        this.brandList=[];
        this.broadList=[];
        this.basicInfo={
            address:null,
            bdUserNo:null,
            bdUserName:null,
            brandId:null,
            building:null,
            businessArea:null,
            cityName:null,
            closingTime:new Date(),
            code:null,
            countyName:null,
            faeUserNo:null,
            faeUserName:null,
            floor:null,
            id:null,
            linkman:null,
            linkmanEmail:null,
            linkmanMobile:null,
            linkmanPosition:null,
            linkmanTel:null,
            linkmanWechart:null,
            logo:null,
            lsUserNo:null,
            lsUserName:null,
            name:null,
            openingTime:new Date(),
            poiId:null,
            poiLat:null,
            poiLng:null,
            provinceName:null
        };
        this.hopeSeviceStartTime = new Date();
        this.hopeSeviceEndTime = new Date();
        this.storeDetail={
            broadbandIsp:null,
            broadbandPassword:null,
            broadbandUsername:null,
            broadbandWidth:null,
            hallArea:null,
            hallFloors:null,
            hallTables:null,
            hasBroadband:true,
            hasLanPort:true,
            hasOrderSystem:true,
            hasOtherWifi:true,
            hasPosSystem:true,
            hasPowerPort:true,
            hasPrinter:true,
            hopeSeviceTime:null,
            localeLinkman:null,
            localeLinkmanPosition:null,
            localeLinkmanTel:null,
            orderSystemBrands:[
                {
                    id:null,
                    name:null
                }
            ],
            otherWifiBrands:[
                {
                    id:null,
                    model:null,
                    name:null
                }
            ],
            posSystemBrands:[
                {
                    id:null,
                    model:null,
                    name:null 
                }
            ],
            printerBrands:[
                {
                    id:null,
                    model:null,
                    name:null 
                }
            ],
            remark:null,
            setupCount:null,
            storeId:null
        };
        this.getbroadbandLists();
        this.getbrandLists();
        //是否是新增页面
        this.storeId=$stateParams.id;
        this.isAddstore();
    }
    //判断是否是添加页面还是修改页面
    isAddstore(){
        let _that =this;
        if(this.storeId){
            _that.getStoreInfo(this.storeId);
        };
    }
    //地图
    openMap(){
        let _that =this;
        let $uibModal=this.$uibModal;
        let $log=this.$log;
        let basicInfo = this.basicInfo;
        let fn=function ($uibModalInstance) {
            var $ctrl = this;
            $ctrl.ok = function () {
                $uibModalInstance.close();
            };
            $ctrl.cancel = function () {
                $uibModalInstance.dismiss();
            };
            $ctrl.seldata={
                address:'',
                name:'',
                poiId:	'',
                poiLat:	'',
                poiLng:	'',
                provinceName:'',
                cityName:'',
                countyName:''
            };
            $ctrl.sel=function(){
                $uibModalInstance.close();
                Object.assign(basicInfo,$ctrl.seldata);
                _that.codes= [];
                _that.names = [basicInfo.provinceName, basicInfo.cityName, basicInfo.countyName];
                _that.getaddressCode("00", 0);
            };
        };
        fn.$inject=['$uibModalInstance'];
        $uibModal.open({
            size: 'lg',
            templateUrl: 'openMap.html',
            controller: fn,
            controllerAs: '$ctrl',
            openedClass:'map-warp'
        }).result.then(function () {
            $log.info('ok');
        }, function () {
            $log.info('cancle');
        });
    }
    //获取城市code
    getaddressCode(code, index){
        let _that=this;
        let parms={
            name:_that.names[index]
        };
        _that.CusService.getaddressCode(code,parms).then(function(data){
            _that.basicConfig.callback(data,function(data){
                console.log(data.data);
                if(data.data && data.data.areaCode && data.data.areaName && index < 2) { 
                    _that.codes.push(data.data.areaCode);
                    _that.getaddressCode(data.data.areaCode, ++index);
                }
            })
        },_that.basicConfig.errorCallback)
    }
    //选择人员回调
    selCallback(per,type){
        let _that=this;
        if(type=="bd"){
            _that.basicInfo.bdUserName=per.realName;
            _that.basicInfo.bdUserNo=per.userNo;
        };
        if(type=="fae"){
            _that.basicInfo.faeUserName=per.realName;
            _that.basicInfo.faeUserNo=per.userNo;
        };
        if(type=="ls"){
            _that.basicInfo.lsUserName=per.realName;
            _that.basicInfo.lsUserNo=per.userNo;
        }
    }
    //保存基本信息
    saveStore(){
        let _that=this;
        let fn=null;
        _that.basicInfo.openingTime=_that.$filter('date')(_that.basicInfo.openTime,'HH:mm');
        _that.basicInfo.closingTime=_that.$filter('date')(_that.basicInfo.closeTime,'HH:mm');
        console.log(_that.basicInfo);
        if(_that.storeId){
            fn=_that.CusService.modifyStore(_that.basicInfo);
        }else{
            fn=_that.CusService.saveStore(_that.basicInfo);
        }
        fn.then(function(data){
            _that.basicConfig.callback(data,function(data){
                console.log(_that.storeDetail);
                _that.basicInfo.id=data.data;
                _that.storeDetail.storeId=data.data;
                _that.storeId=data.data;
                _that.tabIndex=1;
            })
        },_that.basicConfig.errorCallback)
    }
    //保存餐厅信息
    saveStoreInfo(){
        let _that=this;
        let fn=null;
        if(_that.storeId){
            _that.storeDetail.storeId=_that.storeId;
            fn=_that.CusService.modifyStoreInfo(_that.storeDetail);
        }else{
            fn=_that.CusService.saveStoreInfo(_that.storeDetail);
        };
        if(_that.hopeSeviceStartTime && _that.hopeSeviceEndTime){
            _that.storeDetail.hopeSeviceTime = _that.$filter('date')(_that.hopeSeviceStartTime,'HH:mm')+"--"+_that.$filter('date')(_that.hopeSeviceEndTime,'HH:mm');
        };
        fn.then(function(data){
           _that.basicConfig.callback(data,function(data){
                _that.basicConfig.openModal(data,function(){
                    _that.$state.go('customer.customerLists');
                })
            })
        },_that.basicConfig.errorCallback)
    }
    //获取宽带运营商
    getbroadbandLists(){
        let _that=this;
        _that.CusService.getbroadbandLists().then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.broadList=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //获取品牌列表
    getbrandLists(){
        let _that=this;
        _that.CusService.getbrandLists().then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.brandList=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //上传
    uploadFiles(file, errFiles){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(img){
             _that.basicInfo.logo=img.srcData;
        });  
    }
    //获取门店详情
    getStoreInfo(id){
        let _that=this;
        _that.CusService.getCustomerDetail(id).then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.basicInfo=data.data;
                console.log(_that.basicInfo);
                _that.codes= [_that.basicInfo.province,_that.basicInfo.city,_that.basicInfo.county];
                let openTime=new Date('2017/01/01 '+(_that.basicInfo.openingTime||'0:00'));
                _that.basicInfo.openTime=openTime;
                let closeTime=new Date('2017/01/01 '+(_that.basicInfo.closingTime||'23:59'));
                _that.basicInfo.closeTime=closeTime;
                //删除数据中多余数据
                delete _that.basicInfo.bdUserAreas;
                delete _that.basicInfo.faeUserAreas;
                delete _that.basicInfo.lsUserAreas;
                _that.storeDetail=data.data.storeDetail||_that.storeDetail;
                if(_that.storeDetail.hopeSeviceTime){
                    let hopeSeviceStartTime =_that.storeDetail.hopeSeviceTime.split('--')[0];
                    _that.hopeSeviceStartTime=new Date('2017/01/01 '+hopeSeviceStartTime);
                    let hopeSeviceEndTime = _that.storeDetail.hopeSeviceTime.split('--')[1];
                    _that.hopeSeviceEndTime=new Date('2017/01/01 '+hopeSeviceEndTime);
                }
                if(!_that.storeDetail.otherWifiBrands.length){
                    _that.storeDetail.otherWifiBrands=[
                        {
                            id:null,
                            model:null,
                            name:null
                        }
                    ]
                };
                if(!_that.storeDetail.orderSystemBrands.length){
                    _that.storeDetail.orderSystemBrands=[{
                        id:null,
                        name:null
                    }]
                }
                if(!_that.storeDetail.posSystemBrands.length){
                    _that.storeDetail.posSystemBrands=[{
                        id:null,
                        model:null,
                        name:null 
                    }]
                }
                if(!_that.storeDetail.printerBrands.length){
                    _that.storeDetail.printerBrands=[{
                        id:null,
                        model:null,
                        name:null 
                    }]
                }
                console.log(_that.storeDetail);
            })
        },_that.basicConfig.errorCallback)
    }
    //获取区域负责人
    getRegionDirector(obj){
        let _that=this;
        if(obj.realName){
            _that.CusService.getRegionDirector(obj).then(function(data){
                _that.basicConfig.callback(data,function(data){
                    if(obj.businessType=='BD'){
                        console.log("bd");
                        _that.bdList=data.data;
                    };
                    if(obj.businessType=='FAE'){
                        _that.faeList=data.data;
                    };
                    if(obj.businessType=='LS'){
                        _that.lsList=data.data;
                    }
                })
            },_that.basicConfig.errorCallback)
        }
    }
    //添加wifi
    addWifi(){
        let _that=this;
        _that.storeDetail.otherWifiBrands.push({
            id:null,
            model:null,
            name:null
        })
    }
    //删除WIFI
    deleteWifi(i){
        let _that=this;
        _that.storeDetail.otherWifiBrands.splice(i,1);
    }
    //添加点餐
    addOrder(){
        let _that=this;
        _that.storeDetail.orderSystemBrands.push({
            id:null,
            name:null
        })
    }
    //删除点餐
    deleteOrder(i){
        let _that=this;
        _that.storeDetail.orderSystemBrands.splice(i,1);
    }
    //添加收银
    addPost(){
        let _that=this;
        _that.storeDetail.posSystemBrands.push({
            id:null,
            name:null,
            model:null
        })
    }
    //删除收银
    deletePost(i){
        let _that=this;
        _that.storeDetail.posSystemBrands.splice(i,1);
    }
    //添加打印机
    addPrinter(){
        let _that=this;
        _that.storeDetail.printerBrands.push({
            id:null,
            name:null,
            model:null
        })
    }
    //删除打印机
    deletePrinter(i){
        let _that=this;
        _that.storeDetail.printerBrands.splice(i,1);
    }
}
AddStoreCtrl.$inject=['$uibModal','$log',"$http",'$timeout',"$location","$stateParams",'CusService','basicConfig','PublicServer','$state','$filter'];