// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var seeleClient = require('../api/seeleClient');

seeleClient = new seeleClient();

onload = function() {
    document.getElementById("sendtx").addEventListener("click", sendtx);
    document.getElementById("btn_gettx").addEventListener("click", gettxbyhash);
}

function sendtx() {
    var publicKey = document.getElementById("txpublicKey");
    var to = document.getElementById("to");
    var amount = document.getElementById("amount");
    var price = document.getElementById("price");
    var accountpassWord = document.getElementById("accountpassWord")

    seeleClient.sendtx(publicKey.value, accountpassWord.value, to.value, amount.value, price.value, function(err, result, hash) {
        if (err) {
            alert(err)
        } else {
            txresult.innerHTML = hash
        }
    });
}

function gettxbyhash() {
    var txresult = document.getElementById("txresult")
    seeleClient.gettxbyhash(txresult.innerHTML, function(err, info) {
        if (err) {
            alert(err)
        } else {
            tx.innerHTML = JSON.stringify(info, "\t")
        }
    })
}