$(document).ready(function(){

   

    function main(){

    $('#body').height($('body').height()-220);

    var device=window.navigator.userAgent;

    var reg=/(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i

    if(reg.test(device)){

        $('body').width($('.header_wrapper').width())
    }else{
        
        if($('body').height()<800&&$('body').height()>0 || $('html').height()<900&&$('html').height()>0){
            $('body').height('800') || $('html').height('800');
        }
    }


  



    var input_user=$(".form input").eq(0);
    var input_pswd=$(".form input").eq(1);
    var input_rpswd=$(".form input").eq(2);
    var input_email=$(".form input").eq(3);
    var bground=$('#rpsw').parent();
    var msg_user=$(".form span").eq(0);
    var msg_pswd=$(".form span").eq(1);
    var msg_rpswd=$(".form span").eq(2);
    var msg_email=$(".form span").eq(3);
    var user_num=0;
    var pswd_num=0;

    var userpandaun,pswdpanduan;



    function getNum(str){
        return str.replace(/[^\x00-xff]/g,"xx").length;
    }

    function findstr(str,x){
        var s=0;
        for(var i=0;i<str.length;i++){
            if(str.charAt(i)==x){
                s++;
            }
        }
        return s;
    }


    var re=/[^\w\u4e00-\u9fa5]/g;




    input_user.focus(function(){
        msg_user.css({"visibility":"visible"});
    });


    input_user.keyup(function(){
        msg_user.css({"visibility":"hidden"});
        msg_user.css('color','#999');
        msg_user.text("8-20位字符，可使用中文、字母、数字和符号");
        $('#userstatus').text('');
    });


    input_user.blur(function(){

        user_num=getNum($(this).val());

        if($(this).val()==""){
            msg_user.text("用户名不能为空");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});
            userpandaun=false;
        }

        else if(re.test($(this).val())){
            msg_user.text("用户名输入不符合规则");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});
            userpandaun=false;
        }


        else if(user_num<8||user_num>20){
            msg_user.text("长度应为8-20字符");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});
            userpandaun=false;
        }
        else{
            msg_user.css({"visibility":"hidden"});
            userpandaun=true;

            $.ajax({
                url:'/usertest',
                type:'post',
                data:{
                    username:$('#user').val()
                },
                cache:false,
                dataType:'json',
                success:function(data){
                    var num=data.num;
                    if(num==0){                               
                        $('#userstatus').text(data.msg).css('color','#E53627');
                        userpandaun=false;
                    }else if(num==1){
                        $('#userstatus').text(data.msg).css('color','#4DAE51');
                        userpandaun=true;
                    }
                }
            })



        }


    });






    input_pswd.focus(function(){

        user_num=getNum(input_user.val());

        if(input_user.val()==""){
            msg_user.text("用户名不能为空");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});
            msg_pswd.css({"visibility":"hidden"});
        }else if(re.test(input_user.val())){
            msg_user.text("用户名输入不符合规则");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});
        }else if(user_num<8||user_num>20){
            msg_user.text("长度应为8-20字符");
            msg_user.css('color','#F23131');
            msg_user.css({"visibility":"visible"});

        }
        else if(input_pswd.val()!==""&&input_rpswd.val()!==""){
            msg_rpswd.text("");
            msg_rpswd.css({"visibility":"hidden"})
        }
        else if(input_pswd.val()!==input_rpswd.val()){
            msg_rpswd.text("两次输入密码不同");
            msg_rpswd.css('color','#F23131');
            msg_rpswd.css({"visibility":"visible"})
        }

        else{
            msg_pswd.text("8-20位字符，推荐字母、数字和符号组合的密码");
            msg_pswd.css('color','#999');
            msg_pswd.css({"visibility":"visible"});
        }

    });





    input_pswd.keyup(function(){
        msg_pswd.css({"visibility":"hidden"});
        msg_pswd.text("8-20位字符，推荐字母、数字和符号组合的密码");
        msg_pswd.css('color','#999');
        input_rpswd.attr("disabled",false);
        input_rpswd.css('background','#fff');
        bground.css('background','#fff');
    });





    input_pswd.blur(function(){

        pswd_num=getNum($(this).val());
        var pswd_length=findstr($(this).val(),$(this).val()[0]);


        if(pswd_num<8||pswd_num>20){
            msg_pswd.text("密码长度应为8到20字节");
            msg_pswd.css('color','#F23131');
            msg_pswd.css({"visibility":"visible"});
            input_rpswd.attr("disabled","true");
            input_rpswd.css('background','#ddd');
            bground.css('background','#ddd');
            pswdpanduan=false;
        }



        else if($(this).val()==""){
            msg_pswd.text("密码不能为空");
            msg_pswd.css('color','#F23131');
            msg_pswd.css({"visibility":"visible"});
            input_rpswd.attr("disabled","true");
            input_rpswd.css('background','#ddd');
            bground.css('background','#ddd');
            pswdpanduan=false;
        }


        else if(re.test($(this).val())){
            msg_pswd.text("密码设置不符合规则");
            msg_pswd.css('color','#F23131');
            msg_pswd.css({"visibility":"visible"});
            input_rpswd.attr("disabled","true");
            input_rpswd.css('background','#ddd');
            bground.css('background','#ddd');
            pswdpanduan=false;
        }
      

        else if($(this).val().length==pswd_length){
            msg_pswd.text("密码不能为相同字符");
            msg_pswd.css('color','#F23131');
            msg_pswd.css({"visibility":"visible"});
            input_rpswd.attr("disabled",true);
            input_rpswd.css('background','#ddd');
            bground.css('background','#ddd');
            pswdpanduan=false;
        }


        else{

            msg_pswd.css({"visibility":"hidden"});
            msg_pswd.text("");
            input_rpswd.attr("disabled",false);
            input_rpswd.css('background','#fff');
            bground.css('background','#fff');
            pswdpanduan=true;
        }


    });


   

    input_rpswd.focus(function(){


        if(input_pswd.val()==""){
            msg_pswd.css({"visibility":"visible"});
            msg_pswd.text("密码不能为空")
            msg_pswd.css('color','#F23131');
        }
      
        else if(input_pswd.val()!==""&&input_rpswd.val()!==""){
            msg_rpswd.text("");
            msg_rpswd.css({"visibility":"hidden"})
        }


        else{
            msg_rpswd.css({"visibility":"visible"});
            msg_rpswd.css('color','#999');
            msg_rpswd.text("再次输入密码");
        }
    });



    input_rpswd.keyup(function(){
        msg_rpswd.css({"visibility":"hidden"});
    });



    input_rpswd.blur(function(){
       if($(this).val()!==input_pswd.val()){
           msg_rpswd.text("两次输入密码不同");
           msg_rpswd.css('color','#F23131');
           msg_rpswd.css({"visibility":"visible"});
       }else{
           msg_rpswd.css({"visibility":"hidden"});
           msg_rpswd.css('color','#999');
           msg_rpswd.text("再次输入密码");
       }

    });




    var temail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g;

    input_email.focus(function(){
        msg_email.text("请输入格式正确的电子邮箱")
        msg_email.css({"color":"#999"});
        msg_email.css({"visibility":"visible"});
    });



    input_email.keyup(function(){
        msg_email.css({"visibility":"hidden"});
    });


    input_email.blur(function(){
       if(!temail.test($(this).val())){
           msg_email.text("邮箱格式不正确");
           msg_email.css({"color":"#F23131"});
           msg_email.css({"visibility":"visible"});
       };




    });



    var send=(function(){

        $("#submit").click(function(){

            var s=0;

                for(var i=0;i<$(".form input").size()-1;i++){
                    if($(".form input").eq(i).val()==""){
                        s++;
                    }
                }

            if(s!=0){
                alert("信息填写不全");

                return false;
            }else if($('#psw').val()!==$('#rpsw').val()){
                alert('两次输入密码不同');
                return false;
            }else if(pswdpanduan==false||userpandaun==false){
                alert('信息填写不规范');
                return false;
            }

          

        });


    })()

    }

    main();










});
