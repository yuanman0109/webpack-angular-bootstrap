export default function() {
  return {
    restrict: 'AE',
    scope: {
      addxy: '='
    },
    replace: true,
    template: '<div style="width:100%;height:500px;"></div>',
    link: function(scope, element, attr) {
      var ele = element[0];
      /***************************************
      由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
      ***************************************/
      //加载地图
      var map = new AMap.Map(ele, {
        resizeEnable: true
      });
      //双击放大
      map.setStatus({
        doubleClickZoom: true
      });
      //地图控件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
        function() {
          map.addControl(new AMap.ToolBar());

          map.addControl(new AMap.Scale());

          map.addControl(new AMap.OverView({
            isOpen: true
          }));
        });
      AMap.plugin(['AMap.Geocoder'], function() {
        //逆地理编码
        new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        });
        new AMap.Marker({ //加点
          map: map,
          position: scope.addxy
        });
        map.setZoomAndCenter(18, scope.addxy);
      });
    }
  };
}