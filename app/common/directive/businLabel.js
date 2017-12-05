export default class BusinLabelDir {
  constructor() {
    this.template = `<div>
                      <span ng-repeat="item in ctrl.business" class="label bss-label" ng-class="ctrl.businessType[item.businessId||item].class">{{ctrl.businessType[item.businessId||item].text || '暂无'}}</span>
                    </div>`;
    this.restrict = 'EA';
    this.controller = BusinCtrl;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
      business: '='
    };
  }
}
class BusinCtrl {
  constructor() {
    this.businessType = {
      'DINNER': {
        'class': 'bss-label-primary',
        'text': '正'
      },
      'PAY': {
        'class': 'bss-label-warning',
        'text': '支'
      },
      'SNACK': {
        'class': 'bss-label-success',
        'text': '快'
      },
      'PRINTER': {
        'class': 'bss-label-grace',
        'text': '印'
      },
      'POS': {
        'class': 'bss-label-pos',
        'text': '银'
      },
      'VIP': {
        'class': 'bss-label-VIP',
        'text': '会'
      },
      'SPAY': {
        'class': 'bss-labek-SPAY',
        'text': '秒'
      }
    };
  }
}