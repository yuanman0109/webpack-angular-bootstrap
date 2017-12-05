export default function() {
  return {
    replace: true,
    template: '<select class="form-control" ng-options="county.areaCode as county.areaName for county in $ctrl.countyLists" ng-model="$ctrl.county">\
                <option value="">--区/县--</option>\
              </select>',
    scope: {
      city: '=',
      county: '='
    },
    controller: 'CountyCtrl',
    controllerAs: '$ctrl',
    bindToController: true
  };
}