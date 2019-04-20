## 简介
这是一个监测网络威胁的数据可视化设计

![展示图](http://b310.photo.store.qq.com/psb?/V117aYyi0ozt3e/vLppHwBNygVgr4NhRywgbigjd.Geu6fZAYTiZp2ma5w!/b/dDYBAAAAAAAA&bo=QAaEA0AGhAMRECc!&rf=viewer_311)

## 调式运行顺序及方式:
    后端:
    先手动安装router.py中需要的依赖模块
    命令行进入server目录
    python router.py
    前端:
    webstorm打开项目
    执行home.js


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

## 服务端代码 在server文件夹下,需要单独用pycharm打开运行



## 问题:
1.用户考勤表关联性。
2.时间轴加载基本信息。
3.威胁识别： 1、分组统计不同类型连接的连接时长，特长时间连接的数据识别为威胁。
           
           2、分组统计不同类型连接的数据上行和下行流量，特大流量数据识别为警告或威胁。

                邮箱下行 大于500
                        上行大于200



           
            但是换成邮件协议，就发现了有非正常大小的数据流量。

            =======继续补充======


地图(图1)
对于四个基本信息图(图2,3,4,5),每次传10分钟的数据
一天 2点到23点 共21小时 10分钟一段,共21*6=126段 偏移量offset(min=0,max=125) 
偏移量换算时间  hour = int(offset/6)+2
              minu = offset%6*10
                
时间换算偏移量   offset=(hour-2)*6+int(minu/10)+1

基本图接口
请求 1次/秒
url:        /tcp
method:     post
request:       {"day":"1","offset":"1"}

response:
            {
                "base": {                            //四个基本图
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
                "proportion": {                     //基本图的次数分类统计换装图6
                    "file": 3,
                    "database": 1,
                    "http": 5,
                    "email": 2,
                    "ssh": 1
                },
                "connectcount":12                    //当前时间段内请求次数
                "toplace": [                         //地图经纬信息
                    {
                        "lo": "34.434543",
                        "la": "123.32435454"
                    }
                ]

                "warning": {
                       "overtime": [                  //长时间连接警告
                       ],
                       "overamount": [                //超量连接警告
                       ]
                   }

            }




上网分析请求

使用tcp请求偏移量,但是web信息按小时返回而在没有信息时返回整天分布,在有信息时返回所在一小时的分类信息
请求  6秒/次

url:        /web
method:     post
request:    {"day":"1","offset":"1"}

response:    {                                          //网站词图7
                "distribution":{


                }
                "keywords":""


              }



email分类请求:
url:        /email
method:     post
request:    {"day":"1","offset":"1"}

response:    {                                          //email词图8
                "distribution":{


                }
                "keywords":"",
                "warning": {
                      "keywordswarning": [              //email关键词警告
                      ],
                  }
              }
网站浏览和email合为双折线图9


