create_time：2018年11月17日 14点14分


数据可视化课程作业设计。



=================目录====================
/				                #root
/config				            #配置文件
/css				            #样式文件
/data				            #数据文件
/js				                #js文件
	/native_libraries		    #js原生库
/project_design				    #设计过程原文件
/test				            #测试文件夹
/home.html			            #主页
========================================

问题:
1.用户考勤表关联性。
2.时间轴加载基本信息。
3.威胁识别： 1、分组统计不同类型连接的连接时长，特长时间连接的数据识别为威胁。
            mysql> select distinct(dtime-stime) as time,count(*) from tcpLog where proto="ssh" group by time;
            +-------------+----------+
            | time        | count(*) |
            +-------------+----------+
            |    0.000000 |        3 |
            |    2.000000 |        3 |
            |    3.000000 |        2 |
            |    4.000000 |        4 |
            |    5.000000 |        2 |
            |   10.000000 |     3367 |
            |   50.000000 |      704 |
            | 4050.000000 |       14 |
            +-------------+----------+
            2、分组统计不同类型连接的数据上行和下行流量，特大流量数据识别为警告或威胁。
            select distinct(downlink_length) as time,count(*) from tcpLog where proto="ssh" group by time order by time asc limit 5;
            +------+----------+
            | time | count(*) |
            +------+----------+
            |    4 |        1 |
            |    6 |        1 |
            |   10 |        1 |
            |   19 |        2 |
            |   35 |        1 |
            +------+----------+
            select avg(downlink_length) from tcpLog where proto="ssh" ;
            +----------------------+
            | avg(downlink_length) |
            +----------------------+
            | 43910788.9312        |
            +----------------------+
            select distinct(downlink_length) ,count(*) from tcpLog where proto="ssh" group by time order by time desc limit 5;
            +-----------+----------+
            | downlink_length      | count(*) |
            +-----------+----------+
            | 240009775 |        1 |
            | 240009582 |        1 |
            | 240009186 |        1 |
            | 240008532 |        1 |
            | 240008519 |        1 |
            +-----------+----------+
            但是换成邮件协议，就发现了有非正常大小的数据流量。
            select distinct(downlink_length),count(*) from tcpLog where proto="smtp" group by time order by time desc limit 10;
            +------+----------+
            | downlink_length | count(*) |
            +------+----------+
            | 8130 |        1 |
            | 5424 |        1 |
            | 5177 |        1 |
            | 5118 |        1 |
            | 4611 |        1 |
            |  399 |        6 |
            |  398 |        5 |
            |  397 |        5 |
            |  396 |        3 |
            |  395 |        5 |
            +------+----------+
            3、