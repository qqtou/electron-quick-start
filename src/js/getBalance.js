// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var SeeleClient = require('../api/seeleClient');

seeleClient = new SeeleClient();

onload = function() {
    document.getElementById("btnGetBalance").addEventListener("click", getBalance);
    loadAccount();
}

function loadAccount() {
    seeleClient.accountList();

    var accountlist = document.getElementById("accountlist");
    var accountHTML = ""
    for (var item in seeleClient.accountArray) {
        accountHTML += "<span>" + seeleClient.accountArray[item] + `</span>` + "<br>";
    }
    accountlist.innerHTML = accountHTML
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