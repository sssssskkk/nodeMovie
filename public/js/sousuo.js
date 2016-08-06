var search_num=$('.con_search');
if(search_num.length<=1){
    $('body').css({
        'height':'100%',
        'padding-top':'50px',
        'padding-bottom':'160px',
        '-webkit-box-sizing':'border-box',
        '-moz-box-sizing':'border-box',
        'box-sizing':'border-box'
    });
    $('#body').css('height','100%')
    $('#header').css('margin-top','-50px');
    $('#footer').css('margin-bottom','-160px');
}

var topUserShow=(function(){

        $('.load .showuser').mouseover(function(){
            $(this).find('ul').stop().slideDown('fast');
        })

        $('.load .showuser').mouseout(function(){
            $(this).find('ul').stop().slideUp('fast');
        })

})()