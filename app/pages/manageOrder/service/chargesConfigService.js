export default class ChargesConfigService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
  // 获取服务费配置列表
  getChargesCofig(params) {
    return this.PublicServer.get('/serviceChargeConfigs', params, null, false);
  }
  // 上下架服务
  goDownCharges(params) {
    return this.PublicServer.put('/serviceChargeConfigs/updateStatus', params, null, false);
  }
  // 获取配置详细信息
  getChargeDetail(param) {
    return this.PublicServer.get('/serviceChargeConfigs/' + param + '/detail');
  }
  // 获取业务类型
  getBusinessTypes() {
    return this.PublicServer.get('/customer/businesses');
  }
  // 获取服务有效期
  getValidPeriod() {
    return this.PublicServer.get('/cfg/dictionaries/SERVICE_CHARGE_VALID_PERIOD');
  }
  // 新增服务费配置
  addChargeConfig(params) {
    return this.PublicServer.post('/serviceChargeConfigs', params);
  }
  // 编辑服务费配置
  editChargeConfig(params) {
    return this.PublicServer.put('/serviceChargeConfigs', params);
  }
  // 试用费设置
  addTrialFee(params) {
    return this.PublicServer.post('/serviceChargeConfigs/try', params);
  }
  // 获取试用费
  getTrialFee(param) {
    return this.PublicServer.get('/serviceChargeConfigs/try', param);
  }
  // 开关试用费
  toogleTrialFee(id, param) {
    return this.PublicServer.put('/serviceChargeConfigs/try/' + id + '/open?open=' + param.open);
  }
}
ChargesConfigService.$inject = ['PublicServer'];
