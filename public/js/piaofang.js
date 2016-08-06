$(document).ready(function() {
    function o() {
        (function() {
            $(".load .showuser").mouseover(function() {
                $(this).find("ul").stop().slideDown("fast")
            }),
            $(".load .showuser").mouseout(function() {
                $(this).find("ul").stop().slideUp("fast")
            })
        })()
    }
    o()
});
