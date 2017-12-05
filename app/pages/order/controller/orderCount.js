const _init_ = Symbol('_init_');
class orderCountCtrl {
  constructor(orderService, $filter, ExportService, DialogService) {
    var startIsopen = false;
    var endIsopen = false;
    Object.assign(this, {
      orderService,
      $filter,
      ExportService,
      startIsopen,
      endIsopen,
      DialogService
    });
    this[_init_]();
  }

  [_init_]() {
    console.log('...init order count ctrl');
    //this.getOrderCount(1)
  }

  export () {
    this.endTime = new Date(this.endTime);
    this.startTime = new Date(this.startTime);
    let endTime = this.endTime.valueOf();
    let startTime = this.startTime.valueOf();
    console.log(this.endTime === 'Invalid Date');
    if (this.startTime === 'Invalid Date') {
      this.DialogService.showMessage('请选择开始时间', false, 2000);
    } else if (this.endTime === 'Invalid Date') {
      this.DialogService.showMessage('请选择结束时间', false, 2000);
    } else {
      console.log(localStorage.token);
      this.ExportService.download('/workorders/download', {
        'startTime': startTime,
        'endTime': endTime,
        'access_token': localStorage.token
      });
    }
  }

  // 选择时间
  selDate(str) {
    let _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.startTime;
    } else {
      _that.startDateOps.maxDate = _that.endTime;
    }
  }
}
orderCountCtrl.$inject = ['orderService', '$filter', 'ExportService', 'DialogService'];
export default angular.module('orderCount', [])
  .controller('orderCountCtrl', orderCountCtrl)
  .name;