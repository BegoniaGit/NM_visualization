var base_proportion_data = {
    series: {
        type: 'sunburst',
        // highlightPolicy: 'ancestor',
        data: [{
            name: '文件',            // First tree
            value: 10,
            children: [{
                name: 'sftp传输',       // First leaf of first tree
                value: 4
            }, {
                name: 'ftp传输',       // Second leaf of first tree
                value: 6
            }]
        }, {
            name: '数据库',            // Second tree
            value: 80,
            children: [{
                name: 'mongdb协议',       // Son of first tree
                value: 20,

            },
                {
                    name: 'mysql协议',       // Son of first tree
                    value: 20,

                },
                {
                    name: 'tds协议',       // Son of first tree
                    value: 20,

                },
                {
                    name: 'postgresal协议',       // Son of first tree
                    value: 20,

                }]
        },
            {
                name: 'http',            // First tree
                value: 10,

            },
            {
                name: 'email',            // First tree
                value: 10,

            },
            {
                name: 'ssh',            // First tree
                value: 10,

            }
        ],
        radius: [0, '90%'],
        label: {
            rotate: 'radial'
        }
    }
};
var proportionchart = echarts.init(document.getElementById('baseproportion'));
proportionchart.setOption(base_proportion_data)

/**
 * 扇形环状图更新函数
 */
function update_base_proportion_chart() {

    base_proportion_data['series']['data'] = redata['proportion']
    proportionchart.setOption(base_proportion_data)

}


// var words_proportion_data = {
//     tooltip: {},
//     series: [ {
//         type: 'wordCloud',
//         gridSize: 2,
//         sizeRange: [12, 50],
//         rotationRange: [-90, 90],
//         shape: 'pentagon',
//         width: 600,
//         height: 400,
//         drawOutOfBound: true,
//         textStyle: {
//             normal: {
//                 color: function () {
//                     return 'rgb(' + [
//                         Math.round(Math.random() * 160),
//                         Math.round(Math.random() * 160),
//                         Math.round(Math.random() * 160)
//                     ].join(',') + ')';
//                 }
//             },
//             emphasis: {
//                 shadowBlur: 10,
//                 shadowColor: '#333'
//             }
//         },
//         data: [
//
//
//             {
//                 name: '科技',
//                 value: 2
//             },
//             {
//                 name: '新闻',
//                 value: 12
//             },
//             {
//                 name: '娱乐',
//                 value: 7
//             },
//             {
//                 name: '综合',
//                 value: 6
//             },
//             {
//                 name: '搜索',
//                 value: 1
//             }
//         ]
//     } ]
// };
//
// var words_proportion = echarts.init(document.getElementById('wordsproportion'));
// words_proportion.setOption(words_proportion_data);


var network_traffic_warning_data = {
    title: {
        text: '网络流量警告',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['超时', '超量']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        splitLine: {
            show: false,
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#424242']
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4']
    },
    series: [
        {
            name: '超时',
            type: 'bar',
            data: [0, 0, 0, 0]
        },
        {
            name: '超量',
            type: 'bar',
            data: [0, 0, 0, 0]
        }
    ]
};
var network_traffic_warning_chart = echarts.init(document.getElementById('network_traffic_warning_chart'));
network_traffic_warning_chart.setOption(network_traffic_warning_data);

function update_network_traffic_warning_chart() {
    let warning = redata['warning']
    if (warning['overtime'].length != 0 || warning['overamount'].length != 0) {
        let time = network_traffic_warning_data.yAxis.data
        let series_0_data = network_traffic_warning_data.series[0].data
        let series_1_data = network_traffic_warning_data.series[1].data
        for (let i = 0; i < time.length - 1; i++) {
            time[i] = time[i + 1]
            series_0_data[i] = series_0_data[i + 1]
            series_1_data[i] = series_1_data[i + 1]
        }
        time[time.length - 1] = offsetToTime(req_offset)
        series_0_data[time.length - 1] = warning['overtime'].length
        series_1_data[time.length - 1] = warning['overamount'].length


        network_traffic_warning_data.yAxis.data = time
        network_traffic_warning_data.series[0].data = series_0_data
        network_traffic_warning_data.series[1].data = series_1_data
        network_traffic_warning_chart.setOption(network_traffic_warning_data);
    }

}

/**
 * 网络热力统计
 * @type
 **/
let hot_city_list= ['Columbus', 'Beijing', 'Shenyang', 'Shanghai', 'Hangzhou', 'Ningbo', 'Ottawa', 'Wenzhou', 'Manchester', 'othor']
let hot_item_list= ['文件', '数据库', '浏览器', 'SSH', '邮箱']
var network_hot_data= {
    tooltip: {
        position: 'top'
    },
    animation: false,
        grid: {
        height: '50%',
            y: '10%'
    },
    xAxis: {
        type: 'category',
            data:hot_city_list ,
            splitArea: {
            show: true
        },
        axisLabel:{
            rotate: 45
        }
    },
    yAxis: {
        type: 'category',
            data: hot_item_list,
            splitArea: {
            show: true
        }
    },
    visualMap: {
            show:false,
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',

        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

var network_hot_chart = echarts.init(document.getElementById('network_hot_chart'));

/**
 * 创建二维数组
 * @returns {any[]}
 */
function createArray(row,cor) {
    let arr = new Array();         //先声明一维
    for (let i = 0; i < row; i++) {          //一维长度为5
        arr[i] = new Array(i);    //在声明二维
        for (let j = 0; j < cor; j++) {      //二维长度为5
            arr[i][j] = 0;
        }
    }
    return arr;
}

network_hot_chart.setOption(network_hot_data);
var risk_hot_matrix = createArray(5, 10)
function update_network_hot_chart() {
    let risk_redies = []
    let ot = (redata['warning']['overtime'])
    let om = redata['warning']['overamount']
    if (ot.length != 0)
        for (let p in ot) {
            risk_redies.push(ot[p])
        }
    if (om.length != 0)
        for (let p in om)
            risk_redies.push(om[p])
    for (let i = 0; i < risk_redies.length; i++) {
        let item = risk_redies[i];
        let it = hot_item_list.indexOf(item['category'])
        let ol = hot_city_list.indexOf(item['city'])
        if (ol == -1)
            ol = 9
        risk_hot_matrix[it][ol] += 1;
    }

    let this_data=[];
    for(let i=0;i<5;i++){
        for(let j=0;j<10;j++){
            this_data.push([i,j,risk_hot_matrix[i][j]])
        }
    }

    this_data = this_data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
    network_hot_data.series[0].data=this_data;
    network_hot_chart.setOption(network_hot_data);
}