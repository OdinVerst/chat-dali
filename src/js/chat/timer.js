'use strict';

(function () {
    window.timer = function(block, time) {

        var seconds = 0;

        var seconds_timer_id = setInterval(function () {
            if (seconds < 600) {
                seconds++;
                if (seconds > 60) {
                    block.textContent = Math.floor(seconds / 60) + " minutes ago";
                } else {
                    block.textContent = seconds + " seconds ago";
                }
            } else {
                block.textContent = time;
                clearInterval(seconds_timer_id);
            }
        }, 1000);

    }
})();