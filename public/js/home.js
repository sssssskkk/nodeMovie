$(document).ready(function() {
    function i() {
        (function() {
            function i(i, s, e) {
                function d() {
                    l == o && ($("#slide .pic").css({
                        left: 0
                    }),
                    l = 1),
                    -1 == l && ($("#slide .pic").css({
                        left: -(o - 1) * i
                    }),
                    l = o - 2),
                    $("#slide .pic").stop().animate({
                        left: -l * i
                    }, e),
                    l == o - 1 ? $("#slide .num li").eq(0).addClass("on").siblings().removeClass("on") : $("#slide .num li").eq(l).addClass("on").siblings().removeClass("on")
                }
                var l = 0
                  , t = $("#slide .pic li").first().clone();
                $("#slide .pic").append(t);
                var o = $("#slide .pic li").size()
                  , a = $("#slide .pic li").first().width()
                  , c = -(a - n) / 2;
                a > n ? $("#slide .pic").css({
                    "margin-left": c + "px"
                }) : $("#slide .pic").css({
                    margin: "0 auto"
                });
                for (var r = 0; o - 1 > r; r++)
                    $("#slide .num").append("<li></li>");
                $("#slide .num li").first().addClass("on"),
                $("#slide .num li").click(function() {
                    var s = $(this).index();
                    l = s,
                    $("#slide .pic").stop().animate({
                        left: -s * i
                    }, e),
                    $(this).addClass("on").siblings().removeClass("on")
                });
                var v = setInterval(function() {
                    l++,
                    d()
                }, s);
                $("#slide").hover(function() {
                    clearInterval(v)
                }, function() {
                    v = setInterval(function() {
                        l++,
                        d()
                    }, s)
                }),
                $("#slide .slide_l").click(function() {
                    l--,
                    d()
                }),
                $("#slide .slide_r").click(function() {
                    l++,
                    d()
                })
            }
            var s, e, d, n = $("body").width(), l = $(".num-wrap"), t = $("#toTop");
            n > 1380 ? (d = ($("body").width() - $("#body .div").width()) / 2 - t.width() - 20,
            t.css("right", d),
            l.width(1380),
            s = 40,
            e = 40) : (s = 40,
            e = 1380 - n + 40,
            l.width(n),
            t.css("right", "20px")),
            $("#slide .slide_l").css({
                left: s + "px"
            }),
            $("#slide .slide_r").css({
                right: e + "px"
            }),
            i(1380, 3e3, 500),
            t.click(function() {
                $("html,body").animate({
                    scrollTop: 0
                }, 200)
            }),
            $(document).scroll(function() {
                $(document).scrollTop() > 10 ? t.css("visibility", "visible") : t.css("visibility", "hidden")
            })
        })(),
        function() {
            $(".load .showuser").mouseover(function() {
                $(this).find("ul").stop().slideDown("fast")
            }),
            $(".load .showuser").mouseout(function() {
                $(this).find("ul").stop().slideUp("fast")
            })
        }(),
        function() {
            var i = sessionStorage.getItem("tuisong");
            1 != i && (setTimeout(function() {
                $.get("/movie/random", function(i) {
                    var s = i.movie
                      , e = s.hotword;
                    "" == e && (e = "一部好片~");
                    var d = '<div id="mask"><div id="random"><div id="top-title"><h1>为你推荐</h1></div><div id="r-close">x</div><div id="more"><a href="/movie/' + s._id + '">点击查看</a></div><div class="r-left"><div class="pic-wrap"><div class="r-pic"><a href="/movie/' + s._id + '"><img src="' + s.poster + '" alt="' + s.title + '"></a></div></div></div><div class="r-right"><div class="tell"><div class="name"><h1>' + s.title + '</h1></div><div class="average"><p><span>评分：</span>' + s.average + '</p></div><div class="director"><p><span>导演：</span>' + s.director + '</p></div><div class="actors"><p><span>主演：</span>' + s.actors + '</p></div><div class="genes"><p><span>类型：</span>' + s.genres + '</p></div><div class="kandian"><p><span>看点：</span>' + e + "</p></div></div></div></div></div>";
                    $("body").append(d),
                    sessionStorage.setItem("tuisong", "1")
                }, "json")
            }, 100),
            $("body").delegate("#r-close", "click", function() {
                $(this).parent().remove(),
                $("#mask").remove()
            }))
        }()
    }
    i()
});
