/**
 * 修改维护人弹窗controller
 */
export default class ModifyUserCtrl {
  constructor(opts, CusService, DialogService, $state, $filter, $uibModalInstance, PublicServer) {
    Object.assign(this, {opts, CusService, DialogService, $state, $filter, $uibModalInstance, PublicServer});
    console.log(opts);
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
  //select表单点击清空列表
  focus() {
    this.userList = [];
  }
  // 确定
  confirm() {
    let _that = this;
    let params = {
      storeId: _that.opts.item.id,
      users: []
    };
    angular.forEach(_that.opts.item.business, function(val, index) {
      params.users[index] = {
        businessId: val.businessId,
        saleServiceUser: val.saleServiceUser,
        technologyServiceUser: val.technologyServiceUser
      };
    });
    _that.CusService.postUser(params).then(data => {
      _that.DialogService.showMessage('修改成功');
      _that.$uibModalInstance.close();
      _that.opts.call();
      //_that.$state.reload();
    }, err => {
      let msg = _that.$filter('storeRespErrMsg')(err.data.code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2000);
      }
      console.log(err);
    });
  }

  // 取消
  cancel() {
    this.$uibModalInstance.dismiss();
    return false;
  }
}
ModifyUserCtrl.$inject = ['opts', 'CusService', 'DialogService', '$state', '$filter', '$uibModalInstance', 'PublicServer'];