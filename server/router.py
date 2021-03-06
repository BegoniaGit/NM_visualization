# encoding:utf-8

#外部文件引入
import pojo
import crabapple as crab
from config import getResponse, log

#依赖模块
import re
import pymysql
from flask_cors import CORS
from DBUtils.PooledDB import PooledDB
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response

app = Flask(__name__)
CORS(app, supports_credentials=True)

#db_config = {"host": "localhost",
             #"port": 3306,
            # "user": "root",
             #"passwd": "123456",
             #"db": "hightech",
            # "charset": "utf8"
            # }
db_config = {"host": "220.166.61.4",
             "port": 9906,
             "user": "root",
             "passwd": "Gssc123",
             "db": "sys",
             "charset": "utf8"
             }

spool = PooledDB(pymysql, 10, **db_config)
def exe(SQL):
    conn = spool.connection()
    cur = conn.cursor()
    cur.execute(SQL)
    re = cur.fetchall()
    cur.close()
    conn.close()
    return re

@app.route('/tcp', methods=['POST'])
def tcplog():
    req = request
    values = req.form
    values = req.get_json()
    offset = int(values['offset'])
    pre_time, suff_time = crab.getTimes(str(values['day']), offset)
    log("INFO","/tcp"+ pre_time + " " + suff_time)
    data = []
    while True:
        sql = u"select * from tcplog where stime >='{}' and stime <'{}'".format(pre_time, suff_time)

        data = pojo._tcpLog(exe(sql))

        if len(data) > 0:
            break
        offset += 1
        pre_time, suff_time = crab.getTimes(str(values['day']), offset)

    web_data_statistc = []
    sql = u"select type,count(*) from weblog where time >='{}' and time <'{}' group by type".format(pre_time,suff_time)
    web_data_temp = (exe(sql))
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
    sftp_count = 0
    ftp_count = 0
    mongdb_count = 0
    mysql_count = 0
    tds_count = 0
    postgresal_count = 0
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

        if p['city'] == None:
            p['city'] = 'None'
        if p['over_time'] == '1':
            warning_overtime.append(
                {"sip": p['sip'], "tip": p['dip'],"category":p['category'], "overtime": 123, "country": p['country'], "city": p['city']})
            warning_overtime_count += 1
        if p['over_amount'] != '0':
            if p['over_amount'] == '1':
                warning_overamount.append(
                    {"sip": p['sip'], "tip": p['dip'],"category":p['category'], "type": "uplink", "overamount": p['uplink_length'],
                     "country": p['country'],"city": p['city']})
            else:
                warning_overamount.append({"sip": p['sip'],"category":p['category'], "tip": p['dip'], "type": "downlink",
                                           "overamount": p['downlink_length'], "country": p['country'],
                                           "city": p['city']})
            warning_overamount_count += 1

        proto = p['proto']
        if proto == 'smtp':
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


        elif proto == 'sftp' or proto == 'ftp':
            base_file_upload += int(p['uplink_length'])
            base_file_download += int(p['downlink_length'])
            proportion_file += 1
            if proto == 'sftp':
                sftp_count += 1
            else:
                ftp_count += 1


        else:
            base_database_upload += int(p['uplink_length'])
            base_database_download += int(p['downlink_length'])
            proportion_database += 1
            if proto == 'mongdb':
                mongdb_count += 1
            elif proto == 'mysql':
                mysql_count += 1
            elif proto == 'tds':
                tds_count += 1
            else:
                postgresal_count += 1


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
            "http": {
                "upload": base_http_upload,
                "download": base_http_download
            },
            "email": {
                "upload": base_email_upload,
                "download": base_email_download
            },
            "ssh": {
                "upload": base_ssh_upload,
                "download": base_ssh_download
            }
        },
        "proportion":
            [{
                "name": '文件',
                "value": proportion_file,
                "children": [{
                    "name": 'sftp传输',
                    "value": sftp_count
                }, {
                    "name": 'ftp传输',

                    "value": ftp_count
                }]
            }, {
                "name": '数据库',
                "value": proportion_database,
                "children": [{
                    "name": 'mongdb协议',
                    "value": mongdb_count,
                    },
                    {
                        "name": 'mysql协议',
                        "value": mysql_count,
                    },
                    {
                        "name": 'tds协议',
                        "value": tds_count,
                    },
                    {
                        "name": 'postgresal协议',
                        "value": postgresal_count,
                    }]
            },
                {
                    "name": 'http',
                    "value": proportion_http,
                },
                {
                    "name": 'email',
                    "value": proportion_email,
                },
                {
                    "name": 'ssh',
                    "value": proportion_ssh,
                }
            ],
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
    return res, 200;


@app.route('/web/behavior', methods=['POST'])
def webBehavior():
    req = request
    values = req.get_json()
    offset = int(values['offset'])
    pre_time, suff_time = crab.getOneHour(str(values['day']), offset)
    log("INFO", "/web/behavior" + pre_time + " " + suff_time)
    sql = "select * from weblog where time >='{}' and time <'{}'".format(pre_time, suff_time)
    data = pojo._weblog(exe(sql))
    warning = [];

    statistics = {}
    elecShop = {}
    live = {}
    game = {}
    total = 0;
    for p in data:
        type = p['type']
        if not type == None:
            if not type in statistics.keys():
                statistics[type] = 1
            else:
                statistics[type] += 1

        if type == '直播' or type == '电商' or type == '游戏':
            strs = re.findall(u'\.\w+\.', p['host'])
            total+=1
            p['host']
            try:
                p['host'] = (strs[0][1:len(strs[0]) - 1])
            except:
                p['host'] = 'othor'
            name = p['host']
            if type == '直播':
                if name in live:
                    live[name] += 1
                else:
                    live[name] = 1
            if type == '电商':
                if name in elecShop:
                    elecShop[name] += 1
                else:
                    elecShop[name] = 1
            if type == '游戏':
                if name in game:
                    game[name] += 1
                else:
                    game[name] = 1
            warning.append(p)
    elecShop = crab.dictSort(elecShop)
    statistics = crab.dictSort(statistics)
    rejson = {
        "statistics": statistics,
        "warning": {
            "total":total,
            "statistics": {
                "elecShop": elecShop,
                "live": live,
                "game": game
            },
            "base": warning
        }
    }
    res = getResponse(make_response(str(rejson).replace("\'", "\"")))
    res.headers['Content-Type'] = "application/json;charset=utf-8"
    return res, 200


@app.route('/email/risk', methods=['POST'])
def emailBehavior():
    req = request
    values = req.get_json()
    offset = int(values['offset'])
    pre_time, suff_time = crab.getOneHour(str(values['day']), offset)
    log("INFO", "/email/risk" + pre_time + " " + suff_time)
    sql = "select count(*) from email where risk='1' and time >='{}' and time <'{}'".format(pre_time, suff_time)
    count=(crab.tur_convert_list(exe(sql)))[0];
    rejson={
        "count":count
    }
    res = getResponse(make_response(str(rejson).replace("\'", "\"")))
    return res, 200


if __name__ == "__main__":
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=False)
