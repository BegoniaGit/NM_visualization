


// var base_proportion_data =  {
//     visualMap: {
//         type: 'continuous',
//         min: 0,
//         max: 10,
//         inRange: {
//             color: [ '#2256a6','#a5a0aa']
//         }
//     },
//     legend: {
//
//
//         itemWidth:7,
//         itemHeight:7,
//         textStyle:{
//             fontSize: 10
//         }
//     },
//     series: {
//         type: 'sunburst',
//         data: [{
//             name: '文件',            // First tree
//             value: 10,
//             children: [{
//                 name: 'sftp传输',       // First leaf of first tree
//                 value: 4
//             }, {
//                 name: 'ftp传输',       // Second leaf of first tree
//                 value: 6
//             }]
//         }, {
//             name: '数据库',            // Second tree
//             value: 80,
//             children: [{
//                 name: 'mongdb协议',       // Son of first tree
//                 value: 20,
//
//             },
//                 {
//                     name: 'mysql协议',       // Son of first tree
//                     value: 20,
//
//                 },
//                 {
//                     name: 'tds协议',       // Son of first tree
//                     value: 20,
//
//                 },
//                 {
//                     name: 'postgresal协议',       // Son of first tree
//                     value: 20,
//
//                 }]
//         },
//             {
//                 name: 'http',            // First tree
//                 value: 10,
//
//             },
//             {
//                 name: 'email',            // First tree
//                 value: 10,
//
//             },
//             {
//                 name: 'ssh',            // First tree
//                 value: 10,
//
//             }
//         ],
//         radius: [0, '90%'],
//         label: {
//             rotate: 'radial'
//         }
//         }
//
// };

var base_proportion_data={
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
var cu_data
function update_base_proportion_chart(){

    // console.log("===========")
    // console.log(redata["proportion"]['file']['count'])
    // console.log("===========")
    //
    // let re_data=redata["proportion"]
    // cu_data=base_proportion_data['series']['data']
    //
    // base_proportion_data['series']['data'][0]['value']=re_data['file']['count']
    // base_proportion_data['series']['data'][0]['children'][0]['value']=re_data['file']['sftp']
    // base_proportion_data['series']['data'][0]['children'][1]['value']=re_data['file']['ftp']
    //
    // base_proportion_data['series']['data'][1]['value']=re_data['database']['count']
    // base_proportion_data['series']['data'][1]['children'][0]=re_data['database']['mongdb_count']
    // base_proportion_data['series']['data'][1]['children'][1]=re_data['database']['mysql_count']
    // cu_data[1]['children'][2]=re_data['database']['tds_count']
    // cu_data[1]['children'][3]=re_data['database']['postgresal_count']
    //
    // cu_data[2]['value']=re_data['http']
    // cu_data[3]['value']=re_data['email']
    // cu_data[4]['value']=re_data['ssh']
    //
    // base_proportion_data['series']['data']=cu_data
    // proportionchart.setOption(base_proportion_data)

}


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

