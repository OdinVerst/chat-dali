'use strict';
(function () {
    var test = window.innerHeight+ 'px';
    console.log(test);
    document.querySelector('.mobile__wrap-chat').style.minHeight = test;

    function timer(block, time) {

        var seconds = 0;

        var seconds_timer_id = setInterval(function() {
            if (seconds < 600) {
                seconds ++;
                if(seconds> 60){
                    block.textContent = Math.floor(seconds/60) + " minutes ago";
                }else{
                    block.textContent = seconds + " seconds ago";
                }
            } else {
                block.textContent = time;
                clearInterval(seconds_timer_id);
            }
        }, 1000);

    }

    var templateMsg = document.querySelector('template').content.querySelector('.msg-block_you');
    var msgForm = document.querySelector('.send-msg__form');
    var btnMsg = msgForm.querySelector('.send-msg__btn');
    var bodyMsg = document.querySelector('.msg-block__wrap');
    var msgText = msgForm.querySelector('input[type=text]');
    var sendMsg = function(){
        if(msgText.value){
            var newMsg = templateMsg.cloneNode(true);
            newMsg.querySelector('.msg-block__text').textContent = msgText.value;
            var date = new Date();
            var time = date.getHours()+':'+date.getMinutes();
            timer(newMsg.querySelector('.msg-block__time'), time);
            // newMsg.querySelector('.msg-block__time').textContent = timer();
            bodyMsg.appendChild(newMsg);
            msgText.value = "";
        }
    };
    btnMsg.addEventListener('click', sendMsg);
    msgText.addEventListener('keydown', function (evt) {
        if(evt.keyCode === 13){
            sendMsg();
        }
    })

})();