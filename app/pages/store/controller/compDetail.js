const _init_ = Symbol('_init_');
class CompDetailCtrl {
  constructor($http, $stateParams, CompService) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.CompService = CompService;
    this.defLogo = require('../../../images/company.png');
    this.compDetail = {};
    this.scales = {
      SCALE_TEN: '10人以下',
      SCALE_FIFTY: '10-50人',
      SCALE_HUNDRED: '50-100人',
      SCALE_FIVEHUNDRED: '100-500人',
      SCALE_THOUSAND: '500-1000人',
      SCALE_MAX: '1000人以上'
    };
    this.status = {
      '0': '正常',
      '1': '禁用',
      '2': '删除'
    };
    this[_init_]();
  }
  [_init_]() {
    let comId = this.$stateParams.id;
    this.getCompDetail(comId);
  }
    //获取企业详情
  getCompDetail(id) {
    let _that = this;
    _that.CompService.getCompDetail(id).then(function(data) {
      _that.compDetail = data;
      angular.forEach(_that.compDetail.brands, function(val, ind) {
        if (val.logoUrl) {
          val.logoUrl += '?access_token=' + localStorage.token;
        };
      });
    }, err => {
      console.log(err);
    });
  }
}
CompDetailCtrl.$inject = ['$http', '$stateParams', 'CompService'];
export default angular
  .module('CompDetailModule', [])
  .controller('CompDetailCtrl', CompDetailCtrl)
  .name;