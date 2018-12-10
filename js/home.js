/**
 * 基本文字信息展示
 * @type {number}
 */
//总连接量
var connectcount_total=0

//上行总量
var uplink_amount_count=0

//下行总量
var downlink_amount_count=0



//邮箱广告诈骗威胁
//总数
var email_risk_count=0
//详情记录
var email_risk_msg=[]

//非工作网站上网请求
var not_worknet_count=0
//异常超时连接
//总数
var overtime_count=0
//详情
var overtime_msg=[]

//异常流量
//总数
var overamount_count=0
//详情
var overtime_msg=[]

/**
 * 获取对象
 * @type {HTMLElement}
 */
el_connectcount_total=document.getElementById('connectcount_total')
el_uplink_amount_count=document.getElementById('uplink_amount_count')
el_downlink_amount_count=document.getElementById('downlink_amount_count')
el_email_risk_count=document.getElementById('email_risk_count')
el_not_worknet_count=document.getElementById('not_worknet_count')
el_overtime_count=document.getElementById('overtime_count')
el_overamount_count=document.getElementById('overamount_count')


/**
 * 更新连接基本信息和超时超量连接信息
 */
function update_base_net_info(){
    el_connectcount_total.innerText=connectcount_total
    el_uplink_amount_count.innerText=uplink_amount_count
    el_downlink_amount_count.innerText=downlink_amount_count
    el_overtime_count=document.innerText=overtime_count
    el_overamount_count=document.innerText=overamount_count
}

/**
 * 更新email广告危险和非与工作相关网站的访问统计
 */
function update_email_notwork_warning(){
    el_email_risk_count.innerText=email_risk_count
    el_not_worknet_count.innerText=not_worknet_count
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

/**
 * 时间记录
 * @type {number}
 */
var req_day=1
var req_offset=0

/**
 * 更新时间
 * @param offset
 */
function update_req_time(offset){
    if(offset!=define||offset!=null)
        req_offset=(offset+1)
    else req_offset++
    if(req_offset>125){
        req_offset=0
        req_day++
    }
}

/**
 * 数据操纵
 */
function loadXMLDoc()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            redata=JSON.parse(xmlhttp.responseText);
            mapdata['series'][0]['data']=redata['toplace'];
            myChart.setOption(mapdata);
            console.log(redata)
            console.log(redata['toplace'])

            updateTimeArray(offset-1)

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
    }




    xmlhttp.open("POST","http://127.0.0.1:5000/tcp",true);
    xmlhttp.setRequestHeader('Content-Type','application/json')
    xmlhttp.send(JSON.stringify({"day":1,"offset":req_offset}));
    req_offset
    // setTimeout(loadXMLDoc, 4000);
}

loadXMLDoc()


window.onload = function() {
    var show = document.getElementById("show");
    setInterval(function() {
        var time = new Date();   // 程序计时的月从0开始取值后+1
        var m = time.getMonth() + 1;
        var t = time.getFullYear() + "-" + m + "-"
            + time.getDate() + " " + time.getHours() + ":"
            + time.getMinutes() + ":" + time.getSeconds();
        show.innerHTML = t;
    }, 1000);
};




