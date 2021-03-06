$(function(){

    var swiper = new Swiper('.swiper-type', {
        pagination: '.swiper-pagination',
        slidesPerView: 6,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });

    var swiper2 = new Swiper('.swiper-part', {
        pagination: '.swiper-pagination',
        slidesPerView: 6,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });


    // 最小高度调整
    // 
    
    var min_height=(function(){
        var offset_top=$('#part').offset().top;
        var mov_con=$('#mov-content');
        var b_h=$('body').height();
        console.log(b_h)

        var base=parseInt($('html').css('font-size'));

        var min_h=b_h-(offset_top+(6.22*base))
        mov_con.css('min-height',min_h);

    })()
   


    var search_btn=$('#top_cate');
    var search_con=$('#search_con');

    search_btn.tap(function(){
        if(search_con.css('display')=='none'){

            setTimeout(function(){
                search_con.css({'opacity':1,'transition':'opacity 0.4s'});
            },10);
            search_con.css({'display':'block','opacity':0});
            $(this).find('span').css('color','#0894EC');
        }else{
            setTimeout(function(){
                search_con.css({'display':'none'});
            },410);
            search_con.css({'opacity':0,'transition':'opacity 0.4s'});

            $(this).find('span').css('color','#5f646e');
        }
    })

    if($('#load .mov-box').length<20){
        $('#loadMore').hide();  
    }else{
        $('#loadMore').show();  
    }


    // 返回顶部

    var toTop=(function(){
        
        var back_top=$('#to-Up');
        var timer=null;
        var tar=$('#content');
        tar.on('scroll',function(){
            var scrollHeight=tar.scrollTop();
            if(scrollHeight>600){
                back_top.show();
            }else{
                back_top.hide();
            }
            
        })



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


    var load=(function(){
        var load_click=$('#loadMore');
        var count=20;
        var choice=window.location.search.split('=')[1];
        var num=1;

        load_click.tap(function(){

            if(num!=1){
                return;
            }

            $.ajax({
                url:'/m/partMore',
                type:'get',
                data:{
                	choice:choice,
                    len:count
                },
                cache:false,
                beforeSend:function(){
                    load_click.text('加载中...')
                },
                success:function(data){

                    if(data.status==0){
                        num=0;
                    }else{
                        num=1;
                    }
                    var movies=data.movies

                    var div=$('<div></div>');


                    for(var i=0;i<movies.length;i++){

                        var html=
                        '<a href="/m/movie/'+movies[i]._id+'">'+
                            '<span class="border-box a_img">'+
                                '<i class="img_container" style="background-image: url('+movies[i].mPoster+'); background-repeat: no-repeat; background-size:auto 100%; background-position: center center"></i>'+
                            '</span>'+
                            '<span class="cate-tit border-box">'+
                                '<h2>'+movies[i].title+'</h2>'+
                                '<p>'+movies[i].hotword+'</p>'+
                            '</span>'+
                        '</a>'

                        div.append(html);

                    }

                    $('#load').append(div)

                },
                complete:function(){
                    if(num==1){
                        load_click.text('点击加载更多');
                        count+=20;
                        
                    }else{
                        load_click.text('已全部加载');
                        return;
                    }
                }

            })

        })


    })()

});
