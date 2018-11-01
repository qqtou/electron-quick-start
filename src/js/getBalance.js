// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var SeeleClient = require('../api/seeleClient');

seeleClient = new SeeleClient();

// onload = function() {
//     //document.getElementById("btnGetBalance").addEventListener("click", getBalance);
//     loadAccount();
// }

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
addLoadEvent(loadAccount)

function loadAccount() {
    seeleClient.accountList();

    layer.load(0, { shade: false });
    var count = 0;
    var accountlist = document.getElementById("accountlist");
    for (var item in seeleClient.accountArray) {
        seeleClient.getBalance(seeleClient.accountArray[item].trim(), function(err, info) {
            if (err) {
                try {
                    var msg = JSON.parse(err.message);
                    alert(msg.error.message);
                } catch (e) {
                    alert(err.message);
                }
            } else {
                var accountHTML = ""
                accountHTML += `<div class="accountFor">`;
                accountHTML += `<span class="accountImg"><img src="./src/img/Headportrait.png"></span>`;
                accountHTML += `<ul>`;
                accountHTML += `<li>Account</li>`;
                accountHTML += `<li><span>` + info.Balance / 100000000 + `</span> seele</li>`;
                accountHTML += `<li>` + info.Account + `</li>`;
                accountHTML += `</ul>`;
                accountHTML += `</div>`;
                accountlist.innerHTML += accountHTML;
                if (count == 0) {
                    document.getElementById("txpublicKey").value = info.Account;
                    span_balance.innerText = info.Balance / 100000000;
                }
                if (count == seeleClient.accountArray.length - 1) {
                    layer.closeAll();
                }
                count += 1;
            }
        });
    }
}

function getBalance() {
    var publicKey = document.getElementById("publicKey");
    seeleClient.getBalance(publicKey.value.trim(), function(err, info) {
        var balance = document.getElementById("balance");
        if (err) {
            try {
                var msg = JSON.parse(err.message);
                balance.innerText = msg.error.message;
            } catch (e) {
                balance.innerText = err.message;
            }
        } else {
            balance.innerText = "余额：" + info.Balance;
        }
    });
}