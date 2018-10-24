// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var rpc = require('./rpc');

rpc=new rpc();

onload = function() {
    document.getElementById("btnGetBalance").addEventListener("click",getBalance);
  }

function getBalance(){
    var publicKey = document.getElementById("publicKey");
    rpc.getBalance(publicKey.value,function(err,info){
        var balance=document.getElementById("balance");
        if (err){            
            var msg=JSON.parse(err.message);
            balance.innerText=msg.error.message;
        }else{            
            balance.innerText="余额："+info.Balance;
        }
    });
}
