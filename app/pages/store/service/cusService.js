export default class CusService {
  constructor($http, PublicServer, ExportService) {
    this.$http = $http;
    this.PublicServer = PublicServer;
    this.ExportService = ExportService;
  }
    //获取客户列表
  getCustomerlists(data) {
    return this.PublicServer.get('/customer/stores/_tree', data);
  }
    //删除门店
  deleteCustomer(id) {
    return this.PublicServer.get('/customer/stores/' + id, 'DELETE');
  }
    //获取地区列表
  getAreaList(areaNo) {
    return this.PublicServer.get('/cfg/areas/' + areaNo + '/subs');
  }
    //获取菜系列表
  getDisheslist() {
    return this.PublicServer.get('/cfg/dictionaries/DISH_STYLE');
  }
    //获取客户类型
  getTypelist() {
    return this.PublicServer.get('/cfg/dictionaries/CUSTOMER_TYPE');
  }
    //获取客户网络状态
  getCusNetStatus() {
    return this.PublicServer.get('/cfg/dictionaries/DEVICE_STATUS');
  }
    //获取门店详情
  getCustomerDetail(id) {
    return this.PublicServer.get('/customer/stores/' + id);
  }
    //获取其他信息
  getOtherInfo(id) {
    return this.PublicServer.get('/customer/store/others/' + id);
  }
    //保存基本信息
  saveStore(data) {
    return this.PublicServer.post('/customer/stores', data);
  }
    //修改基本信息
  modifyStore(data) {
    return this.PublicServer.put('/customer/stores', data);
  }
    //保存餐厅信息
  saveStoreInfo(data) {
    return this.PublicServer.post('/customer/stores/' + data.storeId + '/restaurants', data);
  }
    //修改餐厅信息
  modifyStoreInfo(data) {
    return this.PublicServer.put('/customer/stores/' + data.storeId + '/restaurants', data);
  }
    //获取宽带运营商
  getbroadbandLists() {
    return this.PublicServer.get('/cfg/dictionaries/BROADBRAND_ISP');
  }
    //获取品牌列表
  getbrandLists() {
    return this.PublicServer.get('/customer/brands');
  }
    //获取区域负责人
  getRegionDirector(data) {
    return this.PublicServer.get('/user/regionDirector', data);
  }
    //获取区域城市code
  getaddressCode(code, data) {
    return this.PublicServer.get('/cfg/areas/' + code + '/_single', data);
  }
  //获取业务类型
  getBusinessType() {
    return this.PublicServer.get('/customer/businesses');
  }
  //搜索品牌信息
  searchBrands(data) {
    return this.PublicServer.get('/customer/brands', data);
  }
    // 查询企业
  searchCompanies(data) {
    return this.PublicServer.get('/customer/companies', data);
  }
  // 门店列表
  getStoreList(data, _successMsg) {
    return this.PublicServer.get('/customer/stores/_page', data);
  }

  //修改维护人
  postUser(data) {
    return this.PublicServer.post('/customer/store/users', data);
  }
  //一键转店
  putUser(data) {
    return this.PublicServer.put('/customer/store/users', data);
  }
  //门店服务费
  getStoreService(data) {
    return this.PublicServer.get('/serviceChargeConfigs/store', data);
  }
  //修改服务费（试用费）
  editStoreService(data) {
    return this.PublicServer.put('/serviceChargeConfigs/store/validPeriod', data);
  }

   //获取门店二维码列表
  getQrcodelist(storeId, _successMsg) {
    return this
      .PublicServer
      .get('/barcodes/_statistics', storeId, _successMsg);
  }
  //获取门店大事件
  getStoreLog(id, _successMsg) {
    return this
      .PublicServer
      .get('/customer/store/events/' + id, _successMsg);
  }
     // 联系人列表
  getLinkList(data, _successMsg) {
    return this.PublicServer.get('/customer/storelinkmans/list', data);
  }
     // 数据统计
  getStoreOrders(data, _successMsg) {
    return this.PublicServer.get('/customer/store/orders', data);
  }

  //二维码model
  qrModel(data) {
    return this.PublicServer.get('/barcodes/_url', data);
  }
  //二维码url
  qrCode(data, conf) {
    return this.ExportService.get('/qrCode', data, conf);
  }
  //获取私海列表
  getPrivateSeaList(data) {
    return this.PublicServer.get('/customer/sourcestores/web/list', data);
  }
  //释放私海至公海
  putPublicSea(data) {
    return this.PublicServer.put('/customer/sourcestores', data);
  }
  //修改私海记录
  putSeaModify(data) {
    return this.PublicServer.put('/customer/sourcestores/modify', data);
  }
  // 门店提交上线
  sumbitSeaStores(data) {
    return this.PublicServer.put('/customer/sourcestores/web/sumbit', data);
  }
  //新增服务费有效期：业务类型
  businessTypeSe(id) {
    return this.PublicServer.get('/serviceChargeConfigs/store/validPeriod/businessType', {storeId: id});
  }
  //新增服务费有效期
  addServices(params) {
    return this.PublicServer.post('/serviceChargeConfigs/store/validPeriod', params);
  }
}
CusService.$inject = ['$http', 'PublicServer', 'ExportService'];