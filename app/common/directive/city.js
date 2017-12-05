export default function() {
  return {
    replace: true,
    template: '<select class="form-control" ng-options="city.areaCode as city.areaName for city in $ctrl.cityLists" ng-model="$ctrl.city" ng-change="$ctrl.selCity()">\
                    <option value="">--市--</option>\
                </select>',
    scope: {
      province: '=',
      city: '='     
    },
    controller: 'CityCtrl',
    controllerAs: '$ctrl',
    bindToController: true
  };
}