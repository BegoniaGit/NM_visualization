var china_map=document.getElementById("main");

var width=910,
    height=600,
    margin={left:20,top:20,right:20,down:20};

//定义地图投影
var projection =d3.geo.mercator()
    .center([104,37])
    // .center([0,0])
    .scale(700)
    .translate([width/2,height/2])

d3.json("data/world.json",function(err3,wordMapInfo){





}