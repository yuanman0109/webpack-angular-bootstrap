// 按钮code
export default function uploadMsg() {
  return function (input) {
    switch (input.type) {
      case 'ONLINE':
        return {name: 'store.storeDetail', id: {id: input.refId}};
      case 'REJECT':
        // console.log(input.businessTypes);
        let business = input.businessTypes.split(',');
        return {name: 'store.editPrivateSea', id: {id: input.refId, businessId: business}};
      case 'RECEIVE':
        return {name: 'order.orderPending', id: {id: input.refId}};
      case 'RELEASE':
        return {name: 'order.detail', id: {id: input.refId}};
      case 'FORWARD':
        return {name: 'order.orderPending', id: {id: input.refId}};
      case 'RESOLVE':
        return {name: 'order.orderPending', id: {id: input.refId}};
      case 'CREATE':
        return {name: 'order.orderPending', id: {id: input.refId}};
      case 'EXPIRED':
        return {name: 'order.detail', id: {id: input.refId}};
      case 'MY_EXPIRED':
        return {name: 'order.orderPending', id: {id: input.refId}};
      case 'SERVICE_CHARGE':
        return {name: 'store.storeDetail', id: {id: input.refId, tabIndex: 1}};
      case 'SERVICE_CHARGE_TRY':
        return {name: 'store.storeDetail', id: {id: input.refId, tabIndex: 1}};
      case 'CHANGEPRICE':
        return {name: 'manageOrder.orderDetail', id: {chargeId: input.refId}};
      case 'CANCEL':
        return {name: 'manageOrder.orderDetail', id: {chargeId: input.refId}};
      default:
        return '';
    }
  };
}