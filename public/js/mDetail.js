$(document).ready(function(){

	


	// 下载地址模态框

	$(document).on('click','.open-about', function () {
	  $.popup('.popup-about');
	});

	$(document).on('click','.close-popup', function () {
	  $.closeModal();
	});

	// 调整主图片高度

	var mainPic=(function(){

		var img=$('#top_movie img');
		var width=img.width();
		var height=width*1.39666;

		img.css('min-height',height)
		
		
	})()


	


	// 没有登录，点击收藏提示

	$('#comment_list .zan').on('tap',function () {
		
		if($('#top_nouser').attr('data-user')){
	        $.alert('请先登录');
	        return false;
		}
     });


	// 没有登录，点击点赞提示

	$('#collect').on('tap',function () {
		
		if($('#top_nouser').attr('data-user')){
	        $.alert('请先登录');
	        return false;
		}
     });







	// 返回上一层
	
	$('#back').tap(function(){
		window.history.go(-1);
	})	


	// 设置时间
	$(".comment-list .time").each(function(p, r) {
            var q = $(this).attr("time");
            var s = new Date().ago(q);
            $(this).html(s)
        });

	// 调整推荐图片高度
	var pic_width=$('.pic-list a');
	pic_width.each(function(index,item){
		var $item=$(item);
		var s_img=$item.find('.s_img');
		var h=s_img.width()*1.4;
		s_img.height(h);
	})

	// 简介展开与收起
	// 
	var show=(function(){

		$('#click_btn').tap(function(){
			if($(this).text()=='展开'){
				$('#summary .sum-con').css('max-height','999px');
				$(this).text('收起');
			}else{
				$('#summary .sum-con').css('max-height','4.8rem');
				$(this).text('展开');
			}
		})

	})()

	// 提交评论隐藏出现
	var inputShow=(function(){

		var input=$('#com_input');
		var str='';
		var now='';
		var num=$('#count i');
		var tar=$('#content');
		var com=$('#comments').offset().top;

		function test(){
			now=$.trim(input.val());
			if(now==''){
				num.text('140');
			}
			if(now !=''&&now!=str){
				var shuzi=140-parseInt(now.replace(/[^\x00-xff]/g,"x").length);
				if(shuzi<0){
					num.text('0');
				}else{
					num.text(shuzi);
				}
				

			}
			str=now;
		}

		input.focus(function(){
			$('#input_send').show();
			var time=setInterval(test,100);
			tar.scrollTop(com);
			$(this).parent().css('border','1px solid #888');

			$(this).blur(function(){
				clearInterval(time);
				$('#input_send').hide();
				$(this).parent().css('border','1px solid #e1e1e1');
			})

		})



		$('#i_cancel').tap(function(){
			$('#input_send').hide();
		})


	})()


	// 点击加载更多评论
	

	var click_more=(function(){

		var load_click=$('#click_more');
        var count=6;
        var num=1;

        var id=window.location.pathname.split('/').pop();
        load_click.tap(function(){

        	if(num==0){
        		return;
        	}

            $.ajax({
                url:'/m/ComMore',
                type:'get',
                data:{
                    len:count,
                    id:id
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

                        var comments=data.comments

                        var div=$('<div></div>');


                        for(var i=0;i<comments.length;i++){

                        	var date=new Date().ago(comments[i].meta.createAt)
                        	var pripeople=comments[i].pripeople;
                        	var comment_id=comments[i]._id;

                        	if(comments[i].from.pic.length>6){
	                            var html=
	                            '<dl class="com-box" data-pripeople="'+pripeople+'">'+
	                                '<dt class="com-img" data-commentid="'+comment_id+'">'+
	                                    '<img src="/upload/'+comments[i].from.pic+'" alt="用户头像"/>'+
	                                '</dt>'+

	                                '<dd class="com-wrap">'+
	                                    '<h1 class="com-title">'+comments[i].from.name+'</h1>'+
	                                    '<p class="com-con">'+comments[i].content+'</p>'+
	                                    '<div class="com-zan">'+
	                                        '<span class="time">'+date+'</span>'+
	                                        '<div class="zan"><i class="peo-prise">赞</i>  <span class="icon icon-star"></span></div>'+
	                                    '</div>'+
	                                    
	                                '</dd>'+
	                            '</dl>'
                        	}else{
                        		var html=
	                            '<dl class="com-box" data-pripeople="'+pripeople+'">'+
	                                '<dt class="com-img" data-commentid="'+comment_id+'">'+
	                                    '<img src="/images/moren.png" alt="默认头像"/>'+
	                                '</dt>'+

	                                '<dd class="com-wrap">'+
	                                    '<h1 class="com-title">'+comments[i].from.name+'</h1>'+
	                                    '<p class="com-con">'+comments[i].content+'</p>'+
	                                    '<div class="com-zan">'+
	                                        '<span class="time">'+date+'</span>'+
	                                        '<div class="zan"><i class="peo-prise">赞</i>  <span class="icon icon-star"></span></div>'+
	                                    '</div>'+
	                                    
	                                '</dd>'+
	                            '</dl>'
                        	}

                            // div.append(html);

                        	$('#comment_list').append(html)

                        }

                }
                ,
                complete:function(){

                    if(num==1){
                        load_click.text('点击加载更多');
                        count+=10;
                        
                    }else{
                        load_click.text('已全部加载');
                        return;
                    }

                    // 再次进行点赞人数的判断


                    var allcomns=$('#comment_list dl');
                    var userId=$('#i_user').attr('data-userId');


					allcomns.each(function(index,item){
						var $item=$(item);
						var pripeo=$item.attr('data-pripeople')
						var i=$item.find('.zan i');
						var emoji=$item.find('.zan span');

						if(pripeo){

							var people=pripeo.split(',');

							if(people.indexOf(userId)>-1){
								i.text('已赞');
								i.css('color','#C80000');
								emoji.css('color','#C80000');
							}
							$item.removeAttr('data-pripeople');

						}else{
							$item.removeAttr('data-pripeople');
						}
							
						
					})







                }

            })

        })

	})()


	// 发送评论
	
	var com_send=(function(){

		// 没有登录，发表评论提示

		$('#form_send').on('tap','#i_send',function(){

			if($('#top_nouser').attr('data-user')){
		        $.alert('请先登录');
		        return false;
			}


			if($('#com_input').val()==''){
			    $.alert('评论不能为空');
				return false;
			}
			var data=$('#form_send').serialize();
			$.ajax({
				type:'post',
				url:'/user/mComment',
				data:data,
				cache:false,
				dataType:'json',

				success:function(data){

					var comment=data.comment,
						comment_id=comment._id,
						pripeople=comment.pripeople,
						pic=data.pic;

                	var date=new Date().ago(comment.meta.createAt)

                	if(pic.length>6){
                        var html=
                        '<dl class="com-box" data-pripeople="'+pripeople+'">'+
                            '<dt class="com-img" data-commentid="'+comment_id+'">'+
                                '<img src="/upload/'+pic+'" alt="用户头像"/>'+
                            '</dt>'+

                            '<dd class="com-wrap">'+
                                '<h1 class="com-title">'+comment.username+'</h1>'+
                                '<p class="com-con">'+comment.content+'</p>'+
                                '<div class="com-zan">'+
                                    '<span class="time">'+date+'</span>'+
                                    '<div class="zan"><i class="peo-prise">赞</i>  <span class="icon icon-star"></span></div>'+
                                '</div>'+
                                
                            '</dd>'+
                        '</dl>'
                	}else{
                		var html=
                        '<dl class="com-box" data-pripeople="'+pripeople+'">'+
                            '<dt class="com-img" data-commentid="'+comment_id+'">'+
                                '<img src="/images/moren.png" alt="默认头像"/>'+
                            '</dt>'+

                            '<dd class="com-wrap">'+
                               '<h1 class="com-title">'+comment.username+'</h1>'+
                                '<p class="com-con">'+comment.content+'</p>'+
                                '<div class="com-zan">'+
                                    '<span class="time">'+date+'</span>'+
                                    '<div class="zan"><i class="peo-prise">赞</i>  <span class="icon icon-star"></span></div>'+
                                '</div>'+
                                
                            '</dd>'+
                        '</dl>'
                	}


                if($('#commen_new').length>0){
	                $('#commen_new .com-box').eq(0).before(html);
                }else{
                	if($('.not-comment').length>0){
                		$('.not-comment').hide();
	                	$('#comment_list').append(html);
                	}else{
                		$('#comment_list').append(html);
                	}
                }




                	


				},

				complete:function(){
					$.toast('评论成功', 2000, 'success-sub');
					$('#com_input').val('');
				}

			})

		})

	})()


	// 收藏

	var collect=(function(){

		var click=$('#collect'),
			movieId=$('#top_movie').attr('data-movieId'),
			userId=$('#i_user').attr('data-userId');

		var colpeo=$('#top_movie').attr('data-colpeo');
		var change=$('#collect');

		if(colpeo.split(',').indexOf(userId)>-1){
			change.find('i').text('已收藏');
			change.find('i').css('color','#C80000');
			change.find('span').css('color','#C80000');

		}

		$('#top_movie').removeAttr('data-colpeo');

		click.tap(function(){

			$.ajax({
				type:'post',
				url:'/m/user/mShoucang',
				cahce:false,
				data:{
					userId:userId,
					movieId:movieId
				},
				success:function(data){
					
					if(data.col==1){
						change.find('i').text('已收藏');
						change.find('i').css('color','#C80000');
						change.find('span').css('color','#C80000');
					}else{
						change.find('i').text('收藏');
						change.find('i').css('color','#222');
						change.find('span').css('color','#222');
					}

				}
			})
			
		})

	})()


	//点赞

	var prise=(function(){

		var movieId=$('#top_movie').attr('data-movieId'),
			userId=$('#i_user').attr('data-userId');

		// 页面点进检查赞的人

		var allcomns=$('#comment_list dl');

		allcomns.each(function(index,item){
			var $item=$(item);
			var i=$item.find('.zan i');
			var emoji=$item.find('.zan span');


			var pripeo=$item.attr('data-pripeople');
			
			if(pripeo){
				var people=pripeo.split(',')

				if(people.indexOf(userId)>-1){
					i.text('已赞');
					i.css('color','#C80000');
					emoji.css('color','#C80000');
				}

				$item.removeAttr('data-pripeople');
			}

			
			

		})


		var newcomns=$('#commen_new dl');

		newcomns.each(function(index,item){
			var $item=$(item);
			var i=$item.find('.zan i');
			var emoji=$item.find('.zan span');


			var pripeo=$item.attr('data-pripeople');
			
			if(pripeo){
				var people=pripeo.split(',')

				if(people.indexOf(userId)>-1){
					i.text('已赞');
					i.css('color','#C80000');
					emoji.css('color','#C80000');
				}

				$item.removeAttr('data-pripeople');
			}


		})






		// 功能实现

		function zan(el){

			var tarEl=el.parentNode.parentNode.parentNode.parentNode.children[0];
			var commentId=tarEl.getAttribute('data-commentId');

			

			$.ajax({
				type:'post',
				url:'/m/user/prise',
				data:{
					userId:userId,
					movieId:movieId,
					commentId:commentId
				},
				cache:false,
				success:function(data){
					var pri=data.pri;
					if(pri==1){

						el.innerHTML='已赞';
						el.style.color='#C80000';
						el.parentNode.children[1].style.color='#C80000';
					}else{
						el.innerHTML='赞';
						el.style.color='#222';
						el.parentNode.children[1].style.color='#222';
					}

				}
			})
		}


		function star(el){

			var tarEl=el.parentNode.parentNode.parentNode.parentNode.children[0];
			var commentId=tarEl.getAttribute('data-commentId');

			

			$.ajax({
				type:'post',
				url:'/m/user/prise',
				data:{
					userId:userId,
					movieId:movieId,
					commentId:commentId
				},
				cache:false,
				success:function(data){
					var pri=data.pri;
					if(pri==1){
						el.style.color='#C80000';
						el.parentNode.children[0].innerHTML='已赞';
						el.parentNode.children[0].style.color='#C80000';
					}else{
						el.style.color='#222';
						el.parentNode.children[0].innerHTML='赞';
						el.parentNode.children[0].style.color='#222';
					}

				}
			})
		}


		// 全部评论

		$('#comment_list').on('click',function(e){

			var clsName=e.target.className;

			switch(clsName){
				case 'peo-prise':
					zan(e.target);
					break;
				case 'icon icon-star':
					star(e.target);
					break;
				default:
					return;
			}


		})

		// 最近评论


		$('#commen_new').on('click',function(e){

			var clsName=e.target.className;

			switch(clsName){
				case 'peo-prise':
					zan(e.target);
					break;
				case 'icon icon-star':
					star(e.target);
					break;
				default: 
					return;
			}


		})


	})()



	





});