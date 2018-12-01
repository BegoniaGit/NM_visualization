#encoding:utf-8
from flask import Flask, request, render_template, jsonify, send_from_directory, make_response
from config import getCursor
import urllib
app=Flask(__name__)

curous=getCursor


@app.route('/tcplog',methods=['GET','POST'])
def tcplog():
    body=request
    proto=body['proto']
    time=body['time']
    sql=u"select * from tcpLog where proto='{}' and stime like concat({}%)".format(proto,time)
    re=curous.execute(sql).fetchAll()

    return jsonify("hhh"),500;


@app.route('/get')
def get_current_user():
    return jsonify()



if __name__ == "__main__":
    app.run(debug=True)