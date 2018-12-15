day_select = document.getElementById('day_select')
time_select = document.getElementById('time_select')
class_select = document.getElementById('class_select')
detail_select = document.getElementById('detail_select')

for (let i = 1; i < 31; i++) {
    day_select.options.add(new Option("第"+i+"天",i%5==0?5:i%5));
}

for (let i = 31; i < 126; i++) {

    time_select.options.add(new Option(offset_to_time(i), i));
}

// class_data={
//     kye_file:"文件",
//     kye_database:'数据库',
//     kye_ssh:"SSH交互",
//     kye_http_email:"用户上网"
// }
//
// for(let key in class_data)
//     class_select.options.add(new Option(class_data[key],key))

let select_choice_day=1
function change_day_select(){
    let index=day_select.selectedIndex;
    select_choice_day=day_select.options[index].value;


}
let select_choice_offset=31
function change_time_select(){

    let index=time_select.selectedIndex;
    select_choice_offset=time_select.options[index].value;

}
function change_class_select(){

}

function dynamic(){
    isPost=setInterval(loadXMLDoc,interval_time)
}

function dynamic_pause(){
    clearInterval(isPost);
}

function choice_dynamic(){
    req_day=select_choice_day;
    req_offset=select_choice_offset;
}

function back_time() {
    interval_time-=500
}
function over_time() {
    interval_time+=500
}