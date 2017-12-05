const _init_ = Symbol('_init_');
export default class AddCompCtrl{
    constructor ($http,basicConfig,CompService,$stateParams,$state,CusService,PublicServer,$filter,$timeout){
        this.$http=$http;
        this.basicConfig=basicConfig;
        this.$stateParams=$stateParams;
        this.CompService=CompService;
        this.CusService=CusService;
        this.PublicServer=PublicServer;
        this.$state=$state;
        this.$filter=$filter;
        this.$timeout=$timeout;
        this.dictionory=[];
        this.customerType=null;
        this.dishes=null;
        this.tabIndex=0;
        this.customerSource=null;
        this.business=[];
        //企业信息
        this.saveData={
            address:null,
            artificialPerson:null,
            companyScaleCode:null,
            customerSources:[],
            id:null,
            linkTel:null,
            linkman:null,
            linkmanEmail:null,
            linkmanMobile:null,
            linkmanPosition:null,
            linkmanTel:null,
            linkmanWechart:null,
            name:null,
            registeredAssets:null,
            website:null
        }
        //品牌信息
        this.brandData={
            brands:[
                {
                    customerType:null,
                    dishStyles:[
                        {
                            dishStyleCode:null
                        }
                    ],  
                    id:null,
                    linkman:null,
                    linkmanEmail:null,
                    linkmanMobile:null,
                    linkmanPosition:null,
                    linkmanTel:null,
                    linkmanWechart:null,
                    logo:null,
                    name:null,
                }
            ],
            id:null,
            isShow:true
        }
        //签约信息
        this.contract={
            accountName:null,
            accountNo:null,
            accountType:null,
            artificialPerson:null,
            artificialPersonCard:null,
            artificialPersonCardBack:null,
            artificialPersonCardFront:null,
            bankCode:null,
            businessLicense:null,
            businessLicenseType:null,
            cateringLicense:null,
            companyContracts:[
                {
                    companyContractBusinesses:[],
                    business:[],
                    contractFile:null,
                    contractNo:null,
                    contractRate:null,
                    contractTime:null,
                    showTime:null,
                    id:null,
                    isRate:false,
                    isOpenDate:false
                }
            ],  	
            hygieneLicense:null,
            id:null,
            remark:null,
            subBankCode:null,
            isShow:true
        }
        this[_init_]();
    }
    [_init_](){
        let _that=this;
        _that.getDictionory();
        _that.getCustomerType();
        _that.getDisheslist();
        _that.getBusiness();
        _that.getBank();
        _that.getCustomerSource();
        //是否是修改企业
        if(_that.$stateParams.id){
            //初始化
            _that.CompService.getCompDetail(_that.$stateParams.id).then(function(data){
                _that.basicConfig.callback(data,function(data){
                    console.log(data.data);
                    _that.$timeout(function(){
                        _that.saveData = data.data;
                        angular.forEach(_that.saveData.customerSources,function(val,ind){
                            angular.forEach(_that.customerSource,function(v,i) {
                                if(val.customerSourceCode==v.dataCode){
                                    v.checked=val.customerSourceCode;
                                    v.partnerName=val.partnerName;
                                }
                            })
                        });
                        _that.brandData.isShow=false;
                        _that.contract.isShow=false;
                        _that.brandData.brands = data.data.brands;
                        _that.brandData.id = _that.$stateParams.id;
                        _that.contract.id = _that.$stateParams.id;
                        _that.contract.companyContracts = data.data.companyContracts;
                        angular.forEach(_that.contract.companyContracts,function(v,i){
                            v.showTime = new Date(v.contractTime);
                            v.contractRateInt=v.contractRate*1000;
                            //向数组对象中添加business
                            v.business=[];
                            angular.forEach(v.companyContractBusinesses,function(val,ind){
                                //通过和_that.business的键值对匹配
                                angular.forEach(_that.business,function(value,index){
                                    if(val.businessTypeCode==value.dataCode){
                                        v.business[index]={};
                                        v.business[index].businessTypeCode=value.dataCode;
                                    }
                                })
                            });
                        });
                        _that.contract.accountName = data.data.accountName;
                        _that.contract.artificialPerson = data.data.artificialPerson;
                        _that.contract.artificialPersonCard = data.data.artificialPersonCard;
                        _that.contract.businessLicenseType=data.data.businessLicenseType;
                        _that.contract.businessLicense=data.data.businessLicense;
                        _that.contract.accountType=data.data.accountType;
                        _that.contract.bankCode=data.data.bankCode;
                        _that.contract.subBankCode=data.data.subBankCode;
                        _that.contract.subBankName=data.data.subBankName;
                        _that.contract.artificialPersonCardFront=data.data.artificialPersonCardFront;
                        _that.contract.artificialPersonCardBack=data.data.artificialPersonCardBack;
                        _that.contract.cateringLicense=data.data.cateringLicense;
                        _that.getSubBank({name:_that.contract.subBankName});
                        _that.contract.accountNo=data.data.accountNo;
                        _that.contract.remark = data.data.remark;
                    },100)
                })
            },_that.basicConfig.errorCallback)
        }
    }
    //获取企业规模
    getDictionory(){
        let _that=this;
        _that.CompService.getDictionory(_that.saveData).then(function(data){
             _that.basicConfig.callback(data,function(data){
                _that.dictionory=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //获取客户类型
    getCustomerType(){
        let _that=this;
        _that.CompService.getCustomerType().then(function(data){
             _that.basicConfig.callback(data,function(data){
                _that.customerType=data.data;
                //console.log(_that.customerType);
            })
        },_that.basicConfig.errorCallback)
    }
    //获取客户来源
    getCustomerSource(){
        let _that=this;
        _that.CompService.getCustomerSource().then(function(data){
             _that.basicConfig.callback(data,function(data){
                _that.customerSource=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //获取菜系
    getDisheslist(){
        let _that=this;
        _that.CusService.getDisheslist().then(function(data){
             _that.basicConfig.callback(data,function(data){
                _that.dishes=data.data;
               // console.log(_that.dishes);
            })
        },_that.basicConfig.errorCallback)
    }
    //获取签约业务
    getBusiness(){
        let _that=this;
        _that.CompService.getBusiness().then(function(data){
             _that.basicConfig.callback(data,function(data){
                _that.business=data.data;
                // for(var i=0;i<_that.contract.companyContracts.length;i++){
                //     var v=_that.contract.companyContracts[i];
                //     for(var ind=0;ind<_that.business.length;ind++){
                //         var val=_that.business[ind];
                //         v.business.push({
                //             dataCode:val.dataCode,
                //             dataName:val.data
                //         });
                //     }
                // } 
            })
        },_that.basicConfig.errorCallback)
    }
    //获取银行
    getBank(){
        let _that=this;
        _that.CompService.getBank().then(function(data){
             _that.basicConfig.callback(data,function(data){
                 _that.bank=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //获取支行
    getSubBank(param){
        let _that=this;
        let params={
            name:param.name||null
        };
        _that.CompService.getSubBank(_that.contract.bankCode,params).then(function(data){
             _that.basicConfig.callback(data,function(data){
                 _that.subBank=data.data;
            })
        },_that.basicConfig.errorCallback)
    }
    //保存企业
    saveComp(){
        let _that = this;
        let fn = null;
        _that.saveData.customerSources=[];
        angular.forEach(_that.customerSource,function(v,i){
            if(v.checked!=null){
                _that.saveData.customerSources.push({
                    customerSourceCode:v.dataCode,
                    partnerName:v.partnerName
                });
            }
        });
        console.log(_that.saveData.customerSources);
        if(_that.saveData.id){
            fn = _that.CompService.modifyComp(_that.saveData);
        }else{
            fn = _that.CompService.saveComp(_that.saveData);
        };
        fn.then(function(data){
            _that.basicConfig.callback(data,function(data){
                _that.brandData.id=data.data;
                _that.saveData.id=data.data;
                _that.tabIndex+=1;
                _that.brandData.isShow=false;
            })
        },_that.basicConfig.errorCallback)
    }
    //保存品牌信息
    saveBrand(){
        let _that=this;
        let fn = null;
        console.log(_that.brandData);
        if(_that.brandData.id){
            fn= _that.CompService.modifyBrand(_that.brandData);
        }
        fn.then(function(data){
             _that.basicConfig.callback(data,function(data){
                 _that.contract.id=data.data;
                 _that.tabIndex+=1;
                 _that.contract.isShow=false;
            })
        },_that.basicConfig.errorCallback)
    }
    //保存签约信息
    saveContract(){
        let _that=this;
        angular.forEach(this.contract.companyContracts,function(v,i){
            v.contractTime=_that.$filter('date')(v.showTime, 'yyyy-MM-dd');
            v.contractRate=_that.$filter('thousandth')(v.contractRateInt);
            for(var ind=0;ind<v.business.length;ind++){
                var val=v.business[ind];
                if(val==null || val.businessTypeCode==null){
                    v.business.splice(ind,1);
                }
            };
            v.companyContractBusinesses=v.business;
            delete v.isOpenDate;
            delete v.isRate;
        });
        _that.CompService.saveContract(_that.contract).then(function(data){
             _that.basicConfig.callback(data,function(data){
                  _that.$state.go('customer.customerLists');
            })
        },_that.basicConfig.errorCallback)
    }
    
    //上传图片
    uploadFiles(file, errFiles,index){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(img){
             _that.brandData.brands[index].logo=img.srcData;
        });  
    }
    //上传合同
    uploadContract(file, errFiles,index){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(con){
             _that.contract.companyContracts[index].contractFile=con.srcData;
             console.log( _that.contract);
        });  
    }
    //上传执照
    uploadLicense(file, errFiles){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(li){
             _that.contract.businessLicense=li.srcData;
        });  
    }
    //上传身份证反面
    uploadPersonCardBack(file, errFiles){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(li){
             _that.contract.artificialPersonCardBack=li.srcData;
        });  
    }
    //上传身份证正面
    uploadPersonCardFront(file, errFiles){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(li){
             _that.contract.artificialPersonCardFront=li.srcData;
        });  
    }
    //上传餐饮服务许可证
    uploadcateringLicense(file, errFiles){
        let _that=this;
        _that.PublicServer.uploadFiles(file,errFiles,function(li){
             _that.contract.cateringLicense=li.srcData;
        }); 
    }
    //添加品牌
    addBrand(){
        this.brandData.brands.push({
            customerType:null,
            dishStyles:[
                {
                    dishStyleCode:''
                }
            ],  
            id:null,
            linkman:null,
            linkmanEmail:null,
            linkmanMobile:null,
            linkmanPosition:null,
            linkmanTel:null,
            linkmanWechart:null,
            logo:null,
            name:null
        })
    }
    //删除品牌
    deleteBrand(index){
        this.brandData.brands.splice(index,1)
    }
    //打开时间控件
    datepicker(index){
        this.contract.companyContracts[index].isOpenDate=true;
    }
    //删除签约信息
    delContract(index){
        let _that=this;
        _that.contract.companyContracts.splice(index,1);
    }
    //添加签约信息
    addContract(){
        let _that=this;
        this.contract.companyContracts.push({
            companyContractBusinesses:[],
            business:[],
            contractFile:null,
            contractNo:null,
            showTime:null,
            contractRate:null,
            contractTime:null,
            id:null,
            isRate:false,
            isOpenDate:false
        })
    }
    //判断是否选中外部合作
    isSelout(arrSources, obj){
        return arrSources.map(function(x){ return x.customerSourceCode;}).includes(obj.dataCode);
    }
}
AddCompCtrl.$inject=['$http','basicConfig','CompService','$stateParams','$state','CusService','PublicServer','$filter','$timeout'];