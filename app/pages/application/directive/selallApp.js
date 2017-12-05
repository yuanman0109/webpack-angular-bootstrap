/*
 *author: yuanman
 *day: 2017/11/21
 *attr: {
 * name: //表单验证需要绑定的name;
 * holder: //placeholder;
 * type: //api接口地址，APP_NAME,product_name;
 * callback: //select回调函数
 }
*/

export default class SelallAppDir {
  constructor() {
    this.template = `<select class="form-control" name="ctrl.name" ng-options="Product.dataCode as Product.dataName for Product in ctrl.Product" ng-model="ctrl.code" ng-change="ctrl.selApp(ctrl.code)" ng-required="ctrl.required">
                        <option value="" ng-if="ctrl.holder">{{ctrl.holder}}</option>
                    </select>`;
    this.restrict = 'EA';
    this.require = '^ngModel';
    this.controller = SelAllAppCtrl;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
      name: '@',
      holder: '@',
      type: '@',
      callback: '&'
    };
  }
  link (scope, ele, attr, ngModelCtr) {
    const ctrl = scope.ctrl;
    ctrl.required = attr.required;
    ctrl.getTypeName(ctrl.type).then((data) => {
      ctrl.Product = data;
      ctrl.init(ngModelCtr);
    });
  }
}
class SelAllAppCtrl {
  constructor(PublicServer) {
    Object.assign(this, {PublicServer});
    this.required = false;
  }
  init(ngModelCtrl) {
    this.ngModelCtrl = ngModelCtrl;
    this.code = ngModelCtrl.$viewValue;
  }
  //获取应用名称:APP_NAME,product_name
  getTypeName(type) {
    return this.PublicServer.get(`/cfg/dictionaries/${type}`);
  }
  selApp(code) {
    this.ngModelCtrl.$setViewValue(code);
    this.callback && this.callback();
  }
}
SelAllAppCtrl.$inject = ['PublicServer'];