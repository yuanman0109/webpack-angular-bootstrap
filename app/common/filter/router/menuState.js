// 菜单路由
// 左侧菜单权限（code）映射为路由（state）
// 注释多问号 为有路由映射（但还没拿到权限code），后续更新
export default function menuState() {
  return function(input) {
    switch (input) {
      // 账户管理
      case 'ACCOUNT':
        return 'account'; //账户        
      case 'ACCOUNT_01':
        return 'account.userLists'; //账户列表        
      case 'ACCOUNT_02':
        return 'account.roleManagerLists'; //角色管理        
      case 'ACCOUNT_03':
        return 'account.userHistory'; //账户记录  
        // 广告管理      
      case 'AD':
        return 'advert'; //广告        
      case 'AD_01':
        return 'advert.advertList'; //广告列表 
        // 客户管理       
      case 'CRM':
        return 'store'; //客户管理        
      case 'CRM_01':
        return false; //公海        
      case 'CRM_02':
        return 'store.privateSeaList'; //私海列表        
      case 'CRM_03':
        return 'store.verify'; //建店审核        
      case 'CRM_04':
        return 'store.list'; //客户列表
      case 'CRM_05':
        return 'store.changeStore'; //一键转店    
      case 'CRM_06':
        return 'store.clueList'; //线索列表   
        // 配置中心  
      case 'CONFIG':
        return 'configCenter'; //支付配置        
      case 'CONFIG_01':
        return 'configCenter.paymentVerify'; //支付进件审核        
      case 'CONFIG_02':
        return 'configCenter.qrcode'; //支付二维码        
      case 'CONFIG_03':
        return 'configCenter.template'; //模板管理        
      case 'CONFIG_04':
        return false; //进件 
      case 'CONFIG_05':
        return 'configCenter.restaurantList'; //餐厅列表         
      case 'CONFIG_06':
        return 'configCenter.fastFoodList'; //快餐进件审核
      case 'CONFIG_07':
        return false; //快餐进件
        //工单中心         
      case 'ORDER':
        return 'order'; //工单中心        
      case 'ORDER_01':
        return 'order.myOrder'; //我的工单        
      case 'ORDER_02':
        return 'order.pool'; //工单池        
      case 'ORDER_03':
        return 'order.redeploy'; //一键转派        
      case 'ORDER_04':
        return 'order.count'; //工单统计 
        // 应用管理       
      case 'APP_MGR':
        return 'application'; //应用管理        
      case 'APP_MGR_01':
        return 'application.appList'; //移动应用管理  
      case 'APP_MGR_02':
        return 'application.feedback'; //意见反馈
      case 'APP_MGR_03':
        return 'application.winmsd';//系统消息
      case 'APP_MGR_04':
        return 'application.faqList';//FAQ管理 
      case 'APP_MGR_05':
        return 'application.problemFeedback';//问题反馈
      
        // 订单管理
      case 'ORDER_MGR':
        return 'manageOrder'; //应用管理  
      case 'ORDER_MGR_01':
        return 'manageOrder.chargesConfig'; //服务费配置 
      case 'ORDER_MGR_02':
        return 'manageOrder.chargesOrder'; //服务费订单     
      case 'ORDER_MGR_03':
        return 'manageOrder.trialOrders'; //试用费订单
        // 工具中心
      case 'TOOL_CENTER':
        return 'tool'; //工具中心
      case 'TOOL_CENTER_01':
        return 'tool.payment'; //支付订单查询
      case 'TOOL_CENTER_02':
        return 'tool.integrate'; //集成登录
      case 'TOOL_CENTER_03':
        return 'tool.fastFood';//快餐订单列表
      case 'TOOL_CENTER_04':
        return 'tool.payOrderList';//支付订单列表

         // 考勤管理
      case 'ATTENDANCE_MGR':
        return 'attendance'; //考勤管理
      case 'ATTENDANCE_MGR_01':
        return 'attendance.set'; //考勤打卡设置
      // case 'ATTENDANCE_MGR_02':
      //   return 'attendance.list'; //考勤打卡
      case 'ATTENDANCE_MGR_03':
        return 'attendance.list'; //考勤打卡报表
      //会员监控
      case 'MEMBER_MONITOR':
        return 'memberMonitor'; //会员监控
      case 'MEMBER_MONITOR_01':
        return 'memberMonitor.voucher';
      case 'MEMBER_MONITOR_02':
        return 'memberMonitor.testCoupon';
      default:
        return '';
    }
  };
}