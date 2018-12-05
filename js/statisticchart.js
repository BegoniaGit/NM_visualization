


var base_proportion_data = {
    series: [{
        type: 'treemap',
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
        ]
    }]}

base_proportion_data =  {
    visualMap: {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
            color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
        }
    },
    series: {
        type: 'sunburst',
        data:  [{
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
function update_base_proportion_data(da){

}
var words_proportion_data = {
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        width: 600,
        height: 400,
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
                name: '科技',
                value: 2
            },
            {
                name: '新闻',
                value: 12
            },
            {
                name: '娱乐',
                value: 7
            },
            {
                name: '综合',
                value: 6
            },
            {
                name: '搜索',
                value: 1
            }
        ]
    } ]
};

var words_proportion = echarts.init(document.getElementById('wordsproportion'));
words_proportion.setOption(words_proportion_data);

