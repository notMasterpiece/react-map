$(function() {

    Onload();





    function Onload() {

        if ( $(".top_slider").length ) {
            $('.top_slider').owlCarousel({
                dots:true,
                items: 1,
                nav: true,
                loop: true,
                navText: [
                    "<span class='icon-back'></span>",
                    "<span class='icon-next'></span>"
                ],
            });
        }


        $('.totop').unbind('click').click(function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            },700);
            return false;
        });

    }

});


