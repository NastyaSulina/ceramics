$(document).ready(function () {
    $(window).on("load scroll", function () {
        var parallaxElement = $(".parallax_scroll"),
            parallaxQuantity = parallaxElement.length;
        for (var i = 0; i < parallaxQuantity; i++) {
                var currentElement = parallaxElement.eq(i);
                var scrolled = $(window).scrollTop();
                currentElement.css({
                    transform: "translate3d(0," + scrolled * 0.45 + "px, 0)"
            })
        }
        var parallaxElement2 = $(".parallax_scroll2"),
            parallaxQuantity2 = parallaxElement2.length;
        for (var i = 0; i < parallaxQuantity2; i++) {
            var currentElement2 = parallaxElement2.eq(i);
            var scrolled2 = $(window).scrollTop();
            currentElement2.css({
                transform: "translate3d(0," + scrolled2 * -0.6 + "px, 0)"
            })
        }
    });
});