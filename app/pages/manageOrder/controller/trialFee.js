'use strict';
const _init_ = Symbol('_init_');
class TrialFeeCtrl {
  constructor($state, $stateParams, DialogService, ChargesConfigService, PublicServer) {
    Object.assign(this, {$state, $stateParams, DialogService, ChargesConfigService, PublicServer});
    this.businessTypes = [];
    this.commitStatus = false;
    this.showTimeControl = false;
    this.timeCommit = true;
    this.chooseTime = null;
    this.resultTime = null;
    this.userData = {};
    this.params = {
      id: '',
      open: false,   //是否开启
      tryDays: null,   //试用天数
      businessId: null,  //业务类型
      chargeAmount: null,  //收费金额
      aheadDays: null,  //到期天数
      aheadTime: null   //当天时间
    };
    this[_init_]();
  };
  [_init_]() {
    this.getBusinessTypes();
    this.getTrialFee();
  }
  // 获取试用费
  getTrialFee() {
    // var busid = {
    //   // businessId: 'POS'
    //   // businessId: 'SNACK'
    //   // businessId: 'PAY'
    //   businessId: 'PRINTER'
    // };
    let _that = this;
    _that
    .ChargesConfigService
    .getTrialFee()
    .then((data) => {
      // console.log(data);
      if (data.id) {
        _that.params.id = data.id;
        _that.params.open = data.open;
        _that.params.tryDays = data.tryDays;
        _that.params.businessId = data.businessId;
        _that.params.chargeAmount = data.chargeAmount;
        _that.params.aheadDays = data.aheadDays;
        _that.params.aheadTime = data.aheadTime;
        _that.params.admin = data.admin;
        _that.chooseTime = new Date(_that.params.aheadTime);
        _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
        _that.timeCommit = false;
        if (_that.params.admin) {
          _that.getUserFormId(_that.params.admin);
        }     
      }     
    }, () => {
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

  // 获取业务类型
  getBusinessTypes() {
    let _that = this;
    _that
    .ChargesConfigService
    .getBusinessTypes()
    .then((data) => {
      // console.log('获取业务类型成功');
      _that.businessTypes = data;
    }, () => {
      // console.log('获取业务类型失败！！！');
    });
  }
  // 时间控件展示隐藏
  inputBtn() {
    let _that = this;
    if (_that.params.aheadTime === null) {
      _that.chooseTime = new Date();
      _that.params.aheadTime = _that.chooseTime.getTime();
      _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
      _that.timeCommit = false;
    } else {
      _that.chooseTime = new Date(_that.params.aheadTime);      
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
      _that.params.aheadTime = _that.chooseTime.getTime();
      _that.resultTime = `${_that.chooseTime.getHours()}:${_that.chooseTime.getMinutes()}:${_that.chooseTime.getSeconds()}`;
    }
  }

  //输入姓名回调
  getInfoFormName(name) {
    let _that = this;
    if (!name || name === '') {
      return;
    }
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
    _that.params.admin = _that.userData.id;
    // console.log(_that.userData);
    // _that.getIsOrder(data.officeCity);
  }

  // 重置试用费管理员
  resetChargeManger () {
    let _that = this;
    _that.userData = {};
    _that.params.admin = '';
  }

  validHttpCode(c) {
    var msg;
    switch (c) {
      case 'ServiceCharge_006':
        msg = '服务费必须大于试用费';
        break;
    }
    return msg;
  }

  // 提交
  saveEdit() {
    let _that = this;
    _that.commitStatus = true;
    // console.log(_that.params);
    if (_that.params.id && _that.params.open === true) {
      var param = {
        open: _that.params.open
      };
      _that
      .ChargesConfigService
      .toogleTrialFee(_that.params.id, param)
      .then((data) => {
        console.log('open success');
      }, (data) => {     
        console.log('open wrong');
      });
    }
    _that
    .ChargesConfigService
    .addTrialFee(_that.params)
    .then((data) => {
      _that.DialogService.showMessage('提交成功', true);
      _that.$state.go('manageOrder.chargesConfig');
    }, (data) => {     
      var code = data.data.code;
      var msg = _that.validHttpCode(code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2500);
      }  
      _that.commitStatus = false;
    });
  }

  // 试用费关闭
  saveCloseEdit() {
    let _that = this;
    if (_that.params.id === '' && _that.params.open === false) {
      _that.DialogService.showMessage('提交成功', true);
      _that.$state.go('manageOrder.chargesConfig');
    } else {
      var param = {
        open: _that.params.open
      };
      _that
      .ChargesConfigService
      .toogleTrialFee(_that.params.id, param)
      .then((data) => {
        _that.DialogService.showMessage('提交成功', true);
        _that.$state.go('manageOrder.chargesConfig');
      }, (data) => {     
        console.log('close wrong');
      });
    }
  }
}
TrialFeeCtrl.$inject = ['$state', '$stateParams', 'DialogService', 'ChargesConfigService', 'PublicServer'];
export default angular.module('TrialFeeModule', [])
  .controller('TrialFeeCtrl', TrialFeeCtrl)
  .name;