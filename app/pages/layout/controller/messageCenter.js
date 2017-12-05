const _init_ = Symbol('_init_');
class messageCenterCtrl {
  constructor($scope, $rootScope, $state, $stateParams, $timeout, HeaderService, $filter) {
      //页面列表不为空 
    var verifyList = true;
    var getParame = {
      // orderBys: '[{"column":"a.update_time","asc":false}]',
      // searchStr: null,
      type: null,
      pageNo: 1,
      pageSize: 10
    };
    Object.assign(this, {
      HeaderService,
      verifyList,
      getParame,
      $state,
      $filter,
      $rootScope,
      $timeout
    });
    this[_init_]();
  }

  /**
   * @param {*} pageNo当前页面numbe1
   * @param {*} pageSize当前页数number10
   * @param {*} status二维码状态('undownload', 'downloaded', 'used')string
   * @param {*} store客户名称或者idstring
   */
  [_init_]() {
    console.log(this.$rootScope.messageGrope);
    // this.list = [{
    //   id: 12
    // }];
    this.getMessage();
  }
  // 获取列表
  getMessageList(type, pageNo) {
    console.log(type);
    console.log(this.getParame);
    let _that = this;
    if (type) {
      _that.type = type;
      _that.getParame.type = type;
      _that.getParame.pageNo = pageNo || _that.getParame.pageNo;
    }
    _that
      .HeaderService
      .getMessageList(_that.getParame)
      .then((data) => {
        _that.messageList = data.list;
        _that.total = data.total;
      }, (err) => {
        _that.messageList = [];
        console.log(err);
      });
  }

  // 已读及跳转
  messageRouter(item) {
    let _that = this;
    let dataInfo = JSON.parse(item.dataInfo);
    let router = _that.$filter('messageType')(dataInfo);
    console.log(router);
    _that.$state.go(router.name, router.id);
    _that
    .HeaderService
    .putMessage(item.id, {staus: 'READ'})
    .then((data) => {
      // console.log(_that.$rootScope.messageTotal);
      _that.$rootScope.messageTotal --;
    });
  }

  getMessage() {
    const _that = this;    
    //  实时刷新数据
    // function getcode() {  
      // console.log(new Date().getTime());
      // if (_that.$state.current.name !== 'store.storeDetail') {
      //   _that.$timeout.cancel(_that.mapTimeout);
      // } else {
    _that
    .HeaderService
    .getMessage({time: new Date().getTime()})
    .then((data) => {
      _that.messageGrope = []; // 消息分类
      data.forEach(item => {
        if (item.type === 'CUST_AUDIT') {
          _that.messageGrope.push({type: 'CUST_AUDIT', name: '建店审核通知'});
        } else if (item.type === 'ORDER') {
          _that.messageGrope.push({type: 'ORDER', name: '工单中心通知'});
        } else if (item.type === 'SERVICE_ORDER') {
          _that.messageGrope.push({type: 'SERVICE_ORDER', name: '服务费通知'});
        }
      });
      // _that.getMessageList();
      // console.log(_that.messageGrope);
    });          
      // _that.$timeout(getcode, 30000);
      // };  
    // }
    // getcode();
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
  // 搜索
  searchBt() {
    this.getParame.pageNo = 1;
    this.getMessageList();
  }

  // 翻页
  pageChanged() {
    this.getMessageList();
  }
}
messageCenterCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'HeaderService', '$filter'];
export default angular.module('messageCenterModule', [])
  .controller('messageCenterCtrl', messageCenterCtrl)
  .name;