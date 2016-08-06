$(document).ready(function() {
	

    function a() {
        $('#body').height($('body').height() - 200);
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
                return false
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
                    url: "/signin",
                    data: {
                        user: j,
                        pswd: i
                    },
                    cache: false,
                    dataType: "json",
                    success: function(k) {
                        var l = k.msg;
                        if (l == 0) {
                            $("#showinfo").text("用户名不存在")
                        } else {
                            if (l == 1) {
                                window.location.href = "/"
                            } else {
                                if (l == 2) {
                                    $("#showinfo").text("密码错误")
                                }
                            }
                        }
                    }
                })
            })
        })()
    }
    a()
});
