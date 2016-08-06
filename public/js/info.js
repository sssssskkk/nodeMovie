$(document).ready(function() {
	
    function a() {
        var b = (function() {
            $(".load .showuser").mouseover(function() {
                $(this).find("ul").stop().slideDown("fast")
            });
            $(".load .showuser").mouseout(function() {
                $(this).find("ul").stop().slideUp("fast")
            })
        })();
        var c = (function() {
            var i = $(".wrap_nav li");
            var h = $(".wrap_info>div");
            i.each(function(k, l) {
                var j = $(this);
                j.click(function() {
                    i.find("a").removeClass("tablin");
                    $(this).find("a").addClass("tablin");
                    h.eq(k).addClass("content").siblings().removeClass("content")
                })
            })
        })();
        var e = (function() {
            var l = window.location.search.slice(3);
            var k = parseInt(parseInt(l) + 1);
            var j = parseInt($(".page-turn").find("span").text());
            var i = $(".page-turn").find("button");
            var h = $("#md");
            h.focus(function() {
                $(this).css("outline", "none")
            });
            if ($("#mylove").data("colcount") <= 8) {
                $("#page-next").attr("href", "javascript:;").css("background", "#d3d3d3");
                $("#page-prev").attr("href", "javascript:;").css("background", "#d3d3d3")
            } else {
                if (parseInt(l) == 0) {
                    $("#page-prev").attr("href", "javascript:;").css("background", "#d3d3d3")
                } else {
                    if (k == j) {
                        $("#page-next").attr("href", "javascript:;").css("background", "#d3d3d3")
                    }
                }
            }
            i.click(function() {
                var n = parseInt($("#page_input").find("input").val() - 1);
                var m = window.location.href.split("?")[0] + window.location.search.slice(0, 3) + n + "#md";
                if (n >= 0 && n < j) {
                    window.location = m
                } else {
                    alert("您所访问的页面不存在");
                    return false
                }
            })
        })();
        var g = (function() {
            var h = $("#change");
            var i = $("#login_username").text().trim();
            h.click(function() {
                var j = '<div id="mask"><div id="update-info" class="update-info"><div id="m-close">x</div><div class="update-title"><h1>修改资料</h1></div><form action="#" method="post"><div class="box"><p>用户名：<span>' + i + '</span></p></div><div class="box">性别：<label><input type="radio" name="sex" value="男">男</label><label><input type="radio" name="sex" value="女">女</label></div><div class="box"><label for="age">年龄：<input type="text" name="age" id="age" value=""></label></div><div class="box"><label for="email">邮箱：<input type="email" name="email" id="email" value=""></label></div><div class="comfirm"><input type="button" id="update-confirm" value="确认"><button id="cancle" type="button">取消</button></div></form></div></div>';
                $(j).insertAfter("#contai-info");
                $("#mask").fadeIn(180);
                $("#contai-info").css({
                    "-webkit-filter": "blur(3px)",
                    "-moz-filter": "blur(3px)",
                    "-ms-filter": "blur(3px)",
                    "-o-filter": " blur(3px)",
                    filter: "blur(3px)",
                    filter: " progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false)"
                })
            });
            $("body").delegate("#m-close", "click", function() {
                $(this).parent().remove();
                $("#mask").remove();
                $("#contai-info").css({
                    "-webkit-filter": "none",
                    "-moz-filter": "none",
                    "-ms-filter": "none",
                    "-o-filter": " none",
                    filter: "none"
                })
            });
            $("body").delegate("#cancle", "click", function() {
                $("#update-info").remove();
                $("#mask").remove();
                $("#contai-info").css({
                    "-webkit-filter": "none",
                    "-moz-filter": "none",
                    "-ms-filter": "none",
                    "-o-filter": " none",
                    filter: "none"
                })
            })
        })();
        var d = (function() {
            $("body").delegate("#update-confirm", "click", function(k) {
                var j = $("#update-info form");
                var h = j.find('input[name="sex"]:checked').val();
                var m = j.find('input[name="age"]').val();
                var l = j.find('input[name="email"]').val();
                var i = $("#login_username").data("colid");
                $.ajax({
                    type: "POST",
                    url: "/user/updateinfo",
                    data: {
                        age: m,
                        sex: h,
                        email: l,
                        user: i
                    },
                    cache: false,
                    success: function(n) {
                        window.location.reload(true)
                    }
                })
            })
        })();
        var f = (function() {
            $("#picupload").click(function() {
                if ($("#file_pic_uoload").val() == "") {
                    return false
                }
            })
        })()
    }
    a()
});
