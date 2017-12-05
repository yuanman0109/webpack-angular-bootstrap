const _init_ = Symbol('_init_');

export default class storeVerifyCtrl {
  constructor($uibModal, storeService, $state, $stateParams) {
    //页面列表不为空 
    var verifyList = true;
    Object.assign(this, {
      $uibModal,
      storeService,
      $state,
      $stateParams,
      verifyList
    });
    let query = $stateParams.query ? JSON.parse($stateParams.query) : {
      searchStr: null,
      serviceStatus: null,
      pageNo: null
    };
    this.getParame = {
      orderBys: '[{"column":"a.update_time","asc":false}]',
      searchStr: query.searchStr || null,
      serviceStatus: query.serviceStatus || 'SUBMIT',
      pageNo: query.pageNo || 1,
      pageSize: 10
    };
    this[_init_]();
  }

  /**
   * @param {*} pageNo当前页面numbe1
   * @param {*} pageSize当前页数number10
   * @param {*} status二维码状态('undownload', 'downloaded', 'used')string
   * @param {*} store客户名称或者idstring
   */
  [_init_]() {
    this.getVerifyList();
  }
  // 获取列表
  getVerifyList() {
    let _that = this;
    _that
      .storeService
      .getVerifyList(_that.getParame)
      .then((data) => {
        _that.verifyList = data.list;
        _that.total = data.total;
      }, (err) => {
        _that.verifyList = [];
        console.log(err);
      });
  }
  //切换tab
  selTab(serviceStatus) {
    let _that = this;
    if (serviceStatus) {
      _that.serviceStatus = serviceStatus;
      _that.getParame.serviceStatus = serviceStatus;
      _that.getParame.pageNo = 1;
    }
    _that.goRouter();
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
    this.goRouter();
  }
  //路由跳转
  goRouter() {
    this.$state.go('store.verify', {query: JSON.stringify(this.getParame)}, {inherit: false});
  }
  // 翻页
  pageChanged() {
    this.goRouter();
  }
}

storeVerifyCtrl.$inject = ['$uibModal', 'storeService', '$state', '$stateParams'];