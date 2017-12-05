class ChangeStoreCtrl {
  constructor(CusService, PublicServer, DialogService, $filter, $state) {
    Object.assign(this, {CusService, PublicServer, DialogService, $filter, $state});
    this.typeList = [
      {
        dataCode: 'SALE',
        dataName: '销售维护人'
      },
      {
        dataCode: 'TECHNOLOGY',
        dataName: '技术维护人'
      }
    ];
    this.storeData = {};
  }
  //获取维护人信息
  getSaleName(val) {
    let _that = this;
    if (!val) return;
    _that.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }
  //修改维护人
  changeBt() {
    if (this.storeData.newUser === this.storeData.oldUser) {
      this.DialogService.showMessage('原维护人与现维护人不能重复！', false);
    }
    this.CusService.putUser(this.storeData).then(data => {
      this.DialogService.showMessage('修改成功！');
      this.$state.reload();
    }, err => {
      console.log(err);
    });
  }
};
ChangeStoreCtrl.$inject = ['CusService', 'PublicServer', 'DialogService', '$filter', '$state'];
export default angular
  .module('ChangeStoreModule', [])
  .controller('ChangeStoreCtrl', ChangeStoreCtrl)
  .name;