class chargeStatus {
  // 服务费订单顶部菜单
  static topMenuFilter(input) {
    switch (input) {
      case 'payed':
        return '已支付详情'; //已支付详情
      case 'noPay':
        return '未支付详情'; //未支付详情
      case 'changePrice':
        return '改价'; //改价
      case 'cancel':
        return '取消';//取消
      default:
        return '--';
    }
  }
  // 服务费配置顶部菜单
  static configTopFilter(input) {
    switch (input) {
      case 'detail':
        return '服务费详情';
      case 'addNew':
        return '新增服务费';
      case 'edit':
        return '服务费编辑';
      default:
        return '--';
    }
  }
  // 服务费有效期
  static validPeriodFilter(input) {
    switch (input) {
      case '3':
        return '3个月';
      case '6':
        return '6个月';
      case '12':
        return '12个月';
      case '24':
        return '24个月';
      case '1000':
        return '永久';
      default:
        return '--';
    }
  }
  // 支付状态
  static statusFilter(input) {
    switch (input) {
      case 'NOT_PAY':
        return '待支付'; //订单未支付
      case 'PAYED':
        return '已支付'; //订单已支付
      case 'CANCELLED':
        return '已取消'; //订单已取消
      case 'PAYING':
        return '支付中'; //订单支付中
      default:
        return '--';
    }
  }
  // 支付方式
  static payTypeFilter(input) {
    switch (input) {
      case 'WEIXIN':
        return '微信'; //微信
      case 'ALIPAY':
        return '支付宝'; //支付宝
      default:
        return '--';
    }
  }
  // 业务类型
  static businessTypeFilter(input) {
    switch (input) {
      case 'DINNER':
        return '点餐（正）';
      case 'SNACK':
        return '点餐（快）';
      case 'TIP':
        return '打赏';
      case 'PAY':
        return '百味云支付';
      case 'SPAY':
        return '百味云秒付';
      case 'PRINTER':
        return '云打印机';
      case 'WIFI':
        return '百味云WIFI';
      case 'POS':
        return '百味云收银';
      case 'VIP':
        return '会员营销';
      default:
        return '--';
    }
  }
  // 异常
  static validHttpCode(input) {
    switch (input) {
      case 'ServiceOrder001':
        return '门店id不存在';
      case 'ServiceOrder002':
        return '收费的服务不存在';
      case 'ServiceOrder003':
        return '订单不存在';
      case 'ServiceOrder004':
        return '不是待付款订单不能取消 不能改价';
      case 'ServiceOrder005':
        return '该订单不能改价';
      case 'ServiceOrder006':
        return '该服务配置已经下架不能修改';
      case 'ServiceOrder011':
        return '改价的价格不能小于试用费总价';
      default:
        return '';
    }
  }
}
export default chargeStatus;