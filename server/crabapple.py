
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