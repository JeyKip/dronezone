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
        return $(window).outerWidth() < 768;
    };
    var recalculateTopMenuPosition = function(){
        $navigation.removeClass('header__navigation-fixed');
        $tagline.css('padding-top', '');

        var scrollTopPosition = $(window).scrollTop();
        var menuHeight = getTopMenuHeight();
        
        if (scrollTopPosition > menuHeight || isMobileScreen()){
            $navigation.addClass('header__navigation-fixed');

            var taglinePaddingTop = parseInt($tagline.css('padding-top')) || 0;
            $tagline.css('padding-top', taglinePaddingTop + menuHeight);
        }
    };

    $(function(){

        recalculateTopMenuPosition();

        $(window).on('scroll', function(){
            recalculateTopMenuPosition();
        });
        $(window).on('resize', function(){
            recalculateTopMenuPosition();
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