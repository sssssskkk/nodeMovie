$(document).ready(function() {
    function t() {
        (function() {
            $(".load .showuser").mouseover(function() {
                $(this).find("ul").stop().slideDown("fast")
            }),
            $(".load .showuser").mouseout(function() {
                $(this).find("ul").stop().slideUp("fast")
            })
        })(),
        function() {
            $(window).scroll(function() {
                var t = $(window).scrollTop()
                  , e = $(".container").height() - $(".nav").height();
                t > 93 && e + 93 > t ? $(".nav").css({
                    position: "absolute",
                    left: "0",
                    top: t - 93 + "px"
                }) : 93 > t && $(".nav").css({
                    position: "absolute",
                    left: "0px",
                    top: "0px"
                })
            })
        }(),
        function() {
            var t = $(".page-prev")
              , e = $(".page-next")
              , a = window.location.pathname
              , n = ""
              , s = ""
              , r = ""
              , i = window.location.search
              , f = $(".btm_nav ul .a-page")
              , l = parseInt(f.eq(f.length - 1).find("a").text().trim())
              , o = i.split("&p=")[1]
              , p = parseInt(o) - 1
              , h = parseInt(o) + 1;
            if (0 > o)
                return !1;
            o >= 0 && 10 > o ? (n = i.slice(0, i.length - 1),
            s = i.substr(0, i.length - 1) + p,
            r = i.substr(0, i.length - 1) + h) : o >= 10 && 100 > o ? (n = i.slice(0, i.length - 2),
            s = i.substr(0, i.length - 2) + p,
            r = i.substr(0, i.length - 2) + h) : (n = i.slice(0, i.length - 3),
            s = i.substr(0, i.length - 3) + p,
            r = i.substr(0, i.length - 3) + h),
            0 == o ? t.attr("href", "javascript:;").css("background", "#f1f1f1") : t.attr("href", s),
            o == l - 1 ? e.attr("href", "javascript:;").css("background", "#f1f1f1") : e.attr("href", r);
            var c = f.last().find("a")
              , d = parseInt(c.text()) - 5
              , u = parseInt(c.text())
              , g = '<li class="a-page"><a>...</a></li>'
              , x = '<li class="a-page"><a href="' + a + n + (parseInt(o) - 1) + '">' + parseInt(o) + "</a></li>";
            if (o > 4 && d > o && u > 10 && (f.eq(0).after(g),
            f.eq(1).find("a").text(parseInt(o) - 1).attr("href", a + n + (parseInt(o) - 2)).after(x),
            f.eq(2).find("a").text(parseInt(o) + 1).attr("href", a + n + parseInt(o)).addClass("a_click"),
            f.eq(3).find("a").text(parseInt(o) + 2).attr("href", a + n + (parseInt(o) + 1)),
            f.eq(4).find("a").text(parseInt(o) + 3).attr("href", a + n + (parseInt(o) + 2))),
            o >= d && u > o && o > 4) {
                f.eq(0).find("a").text("1").attr("href", a + n + 0),
                f.eq(1).empty().append("<a>...</a>"),
                f.eq(2).find("a").text(u - 4).attr("href", a + n + (u - 5)),
                f.eq(3).find("a").text(u - 3).attr("href", a + n + (u - 4)),
                f.eq(4).find("a").text(u - 2).attr("href", a + n + (u - 3)),
                f.eq(5).find("a").text(u - 1).attr("href", a + n + (u - 2));
                for (var I = 2; I < f.length - 1; I++)
                    parseInt(f.eq(I).find("a").text()) - 1 == o && (f.eq(I).find("a").addClass("a_click"),
                    f.eq(I).find("a").siblings().removeClass("a_click"))
            }
        }()
    }
    t()
});
