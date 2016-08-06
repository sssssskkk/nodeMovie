$(function(){


    var public=(function(){

        var msk=$('#mask');
        var top_cat=$('#top_cate');

        top_cat.tap(function(){
            if(msk.hasClass('hide')){
                msk.removeClass('hide');
                $(this).find('span').css('color','#D70B18');
            }else{
                msk.addClass('hide');
                $(this).find('span').css('color','#5F646E');
            }

        });


        var clientWidth=$('#slider').width();
        var sldeHeight=clientWidth*0.476;
        $('#slider').height(sldeHeight);


        // 返回顶部按钮显示
        var content=$('#content');
        var back_top=$('#to-Up');
        content.on('scroll',function(){
            var scrollHeight=content.scrollTop();
            if(scrollHeight>600){
                back_top.show();
            }else{
                back_top.hide();
            }
            
        })


    })()

   
    // 返回顶部

    var toTop=(function(){
        var back_top=$('#to-Up');
        var timer=null;
        var tar=$('#content');



        function smollScroll(tar){
            var scrollH=tar.scrollTop();
            var per=scrollH/10;
            var m=Math.floor(scrollH-per);
            if(m<=0){
                window.clearTimeout(timer);
                return false;
            }else{
                tar.scrollTop(m)
            }

            timer=window.setTimeout(function(){
                smollScroll(tar)
            },20)

        }

        back_top.tap(function(){
        
           smollScroll(tar)
          
        })
    })()


    var mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false

    })

    

});