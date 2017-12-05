// 菜单图标
export default function menuIcon() {
  return function (input) {
    switch (input) {
      case 'ACCOUNT':
        return 'icon-nb-h'; //账户       
      case 'AD':
        return 'icon-guanggao'; //广告       
      case 'CRM':
        return 'icon-nb-h1'; //客户管理       
      case 'CONFIG':
        return 'icon-icon-test1'; //支付配置       
      case 'ORDER':
        return 'icon-icon-test2'; //工单中心       
      case 'APP_MGR':
        return 'icon-icon-test4'; //应用管理   
      case 'ORDER_MGR':
        return 'icon-icon-test5'; //订单管理       
      case 'TOOL_CENTER':
        return 'icon-icon-test8'; //工具中心   
      case 'ATTENDANCE_MGR':
        return 'icon-dizhi'; //考勤管理     
      default:
        return '';
    }
  };
}