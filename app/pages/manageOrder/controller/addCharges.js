'use strict';
const _init_ = Symbol('_init_');
class AddChargesCtrl {
  constructor($state, $stateParams, DialogService, ChargesConfigService, PublicServer) {
    Object.assign(this, {$state, $stateParams, DialogService, ChargesConfigService, PublicServer});
    this.btnStatus = false;
    this.addControl = true;
    this.commitStatus = false;
    this.controlNumber = 0;
    this.itSamePeriod = false;
    this.validDayStatus = false;
    // this.remindTimeStatus = false;
    this.showTimeControl = false;
    this.timeCommit = true;
    this.chooseTime = null;
    this.resultTime = null;
    this.userData = {};
    this.businessTypes = [];
    this.validPeriodListItem = [];
    this.configDetail = {
      businessId: null,
      name: null,
      description: null,
      aheadDays: null,
      aheadTime: null,
      periodConfigs: [{status: true}]
    };
    this[_init_]();
  };
  [_init_]() {
    this.chargeId = this.$stateParams.chargeId;
    this.pageType = this.$stateParams.pageType;
    // console.log(this.chargeId, this.pageType);
    // console.log(this);
    this.gitBtnStatus(this.pageType);
    this.getBusinessTypes();
    this.getValidPeriod();
    if (this.pageType !== 'addNew') {
      this.getChargeDetail(this.chargeId);
    } else {}
  }
  // 获取服务费配置详细信息
  getChargeDetail(param) {
    let _that = this;
    _that
    .ChargesConfigService
    .getChargeDetail(param)
    .then((data) => {
      console.log('获取数据成功');
      // console.log(data);
      _that.configDetail = data;
      console.log(_that.configDetail.aheadTime);
      _that.resultTime = data.aheadTime;
      _that.timeCommit = false;
      _that.theLineControl();
      if (_that.configDetail.admin) {
        _that.getUserFormId(_that.configDetail.admin);
      }         
      _that.chooseTime = new Date(_that.configDetail.aheadTime);
      _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
    }, () => {
      // console.log('获取数据失败！！！！！！！！');
    });
  }
  // 获取业务类型
  getBusinessTypes() {
    let _that = this;
    _that
    .ChargesConfigService
    .getBusinessTypes()
    .then((data) => {
      // console.log('获取业务类型成功');
      // console.log(data);
      _that.businessTypes = data;
    }, () => {
      // console.log('获取业务类型失败！！！');
    });
  }

  // 获取用户信息
  getUserFormId(id) {
    let _that = this;
    _that.PublicServer
    .getUserFormId(id)
    .then((data) => {
      // console.log(data);
      _that.userData.name = data.realName;
      _that.userData.userNo = data.userNo;
      _that.userData.id = data.id;
      // console.log(_that.userData);
    }, () => {
      console.log('error');
    });
  }

  // 时间控件展示隐藏
  inputBtn() {
    let _that = this;
    if (_that.configDetail.aheadTime === null) {
      _that.chooseTime = new Date();
      _that.configDetail.aheadTime = _that.chooseTime.getTime();
      _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
      _that.timeCommit = false;
    } else {
      _that.chooseTime = new Date(_that.configDetail.aheadTime);
    }
    _that.showTimeControl = !_that.showTimeControl;
  }

  // 改变到期提醒时间
  changedTime() {
    let _that = this;
    // console.log(_that.chooseTime);
    if (_that.chooseTime === null) {
      _that.timeCommit = true;
    } else {
      _that.timeCommit = false;
      _that.configDetail.aheadTime = _that.chooseTime.getTime();
      _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
    }
  }

  //输入姓名回调
  getInfoFormName(name) {
    if (!name || name === '') {
      return;
    }
    let _that = this;
    _that
      .PublicServer
      .getUserFormName(name)
      .then((data) => {
        // console.log(data);
        _that.userList = data.list;
        // console.log(_that.userList);
      }, (err) => {
        console.log(err);
      });
  }
  //选择姓名回调
  selCallback(data) {
    const _that = this;
    _that.userData = data;
    _that.configDetail.admin = _that.userData.id;
    // console.log(_that.userData);
    // _that.getIsOrder(data.officeCity);
  }
  // 重置服务费管理员
  resetChargeManger () {
    let _that = this;
    _that.userData = {};
    _that.configDetail.admin = '';
  }

  // 获取服务有效期
  getValidPeriod() {
    let _that = this;
    _that
    .ChargesConfigService
    .getValidPeriod()
    .then((data) => {
      console.log('获取服务有效期成功');
      // console.log(data);
      _that.validPeriodListItem = data;    
    }, () => {
      // console.log('获取服务有效期失败！！！');
    });
  }
  // 服务费有效期选择框改变事件
  changeValidPeriod() {
    let _that = this;
    var arrList = [];
    angular.forEach(_that.configDetail.periodConfigs, function(item) {
      arrList.push(item.validPeriod);
    });
    var newArr = arrList.sort();
    for (var i = 0; i < newArr.length; i++) {
      if ((newArr[i] !== undefined) && (newArr[i] === newArr[i + 1])) {
        _that.itSamePeriod = true;
        break;
      } else {
        _that.itSamePeriod = false;
      }
    }
  }
  
  // 删除
  deleteLine(i) {
    let _that = this;
    if (_that.configDetail.periodConfigs[i].id) {
      var delateItem = {
        id: _that.configDetail.periodConfigs[i].id,
        isHidden: true
      };
      _that.configDetail.periodConfigs[i] = delateItem;
      _that.controlNumber += 1;
      // console.log(_that.configDetail);
    } else {
      _that.configDetail.periodConfigs.splice(i, 1);
    }
    _that.theLineControl();
    _that.changeValidPeriod();
  }

  // 添加
  addNewLine() {
    var periodConfig = {
      status: true
    };
    this.configDetail.periodConfigs.push(periodConfig);
    this.theLineControl();
  }
  // 添加条数控制
  theLineControl() {
    let _that = this;
    var num = 4 + _that.controlNumber;
    if (_that.configDetail.periodConfigs.length > num) {
      _that.addControl = false;
    } else {
      _that.addControl = true;
    }
    // console.log(num);  
  }
  // 验证天数小于365
  validDay (num) {
    var lists = this.configDetail.periodConfigs;
    for (var i = 0; i < lists.length; i++) {
      if ((lists[i].delayPeriod > 365) || (lists[i].freePeriod > 365)) {
        this.validDayStatus = true;
        break;
      } else {
        this.validDayStatus = false;
      }
    }
  }
  // 编辑、提交按钮显示/隐藏
  gitBtnStatus(param) {
    if (param === 'detail') {
      this.btnStatus = true;
    } else {
      this.btnStatus = false;
    }
  }
  // 提交
  saveEdit() {
    let _that = this;
    _that.commitStatus = true;
    // _that.configDetail.name = _that.configDetail.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // console.log(_that.configDetail);
    _that.pageType === 'addNew' ? _that.addChargeCongig(_that.configDetail) : _that.editChargeConfig(_that.configDetail);
  }
  // 新增
  addChargeCongig(param) {
    // console.log(param);
    let _that = this;
    _that
    .ChargesConfigService
    .addChargeConfig(param)
    .then((data) => {
      // console.log('新增服务费配置成功');
      _that.$state.go('manageOrder.chargesConfig');
    }, (data) => {
      // console.log(data);
      // console.log('新增服务费配置失败！！！！！！！！！！！！！');
      var code = data.data.code;
      var msg = _that.validHttpCode(code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2500);
      }      
      _that.commitStatus = false;
    });
  }
  validHttpCode(c) {
    var msg;
    switch (c) {
      case 'ServiceCharge_000':
        msg = '服务费业务类型重复';
        break;
      case 'ServiceCharge_001':
        msg = '服务费名称不能重复';
        break;
      case 'ServiceCharge_002':
        msg = '服务费配置不存在';
        break;
      case 'ServiceCharge_003':
        msg = '不能重复下架或上架';
        break;
      case 'ServiceCharge_004':
        msg = '服务费不存在';
        break;
      case 'ServiceCharge_005':
        msg = '有效期重复';
        break;
      case 'ServiceCharge_006':
        msg = '服务费必须大于试用费';
        break;
    }
    return msg;
  }

  // 编辑
  editChargeConfig(param) {
    let _that = this;
    _that
    .ChargesConfigService
    .editChargeConfig(param)
    .then((data) => {
      // console.log('编辑服务费配置成功');
      _that.$state.go('manageOrder.chargesConfig');
    }, (data) => {
      // console.log('编辑服务费配置失败！！！！！！！！！！！！！');
      // console.log(param);
      var code = data.data.code;
      var msg = _that.validHttpCode(code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2500);
      }     
      _that.commitStatus = false;
    });
  }
}
AddChargesCtrl.$inject = ['$state', '$stateParams', 'DialogService', 'ChargesConfigService', 'PublicServer'];
export default angular.module('AddChargesModule', [])
  .controller('AddChargesCtrl', AddChargesCtrl)
  .name;