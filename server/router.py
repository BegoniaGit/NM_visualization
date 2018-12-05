# encoding:utf-8
import pymysql
import pojo
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response
from flask_cors import CORS
from config import getResponse, log
import crabapple as crab
import urllib

app = Flask(__name__)
CORS(app, supports_credentials=True)
db = pymysql.connect(user='root', db='hightech', passwd='123456', host='www.crabapple.xyz', port=3306, charset='utf8')


def getCursor():
    cursor = db.cursor()
    return cursor


@app.route('/tcp', methods=['POST'])
def tcplog():
    req = request
    values = req.form
    values = req.get_json()
    print(values)
    offset = int(values['offset'])
    pre_time, suff_time = crab.getTimes(str(values['day']), offset)
    log("info", pre_time + " " + suff_time)
    data = []
    while True:
        sql = "select * from tcpLog where stime >=\'{}\' and stime <\'{}\'".format(pre_time, suff_time)
        curous = getCursor()
        curous.execute(sql)
        data = pojo._tcpLog(curous.fetchall())
        print(data)
        if len(data) > 0:
            break
        offset += 1
        pre_time, suff_time = crab.getTimes(str(values['day']), offset)

    web_data_statistc = []
    sql = "select type,count(*) from weblog where time >=\'{}\' and time <\'{}\' group by type".format(pre_time,
                                                                                                       suff_time)
    curous = getCursor()
    curous.execute(sql)
    web_data_temp = (curous.fetchall())
    for p in web_data_temp:
        if p[0] != None:
            web_data_statistc.append({"type": p[0], "count": p[1]})
        else:
            web_data_statistc.append({"type": "请求失败", "count": p[1]})

    base_file_upload = 0
    base_file_download = 0
    base_database_upload = 0
    base_database_download = 0
    base_http_upload = 0
    base_http_download = 0
    base_email_upload = 0
    base_email_download = 0
    base_ssh_upload = 0
    base_ssh_download = 0
    proportion_file = 0
    proportion_database = 0
    proportion_http = 0
    proportion_email = 0
    proportion_ssh = 0
    warning_overamount_count = 0
    warning_overtime_count = 0
    sftp_count=0
    ftp_count=0
    mongdb_count=0
    mysql_count=0
    tds_count=0
    postgresal_count=0
    connectcount = len(data)
    toplace = []
    warning_overtime = []
    warning_overamount = []
    lola_smtps = []
    lola_http = []
    lola_ssh = []
    lola_sftp = []
    lola_database = []
    local_lo, local_la = '104.69588', '31.53709'
    model = ['stime', 'dtime', 'proto', 'dip', 'port', 'sip', 'sport', 'uplink_length', 'downlink_length']
    for p in data:

        toplace.append({'coords': [[local_lo, local_la], [p['lo'], p['la']]]})

        if p['over_time'] == 1:
            warning_overtime.append(
                {"sip": p['sip'], "tip": p['dip'], "overtime": 123, "country": p['country'], "city": p['city']})
            warning_overtime_count += 1
        if p['over_amount'] != 0:
            if p['over_amount'] == 1:
                warning_overamount.append(
                    {"sip": p['sip'], "tip": p['dip'], "type": "uplink", "overamount": p['uplink_length'],
                     "country": p['country'], "city": p['city']})
            else:
                warning_overamount.append({"sip": p['sip'], "tip": p['dip'], "type": "downlink",
                                           "overamount": p['downlink_length', "country":p['country'],
                                                         "city":p['city']]})
            warning_overamount_count += 1

        proto = p['proto']
        if proto == 'smtps':
            base_email_upload += int(p['uplink_length']/ (1000000))
            base_email_download += int(p['downlink_length']/ (1000000))
            proportion_email += 1


        elif proto == 'http':
            base_http_upload += int(p['uplink_length']/ (1000000))
            base_http_download += int(p['downlink_length']/ (1000000))
            proportion_http += 1


        elif proto == 'ssh':
            base_ssh_upload += int(p['uplink_length']/ (1000000))
            base_ssh_download += int(p['downlink_length']/ (1000000))
            proportion_ssh += 1


        elif proto == 'sftp' or proto == 'ftp':
            base_file_upload += int(p['uplink_length'] / (1000000))
            base_file_download += int(p['downlink_length'] / (1000000))
            proportion_file += 1
            if proto == 'sftp':
                sftp_count+=1
            else:ftp_count+=1


        else:
            base_database_upload += int(p['uplink_length']/ (1000000))
            base_database_download += int(p['downlink_length']/ (1000000))
            proportion_database += 1
            if proto=='mongdb':
                mongdb_count+=1
            elif proto=='mysql':
                mysql_count+=1
            elif proto=='tds':
                tds_count+=1
            else:
                postgresal_count+=1

    print(p['uplink_length'])

    rejson = {
        "offset": offset,
        "base": {  # 四个基本图
            "file": {
                "upload": base_file_upload,
                "download": base_file_download
            },
            "database": {
                "upload": base_database_upload,
                "download": base_database_download
            },
            "httpem": {
                "upload": base_http_upload + base_email_upload,
                "download": base_http_download + base_email_download
            },
            "ssh": {
                "upload": base_ssh_upload,
                "download": base_ssh_download
            }
        },
        "proportion": {  # 基本图的次数分类统计换装图6
            "file": {
                "count":proportion_file,
                "sftp":sftp_count,
                "ftp":ftp_count
            },
            "database": {
                "count":proportion_database,
                "mongdb_count":mongdb_count,
                "mysql_count":mysql_count,
                "tds_count":tds_count,
                "postgresal_count":postgresal_count
            },
            "http": proportion_http,
            "email": proportion_email,
            "ssh": proportion_ssh
        },
        "connectcount": connectcount,  # 当前时间段内请求次数
        "toplace": toplace,  # 地图经纬信息

        "warning": {
            "overtime": warning_overtime,  # 长时间连接警告
            "overamount": warning_overamount  # 超量连接警告
        },

        # 网站分布统计
        "web_statistc": web_data_statistc
    }

    res = getResponse(make_response(str(rejson).replace("\'", "\"")))
    res.headers['Access-Control-Allow-Origin'] = "*"
    res.headers['Content-Type'] = "application/json;charset=utf-8"
    return res, 200;


@app.route('/get')
def get_current_user():
    return jsonify()


if __name__ == "__main__":
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
