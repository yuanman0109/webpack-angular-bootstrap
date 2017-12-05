export default function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$viewChangeListeners.push(() => {
        let pattern = attrs.irregular;
        if (pattern.indexOf('0x34') > -1) {
          pattern = pattern.replace('0x34', '"');
        }
        const modified = ngModel.$viewValue.replace(new RegExp(pattern, 'g'), '');
        ngModel.$setViewValue(modified);
        ngModel.$render();
        ngModel.$validate();
      });
    }
  };
}