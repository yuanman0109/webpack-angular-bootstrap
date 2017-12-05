const _init_ = Symbol('_init_');
class MsgDetailCtrl {
  constructor(MsgService, $stateParams) {
    this.MsgService = MsgService;
    this.$stateParams = $stateParams;
    this.msgTypes = {
      'office': '官方消息',
      'spread': '推广消息'
    };
    this.statusList = {
      'WITHDRAW': '已撤回',
      'SENDING': '发布中'
    };
    this[_init_]();
  }
  [_init_]() {
    this.getMsgDetail(this.$stateParams.id);
  }
  //获取消息详情
  getMsgDetail(id) {
    let _that = this;
    _that
      .MsgService
      .getMsgDetail(id)
      .then(data => {
        _that.msgDetail = data;
      }, err => {
        console.log(err);
      });
  }
}
MsgDetailCtrl.$inject = ['MsgService', '$stateParams'];
export default angular.module('MsgDetailModule', [])
  .controller('msgDetailCtrl', MsgDetailCtrl)
  .name;