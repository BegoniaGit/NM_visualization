/**
 * 基本文字信息展示
 * @type {number}
 */
//总连接量
var connectcount_total = 0

//上行总量
var uplink_amount_count = 0

//下行总量
var downlink_amount_count = 0


//邮箱广告诈骗威胁
//总数
var email_risk_count = 0
//详情记录
var email_risk_msg = []

//非工作网站上网请求
var not_worknet_count = 0
//异常超时连接
//总数
var overtime_count = 0
//详情
var overtime_msg = []

//异常流量
//总数
var overamount_count = 0
//详情
var overtime_msg = []

//基本图返回数据
var redata

//请求周期
var interval_time=5000

//循环执行
var isPost

/**
 * 获取对象
 * @type {HTMLElement}
 */
el_connectcount_total = document.getElementById('connectcount_total')
el_uplink_amount_count = document.getElementById('uplink_amount_count')
el_downlink_amount_count = document.getElementById('downlink_amount_count')
el_email_risk_count = document.getElementById('email_risk_count')
el_not_worknet_count = document.getElementById('not_worknet_count')
el_overtime_count = document.getElementById('overtime_count')
el_overamount_count = document.getElementById('overamount_count')


/**
 * 更新连接基本信息和超时超量连接信息
 */
function update_base_net_info() {

    let base_info = redata["base"];
    connectcount_total += parseInt(redata["connectcount"])
    uplink_amount_count += (
        base_info['file']['upload']+
        base_info['database']['upload']+
        base_info['http']['upload']+
        base_info['email']['upload']+
        base_info['ssh']['upload']
    )
    downlink_amount_count += (
        base_info['file']['download']+
        base_info['database']['download']+
        base_info['http']['download']+
        base_info['email']['download']+
        base_info['ssh']['download']
    )
    overtime_count=(redata['warning']['overtime'].length)
    overamount_count=(redata['warning']['overamount'].length)

    el_connectcount_total.innerText = connectcount_total
    el_uplink_amount_count.innerText = uplink_amount_count
    el_downlink_amount_count.innerText = downlink_amount_count
    el_email_risk_count.innerText = email_risk_count
    el_not_worknet_count.innerText = not_worknet_count
    el_overtime_count.innerText = overtime_count
    el_overamount_count.innerText = overamount_count
}

/**
 * 更新email广告危险和非与工作相关网站的访问统计
 */
function update_email_notwork_warning() {
    el_email_risk_count.innerText = email_risk_count
    el_not_worknet_count.innerText = not_worknet_count
}


/**
 * 时间记录
 * @type {number}
 */
var req_day = 1
var req_offset = 31


/**
 * 数据操纵
 */
function loadXMLDoc() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            redata = JSON.parse(xmlhttp.responseText);
            mapdata['series'][0]['data'] = redata['toplace'];
            myChart.setOption(mapdata);

            updateTimeArray(req_offset)
            updateBaseChart()

            update_req_time(redata['offset'])


            update_base_proportion_chart()
            update_base_net_info()
        }
    }


    xmlhttp.open("POST", "http://127.0.0.1:5000/tcp", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
    xmlhttp.send(JSON.stringify({"day": req_day, "offset": req_offset}));
    // setTimeout(loadXMLDoc, interval_time);
}
    isPost=setInterval(loadXMLDoc,interval_time)


function loadeweb() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            redata = JSON.parse(xmlhttp.responseText);
            mapdata['series'][0]['data'] = redata['toplace'];
            myChart.setOption(mapdata);

            updateTimeArray(req_offset)
            updateBaseChart()

            update_req_time(redata['offset'])


            update_base_proportion_chart()
            update_base_net_info()
        }
    }


    xmlhttp.open("POST", "http://127.0.0.1:5000/tcp", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
    xmlhttp.send(JSON.stringify({"day": req_day, "offset": req_offset}));
    // setTimeout(loadXMLDoc, interval_time);
}





