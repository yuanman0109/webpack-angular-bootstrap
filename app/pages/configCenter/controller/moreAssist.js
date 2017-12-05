'use strict';

const _init_ = Symbol('_init_');

class MoreAssistCtrl {
  constructor($stateParams, $state, $filter, DialogService, vertifyService, ImgLightbox) {
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$filter = $filter;
    this.DialogService = DialogService;
    this.vertifyService = vertifyService;
    this.ImgLightbox = ImgLightbox;
    this[_init_]();
  }

  [_init_]() {
    this.getMoreAssist();
  }
   // 查看图片
  lookImage(url) {
    const _that = this;
    this.ImgLightbox.openModal([
      {url: _that.$filter('imgUrlWithToken')(url) + '&action=PREVIEW'}
    ], 0);
  };
  getMoreAssist() {
    this.vertifyService.getMoreAssist(this.$stateParams.id).then((data) => {
      this.history = data.compareResults;
      this.storeName = data.storeName;
      this.payCaseTimes = data.payCaseTimes;
      this.connectionOrg = data.connectionOrg;
      this.settleMethod = data.settleMethod;
      this.payCaseTotalTimes = data.payCaseTotalTimes;
    }, (err) => {
      console.log(err);
    });
  }
}
MoreAssistCtrl.$inject = ['$stateParams', '$state', '$filter', 'DialogService', 'vertifyService', 'ImgLightbox'];

export default angular.module('MoreAssistModule', [])
  .controller('MoreAssistCtrl', MoreAssistCtrl)
  .name;
