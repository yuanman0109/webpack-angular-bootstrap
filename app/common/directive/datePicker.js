export default class DatePickerDir {
  constructor() {
    this.template = `<div class="input-group date-form">
                        <input type="text" class="form-control" placeholder="{{ctrl.holder}}" uib-datepicker-popup="yyyy-MM-dd" uib-datepicker-popup ng-model="ctrl.date" is-open="ctrl.startIsopen" datepicker-options="ctrl.dateOps" on-open-focus='false' current-text="今天" clear-text="清除" close-text="关闭" />
                        <span class="input-group-btn">
                          <button type="button" class="btn btn-default" ng-click="ctrl.startIsopen=!ctrl.startIsopen"><i class="iconfont icon-CombinedShape1"></i></button>
                        </span>
                      </div>`;
    this.restrict = 'EA';
    this.controller = DatePickerCtrl;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
      holder: '@',
      min: '=',
      max: '=',
      date: '='
    };
  }
  link (scope, ele, attr, ctrl) {
    //设置最小时间
    scope.$watch('ctrl.min', (n, o) => {
      if (n) {
        ctrl.dateOps.minDate = ctrl.min;
      }
    });
    //设置最大时间
    scope.$watch('ctrl.max', (n, o) => {
      if (n) {
        ctrl.dateOps.maxDate = ctrl.max;
      }
    });
  }
}
class DatePickerCtrl {
  constructor() {
    this.startIsopen = false;
    this.dateOps = {
      minDate: null,
      maxDate: null
    };
  }
}