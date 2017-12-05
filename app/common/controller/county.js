export default class CountyCtrl {
  constructor(PublicServer, $scope) {
    Object.assign(this, {PublicServer, $scope});
    this.countyLists = [];
    this.$scope.$watch(() => {
      return this.city;
    }, (n, o) => {
      if (n) {
        this.getAreaList(n);
      } else {
        this.countyLists = [];
      }
    });
  }
  getAreaList(areaNo) {
    let _that = this;
    _that.PublicServer.getAreaList(areaNo)
      .then((data) => {
        _that.countyLists = data;
      }, () => {});
  };
}
CountyCtrl.$inject = ['PublicServer', '$scope'];