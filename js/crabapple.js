//自定义方法


/**
 * 更新时间坐标
 */
function updateTimeArray(offset) {


    for (let j = 0; j < timeArray.length - 1; j++) {
        timeArray[j] = timeArray[j + 1]
    }
    timeArray[timeArray.length - 1] = offsetToTime(offset);

    console.log(timeArray)
    fileData['xAxis'][0]['data'] = timeArray
    databaseData['xAxis'][0]['data'] = timeArray
    httpemData['xAxis'][0]['data'] = timeArray
    sshData['xAxis'][0]['data'] = timeArray

}

/**
 * offset转 时,分
 */
function offsetToTime(offset) {

    hour = parseInt(offset / 6) + 2
    minu = offset % 6 * 10

    return hour + ":" + minu

}

function offset_to_time(offset) {
    let start_hour = Math.floor(((offset) / 6) + 2)
    let start_minu = offset % 6 * 10
    let end_hour = start_hour
    let end_minu = start_minu + 10
    if (end_minu == 60) {
        end_minu = 0
        end_hour++
    }
    start_hour = start_hour.toString()
    start_minu = start_minu.toString()
    end_hour = end_hour.toString()
    end_minu = end_minu.toString()
    start_hour = start_hour.length < 2 ? '0' + start_hour : start_hour
    start_minu = start_minu.length < 2 ? '0' + start_minu : start_minu
    end_hour = end_hour.length < 2 ? '0' + end_hour : end_hour
    end_minu = end_minu.length < 2 ? '0' + end_minu : end_minu
    return start_hour + ":" + start_minu + "--" + end_hour + ":" + end_minu
}


/**
 * 更新时间
 * @param offset
 */
let el_show_time=document.getElementById("map_time")
function update_req_time(offset) {

    //更新展示时间
    el_show_time.innerHTML=req_day+'日'+' '+offset_to_time(offset)

    req_offset = (parseInt(offset))
    if (req_offset > 125) {
        req_offset = 31
        req_day++
    }
    req_offset++
}

/**
 * 时间展示函数
 */
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

