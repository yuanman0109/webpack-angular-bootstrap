import angular from 'angular'
import echarts from 'echarts'
import map from './china.js'
export default angular.module('echartDirective',[])
.directive('echartMap',function(){
    return {
        restrict:'AE',
        scope :{
            source:'='
        },
        replace: true,
        template:'<div style="width:100%;height:100%;"></div>',
        link:function(scope,element,attr){
             // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(element[0]);
            // 指定图表的配置项和数据
            function randomData() {
                return Math.round(Math.random()*1000);
            }

            var option = {
                title: {
                    text: 'iphone销量',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:['iphone3','iphone4','iphone5']
                },
                visualMap: {
                    min: 0,
                    max: 2500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {name: '北京',value: randomData() },
                            {name: '天津',value: randomData() },
                            {name: '上海',value: randomData() },
                            {name: '重庆',value: randomData() },
                            {name: '河北',value: randomData() },
                            {name: '河南',value: randomData() },
                            {name: '云南',value: randomData() },
                            {name: '辽宁',value: randomData() },
                            {name: '黑龙江',value: randomData() },
                            {name: '湖南',value: randomData() },
                            {name: '安徽',value: randomData() },
                            {name: '山东',value: randomData() },
                            {name: '新疆',value: randomData() },
                            {name: '江苏',value: randomData() },
                            {name: '浙江',value: randomData() },
                            {name: '江西',value: randomData() },
                            {name: '湖北',value: randomData() },
                            {name: '广西',value: randomData() },
                            {name: '甘肃',value: randomData() },
                            {name: '山西',value: randomData() },
                            {name: '内蒙古',value: randomData() },
                            {name: '陕西',value: randomData() },
                            {name: '吉林',value: randomData() },
                            {name: '福建',value: randomData() },
                            {name: '贵州',value: randomData() },
                            {name: '广东',value: randomData() },
                            {name: '青海',value: randomData() },
                            {name: '西藏',value: randomData() },
                            {name: '四川',value: randomData() },
                            {name: '宁夏',value: randomData() },
                            {name: '海南',value: randomData() },
                            {name: '台湾',value: randomData() },
                            {name: '香港',value: randomData() },
                            {name: '澳门',value: randomData() }
                        ]
                    },
                    {
                        name: 'iphone4',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {name: '北京',value: randomData() },
                            {name: '天津',value: randomData() },
                            {name: '上海',value: randomData() },
                            {name: '重庆',value: randomData() },
                            {name: '河北',value: randomData() },
                            {name: '安徽',value: randomData() },
                            {name: '新疆',value: randomData() },
                            {name: '浙江',value: randomData() },
                            {name: '江西',value: randomData() },
                            {name: '山西',value: randomData() },
                            {name: '内蒙古',value: randomData() },
                            {name: '吉林',value: randomData() },
                            {name: '福建',value: randomData() },
                            {name: '广东',value: randomData() },
                            {name: '西藏',value: randomData() },
                            {name: '四川',value: randomData() },
                            {name: '宁夏',value: randomData() },
                            {name: '香港',value: randomData() },
                            {name: '澳门',value: randomData() }
                        ]
                    },
                    {
                        name: 'iphone5',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {name: '北京',value: randomData() },
                            {name: '天津',value: randomData() },
                            {name: '上海',value: randomData() },
                            {name: '广东',value: randomData() },
                            {name: '台湾',value: randomData() },
                            {name: '香港',value: randomData() },
                            {name: '澳门',value: randomData() }
                        ]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);       
        }
    }
})
.directive('echartPie',function(){
    return {
        restrict:'AE',
        scope :{
            source:'='
        },
        replace: true,
        template:'<div style="width:100%;height:100%;"></div>',
        link:function(scope,element,attr){
             // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(element[0]);
            // 指定图表的配置项和数据
            var option = {
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);       
        }
    }
})
.name