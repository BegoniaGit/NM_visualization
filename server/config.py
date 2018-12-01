#encoding:utf-8
import pymysql
from flask import Flask




def getResponse(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
