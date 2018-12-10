day_select = document.getElementById('day_select')
time_select = document.getElementById('time_select')
class_select = document.getElementById('class_select')
detail_select = document.getElementById('detail_select')

for (let i = 1; i < 31; i++) {
    day_select.options.add(new Option("第"+i+"天",i));
}

for (let i = 0; i < 126; i++) {

    time_select.options.add(new Option(offset_to_time(i), i));
}

class_data={
    kye_file:"文件",
    kye_database:'数据库',
    kye_ssh:"SSH交互",
    kye_http_email:"用户上网"
}

for(let key in class_data)
    class_select.options.add(new Option(class_data[key],key))

function change_day_select(){

}
function change_time_select(){

}
function change_class_select(){

}