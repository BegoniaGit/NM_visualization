#encoding:utf-8
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response
import pymysql
from config import
import urllib

app=Flask(__name__)
db = pymysql.connect(user='root',db='begonia',passwd='123456',host='www.crabapple.xyz',port=3306,charset='utf8')

def con_db():
	cursor = db.cursor()
	return cursor


@app.route('/tcplog',methods=['GET','POST'])
def tcplog():
    body=request
    proto=body['proto']
    time=body['time']
    sql=u"select * from tcpLog where proto='{}' and stime like concat({}%)".format(proto,time)
    curous=db.
    return jsonify("hhh"),500;


@app.route('/get')
def get_current_user():
    return jsonify()



if __name__ == "__main__":
    app.run(debug=True)