setTimeout(function(){
                $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
            },500)


window.onload=function(){


    /*曝光数*/
    var sum=0;/*初始化曝光数*/
    var allsum;/*当前的曝光数*/
    var i=0;/*每秒的增长量*/
    var data= new Date();/*时间对象*/
    var time=data.getHours();/*小时*/
    var minu= data.getMinutes();/*分钟*/
    var sec=data.getSeconds();/*秒*/
    var times=(time*3600)+(minu*60)+sec;/*当前时间的总秒数**/
    if(times>=0&&times<=32400){/*时间段的总秒数：32400*/
        /* 0:00-9:00  100000000*/
        i=3086;
        allsum=times*i;
        sum=allsum
    }else if(times>=32400&&times<=43200){/*时间段的总秒数：10800*/
        /* 9:00-12:00  200000000*/
        i=18518;
        allsum=sum+(32400*3086)+((times-32400)*i)
        sum=allsum
    }else if(times>=43200&&times<=61200){/*时间段的总秒数：18000*/
        /* 12:00-17:00 200000000*/
        i=18518;
        allsum=sum+(32400*3086)+ (10800*18518)+((times-43200)*i)
        sum=allsum
    }else if(times>=61200&&times<=75600){/*时间段的总秒数：14400*/
        /* 17:00-21:00 100000000*/
        i=3086;
        allsum=sum+(32400*3086)+ (10800*18518)+(18000*18518)+((times-61200)*i)
        sum=allsum

    }else if(times>=75600&&times<=86400){/*时间段的总秒数：10800*/
        /* 21:00-24:00 100000000*/
        i=3086;
        allsum=sum+(32400*3086)+ (10800*18518)+(18000*18518)+(14400*3086)+((times-75600)*i)
        sum=allsum
    }
    $(function() {
        Time=setInterval(function(){
            show_num1(sum,i)
        },1500);
    });
    function show_num1(n,i) {
        sum=sum+i
        var it = $(".t_num1 i");
        var len = String(n).length;
        var yi=len-9;
        for(var i = 0; i < len; i++) {
            if(it.length <= i) {

                $(".t_num1").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 54;
            var obj = $(".t_num1 i").eq(i);
            obj.stop().animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function() {},2000);
        }
        $(".t_num1 span").remove()
        if(yi>=0){
            $(".t_num1 i").eq(yi).after("<span>亿</span>")
        }
        $(".t_num1 i").eq(len-1).after("<span>次</span>")
        $("#cur_num").val(n);
    }

}



/*获取数据*/
$.ajax({
    type:"get",
    url:"http://dt.wayboo.net.cn/websitecontroller/officewebsite.action",
    async:false,
    dataType: "jsonp",
    success:function(str){
        data=str
        MinCarousel()
    }
});
/***/


/*数据滚动**/
var MinCarousel=function(){
    var str=data.jsonp.supplier;
    var Ulist='';
    for (var i in str) {
        Ulist+="<li><p>"+data.jsonp.purchaser[i]+"</p><p>"+str[i]+"</p></li>"
    }
    $("#bottomRight_lun>ul").html(Ulist)
    var me=data.jsonp.companychannel;
    var kehu=data.jsonp.signingInformation;
    var List=''
    for (var i in me) {
        List+="<li><p>"+me[i]+"</p><p>"+kehu[i]+"</p></li>"
    }
    $(".mapbox_listBox>ul").html(List)


}
$(function(){
    $('#bottomRight_lun').myScroll({
        speed:60, //数值越大，速度越慢
        rowHeight:40 //li的高度
    });
    $('.mapbox_listBox').myScroll({
        speed:40, //数值越大，速度越慢
        rowHeight:59 //li的高度
    });

})



/*地图*/


function getEcharts(){
    require.config({
        paths: {
            echarts: './js'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/map'
        ],
        function (ec) {
            var myChart2 = ec.init(document.getElementById('map'));
            myChart2.setOption({
                tooltip : {
                    trigger: 'item',
                    position:[800,3],
                    /*设置弹出框*/
                    formatter: function (params,ticket,callback){
                        var $pna = params.name;
                        var res = '';
                        for(var i = 0;i<$imgs.length;i++){
                            if($imgs[i].area == $pna){
                                /*设置弹出的内容**/
                                // res="<div class=\"maptxt\"><div style=\"width:400px;height:520px;font-weight: bold;\"><p>" + $imgs[i].nameOne + "</p><p>" + $imgs[i].nameTow + "</p></div></div>";
                                $('.maplist .section span').html($imgs[i].area);
                                $('.maplist .com').html($imgs[i].name);
                                $('.maplist .add span').html($imgs[i].aad);
                                $('.maplist .phone').html($imgs[i].phone);
                                $('.maplist .big_img').attr('src',$imgs[i].src);

                                // 当分公司有两个的时候

                                 $('#mapbox .button').html(' <button class="button1">'+$imgs[i].ca1+'</button>'
                                	+'<button class="button2">'+$imgs[i].ca2+'</button>');
                              	
                                     $('#mapbox .button .button1').css({
                                		'backgroundColor':'#0084ff',
                                		'color':'#fff'
                                	})
                                     $('#mapbox .button .button2').css({
                                		'backgroundColor':'#f3f5f7',
                                		'color':'#666'
                                	})

                                	$('#mapbox .button .button1').click(function() {
                                	
                                        $('#mapbox .button button').css({
                                		  'backgroundColor':'#f3f5f7',
                                		  'color':'#666'
                                	     })
		                                $('.maplist .com').html($imgs[i].name);
		                                $('.maplist .add span').html($imgs[i].aad);
		                                $('.maplist .phone').html($imgs[i].phone);
		                                $('.maplist .big_img').attr('src',$imgs[i].src);
		                                $(this).css({
		                                	'backgroundColor':'#0084ff',
		                                	'color':'#fff'
		                                })		                           
                                	});
                                	$('#mapbox .button .button2').click(function() {
                                		
                                		$('#mapbox .button button').css({
                                		   'backgroundColor':'#f3f5f7',
                                		   'color':'#666'
                                	       })
		                                $('.maplist .com').html($imgs[i].name1);
		                                $('.maplist .add span').html($imgs[i].aad1);
		                                $('.maplist .phone').html($imgs[i].phone1);
		                                $('.maplist .big_img').attr('src',$imgs[i].src1);
		                                 $(this).css({
		                                	'backgroundColor':'#0084ff',
		                                	'color':'#fff'
		                                })
		
                                	});
                                if($imgs[i].ca1 == undefined){
                                 	$('#mapbox .button').html('');
                                 }
                                if($imgs[i].area == '郑州'){
                                 $('.maplist .addIn').show().css('display','inline-block');
                                }else{
                                    $('.maplist .addIn').hide();
                                }
                                
                                break;
                            }else{
                                res=$pna;
                                // $('#mapbox .button').css('display','none');
                            }
                        }
                        // return res;
                    },
                    

                    axisPointer:{
                    },
                    textStyle: {
                        color:"#fff"/***/
                    },
                    backgroundColor: 'rgba(0,0,0,0)',/**提示框颜色*/
                },



                series : [
                    {    
                        type: 'map',
                
                        roam: true,/*是否可拖拽*/
                        hoverable: false,
                        mapType: 'china',
                        itemStyle:{
                            normal:{
                                borderColor:"rgba(0,0,0,.2)",/**线条颜色*/
                                borderWidth:1,/**线条宽*/
                                areaStyle:{
                                    color: 'rgba(255,255,255,0.1)',/**地图颜色*/
                                }
                            },
                            emphasis:{
                                areaStyle:{
                                    color: '#FCF9F4',/**鼠标移入地图颜色*/
                                }
                            }
                        },
                        data:[],
                        geoCoord:arrmap,
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 15 + v/10
                            },
                            itemStyle:{
                                normal:{
                                    color:"rgba(14,145,252,0.4)",/**圆圈颜色*/
                                },
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            data : mapName
                        }
                    },
                    {
                        type: 'map',
                        mapType: 'china',
                        data:[],
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 0.1
                            },
                            effect : {
                                show: false,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:true,
                                        position:'top',
                                        textStyle: {
                                            fontSize: 14,/*字体大小**/
                                            color:"#000",/*字体颜色**/
                                            borderColor:"#000",
                                        },
                                        formatter:function(params){
                                            return params.name
                                        }
                                    }
                                },
                                emphasis: {
                                    label:{show:false}
                                }
                            },
                            data :mapName
                        }
                    }
                ]
            });

        });

}
          
//地图
if($(document.body).width()>768){
    $('#document').ready(function(){
    getEcharts();
});
}

var $imgs =
    [    
        {
            area: '哈尔滨',
            src:  '400-250/haerbin.jpg',
            name:"信融哈尔滨分公司",
            aad: "哈尔滨市南岗区西直大街118号哈特大厦1001室",
            phone:"0451-57733761"            
        },
        {
            area: '长春',
            src:  '400-250/changchun.jpg',
            name:"信融长春分公司",
            aad: "长春市朝阳区西安大路安华大厦2006室",
            phone:"0431-81101587"            
        },
        {
            area: '沈阳',
            ca1:'沈阳信融',
            src:  '400-250/shenyang1.jpg',
            name:"沈阳中工信融网络科技有限公司",
            aad: "沈阳市沈河区市府大路262-3号新华天玺大厦 D座1212室",
            phone:"024-66558981",
            ca2:'沈阳蒂澈',
            src1:  '400-250/shenyang2.jpg',
            name1:"蒂澈（沈阳）网络科技有限公司 	",
            aad1: "沈阳市大东区滂江街22号长峰中心2608",
            phone1:"024-62640908"              
        },
        {
            area: '大连',
            src:  '400-250/dalian.jpg',
            name:"信融大连分公司",
            aad: "大连市中山区民康街15号报业大厦20E室",
            phone:"0411-62888688"            
        },
        {
            area: '唐山',
            src:  '400-250/tangshan.jpg',
            name:"信融唐山分公司",
            aad: "唐山市高新技术开发区东方大厦C座801室",
            phone:"0315—3335056"            
        },
        {
            area: '北京',
            ca1:'北京一分',
            src:  '400-250/beijing1.jpg',
            name:"信融北京第一分公司",
            aad: "北京市朝阳区十里堡恒泰大厦B座1109室",
            phone:"010-57012369",
            ca2:'北京二分',
            src1:  '400-250/beijing2.jpg',
            name1:"信融北京第二分公司",
            aad1: "北京市丰台区马家堡西路时代风帆大厦二区609室",
            phone1:"13311141353"            
        },
        
        {
            area: '天津',
            src:  '400-250/tianjin.jpg',
            name:"信融天津分公司",
            aad: "天津市河西区下瓦房恒华大厦1号楼1708室",
            phone:"15712212800"            
        },
        {
            area: '保定',
            ca1:'保定一分',
            src:  '400-250/baoding1.jpg',
            name:"信融保定第一分公司",
            aad: "保定市复兴中路3108号康泰国际1-2306室",
            phone:"0312-8634995" ,
            ca2:'保定二分',
            src1:  '400-250/baoding2.jpg',
            name1:"信融保定第二分公司",
            aad1: "保定市复兴中路3108号康泰国际1-2306室",
            phone1:"0312-8634995"           
        },
     
        {
            area: '石家庄',
            src:  '400-250/shijiazhuang1.jpg',
            name:"信融石家庄分公司",
            aad: "石家庄市长安区建设北大街燕华大厦706室",
            phone:"0311-86215516"                        
        },
        {
            area: '沧州',
            src:  '400-250/cangzhou.jpg',
            name:"信融沧州分公司",
            aad: "沧州市运河区人防大厦7楼707室",
            phone:"0317-3080101"            
        },
        {
            area: '邯郸',
            src:  '400-250/handan.jpg',
            name:"信融邯郸分公司",
            aad: "邯郸市邯山区和平路396号同仁花园财富大厦4-4G室",
            phone:"0310-5277503"            
        },
        {
            area: '济南',
            src:  '400-250/jinan.jpg',
            name:"信融济南分公司",
            aad: "济南市历城区华信路15号凯贝特大厦C座617室",
            phone:"0531-58618790"            
        }, 
        {
            area: '烟台',
            ca1:'烟台一分',
            src:  '400-250/yantai1.jpg',
            name:"信融烟台第一分公司",
            aad: "烟台市芝罘区海港路十号润隆大厦6楼",
            phone:"13791152162",
            ca2:'烟台二分',
            src1:  '400-250/yantai2.jpg',
            name1:"信融烟台第二分公司",
            aad1: "烟台市芝罘区海港路十号润隆大厦18楼1803室",
            phone1:"0535-6281803"              
        },
        {
            area: '郑州',
            src:  '400-250/zhengzhou.jpg',
            name:"信融郑州分公司",
            aad: "郑州市二七区福寿街正弘凯宾城2号楼1117号",
            phone:"0371-55685549"            
        }, 
        {
            area: '重庆',
            src:  '400-250/chongqing.jpg',
            name:"信融重庆分公司",
            aad: "重庆市渝中区大坪正街118号嘉华鑫城A栋13-3室",
            phone:"023-81304099"            
        }, 
         {
            area: '西安',
            ca1:'西安一分',
            src:  '400-250/xian1.jpg',
            name:"信融西安第一分公司",
            aad: "西安市莲湖区北大街35号名流天地大厦701室",
            phone:"029-63010310",
            ca2:'西安二分',
            src1:  '400-250/xian2.jpg',
            name1:"信融西安第二分公司	",
            aad1: "陕西省西安市碑林区永宁国际大话南门壹中心1710室",
            phone1:"029-85210256"              
        },
         {
            area: '成都',
            ca1:"信融一分",
            src:  '400-250/chengdu.jpg',
            name:"信融成都第一分公司",
            aad: "成都市金牛区万达甲级写字楼C座2101",
            phone:"028-87666114",
            ca2:'信融二分',
            src1:  '400-250/chengdu2.jpg',
            name1:"成都信融世纪网络科技有限公司	",
            aad1: "成都市青羊区清江东路1号温哥华广场3楼D座",
            phone1:"028-85425432"  
        }, 
        {
            area: '长沙',
            src:  '400-250/changsha.jpg',
            name:"信融长沙分公司",
            aad: "长沙市天心区雀园路创谷广告产业园8楼",
            phone:"0731-85816279"            
        },
 

         {
            area: '昆明',
            ca1:'昆明一分',
            src:  '400-250/kunming.jpg',
            name:"信融昆明第一分公司",
            aad: "昆明市官渡区星耀路99号星都国际总部基地B座611室",
            phone:"0871-64647075",
            ca2:'昆明二分',
            src1:  '400-250/kunming2.jpg',
            name1:"信融昆明第二分公司",
            aad1: "昆明市盘龙区人民东路6号新华大厦6G",
            phone1:"18729352010"           
        }, 
 
        {
            area: '南京',
            src:  '400-250/nanjing.jpg',
            name:"信融南京分公司",
            aad: "南京市秦淮区太平南路2号日月大厦19楼AB座",
            phone:"025-5876 8476"            
        },
         {
            area: '无锡',
            src:  '400-250/wuxi.jpg',
            name:"信融无锡分公司",
            aad: "江苏省无锡市梁溪区圆融发展中心2302室",
            phone:"0510-66880791"            
        }, 
        {
            area: '苏州',
            ca1:'苏州一分',
            src:  '400-250/suzhou1.jpg',
            name:"信融苏州第一分公司",
            aad: "苏州市工业园区苏惠路环球188A座708室",
            phone:"0512-87661072",
            ca2:'苏州二分',
            src1:  '400-250/suzhou2.jpg',
            name1:"信融苏州第二分公司",
            aad1: "苏州市人民路3188号万达广场B座908室",
            phone1:"15366203909"              
        },
        {
            area: '上海',
            src:  '400-250/shanghai.jpg',
            name:"信融上海分公司",
            aad: "上海市普陀中山北路2790号杰地大厦303室",
            phone:"021-61800258"            
        }, 
         {
            area: '厦门',
            src:  '400-250/xiamen.jpg',
            name:"信融厦门分公司",
            aad: "福建省厦门市集美区杏林运营中心2号楼1305室",
            phone:"0592-6215931"            
        }, 
        {
            area: '南通',
            src:  '400-250/nantong.jpg',
            name:"信融南通分公司",
            aad: "南通市港闸区江海大道817号江海财富大厦B座602室",
            phone:"0513-87116602"            
        }, 

        {
            area: '青岛',
            src:  '400-250/qingdao.jpg',
            name:"信融青岛分公司",
            aad: "青岛市南区香港中路36号招银大厦806",
            phone:"0532-80609216"            
        }, 
        {
            area: '合肥',
            src:  '400-250/hefei.jpg',
            name:"信融合肥分公司",
            aad: "安徽省合肥市庐阳区长江中路436号金城大厦4002室",
            phone:"0551-62853317"            
        }, 
         {
            area: '东莞',
            ca1:'东莞一分',
            src:  '400-250/dongguan.jpg',
            name:"信融东莞分公司",
            aad: "东莞东城街道立新社区九龙路247号CY创意产业园A栋409",
            phone:"0769-22666706"
                
            
        }

        
    ]
var mapName=[
    {name: '北京'},
    {name: '上海'},
    {name: '长春'},
    {name: '沈阳'},
    {name: '大连'},
    {name: '天津'},
    {name: '保定'},
    {name: '沧州'},
    {name: '邯郸'},
    {name: '唐山'},
    {name: '济南'},
    {name: '烟台'},
    {name: '郑州'},
    {name: '南京'},
    {name: '苏州'},
    {name: '无锡'},
    {name: '南通'},
    {name: '西安'},
    {name: '重庆'},
    {name: '成都'},
    {name: '昆明'},
    {name: '厦门'},
    {name: '合肥'},
    {name: '青岛'},
    {name: '东莞'},
    {name: '长沙'},
    {name: '石家庄'},
    {name: '哈尔滨'},
]

  //移动端 地图展示
    for(var i= 0; i<$imgs.length;i++){
        //展示所有分公司所在地
       $('#add_map ul').append('<li data-toggle="modal" data-target="#myModal" data-index='+i+'>'+$imgs[i].area+'</li>'); 
    }
    
     $('#add_map li').click(function() {
            if($(this).html()=='郑州'){
                $('.modal-body .addIn').show().css('display','inline-block');
             }else{
                $('.modal-body .addIn').hide();
             }
           /* Act on the event */
            $('#add_map li').css({
                'backgroundColor':'#fff',
                'color':'#666'
            })
            $(this).css({
                'backgroundColor':'#0084ff',
                'color':'#fff'
            })
           var dataIndex = $(this).attr('data-index');
            $('.modal-body .com').html('');
            $('.modal-body .add span').html('');
            $('.modal-body .phone').html('');
            $('.modal-body .ca1').html('');
            $('.modal-body .com1').html('');
            $('.modal-body .add1 span').html('');
            $('.modal-body .phone1').html('');
            $('.modal-body .ca2').html('');
            $('.modal-body .section span').html($imgs[dataIndex].area);
            $('.modal-body .ca1').html($imgs[dataIndex].ca1);
            $('.modal-body .com').html($imgs[dataIndex].name);
            $('.modal-body .add span').html($imgs[dataIndex].aad);
            $('.modal-body .phone').html($imgs[dataIndex].phone);
            $('.modal-body .com1').html($imgs[dataIndex].name1);
            $('.modal-body .add1 span').html($imgs[dataIndex].aad1);
            $('.modal-body .phone1').html($imgs[dataIndex].phone1);
            $('.modal-body .ca2').html($imgs[dataIndex].ca2);
            if($('.modal-body .ca2').html() == ''){
               $('.modal-body .add1').css('display','none');  
            }else{
                $('.modal-body .add1').css('display','block'); 
            }
       });






/**数字滚动*/
var z=true
$(function(){
    var mainOffsetTop = $(".about_list").offset().top;
    var mainHeight = $(".about_list").height();
    var winHeight = $(window).height();
    $(window).scroll(function(){
        if(z==true){
            var winScrollTop = $(window).scrollTop();
            if(winScrollTop > mainOffsetTop + mainHeight || winScrollTop <　mainOffsetTop - winHeight){
            }else{
                z=false
                var num1 = 30
                var num2 = 200000
                var num3 = 1000
                var xr_1=$('#xr_1')
                var xr_2=$('#xr_2')
                var xr_3=$('#xr_3')
                countUp(xr_1, num1, 0, 1000,0);
                countUp(xr_2, num2, 0, 1000,0);
                countUp(xr_3, num3, 0, 1000,0);
                return false
            }
        }
    })
});




function countUp(elem, endVal, startVal, duration, decimal) {
    var startTime = 0;
    var dec = Math.pow(10, decimal);
    var progress,value;
    function startCount(timestamp) {
        startTime = !startTime ? timestamp : startTime;
        progress = timestamp - startTime;
        value = startVal + (endVal - startVal) * (progress / duration);
        value = (value > endVal) ? endVal : value;
        value = Math.floor(value*dec) / dec;
        elem.html(value.toFixed(decimal))
        progress < duration && requestAnimationFrame(startCount)
    }
    requestAnimationFrame(startCount)
}


/**滑动的菜单**/
var iSpeed=0;
var left=0;
function startMove(obj, iTarget)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        iSpeed+=(iTarget-obj.offsetLeft)/5;
        iSpeed*=0.7;
        left+=iSpeed;
        if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
        {
            clearInterval(obj.timer);
            obj.style.left=iTarget+'px';
        }
        else
        {
            obj.style.left=left+'px';
        }
    }, 30);
}





//  鼠标悬浮 解决方案 40px
$(function () {
   
    if($(document.body).width()>768){
        $('.xr_head li').mouseenter(function () {
            $('.xr_head li').find('span').remove();
            $(this).append('<span></span>');
            $(this).find('.nav_tow').css('display','block');
        })
            .mouseleave(function () {
                $('.xr_head li').find('span').remove();
                $('.xr_head li').eq(0).append('<span></span>');
                $('.xr_head li').eq(5).find('span').remove();
                $(this).find('.nav_tow').css('display','none');
            })
        $('.xr_head li').eq(5).mouseenter(function () {
            $(this).find('span').remove();
            $('.xr_head li').eq(0).append('<span></span>');
        })
    }
    // 移动端导航点击显示隐藏二级分类
    if($(document.body).width()<768){
        $('.logo img').attr('src','images/logo2.png');
        $('.xr_head li').click(function () {
            if($(this).find('.nav_tow').is(':hidden')){//如果当前隐藏
            $('.nav_tow').is(':hidden');//如果当前隐藏
                $(this).find('.nav_tow').show();//那么就显示div
            }else{//否则
                $(this).find('.nav_tow').hide();//就隐藏div
            }
        })
    }
    //点击导航隐藏按钮 变符号
    if($(document.body).width()<768){
         var screenHeight = $(window).height();
         var barHeight = $('.navbar-header').height();
        // console.log(screenHeight);
        
        $('.xr_head button').click(function () {
            if($('.nav').is(':hidden')){
               $(this).find('span').eq(0).css({
                    'transform':'translateY(0.3rem) rotate(50deg)'
                })
                $(this).find('span').eq(1).css({
                    'display':'none'
                })
                 $(this).find('span').eq(2).css({
                    'transform':'translateY(0rem) rotate(130deg)'
                })
                $('body').height(screenHeight-barHeight+50).css("overflow","hidden");
                $('.navbar-nav').css("overflow","auto");
                $('.navbar-nav li:last').find('img').attr("src","images/login1.png");
                $('.navbar-nav li').eq(4).click(function(event) {
                   $('body').height('inherit').css("overflow","visible");
                });

            }else{
                 $(this).find('span').eq(0).css({
                    'transform':'translateY(0) rotate(0)'
                })
                $(this).find('span').eq(1).css({
                    'display':'block'
                })
                 $(this).find('span').eq(2).css({
                    'transform':'translateY(0) rotate(0)'
                })
                $('body').height('inherit').css("overflow","visible");
            }
        })
    }
    function rolling(div,offset,fun){
        var a,b,c,d;
        d=$(div).offset().top;
        a=eval(d + offset);
        b=$(window).scrollTop();
        c=$(window).height();
        if(b+c>a){
            fun()
        }
    }
    // 回到顶部
    var headHeight = $('.xr_banner').height();//获取头部的高度
    var stepHeight = $('.step').height();//获取流程的高度
    var topheight = headHeight + stepHeight; //超过这个距离显示回到顶部
    $(window).scroll(function () {
        var scrollTop =$(document).scrollTop();
        if(scrollTop >= headHeight ){
            $('.goTo').css('display','block');
        }else {
            $('.goTo').css('display','none');
        }
        $('.goTo').click(function () {
            $(document).scrollTop('0');//点击设置页面卷曲的距离为0;
        });
      if($(document.body).width()>768){
        rolling(".step",300,function(){
            this.scrollReveal = new scrollReveal();
        })
        rolling(".goods",300,function(){
            this.scrollReveal = new scrollReveal();
        })
        rolling(".cases",300,function(){
            this.scrollReveal = new scrollReveal();
        })
        rolling(".about",300,function(){
            this.scrollReveal = new scrollReveal();
        })
        rolling(".map",300,function(){
            this.scrollReveal = new scrollReveal();
        })
      }
        
    })
// 移动端展开的导航和页面大小一般大
    if($(document.body).width()<768){
        var screenHeight = $(window).height();
        var barHeight = $('.navbar-header').height();
        $('.navbar-nav').height(screenHeight-barHeight);

       
    }








    //特点中鼠标进入小图标整体向上移动40px 切显示隐藏的文案
    $('.point .p1').mouseenter(function () {
        $('.point .hide_tedian').stop().fadeOut(500);
        $(this).find('.hide_tedian').stop().fadeIn(3000);

    })
        .mouseleave(function () {
            $(this).find('.hide_tedian').stop().fadeOut(500);
        });
    $('.point .p1').eq(0).mouseenter(function () {
        $('.point .point_imgs div').css('zIndex','-3');
        $('.point .point_imgs .img1').css({
            'zIndex':'-2',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
    })
        .mouseleave(function () {
            $('.point .point_imgs .img1').css({
                'opacity':'0',
                'transform':'scale(1)'
            });
            $('.point .point_imgs .img1').css('opacity','1');
        });
    $('.point .p1').eq(1).mouseenter(function () {
        $('.point .point_imgs div').css('zIndex','-3');
        $('.point .point_imgs .img2').css({
            'zIndex':'-2',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
    })
        .mouseleave(function () {
            $('.point .point_imgs .img2').css({
                'opacity':'0',
                'transform':'scale(1)'
            });
            $('.point .point_imgs .img3').css('opacity','1');
        });
    $('.point .p1').eq(2).mouseenter(function () {
        $('.point .point_imgs div').css('zIndex','-3');
        $('.point .point_imgs .img3').css({
            'zIndex':'-2',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
    }).mouseleave(function () {
        $('.point .point_imgs .img3').css({
            'opacity':'0',
            'transform':'scale(1)'
        });
        $('.point .point_imgs .img1').css('opacity','1');
    });
    //移动端 手势滑动
    if($(document.body).width()<768){
        /**
         * Created by Administrator on 2017/7/11.
         */
        'use strict';
        $(function () {
            // 获取手指在轮播图元素上的一个滑动方向（左右）

            // 获取界面上轮播图容器
            var $carousels = $('.carousel');
            var startX,endX;
            // 在滑动的一定范围内，才切换图片
            var offset = 50;
            // 注册滑动事件
            $carousels.on('touchstart',function (e) {
                // 手指触摸开始时记录一下手指所在的坐标x
                startX = e.originalEvent.touches[0].clientX;

            });
            $carousels.on('touchmove',function (e) {
                // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
                endX = e.originalEvent.touches[0].clientX;
            });
            $carousels.on('touchend',function (e) {
                //console.log(endX);
                //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
                //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
                var distance = Math.abs(startX - endX);
                if (distance > offset){
                    //说明有方向的变化
                    //根据获得的方向 判断是上一张还是下一张出现
                    $(this).carousel(startX >endX ? 'next':'prev');
                }
            })
        });
    }



    //鼠标悬浮优势改变icon
    if($(document.body).width()>768){
        $('.goods_list .good1').hover(function() {
            $(this).find('img').attr("src","icons/small1.png");
            $(this).find('p').css("color","#0084ff");
        }, function() {
           $(this).find('img').attr("src","icons/new_g_ic_08.png");
            $(this).find('p').css("color","#384555");
        });
        $('.goods_list .good2').hover(function() {
            $(this).find('img').attr("src","icons/small2.png");
            $(this).find('p').css("color","#0084ff");
        }, function() {
           $(this).find('img').attr("src","icons/new_g_ic_10.png");
            $(this).find('p').css("color","#384555");
        });
        $('.goods_list .good3').hover(function() {
            $(this).find('img').attr("src","icons/small3.png");
            $(this).find('p').css("color","#0084ff");
        }, function() {
           $(this).find('img').attr("src","icons/new_g_ic_03.png");
            $(this).find('p').css("color","#384555");
        });
        $('.goods_list .good4').hover(function() {
            $(this).find('img').attr("src","icons/small4.png");
            $(this).find('p').css("color","#0084ff");
        }, function() {
           $(this).find('img').attr("src","icons/new_g_ic_05.png");
            $(this).find('p').css("color","#384555");
        });
    }
    if($(document.body).width()<768){
    $('.item2').click(function(event) {
        window.open("http://syb.wayboo.com/");
    });
    $('.item3').click(function(event) {
        window.open("http://official.jzl123.cn/web/zhiT.html");
    });
    $('.item4').click(function(event) {
        window.open("http://official.jzl123.cn/web/flow.html");
    });
   }
})
