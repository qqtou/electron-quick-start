// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var rpc = require('./rpc');

rpc=new rpc();

onload = function() {
    document.getElementById("createKey").addEventListener("click",generateKey);
  }

function generateKey(){
    var shard=document.getElementById("shardnum")
    
    rpc.generateKey(shard.value).then((outdata)=>{
        address.innerText=outdata
    }).catch(err=>{
        address.innerText=err
    });
}