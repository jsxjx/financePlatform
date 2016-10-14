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
