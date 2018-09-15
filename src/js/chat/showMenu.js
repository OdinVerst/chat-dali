'use strict';

(function () {
    var dotterMenuBtn = document.querySelector('.chat__dot-menu');
    dotterMenuBtn.addEventListener('click', function () {
        var dotterMenu= document.querySelector('.dot-menu');
        dotterMenu.classList.toggle('active');
        var clear = document.querySelectorAll('.dot-menu__item')[0];
            clear.addEventListener('click', function () {
            localStorage.removeItem('msg');
            location.reload();

            });
        var logOut = document.querySelectorAll('.dot-menu__item')[1];
        logOut.addEventListener('click', function () {
            localStorage.removeItem('auth');
            location.reload();
        })
    })
})();