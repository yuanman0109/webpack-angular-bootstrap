'use strict';

const _init_ = Symbol('_init_');

class PaymentTemplateCtrl {
  constructor($state, $stateParams, paymentTemplateService) {
    Object.assign(this, {$state, $stateParams, paymentTemplateService});
    this.params = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 16,
      businessId: $stateParams.businessId || null,
      type: $stateParams.type || null,
      name: $stateParams.name || null
    };
    // 餐桌类型
    this.tableType = [
      {
        type: 'TABLE',
        name: '桌台'  
      }, {
        type: 'TABLE_STICKER',
        name: '桌贴'  
      }];
    this[_init_]();
  }
  [_init_]() {
    this.getTemplateLists();
    this.getBusinesses();
  }
  // 获取业务类型
  getBusinesses() {
    this.paymentTemplateService.getBusinesses().then(data => {
      this.businessIds = data;
    }, err => { console.log(err); });
  }
  //获取模板列表
  getTemplateLists() {
    const _that = this;
    _that.paymentTemplateService.getTemplatelist(_that.params).then(data => {
      _that.templateList = data.list;
      _that.total = data.total;
      if (data.list.length === 0) {
        _that.noList = true;
      } else {
        _that.noList = false;
      }
    });
  }

  //搜索
  search() {
    this.params.pageNo = 1;
    this.goLists();
  }
  //翻页
  pageChanged() {
    this.goLists();
  }
  details(flag, id) {
    if (flag) {
      this.$state.go('configCenter.templateUpdate', { id: id });
    }
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  //路由跳转
  goLists() {
    this.$state.go('configCenter.template', this.params);
  }
}
PaymentTemplateCtrl.$inject = ['$state', '$stateParams', 'paymentTemplateService'];

export default angular.module('PaymentTemplateModule', [])
  .controller('PaymentTemplateCtrl', PaymentTemplateCtrl)
  .name;