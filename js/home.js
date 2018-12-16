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
var interval_time=3000

//循环执行
var isPost
var isEmailPost
var isWebPost

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
    overtime_count+=(redata['warning']['overtime'].length)
    overamount_count+=(redata['warning']['overamount'].length)

    el_connectcount_total.innerText = connectcount_total+"次"
    el_uplink_amount_count.innerText = number_simplify (uplink_amount_count)
    el_downlink_amount_count.innerText = number_simplify (downlink_amount_count)
    el_email_risk_count.innerText = email_risk_count
    el_not_worknet_count.innerText = not_worknet_count
    el_overtime_count.innerText = overtime_count
    el_overamount_count.innerText = overamount_count
}

/**
 * 由于统计数字太长,按长度进行单位变化
 */
function number_simplify (num) {
    num = parseInt(num / 8);
    res = 'B'

    if (num.toString().length > 4) {
        num = parseInt(num / 1024)
        res = 'KB'
    }
    if (num.toString().length > 4) {
        num = parseInt(num / 1024)
        res = 'MB'
    }
    if (num.toString().length > 4) {
        num = parseInt(num / 1024)
        res = 'GB'
    }
    if (num.toString().length > 4) {
        num = parseInt(num / 1024)
        res = 'TB'
    }
    return num+res;
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

            update_network_traffic_warning_chart()
            update_base_proportion_chart()
            update_base_net_info()
            update_network_hot_chart()
        }
    }


    xmlhttp.open("POST", "http://127.0.0.1:5000/tcp", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
    xmlhttp.send(JSON.stringify({"day": req_day, "offset": req_offset}));

}
    isPost=setInterval(loadXMLDoc,interval_time)


/**
 * 网页统计请求数据全局变量
 */
function loadeweb() {
    let xmlhttpweb;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttpweb = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttpweb = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttpweb.onreadystatechange = function () {
        if (xmlhttpweb.readyState == 4 && xmlhttpweb.status == 200) {
            popdata = JSON.parse(xmlhttpweb.responseText);
            console.log(popdata)
            not_worknet_count+=parseInt(popdata["warning"]["total"])
            update_web_category_pop_chart(popdata["statistics"])
            update_words_proportion_chart(popdata["warning"]["statistics"])


        }
    }

    xmlhttpweb.open("POST", "http://127.0.0.1:5000/web/behavior", true);
    xmlhttpweb.setRequestHeader('Content-Type', 'application/json')
    xmlhttpweb.send(JSON.stringify({"day": req_day, "offset": req_offset}));
}

isWebPost=setInterval(loadeweb,interval_time*2+3000)

function loadEmail() {
    let httpemil;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        httpemil = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        httpemil = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpemil.onreadystatechange = function () {
        if (httpemil.readyState == 4 && httpemil.status == 200) {
            re_email = JSON.parse(httpemil.responseText);
            email_risk_count+=parseInt(re_email['count'])


        }
    }


    httpemil.open("POST", "http://127.0.0.1:5000/email/risk", true);
    httpemil.setRequestHeader('Content-Type', 'application/json')
    httpemil.send(JSON.stringify({"day": req_day, "offset": req_offset}));

}
isEmailPost=setInterval(loadEmail,interval_time*2+1000)