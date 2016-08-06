$(document).ready(function() {
    


    function a() {
        var g = $(".form input").eq(0);
        var f = $(".form input").eq(1);
        var b = $(".form span").eq(0);
        var d = $(".form span").eq(1);
        var h = (function() {
            if ($.cookie("userCookie") == "true") {
                $("#checkbox").attr("checked", true);
                $("#user").val($.cookie("username"));
                $("#psw").val($.cookie("password"))
            } else {
                return false;
            }
        })();
        
        var e = (function() {
            $("#submit").click(function() {
                if ($("#checkbox").is(":checked")) {
                    var k = $("#checkbox");
                    var j = $("#user").val();
                    var i = $("#psw").val();
                    $.cookie("userCookie", "true", {
                        expires: 7
                    });
                    $.cookie("username", j, {
                        expires: 7
                    });
                    $.cookie("password", i, {
                        expires: 7
                    })
                } else {
                    $.cookie("userCookie", "false", {
                        expires: -1
                    });
                    $.cookie("username", "", {
                        expires: -1
                    });
                    $.cookie("password", "", {
                        expires: -1
                    })
                }
            })
        })();
        var c = (function() {
            $("#submit").click(function() {
                var j = $("#user").val();
                var i = $("#psw").val();
                $.ajax({
                    type: "post",
                    url: "/m/signin",
                    data: {
                        user: j,
                        pswd: i
                    },
                    cache: false,
                    dataType: "json",
                    success: function(data) {
                        var l = data.msg;
                        switch(l){
                            case 0:
                                $.toast('用户名不存在', 2000, 'success-sub');
                                break;
                            case 1:
                                window.location.href = "/m/index";
                                break;
                            case 2:
                                $.toast('密码错误', 2000, 'success-sub');
                                break;
                            default:
                                return;
                        }


                    }
                })
            })
        })()
    }
    a()
});
