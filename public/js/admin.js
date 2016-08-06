$(function() {
    $(".del").click(function(a) {
        var t = $(a.target)
          , e = t.data("id")
          , n = $(".item-id-" + e);
        $.ajax({
            type: "DELETE",
            url: "/admin/movie/list?id=" + e
        }).done(function(a) {
            1 === a.success && n.length > 0 && n.remove()
        })
    }),
    $("#douban").blur(function() {
        var a = $(this)
          , t = a.val();
        t && $.ajax({
            url: "https://api.douban.com/v2/movie/subject/" + t,
            type: "get",
            cache: !0,
            dataType: "jsonp",
            crossDomain: !0,
            jsonp: "callback",
            success: function(a) {
                for (var t = [], e = 0; e < a.casts.length; e++)
                    t.push(a.casts[e].name);
                for (var n = t.join(","), i = [], e = 0; e < a.casts.length; e++) {
                    if (!a.casts[e].avatars.small)
                        return !1;
                    i.push(a.casts[e].avatars.small)
                }
                var s = i.join(",");
                $("#inputTitle").val(a.title),
                $("#inputDirector").val(a.directors[0].name),
                $("#inputAverage").val(a.rating.average),
                $("#inputCountry").val(a.countries[0]),
                $("#inputYear").val(a.year),
                $("#inputActor").val(n),
                $("#inputActorPic").val(s),
                $("#inputGenres").val(a.genres),
                $("#inputPoster").val(a.images.large),
                $("#inputSummary").val(a.summary)
            }
        })
    })
});
