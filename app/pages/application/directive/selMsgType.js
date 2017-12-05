/*
 *author: yuanman
 *day: 2017/11/28
 *attr: {
 * name: //表单验证需要绑定的name;
 * holder: //placeholder;
 * callback: //select回调函数
 }
*/

export default class SelallAppDir {
  constructor() {
    this.template = `<select class="form-control" name="ctrl.name" ng-options="product.dataCode as product.dataName for product in ctrl.Product" ng-model="ctrl.code" ng-change="ctrl.selApp(ctrl.code)" ng-required="ctrl.required">
                        <option value="" ng-if="ctrl.holder">{{ctrl.holder}}</option>
                    </select>`;
    this.restrict = 'EA';
    this.require = '^ngModel';
    this.controller = SelMsgTypeCtrl;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
      name: '@',
      holder: '@',
      callback: '&'
    };
  }
  link (scope, ele, attr, ngModelCtr) {
    const ctrl = scope.ctrl;
    ctrl.required = attr.required;
    ctrl.getMsgType().then((data) => {
      ctrl.Product = data;
      ctrl.init(ngModelCtr);
    });
  }
}
class SelMsgTypeCtrl {
  constructor(PublicServer) {
    Object.assign(this, {PublicServer});
    this.required = false;
  }
  init(ngModelCtrl) {
    this.ngModelCtrl = ngModelCtrl;
    this.code = ngModelCtrl.$viewValue;
  }
  //获取应用名称:APP_NAME,product_name
  getMsgType() {
    return this.PublicServer.get(`/cfg/dictionaries/SYS_INFO_TYPE`);
  }
  selApp(code) {
    this.ngModelCtrl.$setViewValue(code);
    this.callback && this.callback();
  }
}
SelMsgTypeCtrl.$inject = ['PublicServer'];