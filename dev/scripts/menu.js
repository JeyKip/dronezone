;(function(){
    var changeMenuState = function(burger, menu, menuList) {
        burger.classList.toggle('burger_opened');
        menu.classList.toggle('menu_opened');

        if (menu.classList.contains('menu_opened')) {
            menu.style.maxHeight = menuList.clientHeight + 'px';
        }
        else {
            menu.style.maxHeight = null;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var container = document.getElementById('home');
        if (container) {
            var burger = container.getElementsByClassName('burger')[0];
            var menu = container.getElementsByClassName('menu')[0];
            var menuList = menu.getElementsByClassName('menu__items')[0];
            if (burger && menu && menuList) {
                burger.addEventListener('click', function(e) {
                    changeMenuState(burger, menu, menuList);
                });

                var menuItems = menuList.getElementsByClassName('menu__item');
                if (menuItems && menuItems.length) {
                    for (var i = 0; i < menuItems.length; i++) {
                        menuItems[i].addEventListener('click', function(){
                            changeMenuState(burger, menu, menuList);
                        });
                    }
                }
            }
        }
    })
})();