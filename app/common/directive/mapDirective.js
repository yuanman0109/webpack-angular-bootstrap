import angular from 'angular';
import '../plugins/china.js';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts.js');
// 引入柱状图
// require('echarts/lib/chart/bar.js');
// 引入折线图
require('echarts/lib/chart/line.js');
// 引入饼图
// require('echarts/lib/chart/pie.js');
//引入地图
// require('echarts/lib/chart/map.js');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip.js');
// require('echarts/lib/component/title.js');

export default angular.module('Echart', [])

  // 折线图
  
  .directive('echartLine', function() {
    return {
      restrict: 'AE',
      scope: {
        source: '=',
        days: '=',
        end: '='
      },
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attr) {
        //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        var resizeWorldMapContainer = function () {
          element[0].style.width = window.innerWidth - 240 + 'px';
          element[0].style.height = attr.height + 'px';
        };
          // 设置容器高宽
        resizeWorldMapContainer();
          // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(element[0]);
        // 保留两位小数
        function returnFloat(value) {
          var val = Math.round(parseFloat(value) * 100) / 100;
          var xsd = val.toString().split('.');
          if (xsd.length === 1) {
            val = val.toString() + '.00';
            return val;
          }
          if (xsd.length > 1) {
            if (xsd[1].length < 2) {
              val = val.toString() + '0';
            }
            return val;
          }
        }
        //监听options变化
        scope.$watch(function () { return scope.days; }, function (n, o) {
          if (n) {
            console.log(scope);
            console.log(n);
            
            var dataX = [];
            var day;
            var obj = {};
            var snackCount = []; //快餐订单笔数
            var snackAmount = []; //快餐订单金额
            var payCount = []; //扫码支付笔数
            var payAmount = []; //扫码支付金额
            if (scope.source) {
              // console.log(new Date().setDate(new Date().getDate() - scope.days));
              for (var i = scope.days; i > 0; i--) {
                let date = new Date().setDate(new Date(scope.end).getDate() - i);
                day = new Date(date).getMonth() + 1 + '.' + new Date(date).getDate();
                // console.log(day);
                obj[day] = {};
                obj[day].snackCount = 0;
                obj[day].snackAmount = 0;
                obj[day].payCount = 0;
                obj[day].payAmount = 0;
              }
              scope.source.forEach((item) => {
                // console.log(new Date(item.dataDate));
                day = new Date(item.dataDate).getMonth() + 1 + '.' + new Date(item.dataDate).getDate();
                // console.log(day);
                if (obj[day]) {
                  if (item.type === 'SNACK_ORDER') {
                    obj[day].snackCount = item.orderCount;
                    obj[day].snackAmount = item.orderAmount;
                  } else if (item.type === 'PAY_ORDER') {
                    obj[day].payCount = item.orderCount;
                    obj[day].payAmount = item.orderAmount;
                  }
                } //else {
                  // obj[day] = {};
                //   if (item.type === 'SNACK_ORDER') {
                //     obj[day].snackCount = item.orderCount;
                //     obj[day].snackAmount = item.orderAmount;
                //   } else {
                //     obj[day].payCount = item.orderCount;
                //     obj[day].payAmount = item.orderAmount;
                //   }
                // }   
              });
              // console.log(obj);
              for (var j in obj) {
                dataX.push(j);
                snackCount.push(obj[j].snackCount);
                snackAmount.push(obj[j].snackAmount);
                payAmount.push(obj[j].payAmount);
                payCount.push(obj[j].payCount);
              }

              // 金额数组最大值
              var mount = Math.max.apply(null, snackAmount) > Math.max.apply(null, payAmount) ? Math.max.apply(null, snackAmount) : Math.max.apply(null, payAmount);
              // console.log(mount);
              // 笔数数组最大值
              var count = Math.max.apply(null, snackCount) > Math.max.apply(null, payCount) ? Math.max.apply(null, snackCount) : Math.max.apply(null, payCount);
              
              // 数组求和
              var snackCountAll = 0,
                  snackAmountAll = 0,
                  payAmountAll = 0,
                  payCountAll = 0;
              snackCount.forEach((item) => {
                snackCountAll += item;
              });
              snackAmount.forEach((item) => {
                snackAmountAll += item;
              });
              payAmount.forEach((item) => {
                payAmountAll += item;
              });
              payCount.forEach((item) => {
                payCountAll += item;
              });
            };
            // console.log(snackCountAll); console.log(snackAmountAll); console.log(payAmountAll); console.log(payCountAll);
            // 指定图表的配置项和数据
            var option = {
              noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                  effect: {
                    n: 0
                  }
                }
              },
              title: {
                text: ''
              },
              tooltip: {
                trigger: 'axis',
                formatter: function(datas) {  
                  // console.log(datas);
                  var res = datas[0].name + '<br/>', val;
                  for (var i = 0, length = datas.length; i < length; i++) {
                    val = (datas[i].value);
                    res += datas[i].seriesName.split('(')[0] + '：' + val + '<br/>';
                  }
                  return res;
                }
              },
              color: ['#FFBA38', '#FF6B37', '#0084E0', '#45D3EC'],
              legend: {
                  // left: '30%',
                  // right: '4%',
                  // bottom: '-5%',
                formatter: function (v, n) {
                  return v; 
                },
                data: ['快餐订单笔数(' + snackCountAll + '笔)', '快餐订单金额(' + returnFloat(snackAmountAll) + '元)', '聚合支付笔数(' + payCountAll + '笔)', '聚合支付金额(' + returnFloat(payAmountAll) + '元)']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                // top: '5%',
                containLabel: true
              },
              toolbox: {
                right: '2%',
                top: '-1.5%',
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dataX
              },
              yAxis: [
                {
                  type: 'value',
                  name: '笔数（笔）',
                  min: 0,
                  max: count,
                  axisLabel: {
                    formatter: '{value}'
                  }
                },
                {
                  type: 'value',
                  name: '金额（元）',
                  min: 0,
                  max: mount,
                  axisLabel: {
                    formatter: '{value}'
                  }
                  // minInterval: 500
                }
              ],
              series: [
                {
                  name: '快餐订单笔数(' + snackCountAll + '笔)',
                  type: 'line',
                  stack: '快餐订单笔数',
                  itemStyle: {  
                    normal: {  
                      lineStyle: {  
                        color: '#FFBA38'  
                      }  
                    }  
                  },
                  data: snackCount
                },
                {
                  name: '快餐订单金额(' + returnFloat(snackAmountAll) + '元)', 
                  type: 'line',
                  stack: '快餐订单金额',
                  yAxisIndex: 1,
                  itemStyle: {  
                    normal: {  
                      lineStyle: {  
                        color: '#FF6B37'  
                      }  
                    }  
                  }, 
                  data: snackAmount
                },
                {
                  name: '聚合支付笔数(' + payCountAll + '笔)',
                  type: 'line',
                  stack: '聚合支付笔数',
                  itemStyle: {  
                    normal: {  
                      lineStyle: {  
                        color: '#0084E0'  
                      }  
                    }  
                  }, 
                  data: payCount
                },
                {
                  name: '聚合支付金额(' + returnFloat(payAmountAll) + '元)',
                  type: 'line',
                  yAxisIndex: 1,
                  stack: '聚合支付金额',
                  itemStyle: {  
                    normal: {  
                      lineStyle: {  
                        color: '#45D3EC'
                      }  
                    }  
                  }, 
                  data: payAmount
                }]
            };
            myChart.setOption(option);
          }
        }, true);
        //var source= JSON.parse(attr.source);
        // $timeout(() => {
        // var dataX = [];
        // var snackCount = []; //快餐订单笔数
        // var snackAmount = []; //快餐订单金额
        // var payCount = []; //扫码支付笔数
        // var payAmount = []; //扫码支付金额
        // if (scope.source) {
        //   scope.source.forEach((item) => {
        //     console.log(new Date(item.dataDate));
        //     dataX.push(new Date(item.dataDate).getMonth() + 1 + '.' + new Date(item.dataDate).getDate());
        //     if (item.type === 'SNACK_ORDER') {
        //       snackCount.push(item.orderCount);
        //       snackAmount.push(item.orderAmount);
        //       payAmount.push(0);
        //       payCount.push(0);
        //     } else {
        //       snackCount.push(0);
        //       snackAmount.push(0);
        //       payAmount.push(item.orderCount);
        //       payCount.push(item.orderAmount);
        //     }
        //   });
        // }
        
        //   // 指定图表的配置项和数据
        // var option = {
        //   title: {
        //     text: '笔数(笔)'
        //   },
        //   tooltip: {
        //     trigger: 'axis'
        //   },
        //   legend: {
        //       // left: '30%',
        //       // right: '4%',
        //       // bottom: '-5%',
        //     data: ['快餐订单笔数', '快餐订单金额', '聚合支付笔数', '聚合支付金额']
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        //   xAxis: {
        //     type: 'category',
        //     boundaryGap: false,
        //     data: dataX
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [
        //     {
        //       name: '快餐订单笔数',
        //       type: 'line',
        //       stack: '总量',
        //       data: snackCount
        //     },
        //     {
        //       name: '快餐订单金额', 
        //       type: 'line',
        //       stack: '总量',
        //       data: snackAmount
        //     },
        //     {
        //       name: '聚合支付笔数',
        //       type: 'line',
        //       stack: '总量',
        //       data: payCount
        //     },
        //     {
        //       name: '聚合支付金额',
        //       type: 'line',
        //       stack: '总量',
        //       data: payAmount
        //     }]
        // };
          // 使用刚指定的配置项和数据显示图表。
        // if (scope.source[0]) {
        //   myChart.setOption(option);
        // }
        
          //用于使chart自适应高度和宽度
        // window.onresize = function () {
        //       //重置容器高宽
        //   resizeWorldMapContainer();
        //   myChart.resize();
        // };
        // }, 500);
      }
    };
  })
  .name;

// Echart.$inject = ['$timeout'];