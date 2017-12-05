export default function() {
  return {
    restrict: 'AE',
    scope: {
      selstore: '&sel',
      seldata: '='
    },
    replace: true,
    template: '<div style="width:100%;height:500px;"></div>',
    link: function(scope, element, attr) {
      var ele = element[0];
      /***************************************
      由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
      ***************************************/
      //加载地图，调用浏览器定位服务
      var map = new AMap.Map(ele, {
        resizeEnable: true,
        isHotspot: true
      });
      //地图控件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function() {
        map.addControl(new AMap.ToolBar());

        map.addControl(new AMap.Scale());

        map.addControl(new AMap.OverView({
          isOpen: true
        }));
      });
      var cityinfo;
      AMap.plugin(['AMap.Geolocation', 'AMap.CitySearch', 'AMap.PlaceSearch', 'AMap.Geocoder'], function() {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              console.log(result);
              cityinfo = result.city;
              //自定义ui
              AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'], function(MarkerList, SimpleMarker, SimpleInfoWindow) {
                  //即jQuery/Zepto
                var $ = MarkerList.utils.$;

                var defaultIconStyle = 'red', //默认的图标样式
                    hoverIconStyle = 'green', //鼠标hover时的样式
                    selectedIconStyle = 'purple' //选中时的图标样式
                    ;

                var markerList = new MarkerList({
                  map: map,
                      //ListElement对应的父节点或者ID
                  listContainer: 'myList', //document.getElementById("myList"),
                      //选中后显示

                      //从数据中读取位置, 返回lngLat
                  getPosition: function(item) {
                    return item.location;
                  },
                      //数据ID，如果不提供，默认使用数组索引，即index
                  getDataId: function(item, index) {
                    return item.id;
                  },
                  getInfoWindow: function(data, context, recycledInfoWindow) {
                    // if (recycledInfoWindow) {
                    //   recycledInfoWindow.setInfoTitle(data.name);
                    //   recycledInfoWindow.setInfoBody(data.address);

                    //   return recycledInfoWindow;
                    // }

                    var infoWindow = new SimpleInfoWindow({
                      infoTitle: data.name,
                      infoBody: `<p>${data.address}</p><button type="button" class="btn btn-primary mybtn">确定</button>`,
                      offset: new AMap.Pixel(0, -37)
                    });
                    infoWindow.get$InfoBody().on('click', '.mybtn', function(event) {
                      //阻止冒泡
                      event.stopPropagation();
                      console.log(data);
                      scope.seldata.address = data.address;
                      scope.seldata.name = data.name;
                      scope.seldata.poiId = data.id;
                      scope.seldata.poiLat = data.location.lat;
                      scope.seldata.poiLng = data.location.lng;
                      scope.seldata.provinceName = data.pname;
                      scope.seldata.cityName = data.cityname;
                      scope.seldata.countyName = data.adname;
                      scope.selstore();
                    });
                    return infoWindow;
                  },
                      //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
                  getMarker: function(data, context, recycledMarker) {
                    var label = String.fromCharCode('A'.charCodeAt(0) + context.index);
                    if (recycledMarker) {
                      recycledMarker.setIconLabel(label);
                      return;
                    }
                    return new SimpleMarker({
                      containerClassNames: 'my-marker',
                      iconStyle: defaultIconStyle,
                      iconLabel: label
                    });
                  },
                      //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
                  getListElement: function(data, context, recycledListElement) {
                    var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

                          //使用模板创建
                    var innerHTML = MarkerList.utils.template(
                      '<% if(data.photos && data.photos[0]) { %>' +
                              '<div class="poi-imgbox">' +
                              '    <span class="poi-img" style="background-image:url(<%- data.photos[0].url %>)"></span>' +
                              '</div>' +
                              '<% } %>' +
                              '<div class="poi-info-left">' +
                              '    <h3 class="poi-title">' +
                              '        <%- label %>. <%- data.name %>' +
                              '    </h3>' +
                              '    <div class="poi-info">' +
                              '        <p class="poi-addr">地址：<%- data.address %></p>' +
                              '<% if(data.tel ){ %>' +
                              '        <p class="poi-addr">电话：<%- data.tel %></p>' +
                              '<% } %>' +
                              '    </div>' +
                              '</div>' +
                              '<div class="clear"></div>', {
                                data: data,
                                label: label
                              });

                    if (recycledListElement) {
                      recycledListElement.innerHTML = innerHTML;
                      return recycledListElement;
                    }

                    return '<li class="poibox">' +
                              innerHTML +
                              '</li>';
                  },
                      //列表节点上监听的事件
                  listElementEvents: ['click', 'mouseenter', 'mouseleave'],
                      //marker上监听的事件
                  markerEvents: ['click', 'mouseover', 'mouseout'],
                      //makeSelectedEvents:false,
                  selectedClassNames: 'selected',
                  autoSetFitView: true
                });

                window.markerList = markerList;

                AMap.plugin(['AMap.PlaceSearch'], function() {
                  var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    pageSize: 5,
                    pageIndex: 1,
                    extensions: 'all',
                    type: '餐饮服务',
                    city: cityinfo //城市
                  });

                  var $pagination = $('#pagination-demo');

                  function initPagination(page, totalPages) {
                    //初始化分页器
                    $pagination.twbsPagination({
                      totalPages: totalPages,
                      startPage: page,
                      prev: null,
                      first: '首页',
                      next: '下一页',
                      last: null,
                      initiateStartPageClick: false,
                      onPageClick: function(event, page) {
                        goPage(page);
                      }
                    });
                  }

                  var inited = false;

                  var $keywords = $('#keywords');

                  function goPage(page) {
                    //设置当前页
                    placeSearch.setPageIndex(page);
                    //关键字查询
                    placeSearch.search($keywords.val(), function(status, result) {
                      if (status !== 'complete') {
                        alert('返回数据出错!');
                      }

                      //render当前页的数据
                      markerList.render(result.poiList.pois);

                      if (!inited) {
                        inited = true;
                        //首次初始化
                        initPagination(page, Math.ceil(result.poiList.count / result.poiList.pageSize));
                      }
                    });
                  }

                  goPage(1);

                  $keywords.on('keypress', function(e) {
                    if (e.which === 13) {
                      inited = false;
                      $pagination.twbsPagination('destroy');
                      goPage(1);
                    }
                  });
                });

                markerList.on('selectedChanged', function(event, info) {
                  if (info.selected) {
                    if (info.selected.marker) {
                      //更新为选中样式
                      info.selected.marker.setIconStyle(selectedIconStyle);
                    }
                  }

                  if (info.unSelected && info.unSelected.marker) {
                    //更新为默认样式
                    info.unSelected.marker.setIconStyle(defaultIconStyle);
                  }
                });

                markerList.on('listElementMouseenter markerMouseover', function(event, record) {
                  if (record && record.marker) {
                          //非选中的id
                    if (!this.isSelectedDataId(record.id)) {
                              //设置为hover样式
                      record.marker.setIconStyle(hoverIconStyle);
                              //this.closeInfoWindow();
                    }
                  }
                });

                markerList.on('listElementMouseleave markerMouseout', function(event, record) {
                  if (record && record.marker) {
                    if (!this.isSelectedDataId(record.id)) {
                              //恢复默认样式
                      record.marker.setIconStyle(defaultIconStyle);
                    }
                  }
                });
              });
            }
          } else {
            console.log(result.info);
          }
        });
      });
    }
  };
}