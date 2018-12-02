#encoding:utf-8
import pymysql
import pojo
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response
from config import getResponse,log
import crabapple as crab
import urllib
app=Flask(__name__)

db = pymysql.connect(user='root',db='hightech',passwd='123456',host='www.crabapple.xyz',port=3306,charset='utf8')

def getCursor():
	cursor = db.cursor()
	return cursor


@app.route('/tcp',methods=['POST'])
def tcplog():
    req=request
    values=req.form
    pre_time,suff_time=crab.getTimes(values['day'],values['offset'])
    log("info",pre_time+" "+suff_time)
    sql="select * from tcpLog where stime >=\'{}\' and stime <\'{}\'".format(pre_time,suff_time)
    curous=getCursor()
    curous.execute(sql)
    data=pojo._tcpLog(curous.fetchall())

    base_file_upload=0
    base_file_download = 0
    base_database_upload = 0
    base_database_download = 0
    base_http_upload = 0
    base_http_download = 0
    base_email_upload = 0
    base_email_download = 0
    base_ssh_upload = 0
    base_ssh_download = 0
    proportion_file=0
    proportion_database=0
    proportion_http=0
    proportion_email=0
    proportion_ssh=0
    connectcount=len(data)
    toplace=[]
    warning_overtime=[]
    warning_overamount=[]
    model = ['stime', 'dtime', 'proto', 'dip', 'port', 'sip', 'sport', 'uplink_length', 'downlink_length']
    for p in data:

        toplace.append({"lo":p['lo'],"la":p['la']})
        if p['over_time']=='1':
            warning_overtime.append({"toip":p['dip']})
        if p['over_amount']!='0':
            if p['over_amount']=='1':
                warning_overamount.append({"toip": p['dip'],"type":"uplink","overamount":p['uplink_length']})
            else:
                warning_overamount.append({"toip": p['dip'],"type":"downlink","overamount":p['downlink_length']})

        proto=p['proto']
        if proto == 'smtps':
            base_email_upload += int(p['uplink_length'])
            base_email_download += int(p['downlink_length'])
            proportion_email += 1

        elif proto == 'http':
            base_http_upload += int(p['uplink_length'])
            base_http_download += int(p['downlink_length'])
            proportion_http += 1
        elif proto == 'ssh':
            base_ssh_upload += int(p['uplink_length'])
            base_ssh_download += int(p['downlink_length'])
            proportion_ssh += 1
        elif proto=='sftp' or proto=='ftp':
            base_file_upload+=int(p['uplink_length'])
            base_file_download+=int(p['downlink_length'])
            proportion_file+=1
        else:
            base_database_upload += int(p['uplink_length'])
            base_database_download += int(p['downlink_length'])
            proportion_database += 1

    rejson={
                "base": {                            #四个基本图
                    "file": {
                        "upload": base_file_upload,
                        "download": base_file_download
                    },
                    "database": {
                        "upload": base_database_upload,
                        "download": base_database_download
                    },
                    "httpem": {
                        "upload": base_http_upload+base_email_upload,
                        "download": base_http_download+base_email_download
                    },
                    "ssh": {
                        "upload": base_ssh_upload,
                        "download": base_ssh_download
                    }
                },
                "proportion": {                     #基本图的次数分类统计换装图6
                    "file": proportion_file,
                    "database": proportion_database,
                    "http": proportion_http,
                    "email": proportion_email,
                    "ssh": proportion_ssh
                },
                "connectcount":connectcount,                    #当前时间段内请求次数
                "toplace": toplace,                          #地图经纬信息

                "warning": {
                       "overtime": warning_overtime,                  #长时间连接警告
                       "overamount":warning_overamount                 #超量连接警告
                   }
            }

    res=getResponse(make_response(str(rejson).replace("\'","\"")))
    return res,200;


@app.route('/get')
def get_current_user():
    return jsonify()



if __name__ == "__main__":
    app.run(debug=True)