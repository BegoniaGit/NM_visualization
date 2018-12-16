# encoding:utf-8
# for i in range(5):
#     print(i)
import csv
import json
import time
import re

# file=open("met.csv",mode='r',encoding='utf-8-sig')
# data=csv.reader(file)
# he=next(data)
# for d in data:
#     # print(d)
#     print (u"update weblog set type='{}' where host like concat('%{}%');".format(d[1],d[0]))
#


#
# str=re.findall(u'\.\w+\.',"www.jd.com")
# print(str)
# print(str[0][1:len(str[0])-1])

# text=str(sorted({'a':1,'c':4}.items(), key=lambda x: x[1], reverse=True))
# print(text)
#
# elecShop = text.replace('[(','{').replace(')]','}').replace('\',','\':').replace('(','').replace(')','')
# print(elecShop)
# dict=eval(elecShop)
# print(dict)


#
# def tur_convert_list(data):
#     return data.replace("((","").replace(",))","").replace("(","").replace(",)","").replace("\'","")
# data=str((('电商',), ('邮箱',), ('科技',), ('直播',), ('办公',)))
#
#
# print(tur_convert_list(data).strip(',').split(','))

import pymysql
from DBUtils.PooledDB import PooledDB

db_config = {"host": "localhost",
             "port": 3306,
             "user": "root",
             "passwd": "123456",
             "db": "hightech",
             "charset": "utf8"
             }
spool = PooledDB(pymysql, 10, **db_config)
def connect_myssql(SQL):
    conn = spool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接
    cur = conn.cursor()
    cur.execute(SQL)
    re = cur.fetchall()
    cur.close()
    conn.close()
    return re
for i in range(10):
    print(connect_myssql("select * from email limit {}".format(i)))