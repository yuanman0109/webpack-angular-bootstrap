export default function(DialogService) {
  return {
    restrict: 'AE',
    scope: {
      location: '=',
      posi: '='
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
      
      var cityinfo;
      AMap.plugin(['AMap.Geolocation', 'AMap.CitySearch', 'AMap.PlaceSearch', 'AMap.Geocoder'], function() {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
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
                      scope.location = data.location;
                      scope.$apply();
                    });
                    return infoWindow;
                  },
                      //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
                  getMarker: function(data, context, recycledMarker) {
                    // console.log(context);
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
                    console.log(data);
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
                    //type: '餐饮服务',
                    city: cityinfo //城市
                  });
                  
                  //点击地图热点
                  map.on('hotspotclick', function(result) {
                    placeSearch.getDetails(result.id, function(status, result) {
                      if (status === 'complete' && result.info === 'OK') {
                        searchCallback(result);
                      }
                    });
                  });

                  //回调函数
                  function searchCallback(data) { //infoWindow.open(map, result.lnglat);
                    var poiArr = data.poiList.pois;
                    var location = poiArr[0].location;
                    // infoWindow.setContent(createContent(poiArr[0]));
                    // infoWindow.open(map,location);
                    console.log(data);
                    var infoWindow = new SimpleInfoWindow({
                      infoTitle: poiArr[0].name,
                      infoBody: `<p>${poiArr[0].address}</p><button type="button" class="btn btn-primary mybtn">确定</button>`
                    });
                    infoWindow.get$InfoBody().on('click', '.mybtn', function(event) {
                      //阻止冒泡
                      event.stopPropagation();
                      scope.location = poiArr[0].location;
                      scope.$apply();
                    });
                    infoWindow.open(map, location);
                  }

                  //点击地图获取经纬度
                  map.on('click', function(e) {
                    scope.location = {};
                    scope.location.lng = e.lnglat.getLng();
                    scope.location.lat = e.lnglat.getLat();
                    scope.$apply();
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
                        DialogService.showMessage('该地址不存在!', false);
                        return;
                      }
                      //render当前页的数据
                      // debugger
                      markerList.render(result.poiList.pois);
                      if (!inited) {
                        inited = true;
                        //首次初始化
                        initPagination(page, Math.ceil(result.poiList.count / result.poiList.pageSize));
                      }
                      scope.$apply();
                    });
                  }
                  if (scope.posi) {
                    $keywords.val(scope.posi);
                    goPage(1);
                  } else {
                    goPage(1);
                  };
            
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