class stateChange {
  // 菜单栏切换
  static staticFilter(input) {
    switch (input) {
      case 'orderPool':
        return '工单池';
      case 'myOrder':
        return '我的工单';
    }
  }
}
export default stateChange;