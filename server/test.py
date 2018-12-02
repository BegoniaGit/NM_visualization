#encoding:utf-8
# for i in range(5):
#     print(i)
import time

a={}
b={"f":666}
a["a"]=1
a["a"]=2
a["a2"]=b
a["a2"]["f"]=555
print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))