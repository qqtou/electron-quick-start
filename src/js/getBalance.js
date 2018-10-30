// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var SeeleClient = require('../api/seeleClient');

seeleClient = new SeeleClient();

onload = function() {
    //document.getElementById("btnGetBalance").addEventListener("click", getBalance);
    loadAccount();
}

function loadAccount() {
    seeleClient.accountList();

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
                accountHTML += `<span class="accountImg"><img src="../img/people.png"></span>`;
                accountHTML += `<ul>`;
                accountHTML += `<li>Account</li>`;
                accountHTML += `<li><span>` + info.Balance + `</span> seele</li>`;
                accountHTML += `<li>` + seeleClient.accountArray[item] + `</li>`;
                accountHTML += `</ul>`;
                accountHTML += `</div>`;
                accountlist.innerHTML += accountHTML
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