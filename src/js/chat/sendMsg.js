'use strict';
(function () {
    if (!localStorage.getItem('auth')) {
        window.location.href = 'http://localhost:3000/';
    } else {
        window.renderOldMsg();
        var height = window.innerHeight + 'px';
        document.querySelector('.mobile__wrap-chat').style.minHeight = height;
        console.log(localStorage.getItem('msg'));
        if (!localStorage.getItem('msg')) {
            var msgVar = {
                "text": [],
                "date": [],
                "answer": []
            };
            localStorage.setItem('msg', JSON.stringify(msgVar));
        }

        // noinspection JSAnnotator

        var templateMsg = document.querySelector('template').content.querySelector('.msg-block_you');
        var msgForm = document.querySelector('.send-msg__form');
        var btnMsg = msgForm.querySelector('.send-msg__btn');
        var bodyMsg = document.querySelector('.msg-block__wrap');
        var msgText = msgForm.querySelector('input[type=text]');
        var indexMsg = 0;
        var histClear = document.querySelector('.his-clear');
        var timeLine = document.querySelector('.time__line');
        var sendMsg = function () {
            if (msgText.value) {
                var newMsg = templateMsg.cloneNode(true);
                newMsg.querySelector('.msg-block__text').textContent = msgText.value;
                var date = new Date();
                var min = date.getMinutes();
                if(min< 10){
                    min = "0"+ min;
                }
                var time = date.getHours() + ':' + min;
                window.timer(newMsg.querySelector('.msg-block__time'), time);
                if(histClear){
                    histClear.style.visibility = 'hidden';
                    timeLine.textContent = timeLine.textContent + time;
                    timeLine.style.visibility = 'visible';
                }
                bodyMsg.appendChild(newMsg);
                var heightChat = document.querySelector('.msg-block__wrap').clientHeight;
                window.checkHeight(heightChat);
                var temp = JSON.parse(localStorage.getItem('msg'));
                temp.text.push(msgText.value);
                temp.date.push(time);
                temp.answer.push(false);
                localStorage.setItem('msg', JSON.stringify(temp));
                window.checkMsg(indexMsg++);
                //localStorage.clear();
                msgText.value = "";
            }
        };
        btnMsg.addEventListener('click', sendMsg);
        msgText.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 13) {
                sendMsg();
            }
        })
    }

})();