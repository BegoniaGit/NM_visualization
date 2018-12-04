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
    fileData['xAxis'][0]['data']=timeArray
    databaseData['xAxis'][0]['data']=timeArray
    httpemData['xAxis'][0]['data']=timeArray
    sshData['xAxis'][0]['data']=timeArray

}
/**
 * offset转 时,分
 */
function offsetToTime(offset) {

    hour = parseInt(offset / 6) + 2
    minu = offset % 6 * 10

    return hour + ":" + minu

}
