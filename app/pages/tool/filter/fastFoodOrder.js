class fastFoodOrder {
  static typeClass(input) {
    switch (input) {
      case 4:
        return '微信扫描'; 
      case 5:
        return '支付宝扫描'; 
    }
  }
  static payTypeClass(input) {
    switch (input) {
      case 1:
        return '微信'; 
      case 2:
        return '线下'; 
      case 3:
        return '支付宝';
    }
  }
  static statusClass(input) {
    switch (input) {
      case 3:
        return '待支付'; 
      case 4:
        return '已完成'; 
      case 5:
        return '手动取消';
      case 6:
        return '自动取消';
      case 7:
        return '已退款';
    }
  }
}
export default fastFoodOrder;