//ERR
export default function orderErrMsg() {
  return function(input) {
    switch (input) {
      case 'Order001':
        return '用户没有未处理工单';
      case 'Order002':
        return '工单不存在';
      case 'Order003':
        return '当前用户不是接单人也不是创单人';
      case 'Order004':
        return '工单尚未被领取 不能释放';
      case 'Order005':
        return '派单人不能领取自己的单子';
      case 'Order006':
        return '工单已经被领取不能重复领取';
      case 'Order007':
        return '领取人没有该工单的业务范围 不能领取';
      case 'Order008':
        return '业务范围不存在';
      case 'Order009':
        return '期望完成日期不能小于当前时间';
      case 'Order010':
        return '门店不存在';
      case 'Order011':
        return '接单人不存在';
      case 'Order012':
        return '接单人不能为创单人';
      case 'Order013':
        return '工单已经完成或者工单没有被领取';
      case 'Order014':
        return '当前用户不是接单人 无权操作该工单';
      case 'Order015':
        return '接单人不能为空';
      case 'Order016':
        return '接单人不能为创单人';
      case 'Order017':
        return '自己的工单请不要在流转给自己';
      default:
        return '';
    }
  };
}