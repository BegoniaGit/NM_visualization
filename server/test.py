#encoding:utf-8
# for i in range(5):
#     print(i)
import csv
import json
import time
import re

file=open("met.csv",mode='r',encoding='utf-8-sig')
data=csv.reader(file)
he=next(data)
for d in data:
    # print(d)
    print (u"update weblog set type='{}' where host like concat('%{}%');".format(d[1],d[0]))



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

