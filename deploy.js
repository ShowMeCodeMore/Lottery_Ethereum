//部署到主网上

const Web3 = require('web3');
const ct1 = require('./compile');
let HDWalletProvider = require("truffle-hdwallet-provider");
//助记词
let mnemonic = "crouch fiction income edge cluster turtle plastic ozone mom predict goddess express";
let provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/e87cfbdec9f047c5a6d53d4b2e47a960");
const web3 = new Web3(provider);

let deploy = async () => {
    let accounts = await web3.eth.getAccounts()
    console.log(`从哪个地址部署的：${accounts[0]}`)
    let result = await new web3.eth.Contract(JSON.parse(ct1.interface)).deploy({
        data: ct1.bytecode,
    }).send({
        from:accounts[0],
        gas:'3000000'
    })

    console.log(`部署到哪个地址:${result.options.address}`)
    console.log(`部署的接口代码：${ct1.interface}`)

}

deploy()