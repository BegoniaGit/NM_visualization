#encoding:utf-8

def _checking(data):
    model=['id','day','checkin','checkout']
    return toJson(model,data)

def _email(data):
    model=['time','proto','sip','sport','dip','dport','from','to','subject']
    return toJson(model,data)

def _login(data):
    model=['proto','dip','dport','sip','sport','state','time','user']
    return toJson(model,data)

def _tcpLog(data):
    model=['stime','dtime','proto','dip','port','sip','sport','uplink_length','downlink_length']
    return toJson(model,data)

def _weblog(data):
    model=['time','sip','sport','dip','dport','host']
    return toJson(model,data)

def toJson(model,data):
    re=[]
    for i in range(len(data)):
        model=[]
        dict={}
        for j in range(len(model)):
            dict[model[j]]=data[i][model]
        re.append(dict)
    return re