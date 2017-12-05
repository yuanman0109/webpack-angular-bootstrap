const _init_ = Symbol('_init_');
class AddAdvertCtrl {
  constructor($http, DialogService, $stateParams, $state, PublicServer, $uibModal, ivhTreeviewBfs, $filter, AdvertService, ivhTreeviewMgr) {
    this.$http = $http;
    this.DialogService = DialogService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$filter = $filter;
    this.ivhTreeviewMgr = ivhTreeviewMgr;
    this.AdvertService = AdvertService;
    this.ivhTreeviewBfs = ivhTreeviewBfs;
    this.$uibModal = $uibModal;
    this.PublicServer = PublicServer;
    this.addImgSuccess = true;
    this.startOpen = false;
    this.endOpen = false;
    this.isAllcities = false;
    this.defaultImg = require('../../../images/Group.png');
    this.defaultImg_l = require('../../../images/default.jpg');
    this.defaultImg_m = require('../../../images/adv-default.png');
    this.adPositionName = {
      'PORTAL': 'wifi-portal页',
      'ORDER_DETAIL': '订单详情页',
      'PAY_SUCCESS': '支付成功页',
      'SUCCESS_UP': 'wifi成功页一',
      'SUCCESS_DOWN': 'wifi成功页二'
    };
    this.cityCode = [{
      city: null,
      province: null,
      county: null
    }];

    this.addData = {
      adPosition: 'ORDER_DETAIL',
      adUrl: null,
      adImage: null,
      cityCodes: [],
      crowd: 'ALL',
      endTime: null,
      name: null,
      startTime: null
    };
    this.conflict = null;
    this.cityOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'selected',
      idAttribute: 'code',
      validate: false,
      expandToDepth: 1,
      twistieExpandedTpl: '<i class="iconfont icon-nb-l10"></i>',
      twistieCollapsedTpl: '<i class="iconfont icon-nb-l9"></i>',
      twistieLeafTpl: ' '
    };
    this.endDateOps = {
      minDate: null
    };
    this.advId = $stateParams.id;
    this[_init_]();
  }[_init_]() {
    let _that = this;
    if (_that.advId) {
      _that
        .AdvertService
        .getAdvDetail(_that.advId)
        .then(data => {
          _that.addData = data;
          _that.showStartTime = new Date(_that.addData.startTime);
          _that.showEndTime = new Date(_that.addData.endTime);
          _that.cityNames = [];
          _that.addData.cityCodes = [];
          angular.forEach(_that.addData.citys, function(v, i) {
            _that
              .cityNames
              .push(v.name);
            _that
              .addData
              .cityCodes
              .push(v.code);
          });
          _that.cityNames = _that
            .cityNames
            .join(',');
          _that.addData.cityCodes = _that
            .addData
            .cityCodes
            .join(',');
          if (_that.addData.cityCodes === '0') {
            _that.isAllcities = true;
          }
        }, err => {
          let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
          if (msg) {
            _that
              .DialogService
              .showMessage(msg, false);
          }
        });
    }
  }
  //预览广告
  previewAdvert() {
    let _that = this;
    _that.addData.startTime = _that.$filter('date')(_that.showStartTime, 'yyyy-MM-dd HH:mm');
    _that.addData.endTime = _that.$filter('date')(_that.showEndTime, 'yyyy-MM-dd ') + '23:59';
    _that.conflict = {
      adPosition: _that.addData.adPosition,
      cityCodes: _that.addData.cityCodes,
      startTime: _that.addData.startTime,
      endTime: _that.addData.endTime,
      adId: _that.advId || null
    };
    _that
      .AdvertService
      .getConflict(_that.conflict)
      .then(data => {
        _that.isConflic = data;
        let fn = function($uibModalInstance) {
          var $ctrl = this;
          $ctrl.addData = _that.addData;
          $ctrl.cityNames = _that.cityNames;
          $ctrl.isAllcities = _that.isAllcities;
          $ctrl.adPositionName = _that.adPositionName;
          $ctrl.defaultImg = _that.defaultImg;
          $ctrl.defaultImg_l = _that.defaultImg_l;
          $ctrl.defaultImg_m = _that.defaultImg_m;
          //保存广告
          $ctrl.saveAdvert = function() {
            let func = null;
            delete _that.addData.adImageUrl;
            delete _that.addData.citys;
            if (_that.advId) {
              func = _that
                .AdvertService
                .modifyAdvert(_that.advId, _that.addData, '修改成功');
            } else {
              func = _that
                .AdvertService
                .addAdvert(_that.addData, '添加成功');
            }
            func.then(data => {
              $uibModalInstance.dismiss();
              _that
                .$state
                .go('advert.advertList');
            }, err => {
              let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
              if (msg) {
                _that
                  .DialogService
                  .showMessage(msg, false);
              }
            });
          };
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
            templateUrl: 'preview.html',
            size: 'lg',
            controller: fn,
            controllerAs: '$ctrl'
          })
          .result
          .then(function() {}, function() {
            console.log('cancle');
          });
      });
  }
  //选择城市
  selCity() {
    let _that = this;
    if (_that.cities) {
      _that.callback();
    } else {
      _that
        .PublicServer
        .getCity(2)
        .then(data => {
          _that.cities = data;
          _that.callback();
        }, err => {
          let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
          if (msg) {
            _that
              .DialogService
              .showMessage(msg, false);
          }
        });
    }
  }
  //选择城市按钮回调
  callback() {
    let _that = this;
    if (_that.advId) {
      let cityObj = {};
      angular.forEach(_that.addData.citys, function(val) {
        cityObj[val.code] = true;
      });
      _that.ivhTreeviewBfs(_that.cities, null, function(n, parents) {
        if (cityObj[n.code]) {
          _that
            .ivhTreeviewMgr
            .select(_that.cities, n);
        }
      });
    };
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.cities = _that.cities;
      $ctrl.isAllcities = _that.isAllcities;
      $ctrl.tpl = '<div title="{{trvw.label(node)}}"><label class="checkbox-inline"><span ivh-tree-checkbox-helper="node"></span><span>{{trvw.label(node)}}</span></label><div ng-if="trvw.isExpanded(node)" ivh-treeview-children></div></div>';
      $ctrl.cityOpts = _that.cityOpts;
      if ($ctrl.isAllcities) {
        _that
          .ivhTreeviewMgr
          .selectAll(_that.cities);
      };
      $ctrl.selectAllCities = function(isSel) {
        if (isSel) {
          _that
            .ivhTreeviewMgr
            .selectAll(_that.cities);
        } else {
          _that
            .ivhTreeviewMgr
            .deselectAll(_that.cities);
        }
      };
      //选择城市node节点回调
      $ctrl.changeCallback = function(node) {
        if (!node.selected) {
          $ctrl.isAllcities = false;
        } else {
          var selnum = 0;
          angular.forEach(_that.cities, function(v, i) {
            if (v.selected) {
              selnum++;
            }
          });
          if (selnum === _that.cities.length) {
            $ctrl.isAllcities = true;
          }
        }
      };
      $ctrl.ok = function() {
        _that.isAllcities = $ctrl.isAllcities;
        _that.addData.cityCodes = [];
        _that.addData.citys = [];
        _that.cityNames = [];
        _that.ivhTreeviewBfs(_that.cities, null, function(n, parents) {
          if (n.selected) {
            if (parents && (parents.length === 0 || !parents[0].selected)) {
              _that
                .addData
                .cityCodes
                .push(n.code);
              _that
                .cityNames
                .push(n.name);
              _that
                .addData
                .citys
                .push(n.code);
            }
          }
        });
        if ($ctrl.isAllcities) {
          _that.addData.cityCodes = '0';
        } else {
          if (_that.addData.cityCodes.length > 0) {
            _that.addData.cityCodes = _that
              .addData
              .cityCodes
              .join(',');
          };
          if (_that.cityNames.length > 0) {
            _that.cityNames = _that
              .cityNames
              .join(',');
          };
        }
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
        templateUrl: 'selCity.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {}, function() {
        console.log('cancle');
      });
  }
  //选择时间
  selDate(str) {
    let _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.showStartTime;
    } else {
      _that.startDateOps.maxDate = _that.showEndTime;
    }
  }

  //上传模板
  uploadFiles(file, errFiles) {
    const _that = this;
    _that.addImgSuccess = 'on';
    _that.PublicServer.uploadFiles(file, errFiles, 'publicimage').then(fileData => {
      const img = fileData.data;
      if (img.code === 'S200') {
        _that.addImgSuccess = 'off';
        _that.addData.adImage = img.data.id;
        _that.addData.adImageUrl = img.data.url;
      } else {
        _that.DialogService.showMessage(_that.$filter('respUploadMsg')(img.code));
      }
    });
  }
}
AddAdvertCtrl.$inject = [
  '$http',
  'DialogService',
  '$stateParams',
  '$state',
  'PublicServer',
  '$uibModal',
  'ivhTreeviewBfs',
  '$filter',
  'AdvertService',
  'ivhTreeviewMgr'
];
export default angular.module('AddAdvertModule', [])
  .controller('AddAdvertCtrl', AddAdvertCtrl)
  .name;