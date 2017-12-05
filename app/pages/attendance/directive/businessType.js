export default function() {
  return {
    replace: true,
    template: '<span><label class="checkbox-inline" ng-repeat="bus in busctrl.list"><input type="checkbox" name="business" ng-disabled="busctrl.edit || bus.disabled" ng-model="bus.select" ng-change="busctrl.businessChange(bus)"><i class="iconfont"></i>{{bus.dataName}}</label></span>',
    scope: {
      edit: '=',      
      fewdisabled: '=',      
      result: '='
    },
    controller: 'businessTypeCtrl',
    controllerAs: 'busctrl',
    bindToController: true
  };
}