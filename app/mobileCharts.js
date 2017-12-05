import './style/mobile/moblileCharts.less';
import 'whatwg-fetch';
//import 'common/plugins/china.js';
import echarts from '../node_modules/echarts/lib/echarts.js';
import '../node_modules/echarts/lib/chart/line.js';
import '../node_modules/echarts/lib/component/tooltip.js';
import '../node_modules/echarts/lib/component/legend';
import StackdriverErrorReporter from 'common/factory/stack-errors';
if (isBulidTest || isDevelopment) {
  let StackdriverErrors = new StackdriverErrorReporter();
  StackdriverErrors.start({
    key: version,
    projectId: 'bss',
    baseAPIUrl: 'http://10.10.1.14:6003/projects/',
    service: 'angular_out',
    emails: ['zhutiegen@niwodai.net']   
  });
}

// 保留两位小数
// function returnFloat(innerHTML) {
//   var val = Math.round(parseFloat(innerHTML) * 100) / 100;
//   var xsd = val.toString().split('.');
//   if (xsd.length === 1) {
//     val = val.toString() + '.00';
//     return val;
//   }
//   if (xsd.length > 1) {
//     if (xsd[1].length < 2) {
//       val = val.toString() + '0';
//     }
//     return val;
//   }
// }
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
function chart(source, days, end) {
  var dataX = [];
  var day;
  var obj = {};
  var snackCount = []; //快餐订单笔数
  var snackAmount = []; //快餐订单金额
  var payCount = []; //扫码支付笔数
  var payAmount = []; //扫码支付金额
  if (source) {
    console.log(days);
    // source.reverse();
    
    for (var i = days; i > 0; i--) {
      let date = new Date().setDate(new Date(end).getDate() - i);
      day = new Date(date).getMonth() + 1 + '.' + new Date(date).getDate();
      obj[day] = {};
      obj[day].snackCount = 0;
      obj[day].snackAmount = 0;
      obj[day].payCount = 0;
      obj[day].payAmount = 0;
    }
    source.forEach((item) => {
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
      } 
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
        left: 'center', //'5%',
        right: 'auto', //'10%',
        top: 'auto',
      // orient: 'vertical',            // bottom: '-5%',
        data: [
          {name: '快餐订单笔数(' + snackCountAll + '笔)'}, 
          {name: '快餐订单金额(' + snackAmountAll + '元)'},
          {name: '聚合支付笔数(' + payCountAll + '笔)'}, {name: '聚合支付金额(' + payAmountAll + '元)'}]
      },
      grid: {
        left: '3%',
        right: '3%',
      // bottom: '3%',
        top: '25%',
        containLabel: true
      },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX
      },
      yAxis: [
        {
          type: 'value',
          name: '笔数（笔）',
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
          // color: '#FFBA38',
          data: snackCount
        },
        {
          name: '快餐订单金额(' + snackAmountAll + '元)', 
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
          name: '聚合支付金额(' + payAmountAll + '元)',
          type: 'line',
          stack: '聚合支付金额',
          yAxisIndex: 1,
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
  // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  } //else {  //没数据时显示
  //   console.log(source);
  //   document.getElementById('main').innerHTML = '暂无数据';
  //   document.getElementById('main').style.fontSize = '28px';
  //   document.getElementById('main').style.color = '#ddd';
  //   document.getElementById('main').style.textAlign = 'center';
  //   document.getElementById('main').style.border = '1px solid #eee';
  //   document.getElementById('main').style.paddingTop = '50%';
  // };
}
var form = {};
// form.storeId = '067316846ab511e7867d0242ac110296';
form.endDate = new Date().getTime();
// console.log(location.search);
var token = location.search.split('token=')[1];
form.storeId = location.search.split('id=')[1].split('&')[0];
// var token = localStorage.token;
var storeUrl = '/api/customer/store/orders';

function fetchResault(form) {   
  // alert('1');    
  fetch(storeUrl + '?beginDate=' + form.beginDate + '&endDate=' + form.endDate + '&storeId=' + form.storeId + '&access_token=' + token, {
    method: 'GET' 
   // redirect: 'follow',
    // headers: {      
    //   'Authorization': 'Bearer' + token
    // }   
  }).then(function(response) {
    // alert('response');
    return response.json();
  }).then(function(json) {
    console.log(json);
    // alert('json');    
    chart(json.data, form.days, form.endDate);
  }).catch(function(e) {
    console.log(e);
  });
}

function hasClass(elements, cName) { 
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)')); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
}; 
function addClass(elements, cName) { 
  if (!hasClass(elements, cName)) { 
    elements.className += ' ' + cName; 
  }; 
}; 
function removeClass(elements, cName) { 
  if (hasClass(elements, cName)) { 
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' '); // replace方法是替换 
  }; 
}; 

var myTabs1 = document.querySelector('#myTabs1');//返回id为myTabs的首个div的li
var myTabs2 = document.querySelector('#myTabs2');
var myTabs3 = document.querySelector('#myTabs3');
var endDate = document.getElementById('endDate');
var begin = document.getElementById('beginDate');

// myTabs1.onclick = tabs1();
myTabs1.onclick = function () {
  myTab(myTabs1, myTabs2, myTabs3, 7);
  // addClass(myTabs1, 'active');
  // removeClass(myTabs2, 'active');
  // removeClass(myTabs3, 'active');
  // begin.value = searchBt(7).getFullYear() + '-' + date10(searchBt(7).getMonth() + 1) + '-' + date10(searchBt(7).getDate());
  // endDate.value = new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1);
  // form.beginDate = new Date(searchBt(7)).getTime();
  // form.endDate = new Date().getTime();
  // form.days = 7;
  // fetchResault(form);
};

// begin.value = searchBt(7).getFullYear() + '-' + date10(searchBt(7).getMonth() + 1) + '-' + date10(searchBt(6).getDate());
//
myTabs2.onclick = function() {
  myTab(myTabs2, myTabs1, myTabs3, 14);
  // addClass(myTabs2, 'active');
  // removeClass(myTabs1, 'active');
  // removeClass(myTabs3, 'active');
  // begin.value = searchBt(14).getFullYear() + '-' + date10(searchBt(14).getMonth() + 1) + '-' + date10(searchBt(14).getDate());
  // endDate.value = new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1);
  // form.beginDate = new Date(searchBt(14)).getTime();
  // form.endDate = new Date().getTime();
  // form.days = 14;
  // // console.log(form);
  // fetchResault(form);
  // console.log(begin.value);
};
myTabs3.onclick = function() {
  myTab(myTabs3, myTabs1, myTabs2, 30);
  // addClass(myTabs3, 'active');
  // removeClass(myTabs1, 'active');
  // removeClass(myTabs2, 'active');
  // begin.value = searchBt(30).getFullYear() + '-' + date10(searchBt(30).getMonth() + 1) + '-' + date10(searchBt(30).getDate());
  // endDate.value = new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1);
  // form.beginDate = new Date(searchBt(30)).getTime();
  // form.endDate = new Date().getTime();
  // form.days = 30;
  // // console.log(form);
  // fetchResault(form);
};

function tabs1() {  
  form.beginDate = new Date(searchBt(7)).getTime();
  begin.value = searchBt(7).getFullYear() + '-' + date10(searchBt(7).getMonth() + 1) + '-' + date10(searchBt(7).getDate());
  console.log(begin.value);
  endDate.value = new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1);
  console.log(endDate.value);
  form.days = 7;
  fetchResault(form);
};
tabs1();

// 天数
function myTab(dom1, dom2, dom3, day) {
  addClass(dom1, 'active');
  removeClass(dom2, 'active');
  removeClass(dom3, 'active');
  begin.value = searchBt(day).getFullYear() + '-' + date10(searchBt(day).getMonth() + 1) + '-' + date10(searchBt(day).getDate());
  endDate.value = new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1);
  form.beginDate = new Date(searchBt(day)).getTime();
  form.endDate = new Date().getTime();
  form.days = day;
  // console.log(form);
  fetchResault(form);
}

// endDate.innerHTML = new Date(yyyy, mth, dd);
// begin.innerHTML = searchBt(7);
function searchBt(day) { 
  return new Date(new Date().setDate(new Date().getDate() - day));  
};

function date10(day) { 
  return day >= 10 ? day : '0' + day; 
};

function changeDay(val) {
  // console.log(form);
  // console.log(val);
  // console.log(val.value);
  removeClass(myTabs1, 'active');
  removeClass(myTabs2, 'active');
  removeClass(myTabs3, 'active');
  var reduceDay;
  if (val.id === 'beginDate') {
    form.beginDate = new Date(val.value).getTime() - 24 * 60 * 60 * 1000;
    form.endDate = new Date(endDate.value).getTime() + 24 * 60 * 60 * 1000;
    reduceDay = Math.floor((new Date(endDate.value).getTime() - new Date(val.value).getTime()) / 1000 / 60 / 60 / 24) + 1;
  } else {
    form.beginDate = new Date(beginDate.value) - 24 * 60 * 60 * 1000;
    form.endDate = new Date(val.value).getTime() + 24 * 60 * 60 * 1000;
    // var a = String(new Date(val.value).getFullYear() + '-' + date10(new Date(val.value).getMonth() + 1) + '-' + date10(new Date(val.value).getDate() + 1));

    reduceDay = Math.floor((new Date(val.value).getTime() - new Date(beginDate.value).getTime()) / 1000 / 60 / 60 / 24) + 1;
  }
  let time = String(new Date().getFullYear() + '-' + date10(new Date().getMonth() + 1) + '-' + date10(new Date().getDate() - 1));
  if (endDate.value === time) {
    console.log(reduceDay);
    if (reduceDay === 7) {
      addClass(myTabs1, 'active');
    } else if (reduceDay === 14) {
      addClass(myTabs2, 'active');
    } else if (reduceDay === 30) {
      addClass(myTabs3, 'active');
    }
  }
  console.log(endDate.value);
  console.log(time);
  form.days = reduceDay;
  // var time = val.id;
  // form[time] = new Date(val.value).getTime();
  fetchResault(form);
  // console.log(form);
}
window.changeDay = changeDay;
