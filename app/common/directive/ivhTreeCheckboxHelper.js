import '../../../node_modules/ui-select/dist/select.min.css';
import '../../../node_modules/angular-ivh-treeview/dist/ivh-treeview.js';
import '../../../node_modules/angular-ivh-treeview/dist/ivh-treeview.css';
import '../../../node_modules/angular-ivh-treeview/dist/ivh-treeview-theme-basic.css';

export default function() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      node: '=ivhTreeCheckboxHelper'
    },
    require: '^ivhTreeview',
    link: function(scope, element, attrs, trvw) {
      var node = scope.node,
          opts = trvw.opts(),
          indeterminateAttr = opts.indeterminateAttribute,
          selectedAttr = opts.selectedAttribute;

      // Set initial selected state of this checkbox
      scope.isSelected = node[selectedAttr];

      // Local access to the parent controller
      scope.trvw = trvw;

      // Enforce consistent behavior across browsers by making indeterminate
      // checkboxes become checked when clicked/selected using spacebar
      scope.resolveIndeterminateClick = function() {
        if (node[indeterminateAttr]) {
          trvw.select(node, true);
        }
      };

      // Update the checkbox when the node's selected status changes
      scope.$watch('node.' + selectedAttr, function(newVal, oldVal) {
        scope.isSelected = newVal;
      });

      // Update the checkbox when the node's indeterminate status changes
      scope.$watch('node.' + indeterminateAttr, function(newVal, oldVal) {
        element.find('input').prop('indeterminate', newVal);
      });
    },
    template: [
      '<input type="checkbox"',
      'class="ivh-treeview-checkbox"',
      'ng-model="isSelected"',
      'ng-click="resolveIndeterminateClick()"',
      'ng-change="trvw.select(node, isSelected)" />',
      '<i class="iconfont"></i>'
    ].join('\n')
  };
}