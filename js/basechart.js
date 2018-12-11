//基本信息图参数设置

timeArray = ['', '', '', '', '', '', '']

var fileData = {
    title: {
        text: '文件流量/MB',
        textStyle:{
            color:'#fff'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['文件流量上行', '文件流量下行']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['', '', '', '', '', '', '']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#424242']
                }
            }
        }
    ],
    series: [
        {
            name: '文件流量上行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '文件流量下行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};


var databaseData = {
    title: {
        text: '数据库流量/MB'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['数据库流量上行', '数据库流量下行']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['', '', '', '', '', '', '']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#424242']
                }
            }
        }
    ],
    series: [
        {
            name: '数据库流量上行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '数据库流量下行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

var httpemData = {
    title: {
        text: 'http及邮件流量/MB',
        left: 12
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['http上行', 'http下行', "邮箱上行", "邮箱下行"],
        right: 2,
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
            fontSize: 10
        }
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: false,

    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['', '', '', '', '', '', '']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#424242']
                }
            }
        }
    ],
    series: [
        {
            name: 'http上行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: 'http下行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '邮箱上行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '邮箱下行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

var sshData = {
    title: {
        text: 'SSH流量/MB'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['SSH命令流量上行', 'SSH命令流量下行']
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['', '', '', '', '', '', '']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#424242']
                }
            }
        }
    ],
    series: [
        {
            name: 'SSH命令流量上行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: 'SSH命令流量下行',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

function updateBaseChart(){
    //file chart
    let upd=fileData['series'][0]['data']
    let downd=fileData['series'][1]['data']
    for(let i=0;i<upd.length-1;i++){
        upd[i]=upd[i+1]
        downd[i]=downd[i+1]
    }
    upd[upd.length-1]=redata['base']['file']['upload']
    downd[upd.length-1]=redata['base']['file']['download']
    fileData['series'][0]['data']=upd
    fileData['series'][1]['data']=downd
    filechart.setOption(fileData)


    // databaseData=JSON.parse(fileData.toString())
    // httpemData=JSON.parse(fileData.toString())
    // sshData=JSON.parse(fileData.toString())

    //database chart
    upd=databaseData['series'][0]['data']
    downd=databaseData['series'][1]['data']
    for(let i=0;i<upd.length-1;i++){
        upd[i]=upd[i+1]
        downd[i]=downd[i+1]
    }
    upd[upd.length-1]=redata['base']['database']['upload']
    downd[upd.length-1]=redata['base']['database']['download']
    databaseData['series'][0]['data']=upd
    databaseData['series'][1]['data']=downd
    databasechart.setOption(databaseData)

    //http email chart
    upd=httpemData['series'][0]['data']
    downd=httpemData['series'][1]['data']
    for(let i=0;i<upd.length-1;i++){
        upd[i]=upd[i+1]
        downd[i]=downd[i+1]
    }
    upd[upd.length-1]=redata['base']['http']['upload']
    downd[upd.length-1]=redata['base']['http']['download']
    httpemData['series'][0]['data']=upd
    httpemData['series'][1]['data']=downd
    upd=httpemData['series'][2]['data']
    downd=httpemData['series'][3]['data']
    for(let i=0;i<upd.length-1;i++){
        upd[i]=upd[i+1]
        downd[i]=downd[i+1]
    }
    upd[upd.length-1]=redata['base']['email']['upload']
    downd[upd.length-1]=redata['base']['email']['download']
    httpemData['series'][2]['data']=upd
    httpemData['series'][3]['data']=downd
    httpemchart.setOption(httpemData)


    //ssh chart
    upd=sshData['series'][0]['data']
    downd=sshData['series'][1]['data']
    for(let i=0;i<upd.length-1;i++){
        upd[i]=upd[i+1]
        downd[i]=downd[i+1]
    }
    upd[upd.length-1]=redata['base']['ssh']['upload']
    downd[upd.length-1]=redata['base']['ssh']['download']
    sshData['series'][0]['data']=upd
    sshData['series'][1]['data']=downd
    sshchart.setOption(sshData)
}

/**
 * 地图
 * @type {string}
 */
mapboxgl.accessToken = 'pk.eyJ1IjoiY3JhYmFwcGxlIiwiYSI6ImNqb2xmYXpiczA5OTMzcXRocXBsdnppdTQifQ.jS_2o9Tpidr0wDI07TRj7Q';
var myChart = echarts.init(document.getElementById('map'));

var myguiji=[
    {'coords':[[104.69588,31.53709],[121.53504, 38.889698]],'lineStyle':{ color: '#397aff'}},
    {'coords':[[104.69588,31.53709],[-77.4874416, 39.0437567]],'lineStyle':{ color: '#ff1122'}},
    {'coords':[[104.69588,31.53709],[ 121.53504,30.889698 ]],'lineStyle':{ color: '#52ff45'}},
    {'coords':[[104.69588,31.53709],[ 101.53504,10.889698 ]],'lineStyle':{ color: '#397aff'}},
    {'coords':[[104.69588,31.53709],[ -21.53504,60.889698 ]],'lineStyle':{ color: '#ff1e1a'}}
]
//地图基本参数设置
var mapdata={
    mapbox: {
        center: [30,40],
        zoom: 1,
        //pitch: 50,
        //bearing: -10,
        altitudeScale: 1,
        style: 'mapbox://styles/mapbox/dark-v9',
        postEffect: {
            enable: true,
            SSAO: {
                enable: true,
                radius: 2,
                intensity: 1.5
            }
        },
        light: {
            main: {
                intensity: 0.1,
                shadow: true,
                shadowQuality: 'high'
            },
            ambient: {
                intensity: 0.
            },
            ambientCubemap: {
                exposure: 1,
                diffuseIntensity: 0.5
            }
        }
    },
    series: [{
        type: 'lines3D',
        coordinateSystem: 'mapbox',
        effect: {
            show: true,
            period:1,
            constantSpeed: 1,
            trailWidth: 1,
            trailLength: 0.1,
            trailOpacity: 1,
            spotIntensity: 4
        },
        blendMode: 'lighter',
        polyline: true,
        lineStyle: {
            width: 0.1,
            color: '#397aff',   //'rgb(200, 40, 0)',
            opacity: 0
        },
        data:myguiji
    }]
}

//myChart.setOption(mapdata);

var filechart = echarts.init(document.getElementById('filechart'));
var databasechart = echarts.init(document.getElementById('database'));
var httpemchart = echarts.init(document.getElementById('httpem'));
var sshchart = echarts.init(document.getElementById('ssh'));

filechart.setOption(fileData)
databasechart.setOption(databaseData)
httpemchart.setOption(httpemData)
sshchart.setOption(sshData)