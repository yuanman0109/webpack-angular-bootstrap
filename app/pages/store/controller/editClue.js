import async from 'node_modules/async';
const _init_ = Symbol('_init_');
class EditClueCtrl {
  constructor(ClueService, DialogService, PublicServer, $timeout, $state, $stateParams) {
    Object.assign(this, {ClueService, DialogService, PublicServer, $timeout, $state, $stateParams});
    this.getParame = {
      pageNo: 1,
      pageSize: 10
    };
      // 餐饮业态
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
    // 性别
    this.sex = [
      {
        code: 1,
        name: '男'
      }, {
        code: 0,
        name: '女'
      }
    ];
    // 年龄段
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
     // 线索状态
    this.statusList = [
      {
        code: 'WAIT',
        name: '待分配'
      }, {
        code: 'EXIST_PUBLIC',
        name: '已存在公海'
      }, {
        code: 'EXIST_PRIVATE',
        name: '已存在私海'
      }, {
        code: 'EXIST_FORMAL',
        name: '已签约客户'
      }, {
        code: 'INVALID',
        name: '无效客户'
      }, {
        code: 'RIVAL',
        name: '竞争对手'
      }
    ];
    this.status = {
      'WAIT': '待分配',
      'EXIST_PUBLIC': '已存在公海',
      'EXIST_PRIVATE': '已存在私海',
      'EXIST_FORMAL': '已签约客户',
      'INVALID': '无效客户',
      'RIVAL': '竞争对手',
      'GET': '已分配'
    };
    // 是否KP
    this.isKp = [
      {
        code: 1,
        name: '是'
      }, {
        code: 0,
        name: '否'
      }
    ];
    this.isCompanyName = false;
    this[_init_]();
  }[_init_]() {
    // 获取详情
    const _that = this;
    async.parallel({
      one: function(callback) {
        _that.getSource(callback);      
      },
      two: function(callback) {
        _that.getDetails(callback);
      }
    }, (error, results) => {
      if (!error) {
        _that.sourceList = results.one;
        _that.basicInfo = results.two;
        
        if (_that.basicInfo.CompanyBusinessType && _that.basicInfo.CompanyBusinessType.length) {
          _that.isCompanyBusinessType = true;
        }
        if (_that.basicInfo.businessType === null) {
          _that.basicInfo.businessType = [];
        }
        if (!_that.basicInfo.flag) {
          _that.basicInfo.flag = 2;
        }
      }
    });
  }
   // 获取详情
  getSource(callback) {
    this.ClueService.getSource().then((data) => {
      if (callback) {
        callback(null, data);
      } else {
        this.sourceList = data;
      }
    }, (err) => {
      console.log(err);
    });
  }
  // 获取详情
  getDetails(callback) {
    this.ClueService.getDetails(this.$stateParams.id).then((data) => {
      if (callback) {
        callback(null, data);
      } else {
        this.basicInfo = data;
      }
    }, (err) => {
      console.log(err);
    });
  }
  // 获取跟进人信息
  getUserResearch(name) {
    const _that = this;    
    if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    _that.lazyTime = _that.$timeout(() => {
      if (!name || name === '') {
        _that.userList = [];
        return;
      };
      _that
        .PublicServer
        .getUserFormName(name)
        .then((data) => {
          _that.userList = data.list;
        });
    }, 500);
  }
  selCallback(val) {
    console.log(val);
    this.basicInfo.serviceUser = val.id;
  }
  // 搜索品牌
  searchBrands(name) {
    const _that = this;
    _that.isCompanyName = false;
    _that.basicInfo.brandName = name; 
    _that.basicInfo.brandId = null;
    _that.basicInfo.companyId = null;
    _that.basicInfo.companyBusinessType = [];
    if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    _that.lazyTime = _that.$timeout(() => {
      if (!name || name === '') {
        _that.basicInfo.brandName = name;
        _that.brandList = [];
        return;
      };
      _that
        .ClueService
        .getBrandSearch({'name': name})
        .then((data) => {
          _that.brandList = data.list;
        });
    }, 500);
  }
 
    //选择品牌回调
  searchBrandsCallback(val) {
    let _that = this;
    _that.basicInfo.brandId = val.id;
    _that.basicInfo.brandName = val.name;
    _that.basicInfo.companyId = val.companyId;
    _that.basicInfo.companyName = val.companyName;
    _that.isCompanyName = true;
    if (val.companyBusinessType) { _that.basicInfo.companyBusinessType = val.companyBusinessType.split(','); } else {
      _that.basicInfo.companyBusinessType = [];
    }
  }
  //搜索城市
  getCity(name) {
    const _that = this;    
    if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    _that.lazyTime = _that.$timeout(() => {
      if (!name || name === '') {
        // _that.basicInfo.areaName = name;
        _that.cityList = [];
        return;
      };
      _that
        .ClueService
        .getCity({'name': name})
        .then((data) => {
          this.cityList = data;
        });
    }, 500);
  }
  CityCallback(val) {
    this.basicInfo.city = val.areaCode;
  }
  save() {
    var _that = this;
    _that.isSave = true;
    _that.basicInfo.clueStatusName = _that.status[_that.basicInfo.clueStatus];
    _that
        .ClueService
        .editClue(_that.basicInfo, '操作成功')
        .then((data) => {
          _that.$state.go('store.clueList');
        }, (err) => {
          _that.isSave = false;
          if (err.data.code === 'S409') {
            if (_that.basicInfo.companyId === '') {
              _that.DialogService.showMessage('门店名或品牌名或企业名不能重名');
            } else {
              _that.DialogService.showMessage('门店名不能重名');
            }
          }
          console.log(err);
        });
  }
}
EditClueCtrl.$inject = ['ClueService', 'DialogService', 'PublicServer', '$timeout', '$state', '$stateParams'];
export default angular
.module('EditClueModule', [])
.controller('EditClueCtrl', EditClueCtrl)
.name;