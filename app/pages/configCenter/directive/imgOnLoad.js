export default function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        scope.$apply(attrs.imgonload);
      });
    }
  };
}