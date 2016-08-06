$(document).ready(function(){

	var device=(function(){
        var device=window.navigator.userAgent;
        var reg=/(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i
        if(!reg.test(device)){
            window.location.href='/register'
        }
    })()

    function main(){


  	var user=$('#user')
  	var pswd=$('#psw')
  	var rpswd=$('#rpsw')
  	var email=$('#eMail')

  	var submit=$('#submit')


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

    // 特殊字符检测
    var re=/[^\w\u4e00-\u9fa5]/g;

    // 邮箱正则
    var temail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g;

    var test=false;


	submit.click(function(){

		if(user.val()==''||pswd.val()==''|| rpswd.val()==''||email.val()==''){
			$.toast('所有项为必填项', 2000, 'success-sub');
    		test=false;
    		return;
		}else{
			test=true;
		}

    	// 用户名检测
		if(re.test(user.val())){
			$.toast('用户名应为8-20位汉字数字或者字母', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

		if(getNum(user.val())<8||getNum(user.val())>20){
			$.toast('用户名应为8-20位汉字数字或者字母', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

		// 密码检测
    	
		if(re.test(pswd.val())){
			$.toast('密码应为8-20位字母、数字和符号', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

    	if(getNum(pswd.val())<8||getNum(pswd.val())>20){
			$.toast('密码应为8-20位字母、数字和符号', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

		if(pswd.val().length==findstr(pswd.val(),pswd.val()[0])){
			$.toast('密码不能为相同字符', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

		// 确认密码检测

		if(pswd.val()!==rpswd.val()){
			$.toast('两次输入密码不同', 2000, 'success-sub');
			test=false;
			return;
		}else{
			test=true;
		}

    	// 邮箱检测

    	if(!temail.test(email.val())){
    		$.toast('邮箱格式不正确', 2000, 'success-sub');
    		test=false;
    		return;

    	}else{
			test=true;
		}



		//发起请求

		if(test==true){

			$.ajax({
				type:'post',
				url:'/m/register',
				data:$('#form').serialize(),
				cache:false,
				success:function(data){
					if(data.status==2){
						$.toast('用户已经存在', 2000, 'success-sub');
						return;
					}else if(data.status==1){
						$.toast('注册成功', 2000, 'success-sub');
						setTimeout(function(){
							window.location.href='/m/login';
						},2000)
					}
				}
			})

		}

	})


    }

    main();










});
