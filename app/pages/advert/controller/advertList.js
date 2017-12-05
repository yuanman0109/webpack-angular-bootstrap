const _init_ = Symbol('_init_');
class AdvertListsCtrl {
  constructor(DialogService, AdvertService, $filter, $uibModal) {
    this.total = 0;
    this.$filter = $filter;
    this.$uibModal = $uibModal;
    this.DialogService = DialogService;
    this.AdvertService = AdvertService;
    this.advertLists = [];
    this.startOpen = false;
    this.endOpen = false;
    this.startTime = null;
    this.endTime = null;
    //列表正在获取...
    this.advertLists = true;
    this.stateName = {
      'NOTSTART': '未开始',
      'PUTIN': '投放中',
      'END': '已到期',
      'SUSPEND': '已中止'
    };
    this.adPositionName = {
      'PORTAL': 'wifi-portal页',
      'ORDER_DETAIL': '订单详情页',
      'PAY_SUCCESS': '支付成功页',
      'SUCCESS_UP': 'wifi成功页一',
      'SUCCESS_DOWN': 'wifi成功页二'
    };
    this.getParame = {
      adName: null,
      adPosition: null,
      cityCode: null,
      crown: 'ALL',
      endTime: null,
      startTime: null,
      state: null,
      pageNo: 1,
      pageSize: 10
    };
    this[_init_]();
  }[_init_]() {
    this.getAdvertlists(this.getParame);
  }
  
  //获取广告列表
  getAdvertlists(parm) {
    let _that = this;
    _that
      .AdvertService
      .getAdvertlists(parm)
      .then(data => {
        _that.advertLists = data.list;
        _that.total = data.total;
      }, err => {
        let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false);
        }
        _that.advertLists = [];
      });
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
  //搜索
  searchBt() {
    let _that = this;
    _that.getParame.pageNo = 1;
    _that.getParame.startTime = _that.$filter('date')(_that.startTime, 'yyyy-MM-dd 00:00');
    _that.getParame.endTime = _that.$filter('date')(_that.endTime, 'yyyy-MM-dd 23:59');
    if (!_that.city && _that.province) {
      _that.getParame.cityCode = _that.province;
    } else if (_that.city && _that.province) {
      _that.getParame.cityCode = _that.city;
    }
    console.log(this.getParame);
    _that.getAdvertlists(this.getParame);
  }
  //操作广告
  alertOperate(ad, i, type) {
    let _that = this;
    let id = ad.adId;
    let title = null;
    let getReq = null;
    if (type === 'delete') {
      title = '删除广告';
    } else if (type === 'state' && ad.state === 'PUTIN') {
      title = '停止投放';
    } else if (type === 'state' && ad.state === 'SUSPEND') {
      title = '继续投放';
    }
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.title = title;
      $ctrl.name = ad.name;
      $ctrl.ok = function() {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
    };
    fn.$inject = ['$uibModalInstance'];
    this
      .$uibModal
      .open({
        templateUrl: 'operateAdv.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(() => {
        if (type === 'delete') {
          getReq = _that
            .AdvertService
            .deleteAdvert(id, '广告删除成功 ');
        } else if (type === 'state' && ad.state === 'PUTIN') {
          getReq = _that
            .AdvertService
            .changeState(id, {
              state: 'OFF'
            }, '停止投放成功');
        } else if (type === 'state' && ad.state === 'SUSPEND') {
          getReq = _that
            .AdvertService
            .changeState(id, {
              state: 'ON'
            }, '继续投放成功');
        };
        getReq.then(data => {
          if (type === 'delete') {
            _that.getParame.pageNo = 1;
            _that.getAdvertlists(_that.getParame);
          } else if (type === 'state' && ad.state === 'PUTIN') {
            ad.state = 'SUSPEND';
          } else if (type === 'state' && ad.state === 'SUSPEND') {
            ad.state = 'PUTIN';
          }
        }, err => {
          let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
          if (msg) {
            _that
              .DialogService
              .showMessage(msg, false);
          }
        });
      });
  }
  //选择时间
  selDate(str) {
    let _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.startTime;
    } else {
      _that.startDateOps.maxDate = _that.endTime;
    }
  }
  //详情
  advDetail(aid) {
    let _that = this;
    _that
      .AdvertService
      .getAdvDetail(aid)
      .then(data => {
        let fn = function($uibModalInstance) {
          var $ctrl = this;
          $ctrl.addData = data;
          $ctrl.adPositionName = _that.adPositionName;
          $ctrl.addData.cityNames = [];
          angular.forEach($ctrl.addData.citys, function(v, i) {
            $ctrl
              .addData
              .cityNames
              .push(v.name);
          });
          $ctrl.addData.cityNames = $ctrl
            .addData
            .cityNames
            .join(',');
          $ctrl.ok = function() {
            $uibModalInstance.close();
          };
          $ctrl.cancel = function() {
            $uibModalInstance.dismiss();
          };
        };
        fn.$inject = ['$uibModalInstance'];
        _that
          .$uibModal
          .open({
            templateUrl: 'advDetail.html',
            controller: fn,
            controllerAs: '$ctrl',
            size: 'lg'
          })
          .result
          .then(() => {}, () => {
            console.log('cancle');
          });
      }, err => {
        let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false);
        }
      });
  }
  //翻页
  pageChanged() {
    this.getAdvertlists(this.getParame);
  };
}
AdvertListsCtrl.$inject = ['DialogService', 'AdvertService', '$filter', '$uibModal'];
export default angular.module('AdvertListsModule', [])
  .controller('AdvertListsCtrl', AdvertListsCtrl)
  .name;