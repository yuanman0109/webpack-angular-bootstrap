export default class loginService {
  constructor ($filter) {
    this.$filter = $filter;
  };
  getpage(rootScope) {
    for (var j = 0; j < rootScope.menutData.length; j++) {
      let menu = rootScope.menutData[j];
      if (menu.children.length > 0) {
        for (var i = 0; i < menu.children.length; i++) {
          let val = this.$filter('menuState')(menu.children[i].code);
          if (val !== false) {
            rootScope.defaultPage = val;
            break;
          }
        };
        if (rootScope.defaultPage !== null) {
          break;
        }
      }
    };
  }
}
loginService.$inject = ['$filter'];