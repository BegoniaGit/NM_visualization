var base_proportion_data = {
    title: {
        text: '网络请求分布图',
        textStyle:{
            color:COLOR_M,
            fontSize:12
        }
    },
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


var words_proportion_data = {
    title: {
        text: '非工作网站统计',
        textStyle:{
            color:COLOR_M,
            fontSize:12
        }
    },
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [20, 30],
        rotationRange: [0, 0],
        shape: 'pentagon',
        drawOutOfBound: true,
        textStyle: {
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [


            {
                name: 'alibaba',
                value: 2
            },
            {
                name: 'baidu',
                value: 2
            },
            {
                name: 'jd',
                value: 2
            },
            {
                name: 'taobao',
                value: 2
            }
        ]
    } ]
};

var words_proportion_chart = echarts.init(document.getElementById('network_name_chart'));
words_proportion_chart.setOption(words_proportion_data);

function update_words_proportion_chart(wordsdata){
    let da_1=wordsdata["elecShop"]
    let da_2=wordsdata["live"]
    let da_3=wordsdata["game"]
    this_data=[]
    let count=0
    for(p in da_1){
        this_data.push({"name":p,"value":da_1[p]/2})
        if(++count>4)break
    }
    for(p in da_2){
        this_data.push({"name":p,"value":da_2[p]/2})
        if(++count>4)break
    }
    for(p in da_3){
        this_data.push({"name":p,"value":da_3[p]/2})
        if(++count>4)break
    }
    words_proportion_data.series[0].data=this_data
    words_proportion_chart.setOption(words_proportion_data);
}



var network_traffic_warning_data = {
    title: {
        text: '网络流量警告',
        textStyle:{
            color:COLOR_M,
            fontSize:15
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['超时', '超量'],
        // top: 20,
        right:2,
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
            fontSize: 10,
            color:COLOR_M
        }
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
        },
        axisLabel:{
            textStyle: {
                color: COLOR_M,
                fontSize: 10,
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4'],
        axisLabel:{
            textStyle: {
                color: COLOR_M,
                fontSize: 10,
            }
        }
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
let hot_city_list= ['Columbus', 'Beijing', 'Shenyang', 'Shanghai', 'Hangzhou', 'Ningbo', 'Ottawa', 'Wenzhou', 'Manchester','Guangzhou']
let hot_item_list= ['文件', '数据库', '浏览器', 'SSH', '邮箱']
var network_hot_data= {
    title: {
        text: '网络危险热力分布图',
        textStyle:{
            color:COLOR_M,
            fontSize:12
        }
    },
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
            rotate: 70,
            textStyle: {
                color: COLOR_M,
                fontSize: 8,
            }
        }
    },
    yAxis: {
        type: 'category',
            data: hot_item_list,
            splitArea: {
            show: true
        },
        axisLabel:{
            // rotate: 45,
            textStyle: {
                fontSize: 10,
                color: COLOR_M

            }
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
                show: true,
                color:'#848488'
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
        if (ol!= -1)
            risk_hot_matrix[it][ol] += 1;
    }

    let max_hot=10
    let this_data=[];
    for(let i=0;i<5;i++){
        for(let j=0;j<10;j++){
            this_data.push([i,j,risk_hot_matrix[i][j]])
            max_hot=max_hot>risk_hot_matrix[i][j]?max_hot:risk_hot_matrix[i][j]
        }
    }

    this_data = this_data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
    network_hot_data.visualMap.max=max_hot
    network_hot_data.series[0].data=this_data;
    network_hot_chart.setOption(network_hot_data);
}



/**
 * 用户行为分布图
 * @type {{series: Array}}
 */
let web_category_pop_data = {
    title: {
        text: '网站类型统计',
        textStyle:{
            color:COLOR_M,
            fontSize:12
        }
    },
    backgroundColor:'#191a1a',
    animation: false,
    tooltip: {},
    xAxis: {
        show:false,
        type: 'value',
        min: 0,
        name: 'xAxis',//x轴的名称
        nameLocation: 'end',//x轴名称的显示位置'middle'，'end'
        nameRotate: 30,//坐标轴名字旋转角度值
        max: 20,
        gridIndex: 0,//x轴所在的grid的索引，默认位于第一个grid
        //offset:10,//x轴相对默认位置的偏移，在一个grid中含有多个grid的时候有意义
        type: 'category',
        //'category'类目轴 适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        //'time' //时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
        //'log' 对数轴。适用于对数数据。
        position: 'top',//x轴位于grid的上方还是下方，默认为bottom在下方
        inverse: false,//是否反向坐标
        boundaryGap: ['20%', '20%'],//坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
        //类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
        //非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效
        splitLine: {
            show: false
        }
    },
    yAxis: {
        show:false,
        type: 'value',
        min: 0,
        max: 20,
        splitLine: {
            show: false
        }
    },
    //装载数据
    series: []
};


var webcategorypopchart = echarts.init(document.getElementById('web_category_pop'));


//初始所有圈圈

let allCategories = ["电商", "邮箱", "科技", "直播", "办公", "其他", "视频",
    "阅读", "新闻", "社交", "论坛", "游戏", "电台", "搜索", "其它", "金融",
    "综合", "招聘", "旅游", "母婴", "音乐"]
initpopchart()
function initpopchart() {
    for (let i in allCategories) {
        let alonepop = {
            name: '',
            type: 'scatter',
            itemStyle: {
                normal: {
                    opacity: 0.8
                },
                // color: '#191a1a',
            },
            symbolSize: 0,
            data: [],
            label:{
                show:true,
                position:'inside',
                color:'#ffffff',
                fontStyle: 'oblique',
                fontSize: 8,
                formatter:'xxx'
            }
        }
        alonepop.name = allCategories[i]
        alonepop.data.push([random(20), random(20)]); //随机坐标
        alonepop.symbolSize = 0
        web_category_pop_data.series.push(alonepop)
    }
    webcategorypopchart.setOption(web_category_pop_data);
}

//更新圈圈大小
function update_web_category_pop_chart(statistic) {
    statistic=convertData(statistic,8)
    for(let i=0;i< web_category_pop_data.series.length;i++){
        web_category_pop_data.series[i].symbolSize=0
        web_category_pop_data.series[i].label.formatter=""
    }
    for (let currentCategory in statistic) {
        for(let i=0;i< web_category_pop_data.series.length;i++){
           if(currentCategory==web_category_pop_data.series[i].name)
            {
                web_category_pop_data.series[i].symbolSize=statistic[currentCategory]
                web_category_pop_data.series[i].label.formatter=currentCategory
                break
            }

        }
    }
    webcategorypopchart.setOption(web_category_pop_data);
}

