create_time��2018��11��17�� 14��14��


���ݿ��ӻ��γ���ҵ��ơ�



=================Ŀ¼====================
/				                #root
/config				            #�����ļ�
/css				            #��ʽ�ļ�
/data				            #�����ļ�
/js				                #js�ļ�
	/native_libraries		    #jsԭ����
/project_design				    #��ƹ���ԭ�ļ�
/test				            #�����ļ���
/home.html			            #��ҳ
========================================

����:
1.�û����ڱ�����ԡ�
2.ʱ������ػ�����Ϣ��
3.��вʶ�� 1������ͳ�Ʋ�ͬ�������ӵ�����ʱ�����س�ʱ�����ӵ�����ʶ��Ϊ��в��
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
            2������ͳ�Ʋ�ͬ�������ӵ��������к������������ش���������ʶ��Ϊ�������в��
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
            ���ǻ����ʼ�Э�飬�ͷ������з�������С������������
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
            3��