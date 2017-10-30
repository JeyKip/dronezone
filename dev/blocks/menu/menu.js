;(function($){
    $(function(){
        var $burger = $('.burger');
        var $menu = $('.menu');
        var $menuBlock = $menu.find('.menu__items');
        var $menuItems = $menuBlock.find('.menu__item');

        $burger.on('click', function(){
            $burger.toggleClass('burger_opened');

            if ($burger.hasClass('burger_opened')){
                $menu.css('max-height', $menuBlock.outerHeight());
            }
            else{
                $menu.css('max-height', '');
            }
        });

        $menuItems.on('click', function(){
            $burger.removeClass('burger_opened');
            $menu.css('max-height', '');
        });
    });
})(jQuery);