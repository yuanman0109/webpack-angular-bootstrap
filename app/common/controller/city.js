export default class CityCtrl {
  constructor(PublicServer, $scope) {
    Object.assign(this, {PublicServer, $scope});
    this.cityLists = [];
    this.$scope.$watch(() => {
      return this.province;
    }, (n, o) => {
      if (n) {
        this.getAreaList(n);
      } else {
        this.cityLists = [];
      };
    });
  }
  getAreaList(areaNo) {
    let _that = this;
    _that.PublicServer.getAreaList(areaNo)
      .then((data) => {
        _that.cityLists = data;
      }, () => {});
  }
  selCity() {
    this.$scope.$emit('getCity', this.city);
  }
}
CityCtrl.$inject = ['PublicServer', '$scope'];