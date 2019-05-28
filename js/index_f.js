$(function () {



   
    $(window).scroll(function () {
    var headHeight = $('.xr_banner').height();//获取头部的高度
    var stepHeight = $('.step').height();//获取流程的高度
    var topheight = headHeight + stepHeight; //超过这个距离显示回到顶部
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
          rolling(".marketing",300,function(){
            window.scrollReveal = new scrollReveal();
        }) 
         rolling(".flow_d",300,function(){
            window.scrollReveal = new scrollReveal();
        }) 
         rolling(".flow_z",300,function(){
            window.scrollReveal = new scrollReveal();
        }) 
         rolling(".high",300,function(){
            window.scrollReveal = new scrollReveal();
        }) 
         rolling(".business",300,function(){
            window.scrollReveal = new scrollReveal();
        }) 
         rolling(".cases",300,function(){
            window.scrollReveal = new scrollReveal();
        })
         
    }
    })
//页面滚动当前位置执行的函数
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
})

