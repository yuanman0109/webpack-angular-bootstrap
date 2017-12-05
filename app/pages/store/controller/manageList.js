
const _init_ = Symbol('_init_');

class storeManageListCtrl {
  constructor($stateParams, CusService, DialogService, ExportService) {
    var isAsc = false;
    var getParame = {
      isKp: null,
      mobile: null,
      name: null,
      storeName: null,
      pageNo: 1,
      pageSize: 10
    };
    
    var customerList = []; //客户类型列表
    var list = []; //客户列表
    Object.assign(this, {
      $stateParams,
      CusService,
      DialogService,
      ExportService,
      getParame,
      customerList,
      list,
      isAsc
    });
    
    this.startOpen = false;
    this.endOpen = false;
    this.sort = 0;
    this[_init_]();

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
    this.isKp = [
      {
        code: '1',
        name: '是'
      }, {
        code: '0',
        name: '否'
      }
    ];
    this.sex = [
      {
        code: '1',
        name: '男'
      }, {
        code: '0',
        name: '女'
      }
    ];

    this.sexLists = {
      '1': '男',
      '0': '女'
    };
    this.kpLists = {
      '1': '是',
      '0': '否'
    };
  }

  [_init_]() {
    console.log('...init store list ctrl');
    this.getLinkList();
  }

  // 获取联系人列表
  getLinkList() {
    let _that = this;
    console.log(_that.getParame);
    _that
      .CusService
      .getLinkList(_that.getParame)
      .then((data) => {
        _that.list = data.list;
       
        _that.total = data.total;
      }, (err) => {
        console.log(err);
      });
  }

  //排序
  sortBt() {
    let _that = this;
    if (_that.sort === 0) {
      _that.sort = 1;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":true}]`;
      _that.searchBt();
      return;
    };
    if (_that.sort === 1) {
      _that.sort = 2;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":false}]`;
      _that.searchBt();
      return;
    };
    if (_that.sort === 2) {
      _that.sort = 0;
      _that.getParame.orderBys = null;
      _that.searchBt();
      return;
    };
  }

  // 搜索
  searchBt() {
    // const _that = this;
    this.getParame.pageNo = 1;
    // console.log(this.getParame);
    this.getLinkList();
  }
  // 回车键搜索
  enterKeyup(e) {   
    if (e.keyCode === 13) {
      this.getParame.pageNo = 1;
      this.getLinkList();
    }
  }

  // 翻页
  pageChanged() {
    this.getLinkList(this.getParame);
  }

  // 导出联系人信息
  exportLink() {
    this.getParame.access_token = localStorage.token;
    this.ExportService.download('/customer/storelinkmans/export', this.getParame, false);
    // this.ExportService.get('/customer/storelinkmans/export', this.getParame).then(resp => {
    //   _that.ExportService.exportCSV(resp);
    // }, err => {
    //   console.log(err);
    // });
  }
}

storeManageListCtrl.$inject = ['$stateParams', 'CusService', 'DialogService', 'ExportService'];
export default angular.module('storeManageListModule', [])
  .controller('storeManageListCtrl', storeManageListCtrl)
  .name;