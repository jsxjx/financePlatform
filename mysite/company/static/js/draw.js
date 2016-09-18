//where a story ends
//another bigin

var arr = [];
var chartData = [];
//获取表格节点
chartData.tableFinace = document.getElementById('主要');
//获取表格内的数据（不包括表头）
chartData.dataMainFinance = getInfoFromTable('主要财政指标');
//折线图横轴数据
chartData.dateJidu = [];

chartData.option = {};

chartData.myChart = echarts.init(document.getElementById('echartsGraph2'));

initMyChart();
initTestAjax();
initStockLoop();
addAlterGraphEvent();


function initMyChart() {
  var i = 0;
  var data = chartData.dataMainFinance;
  for (; i < data.length; i++) {
    chartData.dateJidu.push(data[i][0] +'年'+ data[i][1] + '季度');
  }
  chartData.option = {
      tooltip: {
          trigger: 'axis',
          position: function (pt) {
              return [pt[0], '10%'];
          }
      },
      title: {
          left: 'center',
          text: '折线图',
      },
      legend: {
          top: 'bottom',
          data:['基本每股收益','每股净资产','流动比率', '资产负债比率']
      },
      toolbox: {
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chartData.dateJidu
      },
      yAxis: {
          //'value'表示数值轴
          type: 'value',
          boundaryGap: [0, '100%']
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
      }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      }],
      series: [
          {
              name:'基本每股收益', //gai
              type:'line',
              smooth:true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                  normal: {
                      color: 'rgb(255, 70, 131)' //gai
                  }
              },
              areaStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgb(255, 158, 68)'
                      }, {
                          offset: 1,
                          color: 'rgb(255, 70, 131)'
                      }])
                  }
              },
              data: [1.0,2.0,0.43,0.9,0.87] //gai
          },
      ]
  };
  chartData.myChart.setOption(chartData.option);
  }


function addAlterGraphEvent() {
  var i = 0;
  //表格内链接节点
  var buttonBiao = chartData.tableFinace.getElementsByTagName('a');

  for( ;i<buttonBiao.length; i++) {
    buttonBiao[i].i = i;
    buttonBiao[i].addEventListener('click', function(){
      alterGraph(this.i + 2);
    }, false);
  }
  /**
  * Get the data from a column in a two-dimensional array
  * @param {number} id_column -
  */
  function getDataFromColumn(id_column) {
    var data = [];
    var i = 0;
    for (; i < chartData.dataMainFinance.length; i++) {
      data.push(chartData.dataMainFinance[i][id_column]);
    }
    return data;
  }

  //为echarts折线图增加表格行数据对应的折线
  function alterGraph(id_column){
    //var seriesNew = option2.series;可以循环向series内添加！！！
    //Object.assign()大法好啊！！！
    var seriesNew = Object.assign({}, chartData.option.series[0]);
    seriesNew.name = '每股净资产';
    seriesNew.data = getDataFromColumn(id_column);
    seriesNew.itemStyle.normal.color = '#039be5';
    seriesNew.areaStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#ffff05'
    }, {
        offset: 1,
        color: '#039be5'
    }]);
    chartData.option.series.push(seriesNew);
    chartData.myChart.setOption(chartData.option);
  }
}

//为测试按钮绑定ajax事件
function initTestAjax() {
  var http_request = false;
  var root_url = 'http://127.0.0.1:8000';
  var test_button = document.getElementById('test_button');
  test_button.addEventListener('click', function(){makeRequest(root_url + '/company/');}, false);

  //webAPI发送ajax请求
  function makeRequest(url) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);
  }
  //ajax请求异常
  function alertContents() {
    if (http_request.readyState == 4) {
      if (http_request.status == 200) {
        alert(http_request.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
}

//循环滚动股价
function initStockLoop() {
  var new_stock_price = document.getElementById('new_stock_price');
  var data = [];
  var i_count = 0;
  for (var i = 0; i < 100; i++) {
    data.push(Math.random(5) * 100);
  }
  alterStockData();

  function alterStockData() {
    new_stock_price.innerHTML = data[i_count];
    i_count++;
    setTimeout(alterStockData, 1000);
  }
}

/*
(function($){
  $(function(){
    var myChart3 = echarts.init(document.getElementById('echartsGraph1'));
    option = {
    title: {
        text: 'World Population (2010)',
        subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
        sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
        left: 'center',
        top: 'top'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1];
            return params.seriesName + '<br/>' + params.name + ' : ' + value;
        }
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
    visualMap: {
        min: 0,
        max: 1000000,
        text:['High','Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['lightskyblue','yellow', 'orangered']
        }
    },
    series: [
        {
            name: 'World Population (2010)',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            data:[
                {name: 'Afghanistan', value: 28397.812},
                {name: 'Angola', value: 19549.124},
                {name: 'Albania', value: 3150.143},
                {name: 'United Arab Emirates', value: 8441.537},
                {name: 'Argentina', value: 40374.224},
                {name: 'Armenia', value: 2963.496},
                {name: 'French Southern and Antarctic Lands', value: 268.065},
                {name: 'Australia', value: 22404.488},
                {name: 'Austria', value: 8401.924},
                {name: 'Azerbaijan', value: 9094.718},
                {name: 'Burundi', value: 9232.753},
                {name: 'Belgium', value: 10941.288},
                {name: 'Benin', value: 9509.798},
                {name: 'Burkina Faso', value: 15540.284},
                {name: 'Bangladesh', value: 151125.475},
                {name: 'Bulgaria', value: 7389.175},
                {name: 'The Bahamas', value: 66402.316},
                {name: 'Bosnia and Herzegovina', value: 3845.929},
                {name: 'Belarus', value: 9491.07},
                {name: 'Belize', value: 308.595},
                {name: 'Bermuda', value: 64.951},
                {name: 'Bolivia', value: 716.939},
                {name: 'Brazil', value: 195210.154},
                {name: 'Brunei', value: 27.223},
                {name: 'Bhutan', value: 716.939},
                {name: 'Botswana', value: 1969.341},
                {name: 'Central African Republic', value: 4349.921},
                {name: 'Canada', value: 34126.24},
                {name: 'Switzerland', value: 7830.534},
                {name: 'Chile', value: 17150.76},
                {name: 'China', value: 1359821.465},
                {name: 'Ivory Coast', value: 60508.978},
                {name: 'Cameroon', value: 20624.343},
                {name: 'Democratic Republic of the Congo', value: 62191.161},
                {name: 'Republic of the Congo', value: 3573.024},
                {name: 'Colombia', value: 46444.798},
                {name: 'Costa Rica', value: 4669.685},
                {name: 'Cuba', value: 11281.768},
                {name: 'Northern Cyprus', value: 1.468},
                {name: 'Cyprus', value: 1103.685},
                {name: 'Czech Republic', value: 10553.701},
                {name: 'Germany', value: 83017.404},
                {name: 'Djibouti', value: 834.036},
                {name: 'Denmark', value: 5550.959},
                {name: 'Dominican Republic', value: 10016.797},
                {name: 'Algeria', value: 37062.82},
                {name: 'Ecuador', value: 15001.072},
                {name: 'Egypt', value: 78075.705},
                {name: 'Eritrea', value: 5741.159},
                {name: 'Spain', value: 46182.038},
                {name: 'Estonia', value: 1298.533},
                {name: 'Ethiopia', value: 87095.281},
                {name: 'Finland', value: 5367.693},
                {name: 'Fiji', value: 860.559},
                {name: 'Falkland Islands', value: 49.581},
                {name: 'France', value: 63230.866},
                {name: 'Gabon', value: 1556.222},
                {name: 'United Kingdom', value: 62066.35},
                {name: 'Georgia', value: 4388.674},
                {name: 'Ghana', value: 24262.901},
                {name: 'Guinea', value: 10876.033},
                {name: 'Gambia', value: 1680.64},
                {name: 'Guinea Bissau', value: 10876.033},
                {name: 'Equatorial Guinea', value: 696.167},
                {name: 'Greece', value: 11109.999},
                {name: 'Greenland', value: 56.546},
                {name: 'Guatemala', value: 14341.576},
                {name: 'French Guiana', value: 231.169},
                {name: 'Guyana', value: 786.126},
                {name: 'Honduras', value: 7621.204},
                {name: 'Croatia', value: 4338.027},
                {name: 'Haiti', value: 9896.4},
                {name: 'Hungary', value: 10014.633},
                {name: 'Indonesia', value: 240676.485},
                {name: 'India', value: 1205624.648},
                {name: 'Ireland', value: 4467.561},
                {name: 'Iran', value: 240676.485},
                {name: 'Iraq', value: 30962.38},
                {name: 'Iceland', value: 318.042},
                {name: 'Israel', value: 7420.368},
                {name: 'Italy', value: 60508.978},
                {name: 'Jamaica', value: 2741.485},
                {name: 'Jordan', value: 6454.554},
                {name: 'Japan', value: 127352.833},
                {name: 'Kazakhstan', value: 15921.127},
                {name: 'Kenya', value: 40909.194},
                {name: 'Kyrgyzstan', value: 5334.223},
                {name: 'Cambodia', value: 14364.931},
                {name: 'South Korea', value: 51452.352},
                {name: 'Kosovo', value: 97.743},
                {name: 'Kuwait', value: 2991.58},
                {name: 'Laos', value: 6395.713},
                {name: 'Lebanon', value: 4341.092},
                {name: 'Liberia', value: 3957.99},
                {name: 'Libya', value: 6040.612},
                {name: 'Sri Lanka', value: 20758.779},
                {name: 'Lesotho', value: 2008.921},
                {name: 'Lithuania', value: 3068.457},
                {name: 'Luxembourg', value: 507.885},
                {name: 'Latvia', value: 2090.519},
                {name: 'Morocco', value: 31642.36},
                {name: 'Moldova', value: 103.619},
                {name: 'Madagascar', value: 21079.532},
                {name: 'Mexico', value: 117886.404},
                {name: 'Macedonia', value: 507.885},
                {name: 'Mali', value: 13985.961},
                {name: 'Myanmar', value: 51931.231},
                {name: 'Montenegro', value: 620.078},
                {name: 'Mongolia', value: 2712.738},
                {name: 'Mozambique', value: 23967.265},
                {name: 'Mauritania', value: 3609.42},
                {name: 'Malawi', value: 15013.694},
                {name: 'Malaysia', value: 28275.835},
                {name: 'Namibia', value: 2178.967},
                {name: 'New Caledonia', value: 246.379},
                {name: 'Niger', value: 15893.746},
                {name: 'Nigeria', value: 159707.78},
                {name: 'Nicaragua', value: 5822.209},
                {name: 'Netherlands', value: 16615.243},
                {name: 'Norway', value: 4891.251},
                {name: 'Nepal', value: 26846.016},
                {name: 'New Zealand', value: 4368.136},
                {name: 'Oman', value: 2802.768},
                {name: 'Pakistan', value: 173149.306},
                {name: 'Panama', value: 3678.128},
                {name: 'Peru', value: 29262.83},
                {name: 'Philippines', value: 93444.322},
                {name: 'Papua New Guinea', value: 6858.945},
                {name: 'Poland', value: 38198.754},
                {name: 'Puerto Rico', value: 3709.671},
                {name: 'North Korea', value: 1.468},
                {name: 'Portugal', value: 10589.792},
                {name: 'Paraguay', value: 6459.721},
                {name: 'Qatar', value: 1749.713},
                {name: 'Romania', value: 21861.476},
                {name: 'Russia', value: 21861.476},
                {name: 'Rwanda', value: 10836.732},
                {name: 'Western Sahara', value: 514.648},
                {name: 'Saudi Arabia', value: 27258.387},
                {name: 'Sudan', value: 35652.002},
                {name: 'South Sudan', value: 9940.929},
                {name: 'Senegal', value: 12950.564},
                {name: 'Solomon Islands', value: 526.447},
                {name: 'Sierra Leone', value: 5751.976},
                {name: 'El Salvador', value: 6218.195},
                {name: 'Somaliland', value: 9636.173},
                {name: 'Somalia', value: 9636.173},
                {name: 'Republic of Serbia', value: 3573.024},
                {name: 'Suriname', value: 524.96},
                {name: 'Slovakia', value: 5433.437},
                {name: 'Slovenia', value: 2054.232},
                {name: 'Sweden', value: 9382.297},
                {name: 'Swaziland', value: 1193.148},
                {name: 'Syria', value: 7830.534},
                {name: 'Chad', value: 11720.781},
                {name: 'Togo', value: 6306.014},
                {name: 'Thailand', value: 66402.316},
                {name: 'Tajikistan', value: 7627.326},
                {name: 'Turkmenistan', value: 5041.995},
                {name: 'East Timor', value: 10016.797},
                {name: 'Trinidad and Tobago', value: 1328.095},
                {name: 'Tunisia', value: 10631.83},
                {name: 'Turkey', value: 72137.546},
                {name: 'United Republic of Tanzania', value: 44973.33},
                {name: 'Uganda', value: 33987.213},
                {name: 'Ukraine', value: 46050.22},
                {name: 'Uruguay', value: 3371.982},
                {name: 'United States of America', value: 312247.116},
                {name: 'Uzbekistan', value: 27769.27},
                {name: 'Venezuela', value: 236.299},
                {name: 'Vietnam', value: 89047.397},
                {name: 'Vanuatu', value: 236.299},
                {name: 'West Bank', value: 13.565},
                {name: 'Yemen', value: 22763.008},
                {name: 'South Africa', value: 51452.352},
                {name: 'Zambia', value: 13216.985},
                {name: 'Zimbabwe', value: 13076.978}
            ]
        }
    ]
};
  myChart3.setOption(option);

  });
})(jQuery);
*/
/*

(function($){
  $(function(){

    var myChart1 = echarts.init(document.getElementById('echartsGraph1'));
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '折线图',
        },
        legend: {
            top: 'bottom',
            data:['意向']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:'模拟数据',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data
            }
        ]
    };
    myChart1.setOption(option);

     /*
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts '
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
        */
    /*
    function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
            volumns.push(rawData[i][4]);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    }

    function calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data.values[i - j][1];
            }
            result.push(+(sum / dayCount).toFixed(3));
        }
        return result;
    }

    $.get('data/asset/data/stock-DJI.json', function (rawData) {

        var data = splitData(rawData);

        myChart.setOption(option = {
            backgroundColor: '#eee',
            animation: false,
            legend: {
                bottom: 10,
                left: 'center',
                data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    height: '50%'
                },
                {
                    left: '10%',
                    right: '8%',
                    top: '63%',
                    height: '16%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: data.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 98,
                    end: 100
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: 98,
                    end: 100
                }
            ],
            series: [
                {
                    name: 'Dow-Jones index',
                    type: 'candlestick',
                    data: data.values,
                    itemStyle: {
                        normal: {
                            borderColor: null,
                            borderColor0: null
                        }
                    },
                    tooltip: {
                        formatter: function (param) {
                            var param = param[0];
                            return [
                                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                'Open: ' + param.data[0] + '<br/>',
                                'Close: ' + param.data[1] + '<br/>',
                                'Lowest: ' + param.data[2] + '<br/>',
                                'Highest: ' + param.data[3] + '<br/>'
                            ].join('');
                        }
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5, data),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10, data),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20, data),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: calculateMA(30, data),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'Volumn',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data.volumns
                }
            ]
        }, true);

        // myChart.on('brushSelected', renderBrushed);

        // function renderBrushed(params) {
        //     var sum = 0;
        //     var min = Infinity;
        //     var max = -Infinity;
        //     var countBySeries = [];
        //     var brushComponent = params.brushComponents[0];

        //     var rawIndices = brushComponent.series[0].rawIndices;
        //     for (var i = 0; i < rawIndices.length; i++) {
        //         var val = data.values[rawIndices[i]][1];
        //         sum += val;
        //         min = Math.min(val, min);
        //         max = Math.max(val, max);
        //     }

        //     panel.innerHTML = [
        //         '<h3>STATISTICS:</h3>',
        //         'SUM of open: ' + (sum / rawIndices.length).toFixed(4) + '<br>',
        //         'MIN of open: ' + min.toFixed(4) + '<br>',
        //         'MAX of open: ' + max.toFixed(4) + '<br>'
        //     ].join(' ');
        // }

        myChart.dispatchAction({
            type: 'brush',
            areas: [
                {
                    brushType: 'lineX',
                    coordRange: ['2016-06-02', '2016-06-20'],
                    xAxisIndex: 0
                }
            ]
        });

    });

  });
})(jQuery);
*/
