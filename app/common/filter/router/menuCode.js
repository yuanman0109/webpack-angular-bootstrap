// 菜单路由
// 左侧菜单路由（state）映射为权限（code）
// 注释多问号 为有路由映射（但还没拿到权限code），后续更新
export default function menuCode() {
  return function(input) {
    switch (input) {
      // 账户管理      
      case 'account':
        return 'ACCOUNT'; //账户
      case 'account.userLists':
        return 'ACCOUNT_01'; //账户列表
      case 'account.roleManagerLists':
        return 'ACCOUNT_02'; //角色管理
      case 'account.userHistory':
        return 'ACCOUNT_03'; //账户记录
        // 广告管理
      case 'advert':
        return 'AD'; //广告
      case 'advert.advertList':
        return 'AD_01'; //广告列表
        // 客户管理
      case 'store':
        return 'CRM'; //客户管理
      case 'store.privateSeaList':
        return 'CRM_02'; //私海列表  
      case 'store.verify':
        return 'CRM_03'; //建店审核
      case 'store.list':
        return 'CRM_04'; //客户列表
      case 'store.changeStore':
        return 'CRM_05'; //一键转店  
      case 'store.clueList':
        return 'CRM_06'; //线索列表  
        // 配置中心
      case 'configCenter':
        return 'CONFIG'; //支付配置
      case 'configCenter.paymentVerify':
        return 'CONFIG_01'; //支付进件审核
      case 'configCenter.qrcode':
        return 'CONFIG_02'; //支付二维码
      case 'configCenter.template':
        return 'CONFIG_03'; //模板管理
      case 'configCenter.restaurantList':
        return 'CONFIG_05'; //餐厅列表
      case 'configCenter.fastFoodList':
        return 'CONFIG_06'; //快餐进件
        // 工单中心
      case 'order':
        return 'ORDER'; //工单中心
      case 'order.myOrder':
        return 'ORDER_01'; //我的工单
      case 'order.pool':
        return 'ORDER_02'; //工单池
      case 'order.redeploy':
        return 'ORDER_03'; //一键转派
      case 'order.count':
        return 'ORDER_04'; //工单统计
        // 应用管理
      case 'application':
        return 'APP_MGR'; //应用管理
      case 'application.appList':
        return 'APP_MGR_01'; //移动应用管理
      case 'application.feedback':
        return 'APP_MGR_02';//意见反馈
      case 'application.winmsd':
        return 'APP_MGR_03';//系统消息
      case 'application.faqList':
        return 'APP_MGR_04';//FAQ管理
      case 'application.problemFeedback':
        return 'APP_MGR_05';//问题反馈
        // 订单管理
      case 'manageOrder.chargesConfig':
        return 'ORDER_MGR_01'; //服务费配置 
      case 'manageOrder.chargesOrder':
        return 'ORDER_MGR_02'; //服务费订单
      case 'manageOrder.trialOrders':
        return 'ORDER_MGR_03'; //试用费订单
        // 工具中心
      case 'tool':
        return 'TOOL_CENTER';
      case 'tool.payment':
        return 'TOOL_CENTER_01';//订单查询
      case 'tool.integrate': 
        return 'TOOL_CENTER_02'; //集成登录
      case 'tool.fastFood':
        return 'TOOL_CENTER_03'; //快餐订单列表
      case 'tool.payOrderList':
        return 'TOOL_CENTER_04'; //支付订单列表
        
         // 考勤管理
      case 'attendance':
        return 'ATTENDANCE_MGR'; //考勤管理
      case 'attendance.set':
        return 'ATTENDANCE_MGR_01'; //考勤打卡设置
      case 'attendance.list':
        return 'ATTENDANCE_MGR_03'; //考勤打卡报表
      // 会员监控
      case 'memberMonitor':
        return 'MEMBER_MONITOR'; //会员监控
      case 'memberMonitor.voucher':
        return 'MEMBER_MONITOR_01';
      case 'memberMonitor.testCoupon':
        return 'MEMBER_MONITOR_02';
      default:
        return '';
    }
  };
}