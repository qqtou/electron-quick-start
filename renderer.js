// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var rpc = require('./rpc');
const spawn = require('child_process').spawn;

rpc=new rpc();

onload = function() {
    document.getElementById("btnGetBalance").addEventListener("click",getBalance);
    document.getElementById("createKey").addEventListener("click",generateKey);
    document.getElementById("sendtx").addEventListener("click",sendtx);
  }

function getBalance(){
    var publicKey = document.getElementById("publicKey");
    rpc.getBalance(publicKey.value,function(err,info){
        if (err){
            var msg=JSON.parse(err.message)
            alert(msg.error.message)
        }else{
            var balance=document.getElementById("balance");
            balance.innerText="余额："+info.Balance;
        }
    });
}

function generateKey(){
    var shard=document.getElementById("shardnum")
    
    rpc.generateKey(shard.value).then((outdata)=>{
        address.innerText=outdata
    });
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
