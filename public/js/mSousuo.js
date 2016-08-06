$(function(){
   // 照片大小调整
   var imgs=$('.content .item-media img');
   imgs.each(function(index,item){
   		var $item=$(item);
   		var width=$item.width();
   		
   		var height=$item.height(width*1.3965);
   })


    var lis=$('.content li');

    if(lis.length<3){
    	$('#footer').css({
    		'position':'absolute',
    		'bottom':0,
    		'left':0
    	})
    }



   // 目录出现

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


    // 搜索结果少时，底部调整

   

})