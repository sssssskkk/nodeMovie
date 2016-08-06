$(function() {
    function e() {
        (function() {
            var e = $("#com_login");
            $("#change"),
            $("#login_username").text().trim();
            e.click(function() {
                var e = '<div id="mask"><div id="update-info" class="update-info"><div class="message"><div class="c-login"><div id="m-close">x</div><div class="update-title"><h1>用户登录<a href="/register">注册</a></h1></div><div class="form clearfix"><form action="#" method="post"><div class="write"><div class="input inputuser"><em class="usericon"><i class="iconfont">&#xe617;</i></em> <label for="com_sign_user"><input type="text" id="com_sign_user" name="user_name" maxlength="25" autocomplete="off" placeholder="用户名"></label> <span class="usertxt clearfix"></span></div><div class="input inputpawd"><em class="paswicon"><i class="iconfont">&#xe692;</i></em> <label for="com_sign_pswd"><input type="password" id="com_sign_pswd" name="user_paswd" maxlength="25" autocomplete="off" placeholder="密码"></label>   <span class="paswtxt"></span></div></div><div class="sign"><div class="keepalive"><label><input type="checkbox" id="com_checkbox"> 记住密码</label></div><div class="comfirm"><input type="button" id="update-confirm" value="登录"></div></div></form></div></div></div></div></div>';
                $(e).insertAfter("#contai-info"),
                $("#mask").fadeIn(180),
                $("#contai-info").css({
                    "-webkit-filter": "blur(3px)",
                    "-moz-filter": "blur(3px)",
                    "-ms-filter": "blur(3px)",
                    "-o-filter": " blur(3px)",
                    filter: "blur(3px)",
                    filter: " progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false)"
                })
            }),
            $("body").delegate("#m-close", "click", function() {
                $(this).parent().remove(),
                $("#mask").remove(),
                $("#contai-info").css({
                    "-webkit-filter": "none",
                    "-moz-filter": "none",
                    "-ms-filter": "none",
                    "-o-filter": " none",
                    filter: "none"
                })
            }),
            $("body").delegate("#cancle", "click", function() {
                $("#update-info").remove(),
                $("#mask").remove(),
                $("#contai-info").css({
                    "-webkit-filter": "none",
                    "-moz-filter": "none",
                    "-ms-filter": "none",
                    "-o-filter": " none",
                    filter: "none"
                })
            })
        })(),
        function() {
            $("#com_login").click(function() {
                return "true" != $.cookie("userCookie") ? !1 : ($("#com_checkbox").attr("checked", !0),
                $("#com_sign_user").val($.cookie("username")),
                $("#com_sign_pswd").val($.cookie("password")),
                void 0)
            })
        }(),
        function() {
            $("#update-confirm").click(function() {
                if ($("#com_checkbox").is(":checked")) {
                    var e = ($("#com_checkbox"),
                    $("#com_sign_user").val())
                      , a = $("#com_sign_pswd").val();
                    $.cookie("userCookie", "true", {
                        expires: 7
                    }),
                    $.cookie("username", e, {
                        expires: 7
                    }),
                    $.cookie("password", a, {
                        expires: 7
                    })
                } else
                    $.cookie("userCookie", "false", {
                        expires: -1
                    }),
                    $.cookie("username", "", {
                        expires: -1
                    }),
                    $.cookie("password", "", {
                        expires: -1
                    })
            })
        }(),
        function() {
            $("body").delegate("#update-confirm", "click", function() {
                var e = $("#com_sign_user").val()
                  , a = $("#com_sign_pswd").val()
                  , t = $("#mov").data("movid");
                $.ajax({
                    url: "/comsignin",
                    type: "post",
                    data: {
                        username: e,
                        password: a,
                        movieId: t
                    },
                    cache: !1,
                    success: function(e) {
                        0 == e.msg ? (alert("不存在用户"),
                        window.location.href = "/register") : 2 == e.msg ? $("#mask .form .paswtxt").text("密码错误") : 1 == e.msg && (window.location.href = "/movie/" + e.movie)
                    }
                })
            })
        }(),
        function() {
            $("#commentForm textarea").focus(function() {
                $(this).css("border", "1px solid #3198F0")
            }).blur(function() {
                $(this).css("border", "1px solid #cccccc")
            });
            var e = $("#comment #cont-list>dl");
            e.length >= 10 ? $("#click_more").show() : $("#click_more").hide(),
            $("body").delegate("#not_login_close", "click", function(e) {
                $(this).parent().remove()
            })
        }(),
        function() {
            $(".load .showuser").mouseover(function() {
                $(this).find("ul").stop().slideDown("fast")
            }),
            $(".load .showuser").mouseout(function() {
                $(this).find("ul").stop().slideUp("fast")
            })
        }(),
        function() {
            var e = $(".has-signin .con-name span");
            $(".has-signin .con-name").width() - e.width() <= 8 && e.height() > 50 && $(".has-signin .com-user .con-name").css("line-height", "25px")
        }(),
        function() {
            if (!$("#login_username").text())
                return !1;
            var e = $("#login_username").data("colid")
              , a = $("#mov").data("colpeople")
              , t = a.split(",")
              , i = $("#cont-list dl");
            t.indexOf(e) > -1 ? ($(".collect").find("a").text("已收藏"),
            $(".collect").find("span").css("background", "url(/images/s_ok.png) no-repeat top center"),
            $(".collect").css("background", "transparent")) : ($(".collect").find("a").text("收藏"),
            $(".collect").find("span").css("background", "url(/images/s_no.png) no-repeat top center")),
            $("#mov").removeAttr("data-colpeople"),
            i.each(function(a, t) {
                var i = $(this)
                  , n = i.data("pripeo");
                if (n)
                    if (n.indexOf(",") > -1) {
                        var s = n.split(",");
                        s.indexOf(e) > -1 ? i.find("dd .reply-btn .com-prise").css({
                            background: "url('/images/heart.png') no-repeat 3px 2px",
                            "background-size": "24px 24px"
                        }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px")
                    } else
                        n == e ? i.find("dd .reply-btn .com-prise").css({
                            background: "url('/images/heart.png') no-repeat 3px 2px",
                            "background-size": "24px 24px"
                        }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px")
            })
        }(),
        function() {
            var e = $("#login_username").data("colid")
              , a = $("#mov").data("movid")
              , t = $(".collect")
              , i = $("#com_login");
            t.click(function() {
                e ? $.ajax({
                    type: "POST",
                    url: "/user/shoucang",
                    data: {
                        colUserId: e,
                        colMovieId: a
                    },
                    cache: !1,
                    dataType: "json",
                    success: function(e) {
                        1 == parseInt(e.col) ? ($(".collect").find("a").text("已收藏"),
                        $(".collect").find("span").css("background", "url(/images/s_ok.png) no-repeat top center"),
                        $(".collect").css("background", "transparent")) : ($(".collect").find("a").text("收藏"),
                        $(".collect").find("span").css("background", "url(/images/s_no.png) no-repeat top center"))
                    }
                }) : i.trigger("click")
            })
        }(),
        function() {
            var e = new Clipboard("#copy_btn");
            e.on("success", function(e) {}),
            e.on("error", function(e) {})
        }();
        $(".updateNow").each(function(e, a) {
            var t = $(this).attr("time")
              , i = (new Date).ago(t);
            $(this).html(i)
        }),
        $(".replyTime").each(function(e, a) {
            var t = $(this).attr("time")
              , i = (new Date).ago(t);
            $(this).html(i)
        });
        (function() {
            function e(e) {
                return {
                    have: function() {
                        var a = e.parentNode.parentNode
                          , t = a.children[2]
                          , i = e.parentNode.parentNode.parentNode.parentNode.parentNode
                          , n = $("#login_username").attr("title")
                          , s = a.children[0].value
                          , c = a.children[1].value
                          , d = a.children[2].value
                          , o = a.children[4].value
                          , r = a.children[5].value
                          , l = $("#login_username").data("colid");
                        $.ajax({
                            type: "POST",
                            url: "/user/comment",
                            data: {
                                movieId: s,
                                fromId: c,
                                content: d,
                                toId: o,
                                commentId: r,
                                userId: l
                            },
                            cache: !1,
                            dataType: "json",
                            success: function(e) {
                                var a = (new Date).getTime()
                                  , s = (new Date).ago(a)
                                  , c = e.comment
                                  , d = c.reply
                                  , o = d[d.length - 1]
                                  , r = "";
                                r = "" != e.user.pic ? "/upload/" + e.user.pic : "/images/moren.png";
                                var l = '<div class="new-box-left"><a href="javascript:;" data-cid="' + c._id + '" data-tid="' + o.from + '"><img src="' + r + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + n + "</a>: " + o.content + '</div><div class="loadup"><span class="left">' + s + '</span><span class="clearfix"><button class="two-rpl-btn" title="回复" data-cid="' + c._id + '" data-tid="' + o.from + '"></button></span></div></div>'
                                  , p = document.createElement("div");
                                p.className = "new-reply-box",
                                p.innerHTML = l,
                                i.appendChild(p),
                                t.value = ""
                            }
                        })
                    },
                    not: function() {
                        var e = '<div id="mask-login"><h3>请先登录再进行评论！</h3><p id="not_login_close">知道了</p></div>';
                        $("#contai-info").append(e)
                    }
                }
            }
            function a(e) {
                var a = e.parentNode.parentNode.parentNode.previousElementSibling.children[0]
                  , t = e.parentNode.nextElementSibling.children[0].children[1].children[0]
                  , i = a.getAttribute("data-tid")
                  , n = a.getAttribute("data-cid");
                if (t.getElementsByClassName("toID").length > 0)
                    return void (t.getElementsByClassName("toID").value = i);
                var s = document.createElement("input");
                if (s.type = "hidden",
                s.name = "comment[tid]",
                s.className = "toID",
                s.value = i,
                t.appendChild(s),
                t.getElementsByClassName("commentID").length > 0)
                    return void (t.getElementsByClassName("commentID").value = i);
                var c = document.createElement("input");
                c.type = "hidden",
                c.name = "comment[cid]",
                c.className = "commentID",
                c.value = n,
                t.appendChild(c)
            }
            function t(e) {
                var a = e.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].children[0]
                  , t = e.getAttribute("data-tid")
                  , i = e.getAttribute("data-cid");
                if (a.getElementsByClassName("toID").length > 0)
                    return void (a.getElementsByClassName("toID").value = t);
                var n = document.createElement("input");
                if (n.type = "hidden",
                n.name = "comment[tid]",
                n.className = "toID",
                n.value = t,
                a.appendChild(n),
                a.getElementsByClassName("commentID").length > 0)
                    return void (a.getElementsByClassName("commentID").value = i);
                var s = document.createElement("input");
                s.type = "hidden",
                s.name = "comment[cid]",
                s.className = "commentID",
                s.value = i,
                a.appendChild(s)
            }
            function i(e) {
                var a = e.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].children[0].children[2]
                  , t = e.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;
                a.value = "回复@" + t + "："
            }
            function n(e) {
                var a = e.parentNode.nextElementSibling
                  , t = parseInt(a.getAttribute("show"));
                1 !== t ? (a.style.display = "block",
                a.setAttribute("show", 1)) : 1 === t && (a.style.display = "none",
                a.setAttribute("show", 0))
            }
            $("#comment").delegate("#commentForm .con-btn button", "click", function() {
                if ("" == $("#commentForm textarea").val())
                    return alert("评论内容不能为空！"),
                    !1;
                var e = $("#commentForm").serialize();
                $.ajax({
                    type: "POST",
                    url: "/user/comment",
                    data: e,
                    cache: !1,
                    dataType: "json",
                    success: function(e) {
                        var a = (new Date).getTime()
                          , t = (new Date).ago(a)
                          , i = e.comment
                          , n = "";
                        n = "" != e.pic ? "/upload/" + e.pic : "/images/moren.png";
                        var s = '<dl class="clearfix" data-pripeo="' + i.pripeople + '"><dt><a href="javascript:;" data-cid="' + i._id + '" data-tid="' + i.from + '"><img src="' + n + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + i.username + '</a><span class="updateNow" time="' + a + '">' + t + '</span></div><div class="content-txt"><div class="con-txt"><p>' + i.content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + i._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + n + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + i.movie + '"/><input type="hidden" name="comment[from]" value="' + i.from + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                        if (1 == $("#cont-list .not-comment").length)
                            if (0 == $("#cont-list dl").length)
                                $(s).insertBefore("#not_comment");
                            else {
                                var c = $("#cont-list dl").eq(0);
                                $(s).insertBefore(c)
                            }
                        else {
                            var c = $("#cont-list dl").eq(0);
                            $(s).insertBefore(c)
                        }
                    },
                    error: function() {}
                }),
                $("#commentForm textarea").val("")
            }),
            $("#contents").delegate("#cont-list", "click", function(s) {
                var c = $("#login_username").data("colid")
                  , d = s.target;
                switch (d.className) {
                case "rpl-reply":
                    var o = e(d);
                    c ? o.have() : o.not();
                    break;
                case "com-reply":
                    a(d),
                    n(d);
                    break;
                case "two-rpl-btn":
                    t(d),
                    i(d);
                    break;
                default:
                    return !1
                }
            })
        })(),
        function() {
            var e = $("#mov").data("movid")
              , a = 1
              , t = ""
              , i = $("#login_username").data("colid");
            $("#cont-choice a").each(function(e, t) {
                var i = $(this);
                i.click(function() {
                    var e = i.data("select");
                    $("#click_more").attr("data-select", e),
                    i.addClass("select").siblings().removeClass("select"),
                    a = 1
                })
            }),
            $("#click_more").click(function() {
                var n = $("#click_more").text();
                if ("已全部加载" == n)
                    return !1;
                var s = $("#cont-choice .select").text();
                "全部" == s ? t = "all" : "最新" == s && (t = "new"),
                $.ajax({
                    type: "POST",
                    url: "/movie/contentMore",
                    data: {
                        movieId: e,
                        num: a,
                        status: t,
                        userId: i
                    },
                    cache: !1,
                    dataType: "json",
                    beforeSend: function() {
                        $("#click_more").text("加载中...")
                    },
                    success: function(e) {
                        var a = e.comments
                          , t = e.user;
                        if (t) {
                            $("#click_more").attr("data-have", e.have);
                            var i = "";
                            i = "" != e.user.pic ? "/upload/" + e.user.pic : "/images/moren.png";
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        } else {
                            $("#click_more").attr("data-have", e.have);
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        }
                    },
                    complete: function() {
                        var e = $("#click_more").attr("data-have");
                        if ("have" == e ? $("#click_more").text("点击加载更多") : $("#click_more").text("已全部加载"),
                        !$("#login_username").text())
                            return !1;
                        var a = $("#login_username").data("colid")
                          , t = $("#cont-list dl");
                        t.each(function(e, t) {
                            var i = $(this)
                              , n = i.data("pripeo");
                            if (n)
                                if (n.indexOf(",") > -1) {
                                    var s = n.split(",");
                                    s.indexOf(a) > -1 ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px")
                                } else
                                    n == a ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px");
                            i.attr("data-pripeo", "")
                        })
                    }
                }),
                a++
            })
        }(),
        function() {
            $("#select_new").click(function() {
                var e = $("#mov").data("movid")
                  , a = $("#login_username").data("colid");
                $.ajax({
                    type: "POST",
                    url: "/movie/contentNew",
                    data: {
                        movieId: e,
                        userId: a
                    },
                    cache: !1,
                    dataType: "json",
                    beforeSend: function() {
                        $("#cont-list").html(""),
                        $("#click_more").text("加载中...")
                    },
                    success: function(e) {
                        var a = e.comments
                          , t = e.user;
                        if (t) {
                            $("#click_more").attr("data-have", e.have);
                            var i = "";
                            i = "" != e.user.pic ? "/upload/" + e.user.pic : "/images/moren.png";
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        } else {
                            $("#click_more").attr("data-have", e.have);
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        }
                    },
                    complete: function() {
                        if ($("#click_more").text("点击加载更多"),
                        !$("#login_username").text())
                            return !1;
                        var e = $("#login_username").data("colid")
                          , a = $("#cont-list dl");
                        a.each(function(a, t) {
                            var i = $(this)
                              , n = i.data("pripeo");
                            if (n)
                                if (n.indexOf(",") > -1) {
                                    var s = n.split(",");
                                    s.indexOf(e) > -1 ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px")
                                } else
                                    n == e ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px");
                            i.attr("data-pripeo", "")
                        })
                    }
                })
            })
        }(),
        function() {
            $("#select_all").click(function() {
                var e = $("#mov").data("movid")
                  , a = $("#login_username").data("colid");
                $.ajax({
                    type: "POST",
                    url: "/movie/contentAll",
                    data: {
                        movieId: e,
                        userId: a
                    },
                    cache: !1,
                    dataType: "json",
                    beforeSend: function() {
                        $("#cont-list").html(""),
                        $("#click_more").text("加载中...")
                    },
                    success: function(e) {
                        var a = e.comments
                          , t = e.user;
                        if (t) {
                            $("#click_more").attr("data-have", e.have);
                            var i = "";
                            i = "" != e.user.pic ? "/upload/" + e.user.pic : "/images/moren.png";
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="' + i + '"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><input type="hidden" name="comment[from]" value="' + e.user._id + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        } else {
                            $("#click_more").attr("data-have", e.have);
                            for (var n = 0; n < a.length; n++) {
                                var s = a[n].meta.createAt
                                  , c = (new Date).ago(s)
                                  , d = "";
                                d = "" != a[n].from.pic ? "/upload/" + a[n].from.pic : "/images/moren.png";
                                var o = a[n].reply;
                                if (0 == o.length) {
                                    var r = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl></div></div></dd></dl>';
                                    $("#cont-list").append(r)
                                } else {
                                    for (var l = "", p = "", m = 0; m < o.length; m++) {
                                        var v = o[m].meta.createAt
                                          , f = (new Date).ago(v);
                                        l = "" != o[m].from.pic ? "/upload/" + o[m].from.pic : "/images/moren.png";
                                        var u = '<div class="new-reply-box"><div class="new-box-left"><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '"><img src="' + l + '" alt="用户头像"></a></div><div class="new-box-right"><div class="one-rpl-cont"><a href="javascript:;">' + o[m].from.name + "</a>：" + o[m].content + '</div><div class="loadup"><span time="' + v + '" class="clearfix replyTime">' + f + '</span><span class="clearfix"><button title="回复" data-cid="' + a[n]._id + '" data-tid="' + o[m].from._id + '" class="two-rpl-btn"></button></span></div></div></div>';
                                        p += u
                                    }
                                    var g = '<dl class="clearfix" data-pripeo="' + a[n].pripeople + '"><dt><a href="javascript:;" data-cid="' + a[n]._id + '" data-tid="' + a[n].from._id + '"><img src="' + d + '" alt="userImg"></a></dt><dd><div class="all-info"><div class="content-info"><div class="content-title"><a href="javascript:;">' + a[n].username + '</a><span class="updateNow" time="' + s + '">' + c + '</span></div><div class="content-txt"><div class="con-txt"><p>' + a[n].content + '</p></div></div></div><div class="fun reply-btn"><a href="javascript:;" class="com-reply"></a><a href="javascript:;" class="com-prise" data-priid="' + a[n]._id + '" onclick="prise(this)"></a></div><div class="reply-node" show=0><dl class="first-node"><dt><img src="/images/moren.png"></a></dt><dd><form class="replyForm clearfix" method="POST" action="/user/comment"><input type="hidden" name="comment[movie]" value="' + a[n].movie + '"/><textarea name="comment[content]" class="comonput"></textarea><div id="con-btn" class="con-btn clearfix"><button class="rpl-reply" type="button">发送</button></div><form/></dd></dl>' + p + "</div></div></dd></dl>";
                                    $("#cont-list").append(g)
                                }
                            }
                        }
                    },
                    complete: function() {
                        if ($("#click_more").text("点击加载更多"),
                        !$("#login_username").text())
                            return !1;
                        var e = $("#login_username").data("colid")
                          , a = $("#cont-list dl");
                        a.each(function(a, t) {
                            var i = $(this)
                              , n = i.data("pripeo");
                            if (n)
                                if (n.indexOf(",") > -1) {
                                    var s = n.split(",");
                                    s.indexOf(e) > -1 ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px")
                                } else
                                    n == e ? i.find("dd .reply-btn .com-prise").css({
                                        background: "url('/images/heart.png') no-repeat 3px 2px",
                                        "background-size": "24px 24px"
                                    }) : i.find("dd .reply-btn .com-prise").css("background", "url('/images/ico.png') no-repeat 0 -860px");
                            i.attr("data-pripeo", "")
                        })
                    }
                })
            })
        }()
    }
    e()
});
