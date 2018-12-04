
//基本信息图参数设置

timeArray=['','','','','','','']

var fileData = {
    title: {
        text: '文件流量/MB'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['文件流量上行','文件流量下行']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['','','','','','','']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'文件流量上行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        },
        {
            name:'文件流量下行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        }
    ]
};


var databaseData={
    title: {
        text: '数据库流量'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['数据库流量上行','数据库流量下行']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['','','','','','','']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'数据库流量上行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        },
        {
            name:'数据库流量下行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

var httpemData={
    title: {
        text: 'HTTP传输流量'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['HTTP上行','HTTP下行']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['','','','','','','']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'HTTP流量上行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        },
        {
            name:'HTTP流量下行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

var sshData={
    title: {
        text: 'SSH命令流量'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['SSH命令流量上行','SSH命令流量下行']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['','','','','','','']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'SSH命令流量上行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        },
        {
            name:'SSH命令流量下行',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

