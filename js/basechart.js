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
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
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

