export default function() {
  return {
    link: function(scope, element, attrs) {
      element.find('input').attr('disabled', true);
    }
  };
}