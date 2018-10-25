// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var seelejs = require('seele.js');
var fs = require('fs');
var os = require("os")

const Q = require('bluebird');
const spawn = require('child_process').spawn;


function seeleClient() {
    this.client = new seelejs();

    this.configPath = os.homedir() + "/.seeleMist/"

    this.accountPath = this.configPath + "account/";

    this.binPath = this.configPath + "cmd/client.exe";

    this.accountArray = [];

    this.init = function() {
        if (!fs.existsSync(this.configPath)) {
            fs.mkdirSync(this.configPath)
        }

        if (!fs.existsSync(this.accountPath)) {
            fs.mkdirSync(this.accountPath)
        }

        if (!fs.existsSync(this.configPath + "cmd")) {
            fs.mkdirSync(this.configPath + "cmd")
        }
    };

    this.generateKey = function(shardnum, passWord) {
        this.init();
        return new Q((resolve, reject) => {
            try {
                var args = [
                    'key',
                ];
                if (shardnum != "") {
                    args.push('--shard', shardnum)
                }

                const proc = spawn(this.binPath, args);

                proc.stdout.on('data', data => {
                    var output = `${data}`
                    var privatekey = this.ParsePrivateKey(output)
                    var publickey = this.ParsePublicKey(output)
                    this.keyStore(publickey, privatekey, passWord)
                    resolve(publickey)
                });

                proc.stderr.on('data', data => {
                    reject(data)
                });
            } catch (e) {
                return reject(e)
            }
        });
    };

    this.keyStore = function(fileName, privatekey, passWord) {
        this.init();
        return new Q((resolve, reject) => {
            var args = [
                'savekey',
            ];

            var filePath = this.accountPath + fileName;

            this.accountArray.push(fileName);

            args.push("--privatekey", privatekey)
            args.push("--file", filePath)

            const proc = spawn(this.binPath, args);

            proc.stdout.on('data', data => {
                proc.stdin.write(passWord + '\n');
                resolve(data)
            });

            proc.stderr.on('data', data => {
                reject(data)
            });
        });
    };

    this.DecKeyFile = function(fileName, passWord) {
        return new Q((resolve, reject) => {
            var args = [
                'deckeyfile',
            ];

            var filePath = this.accountPath + fileName;

            args.push("--file", filePath)

            const proc = spawn(this.binPath, args);

            proc.stdout.on('data', data => {
                proc.stdin.write(passWord + '\n');
                var output = `${data}`
                if (output.indexOf("private") > 0) {
                    resolve(data)
                }
            });

            proc.stderr.on('data', data => {
                reject(data)
            });
        });
    }

    this.accountList = function() {
        this.init();
        if (fs.existsSync(this.accountPath)) {
            this.accountArray = fs.readdirSync(this.accountPath)
        } else {
            console.log(this.accountPath + "  Not Found!");
        }
    }

    this.getBalance = function(publicKey, callBack) {
        try {
            this.client.getBalance(publicKey, callBack);
        } catch (e) {
            console.error("no node started in local host")
        }
    };

    this.sendtx = function(publicKey, passWord, to, amount, price, callBack) {
        var nonce = this.client.sendSync("getAccountNonce", publicKey);

        var rawTx = {
            "From": publicKey,
            "To": to,
            "Amount": parseInt(amount),
            "AccountNonce": nonce,
            "GasPrice": parseInt(price),
            "GasLimit": 3000000,
            "Timestamp": 0,
            "Payload": ""
        }
        this.DecKeyFile(publicKey, passWord).then((data) => {
            var output = `${data}`
            var privatekey = this.ParsePrivateKey(output);
            var tx = this.client.generateTx(privatekey, rawTx);
            this.client.addTx(tx, function(err, info) {
                callBack(err, info, tx.Hash);
            });
        });

    };

    this.gettxbyhash = function(hash, callBack) {
        this.client.getTransactionByHash(hash, callBack);
    }

    this.ParsePublicKey = function(input) {
        try {
            return input.substring(input.indexOf("publick key:") + 12, input.indexOf("private key:")).trim()
        } catch (e) {
            return ""
        }
    };

    this.ParsePrivateKey = function(input) {
        try {
            return input.substring(input.indexOf("private key:") + 12).trim()
        } catch (e) {
            return ""
        }
    };
}

module.exports = seeleClient;