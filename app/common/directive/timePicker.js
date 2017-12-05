export default class TimePickerDir {
  constructor() {
    this.template = `<div uib-timepicker ng-model="ctrl.time" ng-change="ctrl.changed()" show-meridian="ctrl.ismeridian" show-seconds="ctrl.isSeconds" show-spinners="false"></div>`;
    this.restrict = 'EA';
    this.controller = TimePickerCtrl;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
      isSeconds: '@',
      min: '=',
      max: '=',
      time: '=',
      callback: '='
    };
  }
  link (scope, ele, attr, ctrl) {
  }
}
class TimePickerCtrl {
  constructor() {
    this.ismeridian = false;
  }
  changed() {
    this.callback && this.callback();
  }
}