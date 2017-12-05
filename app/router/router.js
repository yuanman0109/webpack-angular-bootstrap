// router路由配置
import layoutRouter from '../pages/layout/router/router';
import loginRouter from '../pages/login/router/router';
import forgetPwd from '../pages/forgetPwd/router/router';
import resetPassword from '../pages/resetPassword/router/router';
import accountRouter from '../pages/account/router/router';
import advertRouter from '../pages/advert/router/router';
import configCenterRouter from '../pages/configCenter/router/router';
import storeRouter from '../pages/store/router/router';
import orderRouter from '../pages/order/router/router';
import wifiRouter from '../pages/wifi/router/router';
//import customerRouter from '../pages/customer/router/router';
import applicationRouter from '../pages/application/router/router';
import manageOrderRouter from '../pages/manageOrder/router/router';
import toolRouter from '../pages/tool/router/router';
import attendanceRouter from '../pages/attendance/router/router';
import monitorRouter from '../pages/memberMonitor/router/router';
export default angular.module('ngRouter', [])
  //路由配置
  .config(layoutRouter)
  .config(loginRouter)
  .config(forgetPwd)
  .config(resetPassword)
  .config(accountRouter)
  .config(advertRouter)
  .config(configCenterRouter)
  .config(storeRouter)
  .config(orderRouter)
  .config(wifiRouter)
  //.config(customerRouter)
  .config(applicationRouter)
  .config(manageOrderRouter)
  .config(toolRouter)
  .config(attendanceRouter)
  .config(monitorRouter)
  .name;
