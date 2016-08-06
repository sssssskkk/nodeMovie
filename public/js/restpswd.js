$(document).ready(function() {
    function i() {
        function i(i) {
            return i.replace(/[^\x00-xff]/g, "xx").length
        }
        function t(i, t) {
            for (var s = 0, e = 0; e < i.length; e++)
                i.charAt(e) == t && s++;
            return s
        }
        $('#rest input:not([type="button"])').focus(function() {
            $(this).css("border", "1px solid #4193D7")
        }).blur(function() {
            $(this).css("border", "1px solid #ccc")
        });
        var s = /[^\w\u4e00-\u9fa5]/g
          , e = ($("#rest .box").eq(0).find("input"),
        $("#rest .box").eq(0).find("p"),
        $("#rest .box").eq(1).find("input"))
          , n = $("#rest .box").eq(1).find("p")
          , l = $("#rest .box").eq(2).find("input")
          , o = $("#rest .box").eq(2).find("p");
        e.focus(function() {
            n.css({
                visibility: "visible"
            })
        }),
        e.keyup(function() {
            n.css({
                visibility: "hidden"
            }),
            n.text("8-20位字符，推荐字母、数字和符号组合的密码")
        }),
        e.blur(function() {
            var e = i($(this).val())
              , l = t($(this).val(), $(this).val()[0]);
            "" == $(this).val() ? (n.text("密码不能为空"),
            n.css({
                visibility: "visible"
            })) : s.test($(this).val()) ? (n.text("密码设置不符合规则"),
            n.css({
                visibility: "visible"
            })) : 8 > e || e > 20 ? (n.text("长度应为8-20字符"),
            n.css({
                visibility: "visible"
            })) : $(this).val().length == l ? (n.text("密码不能为相同字符"),
            n.css({
                visibility: "visible"
            })) : (n.css({
                visibility: "hidden"
            }),
            n.text(""))
        }),
        l.focus(function() {
            o.css({
                visibility: "visible"
            }),
            o.text("再次输入密码")
        }),
        l.keyup(function() {
            o.css({
                visibility: "hidden"
            })
        }),
        l.blur(function() {
            return "" == $(this).val() ? (o.text("确认密码不能为空"),
            o.css({
                visibility: "visible"
            }),
            !1) : void ($(this).val() !== e.val() && (o.text("两次输入密码不同"),
            o.css({
                visibility: "visible"
            })))
        }),
        $("#send").click(function() {
            var i = $(".resbox-hd span").data("id")
              , t = $("#rest .box").eq(0).find("input").val()
              , s = $("#rest .box").eq(1).find("input").val()
              , e = $("#rest .box").eq(0).find("input")
              , n = ($("#rest .box").eq(0).find("p"),
            $("#rest .box").eq(1).find("input"))
              , l = ($("#rest .box").eq(1).find("p"),
            $("#rest .box").eq(2).find("input"));
            $("#rest .box").eq(2).find("p");
            "" != e.val() && "" != n.val() && "" != l.val() ? $.ajax({
                type: "post",
                url: "/user/restsend",
                data: {
                    userId: i,
                    pswd: t,
                    newpswd: s
                },
                cache: !1,
                success: function(i) {
                    0 == i.msg ? alert("信息验证失败") : (alert("修改成功，点击确定返回首页"),
                    window.location.href = "/")
                }
            }) : alert("信息填写不完整")
        })
    }
    i()
});
