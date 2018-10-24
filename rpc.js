// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var seelejs = require('seele.js');
const Q = require('bluebird');
const spawn = require('child_process').spawn;

function rpc(){
    this.client = new seelejs();

    this.getBalance=function(publicKey,callBack){
        this.client.getBalance(publicKey,callBack);
    };

    this.generateKey=function(shardnum){
        return new Q((resolve, reject) => {    
            var binPath="./cmd/win32/client.exe";
            var args = [
                'key',
            ];
            if (shardnum!=""){
                args.push('--shard',shardnum)
            }
    
            const proc = spawn(binPath, args);
    
            proc.stdout.on('data', data => {
                resolve(data)
            });
    
            proc.stderr.on('data', data => {
                reject(data)
            });
        });        
    };

    this.sendtx=function(publicKey,privateKey,to,amount,price,callBack){
        var nonce =this.client.sendSync("getAccountNonce",publicKey);

        var rawTx = {
            "From" : publicKey,
            "To" : to,
            "Amount" : parseInt(amount),
            "AccountNonce" : nonce,
            "GasPrice":parseInt(price),
            "GasLimit":3000000,
            "Timestamp":0,
            "Payload": ""
        }

        var tx = this.client.generateTx(privateKey, rawTx)
        this.client.addTx(tx, function(err,info){
            callBack(err,info,tx.Hash);
        })
    }
}

module.exports = rpc;
