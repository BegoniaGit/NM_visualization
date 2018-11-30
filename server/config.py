#encoding:utf-8
import pymysql
from flask import Flask

app=Flask(__name__)
db = pymysql.connect(user='root',db='hightech',passwd='123456',host='www.crabapple.xyz',port=3306,charset='utf8')

def getCursor():
	cursor = db.cursor()
	return cursor

def getResponse(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
