'use strict';
(function () {
    var urlMsg = 'http://localhost:3000/json/users.json';

    // function timer(block, time) {
    //
    //     var seconds = 0;
    //
    //     var seconds_timer_id = setInterval(function() {
    //         if (seconds < 600) {
    //             seconds ++;
    //             if(seconds> 60){
    //                 block.textContent = Math.floor(seconds/60) + " minutes ago";
    //             }else{
    //                 block.textContent = seconds + " seconds ago";
    //             }
    //         } else {
    //             block.textContent = time;
    //             clearInterval(seconds_timer_id);
    //         }
    //     }, 1000);
    //
    // }

    var msgText = [];
    var templateMsgAnswer = document.querySelector('template').content.querySelector('.msg-block__answer');
    var bodyMsg = document.querySelector('.msg-block__wrap');
    var successHandler = function (data) {
        msgText = data;
        window.checkMsg = function (msg) {
            if(msgText.answer[msg]) {
                var newMsgAnsw = templateMsgAnswer.cloneNode(true);
                newMsgAnsw.querySelector('.msg-block__text').textContent = msgText.answer[msg];
                var date = new Date();
                var time = date.getHours() + ':' + date.getMinutes();
                window.timer(newMsgAnsw.querySelector('.msg-block__time'), time);
                var tempAmswer = JSON.parse(localStorage.getItem('msg'));
                console.log(tempAmswer);
                tempAmswer.text.push(msgText.answer[msg]);
                tempAmswer.date.push(time);
                tempAmswer.answer.push(true);
                localStorage.setItem('msg', JSON.stringify(tempAmswer));

                setTimeout(
                    function () {
                        bodyMsg.appendChild(newMsgAnsw)
                    }, 1000);
            }
        };
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(urlMsg, successHandler, errorHandler);
})();