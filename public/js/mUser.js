$(function(){

    

	// 回退

	$('#back').tap(function(){
		window.history.go(-1);
	})

	// menu
	

	$('#menu').tap(function(){

		var menu=$('.user-menu');
		if(menu.css('display')=='none'){
			menu.show();
		}else{
			menu.hide();
		}

	}) 


	// 更新信息

	var updateinfo = (function() {
            $("body").on('tap', '#submit', function() {

            	var userId=$('#user').attr('data-userId');
                var form = $("#update_form");
                var age=$('#input_age').val();
                var sex=$('#input_sex').val();
                var email=$('#input_email').val();
               
                $.ajax({
                    type: "POST",
                    url: "/m/user/updateinfo",
                    data: {
                        age: age,
                        sex: sex,
                        email: email,
                        user: userId
                    },
                    cache: false,
                    success: function(data) {
                        // window.location.reload(true)
                        $.toast('修改成功', 2000, 'success-sub');
                    }
                })
            })


    })();


    //加载收藏

    var like=(function(){

        var click=$('#click_more');


        click.tap(function(){

            if($(this).text()=='已经全部加载'){
                return false;
            }

            var userId=$('#user').attr('data-userid');
            var lis=$('#my-love .list-block li');
            $.ajax({
                type:'get',
                url:'/m/morelike',
                data:{
                    len:lis.length,
                    user:userId
                },
                cache:false,
                before:function(){
                    click.text('加载中...');
                },
                success:function(data){
                    var arr=data.more;
                    var ul=$('#my-love .list-block ul');

                    for(var i=0;i<arr.length;i++){
                        var html='<li>'+
                            '<a href="/m/movie/'+arr[i]._id+'" class="item-link item-content every">'+
                                '<div class="item-media"><img src="'+arr[i].poster+'" style="width: 2.2rem;"></div>'+
                                '<div class="item-inner">'+
                                    '<div class="item-title-row">'+
                                        '<div class="item-title">'+arr[i].title[0]+'</div>'+
                                    '</div>'+
                                    '<div class="item-subtitle">'+arr[i].actors+'</div>'+
                                '</div>'+
                            '</a>'+
                        '</li>'

                        ul.append(html);
                    }

                    if(arr.length<20){
                        click.text('已经全部加载');
                        return false;
                    }else{
                        click.text('点击加载更多');
                    }



                }




            })
        })

    })()


})