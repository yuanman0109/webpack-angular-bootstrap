import 'style/amap_ui/pagination.css';
import async from 'async';
class editPrivateSeaCtrl {
  constructor($uibModal, $log, $http, $timeout, $location, $stateParams, CusService, storeService, PublicServer, $state, $filter, $ocLazyLoad, DialogService, ImgLightbox) {
    Object.assign(this, {$uibModal, $log, $http, $timeout, $location, $stateParams, CusService, storeService, PublicServer, $state, $filter, $ocLazyLoad, DialogService, ImgLightbox});
    this.tabIndex = 0;
    this.brandList = [];
    this.broadList = [];
    this.basicInfo = {
      accountBankBranch: null
    };
    this.statuses = [
      {
        dataCode: '0',
        dataName: '正常'
      },
      {
        dataCode: '1',
        dataName: '禁用'
      },
      {
        dataCode: '2',
        dataName: '删除'
      }
    ];
    this.Properties = [
      {
        dataCode: '1',
        dataName: '直营'
      },
      {
        dataCode: '2',
        dataName: '加盟'
      }
    ];
    
    this.flags = [
      {
        dataCode: '1',
        dataName: '正餐'
      },
      {
        dataCode: '2',
        dataName: '快餐'
      }
    ];
    this.attribution = [
      {
        dataCode: 'OFFICE',
        dataName: '办公楼/写字楼'
      },
      {
        dataCode: 'INDUSTRY',
        dataName: '工业园区'
      },
      {
        dataCode: 'SCHOOL',
        dataName: '学区'
      },
      {
        dataCode: 'BUSINESS',
        dataName: '商圈'
      },
      {
        dataCode: 'STREET',
        dataName: '沿街'
      },
      {
        dataCode: 'OTHER',
        dataName: '其它'
      }
    ];
    this.grade = [{dataCode: 5.0, dataName: '5.0'}, {dataCode: 4.5, dataName: '4.5'}, {dataCode: 4.0, dataName: '4.0'}, {dataCode: 3.5, dataName: '3.5'},
    {dataCode: 3.0, dataName: '3.0'}, {dataCode: 2.5, dataName: '2.5'}, {dataCode: 2.0, dataName: '2.0'}, {dataCode: 1.5, dataName: '1.5'}, 
    {dataCode: 1.0, dataName: '1.0'}, {dataCode: 0.5, dataName: '0.5'}, {dataCode: 0.0, dataName: '0.0'}];
    this.printer = [
      {
        dataCode: 'SELFPROCUREMEN',
        dataName: '自购'
      },
      {
        dataCode: 'GIVE',
        dataName: '赠送'
      },
      {
        dataCode: 'OTHER',
        dataName: '其他'
      }
    ];
    
    this.isKp = [
      {
        code: 1,
        name: '是'
      }, {
        code: 0,
        name: '否'
      }
    ];
    this.sex = [
      {
        code: 1,
        name: '男'
      }, {
        code: 0,
        name: '女'
      }
    ];
    //  证件类型
    this.ownerCardTypes = [
      {
        code: 'ID_CARD',
        name: '身份证'
      }, {
        code: 'PASSPORD',
        name: '护照'
      }, {
        code: 'PERMIT',
        name: '港澳通行证'
      }, {
        code: 'MTP',
        name: '台胞证'
      }, {
        code: 'OTHER',
        name: '其他'
      }
    ];
    
    this.changeAgeLists = [
      {
        code: 'THIRTY_FIVE',
        name: '35周岁以下'
      }, {
        code: 'FORTY_FIVE',
        name: '35-45周岁'
      }, {
        code: 'FORTY_FIVE_ABOVE',
        name: '45周岁以上'
      }
    ];
//  打印机类型
    this.printerTypes = [
      {
        code: 'USB',
        name: 'USB接口'
      }, {
        code: 'RJ45',
        name: '网口（RJ45）'
      }, {
        code: 'PARALLEL',
        name: '并行接口'
      }, {
        code: 'BLUETOOTH',
        name: '蓝牙'
      }, {
        code: 'OTHER',
        name: '其他'
      }
    ];

// 企业规模
    this.companyScales = [
      {
        code: 'SCALE_TEN',
        name: '10人以下'
      }, {
        code: 'SCALE_FIFTY',
        name: '10-50人'
      }, {
        code: 'SCALE_HUNDRED',
        name: ' 50-100人'
      }, {
        code: 'SCALE_FIVEHUNDRED',
        name: '100-500人'
      }, {
        code: 'SCALE_THOUSAND',
        name: '500-1000人'
      }, {
        code: 'SCALE_MAX',
        name: '1000人以上'
      }
    ];
    // 商户类型
    this.businessTypes = [
      {
        code: 'ENTE_BUSSINESS',
        name: '企业商户'
      }, {
        code: 'SELF_BUSSINESS',
        name: '个体商户'
      }
    ];
    // 结算方式
    this.settleMethods = [
      {
        code: 'PUBLIC',
        name: '对公'
      }, {
        code: 'PRIVATE',
        name: '对私'
      }
    ];
     // 法人
    this.ownerTypes = [
      {
        code: 'LEGAL_PERSON',
        name: '法人'
      }, {
        code: 'MARKETING_MANAGER',
        name: '经营者'
      }
    ];
     // 连接机构
    this.connectionOrgs = [
      {
        code: 'FUYOU',
        name: '富友'
      }, {
        code: 'LAKALA',
        name: '拉卡拉'
      }, {
        code: 'EASYPAY',
        name: '易生支付'
      }
    ]; 
    // 审核历史
    this.verType = {
      'WAIT': '释放了私海',  
      'GET': '领取了', 
      'SUBMIT': '提交了建店审核申请', 
      'REJECT': '驳回了', 
      'ONLINE': '通过了'
    };

    if (typeof ($stateParams.businessId) === 'string') {
      console.log($stateParams.businessId);
      this.businessId = [];
      this.businessId.push($stateParams.businessId);
    } else {
      this.businessId = $stateParams.businessId;
    }
    this.param = {
      business: this.businessId,
      storeId: $stateParams.id
    };
    this.getDisheslist();
    //是否是新增页面
    this.storeId = $stateParams.id;
    this.Init();
  }
  //修改页面初始化
  Init() {
    const _that = this;
    async.parallel({
      one: function(callback) {
        //_that.getBusinessType(callback);    
        callback();  
      },
      two: function(callback) {
        _that.getSeaDetail(callback);
      }
    }, function (error, results) {
      if (!error) {
        // _that.businessList = results.one;
        _that.basicInfo = results.two;
        // _that.storeBusinessType = results.one;
        // _that.companyType = angular.copy(results.one);
        angular.forEach(_that.basicInfo.business, (v, i) => {
          if (v === 'SNACK') {
            _that.businessSnack = true;  //快餐必选
            _that.businessPay = true;
          }
          if (v === 'PAY') {
            _that.businessPay = true;  //支付必选
          }
          if (v === 'POS') {
            _that.businessPOS = true;  //收银必选
          }
          if (v === 'VIP') {
            _that.businessVIP = true;  //会员必选
          }
        });
        // angular.forEach(_that.companyType, (val, index) => {
        //   val.select && _that.basicInfo.companyBusinessType.push(val.dataCode);
        //   angular.forEach(_that.basicInfo.companyBusinessType, (v, i) => {
        //     if (v === val.dataCode) {
        //       val.select = true;
        //     }
        //   });
        // });
        
        if (_that.basicInfo.area) _that.basicInfo.area = Number(_that.basicInfo.area); //面积Number类型
        if (_that.basicInfo.dailyTransactionAmount) _that.basicInfo.dailyTransactionAmount = Number(_that.basicInfo.dailyTransactionAmount);
        if (_that.basicInfo.grade) _that.basicInfo.grade = Number(_that.basicInfo.grade); //评分Number类型
        // console.log(typeof _that.basicInfo.grade);
        _that.codes = [_that.basicInfo.province, _that.basicInfo.city, _that.basicInfo.county];

        if (!_that.basicInfo.connectionOrg) _that.basicInfo.connectionOrg = 'FUYOU';  //默认富友
        _that.connectionOrgCg(_that.basicInfo.connectionOrg); //富友获取他们的省
        // _that.getCompanyId(_that.basicInfo.companyName);
        _that.searchBrands(_that.basicInfo.brandName);
        // console.log(_that.basicInfo);
        // _that.getSubBank(_that.basicInfo.accountBankBranch);
        _that.getVerifyLog({
          businessId: _that.basicInfo.business,
          storeId: _that.$stateParams.id
        });
      } else {
        console.log(error);
      }
    });    
  }
  
    //打开地图按钮
  openMap() {
    const that = this;
    that.isAMap(that.openModal.bind(that));
  }
  //判断是否已经加载地图api
  isAMap(fn) {
    const that = this;
    function getWinMap() {      
      if (window.AMap) {
        that.$timeout.cancel(that.mapTimeout);
        that.loadMapJs(fn);
      } else {
        $script('//webapi.amap.com/maps?v=1.3&key=81fac60f1f32651fd89a80449806238d', () => {
          that.mapTimeout = that.$timeout(getWinMap, 300);
        });
      }      
    }
    getWinMap();
  }
    //加载地图依赖js
  loadMapJs(fn) {
    $script('//webapi.amap.com/ui/1.0/plug/ext/jquery-1.12.4.min.js', () => {
      $script(['//webapi.amap.com/ui/1.0/main.js', '//a.amap.com/amap-ui/static/1.0/ui/misc/MarkerList/examples/jquery.twbsPagination.min.js'], 'mapUi');
      $script.ready('mapUi', () => {
        fn();
      });
    });
  };
  //获取经纬度
  openModal() {
    const that = this;
    that.DialogService.openModal({
      template: require('../views/modal/map.modal.html'),
      controller: mapModalCtrl,
      controllerAs: 'ctrl',
      size: 'lg',
      resolve: {
        opts: () => {
          return {
            'id': this.$stateParams.id,
            'name': this.basicInfo.name,
            'poiLat': this.basicInfo.poiLat,
            'poiLng': this.basicInfo.poiLng,
            // 'companyId': this.basicInfo.companyId,
            // 'comTotal': this.comTotal,
            'brandTotal': this.brandTotal,
            'brandName': this.basicInfo.brandName,
            // 'brandId': this.basicInfo.brandId,
            'address': this.basicInfo.address
            // 'address': this.basicInfo.provinceName + this.basicInfo.cityName + this.basicInfo.districtName + this.basicInfo.address
          };
        }
      }
    })
    .then(result => {
      console.log(result);
      if (result && result.lng) { 
        this.basicInfo.poiLng = result.lng;
      };
      if (result && result.lat) { this.basicInfo.poiLat = result.lat; };
    }, error => {
      console.log(error);
    });
  }
  // 连接机构改变
  connectionOrgCg(item) {
    let _that = this;    
    if (item === 'FUYOU') {
      _that.getAreasList();
      _that.getBankList();
      if (_that.basicInfo.accountBankProvinceCode) _that.getCity(_that.basicInfo.accountBankProvinceCode);
      _that.getSubBank(_that.basicInfo.accountBankBranch);
    }
  }
// 获取支付中心的省列表
  getAreasList() {
    const _that = this;    
    _that
    .storeService
    .getAreasList({'connectionOrg': _that.basicInfo.connectionOrg})
    .then((data) => {
      // console.log(data);
      this.AreasList = data;
    });
  }
  //  获取支付中心银行列表
  getBankList() {
    const _that = this;    
    _that
    .storeService
    .getBankList({'connectionOrg': _that.basicInfo.connectionOrg})
    .then((data) => {
      // console.log(data);
      this.banksList = data;
    });
  }
  //城市列表
  getCity(code) {
    // console.log(code);
    // this.basicInfo.accountBankBranch = null;
    const _that = this;   
    // _that.subBankList = [];//省改变支行清空 
    // if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    // _that.lazyTime = _that.$timeout(() => {
      // if (!name || name === '') {
      //   // _that.basicInfo.areaName = name;
      //   _that.cityList = [];
      //   return;
      // };
    _that
      .storeService
      .getCityList(code, {'connectionOrg': _that.basicInfo.connectionOrg})
      .then((data) => {
        this.cityList = data;
        // console.log(this.cityList);
      });
    // }, 500);

    // 取省名
    if (_that.AreasList) {
      _that.AreasList.forEach(item => {
        if (_that.basicInfo.accountBankProvinceCode === item.areaCode) {
          _that.basicInfo.accountBankProvinceName = item.areaName;
        }
      });
    }
    console.log(_that.basicInfo.accountBankProvinceName);
  }

  // change city
  changeCity() {
    const _that = this;   
    _that.basicInfo.accountBankBranch = null;
    _that.cityList.forEach(item => {
      if (_that.basicInfo.accountBankCityCode === item.areaCode) {
        _that.basicInfo.accountBankCityName = item.areaName;
      }
    });
  }
  
  // CityCallback(val) {
  //   this.basicInfo.accountBankCityCode = val.areaCode;
  // }
   //获取银联号开户支行
  getSubBank(name) {
    // console.log(name);
    // this.basicInfo.accountBankBranch = null;
    const _that = this;    
    if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    _that.lazyTime = _that.$timeout(() => {
      if (!_that.basicInfo.accountBankCityCode || !_that.basicInfo.accountBankCode) {
        // _that.DialogService.showMessage('请先选择开户省市和开户行', false);
        _that.basicInfo.accountBankBranch = null;
        _that.subBankList = [];
        return;
      };
      _that
        .storeService
        .getSubBank({'connectionOrg': _that.basicInfo.connectionOrg, province: _that.basicInfo.accountBankProvinceCode, city: _that.basicInfo.accountBankCityCode, key: name, bankCode: _that.basicInfo.accountBankCode})
        .then((data) => {
          this.subBankList = data.list;
          // this.subBankList.forEach(obj => {
          //   if (obj.unionCode === _that.basicInfo.bankUnionCode) {
          //     this.bankCallback(obj);
          //   }
          // });
        });
    }, 300);
  }
  bankCallback(val) {
    // console.log(val);
    this.basicInfo.accountBankBranch = val.bankName;
    this.basicInfo.bankUnionCode = val.unionCode;
  }
  //获取业务类型
  // getBusinessType(callback) {
  //   let _that = this;
  //   _that.CusService.getBusinessType().then(function (data) { 
  //     if (callback) {
  //       callback(null, data);
  //     } else {
  //       _that.storeBusinessType = data;
  //       _that.companyType = angular.copy(data);
  //     }
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  accountBankCode(item) {  //获取开户行名称
    // console.log(this.banksList);
    this.basicInfo.accountBankBranch = null;
    this.banksList.forEach(obj => {
      if (obj.code === item) {
        this.basicInfo.accountBank = obj.name;
      }
    });
    this.subBankList = [];
    this.getSubBank();
    // delete this.basicInfo.accountBank;
    // console.log(this.basicInfo.accountBank);
  }
 
  // 业务类型关联(百味云支付和点餐（快）)
  // businessChange(bus, name) {
  //   let _that = this;
  //   if (bus.dataCode === 'PAY') {
  //     if (!bus.select) {
  //       _that.getBusinessItem('SNACK');
  //       _that[name][_that.targetIndex].select = false;
  //     }
  //   } else if (bus.dataCode === 'SNACK') {
  //     if (bus.select) {
  //       _that.getBusinessItem('PAY');
  //       console.log(_that.targetIndex);
  //       _that[name][_that.targetIndex].select = true;
  //     }
  //   }
  // }
  //获取相应code的business
  // getBusinessItem(code) {
  //   let _that = this;
  //   angular.forEach(_that.companyType, function(item, index, arr) {
  //     if (item.dataCode === code) {
  //       _that.targetIndex = index;
  //       //console.log(_that.targetIndex);
  //       return false;
  //     }
  //   });
  // }
  //搜索品牌信息
  searchBrands(val) {
    if (!val) return;
    let _that = this;
    // console.log(val);
    _that.basicInfo.brandName = val;
    _that.basicInfo.brandId = null;
    // _that.basicInfo.companyId = null;
    this.companyDisabled = false;
    _that.CusService.searchBrands({ name: val }).then(function (data) {
      _that.brandList = data.list;
      // console.log(_that.brandList);
      _that.brandList.forEach(item => {
        // console.log(item);
        if (val === item.name) {
          _that.searchBrandsCallback(item);
        }
      });
    }, err => {
      console.log(err);
    });
  }
  //选择品牌回调
  searchBrandsCallback(val) {
    let _that = this;
    // console.log(val);
    _that.basicInfo.brandId = val.id;
    _that.basicInfo.companyId = val.companyId;
    _that.basicInfo.companyName = val.companyName;
    // _that.basicInfo.dishStyleCode = val.dishStyleCode;
    _that.basicInfo.artificialPerson = val.artificialPerson;
    if (val.companyBusinessType) { 
      _that.basicInfo.companyBusinessType = val.companyBusinessType.split(','); 
    } else {
      _that.basicInfo.companyBusinessType = []; 
    };
    if (val.companyId) { _that.companyDisabled = true; _that.companyKey = true; }; //如果回调有企业，则企业不可编辑
    // console.log(_that.companyDisabled);
    _that.basicInfo.companyLinkTel = val.companyLinkTel;
    _that.basicInfo.companyScale = val.companyScale;
    _that.basicInfo.companyStatus = String(val.companyStatus);
    _that.basicInfo.companyWebsite = val.companyWebsite;
    _that.basicInfo.brandLogo = val.logo;
    _that.basicInfo.brandLogoUrl = val.logoUrl;
    _that.basicInfo.registeredAssets = val.registeredAssets;
    _that.basicInfo.brandStatus = String(val.status);
    _that.basicInfo.companyAddress = val.companyAddress;

    // angular.forEach(_that.companyType, (value, index) => {
    //   // console.log(_that.companyType);
    //   value.select = false;
    //   // console.log(_that.companyType);
    //   // value.select && _that.basicInfo.companyBusinessType.push(value.dataCode);
    //   angular.forEach(_that.basicInfo.companyBusinessType, (v, i) => {
    //     if (v === value.dataCode) {
    //       // console.log(value);
    //       value.select = true;
    //     }
    //   });
    // });
  }

  //  查询企业
  searchCompanies(val) {
    if (!val) return;
    let _that = this;
    // console.log(val);
    _that.basicInfo.companyName = val;
    _that.basicInfo.companyId = null;
    // _that.basicInfo.companyId = null;
    this.companyKey = false;
    _that.CusService.searchCompanies({ name: val }).then(function (data) {
      _that.companyList = data.list;
      // console.log(_that.brandList);
      _that.companyList.forEach(item => {
        // console.log(item);
        if (val === item.name) {
          _that.companyCallback(item);
        }
      });
    }, err => {
      console.log(err);
    });
  }

  //选择企业回调
  companyCallback(val) {
    let _that = this;
    // console.log(val);
    _that.basicInfo.companyId = val.id;
    _that.basicInfo.companyName = val.name;
    _that.basicInfo.artificialPerson = val.artificialPerson;
    if (val.id) { _that.companyKey = true; }; //如果回调有企业，则企业不可编辑
    _that.basicInfo.companyLinkTel = val.linkTel;
    _that.basicInfo.companyScale = val.scale;
    _that.basicInfo.companyStatus = String(val.status);
    _that.basicInfo.companyWebsite = val.website;
    _that.basicInfo.registeredAssets = val.registeredAssets;
    _that.basicInfo.companyAddress = val.address;
    if (val.businessType) {
      _that.basicInfo.companyBusinessType = val.businessType.split(',');
    } else {
      _that.basicInfo.companyBusinessType = [];
    };

    // angular.forEach(_that.companyType, (value, index) => {
    //   // console.log(_that.basicInfo.companyBusinessType);
    //   value.select = false;
    //   angular.forEach(_that.basicInfo.companyBusinessType, (v, i) => {
    //     if (v === value.dataCode) {
    //       // console.log(value);
    //       value.select = true;
    //     }
    //   });
    // });
  }

  //选择人员回调
  selCallback(per, type) {
    let _that = this;
    if (type === 'bd') {
      _that.basicInfo.bdUserName = per.realName;
      _that.basicInfo.bdUserNo = per.userNo;
    };
    if (type === 'fae') {
      _that.basicInfo.faeUserName = per.realName;
      _that.basicInfo.faeUserNo = per.userNo;
    };
    if (type === 'ls') {
      _that.basicInfo.lsUserName = per.realName;
      _that.basicInfo.lsUserNo = per.userNo;
    }
  }
  //保存基本信息
  saveStore(sub) {
    let _that = this;
    let fn, tipMsg;
    // _that.basicInfo.openingTime = _that.$filter('date')(_that.openTime, 'HH:mm');
    // _that.basicInfo.closingTime = _that.$filter('date')(_that.closeTime, 'HH:mm');
    _that.basicInfo.business = _that.basicInfo.business || [];
    // _that.basicInfo.companyBusinessType = [];
    _that.basicInfo.id = _that.storeId;
    // angular.forEach(_that.storeBusinessType, (val, index) => {
    //   val.select && _that.basicInfo.business.push(val.dataCode);
    // });
    // angular.forEach(_that.companyType, (val, index) => {
    //   val.select && _that.basicInfo.companyBusinessType.push(val.dataCode);
    // });
    // if (_that.basicInfo.business.length === 0) {
    //   _that.DialogService.showMessage('业务类型至少选择一个', false);
    //   return;
    // }
    // console.log(_that.basicInfo)
    // console.log(_that.basicInfo.companyBusinessType.length)
    // debugger
    _that.basicInfo.companyBusinessType = _that.basicInfo.companyBusinessTypes;
    if (_that.basicInfo.companyBusinessType.length === 0) {
      _that.DialogService.showMessage('企业业务类型至少选择一个', false);
      return;
    }
   
    if (sub) {
      fn = _that.CusService.sumbitSeaStores(_that.basicInfo);
      tipMsg = '提交成功';
    } else {
      fn = _that.CusService.putSeaModify(_that.basicInfo);
      tipMsg = '修改成功';
    }
    fn.then((data) => {
      // if (callback) {
      //   console.log(callback);
      //   callback();
      // } else {
      _that.DialogService.showMessage(tipMsg);
      setTimeout(function() {
        history.go(-1);
      }, 1500); 
      console.log(data);
      // }
      // callback && callback();   
    }, err => {
      console.log(err.data.code);
      // debugger;
      const msg = _that.$filter('addStoreErrMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
      console.log(err);
    });
  }
  //获取菜系列表
  getDisheslist() {
    let _that = this;
    _that.CusService.getDisheslist().then(function (data) {
      _that.disheslist = data;
    }, err => {
      console.log(err);
    });
  }
  //获取销售维护人信息
  getSaleName(val) {
    let _that = this;
    if (!val) return;
    _that.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  //上传
  uploadFiles(files, errFiles, name) {
    console.log(files);
    // console.log(errFiles);
    let _that = this;
    if (files && files.length) {
      _that.basicInfo[name + 'Url'] = _that.basicInfo[name + 'Url'] || [];
      _that.basicInfo[name] = _that.basicInfo[name] || [];
      for (var i = 0; i < files.length; i++) {
        _that.PublicServer.uploadFiles(files[i], errFiles, 'privateimage').then(data => {
          const img = data.data;
          if (img.code === 'S200') {
            // console.log(name + 'Url');
            _that.basicInfo[name + 'Url'].push(img.data.url);
            _that.basicInfo[name].push(img.data.id);
            console.log(_that.basicInfo[name + 'Url']);
            _that.$apply();
          } else {
            _that.DialogService.showMessage(_that.$filter('respUploadMsg')(img.code), false);
          }
          // console.log(data);
        });
      }
      // or send them all together for HTML5 browsers:
    } else {
      if (name === 'brandLogo' || name === 'logo') { // 公用上传图片
        _that.PublicServer.uploadFiles(files, errFiles, 'publicimage').then(data => {
          const img = data.data;
          if (img.code === 'S200') {
            // _that.$apply(function () {
            //   _that.basicInfo[name + 'Url'] = img.data.url;
            //   _that.basicInfo[name + 'Id'] = img.data.id;
            //   console.log(_that.basicInfo[name + 'Url']);
            // });
            _that.basicInfo[name + 'Url'] = img.data.url;
            _that.basicInfo[name] = img.data.id;
            console.log(_that.basicInfo[name + 'Url']);
            _that.$apply();
          } else {
            _that.DialogService.showMessage(_that.$filter('respUploadMsg')(img.code), false);
          }
        });
      } else {
        _that.PublicServer.uploadFiles(files, errFiles, 'privateimage').then(data => {
          const img = data.data;
          if (img.code === 'S200') {
            // _that.$apply(function () {
            //   _that.basicInfo[name + 'Url'] = img.data.url;
            //   _that.basicInfo[name + 'Id'] = img.data.id;
            //   console.log(_that.basicInfo[name + 'Url']);
            // });
            _that.basicInfo[name + 'Url'] = img.data.url;
            _that.basicInfo[name] = img.data.id;
            console.log(_that.basicInfo[name + 'Url']);
            _that.$apply();
          } else {
            _that.DialogService.showMessage(_that.$filter('respUploadMsg')(img.code), false);
          }
          console.log(data);
        });
      }
    }
  }
// 删除多选图片
  delete(key, name) {
    let _that = this;
    _that.basicInfo[name].splice(key, 1);
    _that.basicInfo[name + 'Url'].splice(key, 1);
  }

    // 获取私海详情
  getSeaDetail(callback) {
    let _that = this;
    _that
      .storeService
      .getSeaLog({id: _that.$stateParams.id, businessId: _that.$stateParams.businessId})
      .then((data) => {
        callback(null, data);
        // console.log(data);
        // _that.basicInfo = data;
      });
  } 

  // submitStore() {
  //   this.saveStore(this.submitStoreDetail.bind(this));
  // }

  // //门店提交上线
  // submitStoreDetail() {
  //   const _that = this;
  //   // _that.saveStore();
  //   console.log(_that.param);
  //   _that.CusService.sumbitSeaStores(_that.param).then((data) => {
  //     _that.DialogService.showMessage('提交成功');
  //     setTimeout(function() {
  //       _that.$state.go('store.privateSeaList');
  //     }, 1500);
  //     // console.log(_that.verifyLog);
  //   }, err => {
  //     const msg = _that.$filter('AddStoreErrMsg')(err.data.code);
  //     msg && _that.DialogService.showMessage(msg, false);
  //     console.log(err);
  //   });
  // }
  
  //获取审核日志
  getVerifyLog(param) {
    // console.log(param);
    const _that = this;
    _that.storeService.getVerifyLog(param).then((data) => {
      _that.verifyLog = data;
      // console.log(_that.verifyLog);
    });
  }
  // 永久时间
  forever(name, bus) {
    console.log(bus);
    const _that = this;
    _that.basicInfo[name + 'EndDate'] = new Date('2099/12/31').getTime();
    _that.basicInfo[name + 'BeginDate'] = new Date().getTime();
    // console.log(_that.basicInfo[name + 'EndDate']);
    // $apply();
  }

  //选择时间
  selDate(str, name, open) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.basicInfo[name];
    } else {
      _that.startDateOps.maxDate = _that.basicInfo[name];
    }
    if (open) {
      _that[open] = !_that[open];
    }
  }

   // 查看图片
  openLightboxModal(images, index) {
    let _that = this;
    _that.ImgLightbox.openModal(images, index);
  };
}
editPrivateSeaCtrl.$inject = [
  '$uibModal',
  '$log',
  '$http',
  '$timeout',
  '$location',
  '$stateParams',
  'CusService',
  'storeService',
  'PublicServer',
  '$state',
  '$filter',
  '$ocLazyLoad',
  'DialogService',
  'ImgLightbox'
];
export default angular
  .module('editPrivateSeaModule', [])
  .controller('editPrivateSeaCtrl', editPrivateSeaCtrl)
  .name;
//支付进件相关资料：开户省市 开户行 开户支行几个字段处理逻辑是
// 1、连接机构为【富友】开户省市从支付组取数据，先选择省然后根据省选择市，省市下拉选择；
// 开户行从支付组取数据，开户支行根据开户行获取 ，开户行和开户支行搜选选择；
// 2、连接机构为拉卡拉、易生支付保留现在逻辑，开户省市是我们自己的，开户行和支行是输入的；

/**
 * 打开地图弹框controller
 */
class mapModalCtrl {
  constructor(opts, storeService, DialogService, $state, $filter, $uibModalInstance) {
    this.$modalInstance = $uibModalInstance;
    this.opts = opts;
    this.storeService = storeService;
    this.DialogService = DialogService;
    this.$filter = $filter;
    this.$state = $state;
    this.isStatus = true;
    // this.isFlag = true; 
    this.data = {
      'status': true,
      // 'flag': true,
      'remark': ''
    };
    Object.assign(this.data, opts);
    this.location = {};
    this.location.lng = opts.poiLng;
    this.location.lat = opts.poiLat;
    // this.companyName = this.opts.companyName;
    // this.comTotal = this.opts.comTotal;
    // this.brandName = this.opts.brandName;
    // this.address = this.opts.address;
    // this.brandTotal = this.opts.brandTotal;
    // this.subBtnDisabled = false;
    //   this[_init_]();
    // }
    // [_init_]() {
    //   if ((this.comTotal > 0 && this.opts.companyId !== null) || (this.brandTotal > 0 && this.opts.brandId !== null)) {
    //     this.geneAccount();
    //   }
  }

  // 确定
  confirm() {
    let _that = this;
    this.$modalInstance.close(_that.location);
  }

  // 取消
  cancel() {
    this.$modalInstance.dismiss();
    return false;
  }
}
mapModalCtrl.$inject = ['opts', 'storeService', 'DialogService', '$state', '$filter', '$uibModalInstance'];