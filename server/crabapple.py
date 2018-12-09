
#时间前缀
time_for='2017-11-{} {}:00'
def getTimes(day,offset):
    if len(day) < 2:
        day = '0' + day
    hour = int((int(offset)/ 6) + 2)
    if len(str(hour)) < 2:
        hour = '0' + str(hour)
    minu = str(int(offset) % 6 * 10)
    if len(minu) < 2:
        minu = '0' + minu
    pre_time = str(hour) + ":" + str(minu)
    if int(minu) >= 50:
        minu = "00"
        hour = str(int(hour) + 1)
        if len(hour) < 2:
            hour = "0" + hour
    else:
        minu = int(minu) +10
    suff_time = str(hour) + ":" + str(minu)
    return time_for.format(day,pre_time),time_for.format(day,suff_time)

def getOneHour(day,offset):
    if int(day)<10:
        day="0"+str(day)

    hour=int(offset/6)+2;
    pre_time=''
    suff_time=''
    if hour<10:
        pre_time="0"+str(hour)+":00"

    else:
        pre_time=str(hour)+":00"

    if hour + 1 < 10:
        suff_time = "0" + str(hour + 1) + ":00"
    else:
        suff_time = str(hour + 1) + ":00"
    return time_for.format(day,pre_time),time_for.format(day,suff_time)

print(getOneHour(1,6))

#字典排序
def dictSort(dict):
    return eval(str(sorted(dict.items(), key=lambda x: x[1], reverse=True))
                .replace('[(', '{')
                .replace(')]', '}')
                .replace('\',', '\':')
                .replace('(', '')
                .replace(')', ''))
