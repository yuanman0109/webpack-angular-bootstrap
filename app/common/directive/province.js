export default function() {
  return {
    replace: true,
    template: '<select class="form-control" ng-options="pro.areaCode as pro.areaName for pro in $ctrl.provinceLists" ng-model="$ctrl.province">\
                <option value="">--省--</option>\
              </select>',
    scope: {
      province: '='
    },
    controller: 'ProvinceCtrl',
    controllerAs: '$ctrl',
    bindToController: true
  };
}