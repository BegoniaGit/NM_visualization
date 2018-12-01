#encoding:utf-8
import pymysql
import pojo
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response
from config import getResponse
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
    sql="select * from tcpLog where stime >=\'{}\' and stime <\'{}\'".format(pre_time,suff_time)
    curous=getCursor()
    curous.execute(sql)
    data=pojo._tcpLog(curous.fetchall())

    connectAmount=0
    rejson={}
    for p in data:
        prt=p['']

        # {
        #     "base": { // 四个基本图
        #     "file": {
        #         "upload": 128,
        #         "download": 128
        #     },
        #     "database": {
        #         "upload": 128,
        #         "download": 128
        #     },
        #     "httpem": {
        #         "upload": 128,
        #         "download": 128
        #     },
        #     "ssh": {
        #         "upload": 128,
        #         "download": 128
        #     }
        # },
        # "proportion": { // 基本图的次数分类统计换装图6
        # "file": 3,
        # "database": 1,
        # "http": 5,
        # "email": 2,
        # "ssh": 1
        # },
        # "connectcount": 12 // 当前时间段内请求次数
        # "toplace": [ // 地图经纬信息
        # {
        #     "lo": "34.434543",
        #     "la": "123.32435454"
        # }
        # ]
        #
        # "warning": {
        #     "overtime": [ // 长时间连接警告
        # ],
        # "overamount": [ // 超量连接警告
        # ]
        # }
        #
        # }
    re=getResponse(make_response(data))
    return re,200;


@app.route('/get')
def get_current_user():
    return jsonify()



if __name__ == "__main__":
    app.run(debug=True)