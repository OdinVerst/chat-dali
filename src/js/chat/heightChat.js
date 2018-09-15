'use strict';

(function () {
    var heightWindows = window.innerHeight;
    window.checkHeight = function (data) {
        console.log(heightWindows < data);
        console.log(heightWindows +'|||'+ data);
        if(heightWindows < data){
            window.scrollTo(0,data);
        }
    }
})();