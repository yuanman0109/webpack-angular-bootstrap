class stateChange {
  static couponType(input) {
    switch (input) {
      case 'CASH':
        return '现金券';
      case 'DEDUCTE':
        return '满减券';
    }
  }
  static couponStatus(input) {
    switch (input) {
      case 'EXPIRED':
        return '过期';
      case 'NORMAL':
        return '正常';
      case 'INVALID':
        return '作废';
    }
  }
}
export default stateChange;