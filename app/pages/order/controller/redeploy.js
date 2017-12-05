const _init_ = Symbol('_init_');
class orderRedeployCtrl {
  constructor(orderService, $stateParams, DialogService, $filter) {
    var getParame = {
      oldReceiver: '',
      newReceiver: '',
      forwardDesc: ''
    };
    Object.assign(this, {
      $stateParams,
      orderService,
      DialogService,
      $filter,
      getParame
    });
    //现接单人
    this[_init_]();
  }

  [_init_]() {
    console.log('Init order redeploy ctrl');
    var orderId = this.$stateParams.id;
    console.log('current order id:' + orderId);
    // this.getUserResearch()
    this.getUserInfo();
  }

  getUserInfo() {
    let _that = this;
    _that
      .orderService
      .getUserInfo()
      .then((data) => {
        _that.userInfo = data;
      }, (err) => {
        console.log(err);
      });
  }

  // 一键转派
  getRedeploy() {
    let _that = this;
    delete _that.getParame.oldReceiverName;
    delete _that.getParame.newReceiverName;
    console.log(_that.getParame);
    _that
      .orderService
      .getRedeploy(_that.getParame, '提交成功')
      .then((data) => {
        _that.getParame = {
          // 'newReceiverName': '',
          // 'oldReceiverName': '',
          oldReceiver: '',
          newReceiver: '',
          forwardDesc: ''
        };
      }, (err) => {
        let msg = _that.$filter('OrderRespErrMsg')(err.data.code);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false, 2000);
        }
      });
  }

  // 获取接单人信息
  getUserResearch(name, hasOrder) {
    let _that = this;
    _that.name = name;
    _that.data = {
      'name': name,
      'pageSize': 0
    };
    if (hasOrder) {
      _that.data.hasOrder = true;
    }
    _that
      .orderService
      .getUserSearch(_that.data)
      .then((data) => {
        if (hasOrder) {
          _that.oldList = data.list;
        } else {
          _that.newList = data.list;
        }
        console.log(data);
      });
  }
  selCallback(search, status) {
    if (status === 1) {
      this.getParame.oldReceiver = search.id;
      this.getParame.oldReceiverName = search.name;
    } else if (status === 2) {
      this.getParame.newReceiver = search.id;
      this.getParame.newReceiverName = search.name;
    }
  }
}

orderRedeployCtrl.$inject = ['orderService', '$stateParams', 'DialogService', '$filter'];
export default angular.module('redeploy', [])
  .controller('orderRedeployCtrl', orderRedeployCtrl)
  .name;