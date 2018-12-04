#encoding:utf-8
# for i in range(5):
#     print(i)
import csv
import time

file=open("met.csv",mode='r',encoding='utf-8-sig')
data=csv.reader(file)
he=next(data)

for i in data:
    print(u"update weblog set type='{}' where host like concat('%{}%');".format(i[1],i[0]))