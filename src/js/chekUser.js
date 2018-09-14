'use strict';
(function () {
    var userList = [];
    var url = 'http://localhost:3000/json/users.json';
    var successHandler = function (data) {
        userList = data;
        console.log(userList);
        var sendFormSub = document.querySelector('.auth__form');
        sendFormSub.addEventListener('submit', function (evt) {
            evt.preventDefault();
            var getData = document.querySelectorAll('.auth__input-text');
            console.log(getData);
            var emailserv = userList.usermail;
            var passserv = userList.passwordjson;
            console.log(getData[0].value);
            emailserv.forEach(function (item, i) {
                if(item === getData[0].value){
                    if(getData[1].value === passserv[i]){
                        window.location.href = 'http://localhost:3000/chat';
                        var node = document.createElement('div');
                        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: green;';
                        node.style.position = 'absolute';
                        node.style.left = 0;
                        node.style.right = 0;
                        node.style.fontSize = '30px';

                        node.textContent = 'Auth ok!';
                        document.body.insertAdjacentElement('afterbegin', node);
                    }
                }else {
                    var node2 = document.createElement('div');
                    node2.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
                    node2.style.position = 'absolute';
                    node2.style.left = 0;
                    node2.style.right = 0;
                    node2.style.fontSize = '30px';

                    node2.textContent = 'Auth Fail!';
                    document.body.insertAdjacentElement('afterbegin', node2);
                }
            })
        })
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

    window.backend.load(url, successHandler, errorHandler);
})();