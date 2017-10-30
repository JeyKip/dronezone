;(function($){
    var $navigation = $('.header__navigation');
    var $tagline = $('.header__tagline');
    var $menu = $('.header__menu');

    var getTopMenuHeight = function(){
        var navigationContainerHeight = $navigation.outerHeight();
        var menuHeight = $menu.outerHeight();
        var height = isMobileScreen() ? navigationContainerHeight - menuHeight : navigationContainerHeight;

        return  height;
    };
    var isMobileScreen = function(){
        return $(window).width() < 768;
    };

    $(function(){
        if (isMobileScreen()){
            $navigation.addClass('header__navigation-fixed');
        }

        $(window).on('scroll', function(e){
            if (isMobileScreen()){
                return;
            }

            var scrollTopPosition = $(this).scrollTop();
            var menuHeight = getTopMenuHeight();

            if (scrollTopPosition > menuHeight){
                if (!$navigation.hasClass('header__navigation-fixed')){
                    var taglinePaddingTop = parseInt($tagline.css('padding-top')) || 0;

                    $navigation.addClass('header__navigation-fixed');
                    $tagline.css('padding-top', taglinePaddingTop + menuHeight);
                }
            }
            else{
                $navigation.removeClass('header__navigation-fixed');
                $tagline.css('padding-top', '');
            }
        });

        $menu.find('.menu__link').on('click', function(){
            var target = $(this).data('target');
            var targetTop = $(target).offset().top;

            if (targetTop > 0){
                targetTop -= getTopMenuHeight();
            }

            $('html, body').animate({
                scrollTop: targetTop
            }, 700);
        });
    });
})(jQuery);