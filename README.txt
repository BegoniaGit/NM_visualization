create_time��2018��11��17�� 14��14��

mysql���ݿ�
��ַ  www.crabapple.xyz
�˿�  3306
�û��� root
����  12345678
���ݿ� hightech


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

����˴��� ��server�ļ�����,��Ҫ������pycharm������



����:
1.�û����ڱ�����ԡ�
2.ʱ������ػ�����Ϣ��
3.��вʶ�� 1������ͳ�Ʋ�ͬ�������ӵ�����ʱ�����س�ʱ�����ӵ�����ʶ��Ϊ��в��
           
           2������ͳ�Ʋ�ͬ�������ӵ��������к������������ش���������ʶ��Ϊ�������в��
           
            ���ǻ����ʼ�Э�飬�ͷ������з�������С������������

            =======��������======


��ͼ(ͼ1)
�����ĸ�������Ϣͼ(ͼ2,3,4,5),ÿ�δ�10���ӵ�����
һ�� 2�㵽23�� ��21Сʱ 10����һ��,��21*6=126�� ƫ����offset(min=0,max=125) 
ƫ��������ʱ��  hour = int(offset/6)+2
              minu = offset%6*10
                
ʱ�任��ƫ����   offset=(hour-2)*6+int(minu/10)+1

����ͼ�ӿ�
���� 1��/��
url:        /tcp
method:     post
request:       {"day":"1","offset":"1"}

response:
            {
                "base": {                            //�ĸ�����ͼ
                    "file": {
                        "upload": 128,
                        "download": 128
                    },
                    "database": {
                        "upload": 128,
                        "download": 128
                    },
                    "httpem": {
                        "upload": 128,
                        "download": 128
                    },
                    "ssh": {
                        "upload": 128,
                        "download": 128
                    }
                },
                "proportion": {                     //����ͼ�Ĵ�������ͳ�ƻ�װͼ6
                    "file": 3,
                    "database": 1,
                    "http": 5,
                    "email": 2,
                    "ssh": 1
                },
                "connectcount":12                    //��ǰʱ������������
                "toplace": [                         //��ͼ��γ��Ϣ
                    {
                        "lo": "34.434543",
                        "la": "123.32435454"
                    }
                ]

                "warning": {
                       "overtime": [                  //��ʱ�����Ӿ���
                       ],
                       "overamount": [                //�������Ӿ���
                       ]
                   }

            }




������������

ʹ��tcp����ƫ����,����web��Ϣ��Сʱ���ض���û����Ϣʱ��������ֲ�,������Ϣʱ��������һСʱ�ķ�����Ϣ
����  6��/��

url:        /web
method:     post
request:    {"day":"1","offset":"1"}

response:    {                                          //��վ��ͼ7
                "distribution":{


                }
                "keywords":""


              }



email��������:
url:        /email
method:     post
request:    {"day":"1","offset":"1"}

response:    {                                          //email��ͼ8
                "distribution":{


                }
                "keywords":"",
                "warning": {
                      "keywordswarning": [              //email�ؼ��ʾ���
                      ],
                  }
              }
��վ�����email��Ϊ˫����ͼ9


