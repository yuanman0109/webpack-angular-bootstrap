export default class ProvinceCtrl {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
    this.provinceLists = [];
    this.cityLists = [];
    this.countyLists = [];
    this.getAreaList('00');
  }
  getAreaList(areaNo) {
    let _that = this;
    _that.PublicServer.getAreaList(areaNo)
      .then((data) => {
        _that.provinceLists = data;
      }, () => {});
  };
}
ProvinceCtrl.$inject = ['PublicServer'];