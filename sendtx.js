// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var rpc = require('./rpc');

rpc=new rpc();

onload = function() {
    document.getElementById("sendtx").addEventListener("click",sendtx);
  }

function sendtx(){
    var publicKey = document.getElementById("txpublicKey");
    var privateKey = document.getElementById("privateKey");
    var to = document.getElementById("to");
    var amount = document.getElementById("amount");
    var price = document.getElementById("price");

    rpc.sendtx(publicKey.value,privateKey.value,to.value,amount.value,price.value,function(err,result,hash){
        if (err){
            alert(err)
        }else{
            txresult.value=hash
        }        
    });
}
