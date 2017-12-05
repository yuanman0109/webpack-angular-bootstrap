export default class CusService {
  constructor($http, PublicServer, ExportService) {
    this.$http = $http;
    this.PublicServer = PublicServer;
    this.ExportService = ExportService;
  }
      //获取打卡报表列表
  getRecordList(data) {
    return this.PublicServer.get('/attendance/getRecordList', data);
  }
      //获取某天考勤记录
  getSettings(data) {
    return this.PublicServer.get('/attendance/settings', data);
  }
  //获取已配置的部门
  getSelectedDepts() {
    return this.PublicServer.get('/attendance/settings/selected_depts');
  }
  //获取部门列表
  getDeptlists() {
    return this.PublicServer.get('/sys/departments');
  }
    //部门树结构
  getDepartmentsTree(data) {
    return this.PublicServer.get('/sys/departments/_tree', data);
  }  
  //新增考勤配置
  saveAttendance(data) {
    return this.PublicServer.post('/attendance/settings', data);
  }
    //修改考勤配置
  modifyAttendance(data) {
    return this.PublicServer.put('/attendance/settings', data);
  }
    //删除门店
  deleteCustomer(id) {
    return this.PublicServer.get('/customer/stores/' + id, 'DELETE');
  }
    //获取地区列表
  getAreaList(areaNo) {
    return this.PublicServer.get('/cfg/areas/' + areaNo + '/subs');
  }
    //获取门店详情
  getCustomerDetail(id) {
    return this.PublicServer.get('/customer/stores/' + id);
  }
    //获取其他信息
  getOtherInfo(id) {
    return this.PublicServer.get('/customer/store/others/' + id);
  }
  
    //获取区域负责人
  getRegionDirector(data) {
    return this.PublicServer.get('/user/regionDirector', data);
  }
    //获取区域城市code
  getaddressCode(code, data) {
    return this.PublicServer.get('/cfg/areas/' + code + '/_single', data);
  }
  // 门店列表
  getStoreList(data, _successMsg) {
    return this.PublicServer.get('/customer/stores/_page', data);
  }
  //获取私海列表
  getPrivateSeaList(data) {
    return this.PublicServer.get('/customer/sourcestores/web/list', data);
  }
}
CusService.$inject = ['$http', 'PublicServer', 'ExportService'];