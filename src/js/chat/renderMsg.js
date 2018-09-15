'use strict';

(function () {
    var historyMsg = JSON.parse(localStorage.getItem('msg'));
    var templateMsgHistory = document.querySelector('template').content.querySelector('.msg-block_you');
    var bodyMsg = document.querySelector('.msg-block__wrap');
    var templateMsgHistoryAnswer = document.querySelector('template').content.querySelector('.msg-block__answer');
    var timeLine = document.querySelector('.time__line');
    window.renderOldMsg = function () {
        console.log(historyMsg);
        if(historyMsg){
            if(!historyMsg.text.length){
                var nohistory = document.createElement('div');
                nohistory.style = 'margin: 0 auto; text-align: center;';
                nohistory.style.left = 0;
                nohistory.style.right = 0;
                nohistory.style.color = 'white';
                nohistory.style.fontSize = '30px';
                nohistory.classList.add('his-clear');

                nohistory.textContent = 'History clear';
                bodyMsg.appendChild(nohistory);
            }else{
                timeLine.textContent = timeLine.textContent + historyMsg.date[0];
                timeLine.style.visibility = 'visible';
            }
            historyMsg.answer.forEach(function (item, i) {
                if(item){
                    var currentMsgAnswer = templateMsgHistoryAnswer.cloneNode(true);
                    currentMsgAnswer.querySelector('.msg-block__text').textContent = historyMsg.text[i];
                    currentMsgAnswer.querySelector('.msg-block__time').textContent =  historyMsg.date[i];
                    bodyMsg.appendChild(currentMsgAnswer);
                }else {
                    var currentMsg = templateMsgHistory.cloneNode(true);
                    currentMsg.querySelector('.msg-block__text').textContent = historyMsg.text[i];
                    currentMsg.querySelector('.msg-block__time').textContent = historyMsg.date[i];
                    bodyMsg.appendChild(currentMsg);
                }
            })
        }else {
            var nohistory = document.createElement('div');
            nohistory.style = 'margin: 0 auto; text-align: center;';
            nohistory.style.left = 0;
            nohistory.style.right = 0;
            nohistory.style.fontSize = '30px';
            nohistory.style.color = 'white';
            nohistory.classList.add('his-clear');

            nohistory.textContent = 'History clear';
            bodyMsg.appendChild(nohistory);
        }
    }
})();