// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var seeleClient = require('../api/seeleClient');

seeleClient = new seeleClient();

onload = function() {
    document.getElementById("createKey").addEventListener("click", generateKey);
}

function generateKey() {
    var shard = document.getElementById("shardnum")
    var passWord = document.getElementById("passWord")

    seeleClient.generateKey(shard.value, passWord.value).then((outdata) => {
        address.innerText = outdata.trim()
        filepath.innerText = "文件保存路径：" + seeleClient.accountPath + outdata
    }).catch(err => {
        address.innerText = err
    });
}