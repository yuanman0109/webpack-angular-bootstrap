'use strict';

/**
 *  Dialog Service
 *  @author pengyajun<pengyajun@niwodai.net>
 *  @date 2017-03-30
 *  @description 公用弹窗组件库
 *  @version 1.0.0
 */
export default class DialogService {
  constructor($uibModal, $timeout) {
    this.$uibModal = $uibModal;
    this.$timeout = $timeout;

    this.defaultConfirmOptions = {
      title: '注 意',
      message: '你确定执行此操作？',
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };

    this.defaultModalOptions = {
      animation: true,
      backdrop: 'static'
    };
  }

  /**
   * 提示类弹窗  默认1.5秒后主动消失  需要额外功能后续增加
   * @param {string} msg  提示信息 
   * @param {boolean} success  信息类型 是否成功
   * @param {number} delay 自动消失时间
   * 
   * use eg: DialogService.showMessage('hello msg', false, 20000)
   */
  showMessage(msg, success = true, delay = 1500) {
    let modalInstance = this.$uibModal.open({
      size: 'sm',
      windowClass: 'commonDialog',
      template: '<div class="modal-body modal-box"><svg class="icon" aria-hidden="true"><use xlink:href="" ng-href="#icon-nb-l' + (success ? '12' : '14') + '"></use></svg><p>' + msg + '</p></div>',
      backdrop: 'static'
    });

    this.$timeout(() => {
      modalInstance.close();
    }, delay);
  }

  /**
   * 确认操作类弹窗 
   * @param {object} opts 
   * 
   * use eg:  DialogService.openConfirm().then(() => {
   *            console.log('confirm callback')
   *          }, () => {
   *            console.log('cancel callback')
   *          })
   */
  openConfirm(opts) {
    let _this = this;

    //综合默认参数和用户传递参数，用户参数优先
    let options = angular.copy(_this.defaultConfirmOptions);
    angular.extend(options, opts || {});

    //做一层promise封装  保证我们使用起来省略默认的modal.result这一步骤
    return new Promise((resolve, reject) => {
      let modalInstance = _this.$uibModal.open({
        size: 'sm',
        backdrop: 'static',
        windowClass: 'commonDialog',
        template: require('../views/modal/confirm.modal.html'),
        controller: function() {
          angular.extend(this, options);
          this.confirm = () => {
            //这里可以在成功返回之前做统一处理
            modalInstance.close();
          };

          this.cancel = () => {
            //这里可以在取消返回之前做统一处理
            modalInstance.dismiss();
          };
        },
        controllerAs: 'ctrl'
      });
      modalInstance.result.then(() => {
        resolve();
      }, (err) => {
        reject(err);
      }).catch(() => {});
    });
  }

  /**
   * 打开自定义弹窗 可以进行统一确认和取消拦截处理
   * @param {object} opts 
   * 
   * use eg： this.DialogService.openModal({
   *            template: require('../views/modal/verify.modal.html'),
   *            controller: verifyModalCtrl,
   *            controllerAs: 'ctrl',
   *            resolve: {
   *              id: () => {
   *                return this.$stateParams.id
   *              }
   *            }
   *          }).then(() => {
   *
   *          }, () => {
   *
   *          })
   */
  openModal(opts) {
    let _this = this;
    //综合默认参数和用户传递参数，用户参数优先
    let options = angular.copy(_this.defaultModalOptions);
    options.windowClass = 'commonDialog';
    angular.extend(options, opts || {});
    //校验必输字段
    if (!options.controller) alert('请传递正确的参数！！');

    //做一层promise封装  保证我们使用起来省略默认的modal.result这一步骤
    return new Promise((resolve, reject) => {
      let modalInstance = _this.$uibModal.open(options);

      modalInstance.result.then((success) => {
        resolve(success);
      }).catch(() => {});
    });
  }
}

DialogService.$inject = ['$uibModal', '$timeout'];