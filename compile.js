const path = require('path');
const fs = require('fs');
const solc = require('solc');

//获取智能合约文件的源路径
const srcPath = path.resolve(__dirname,'contracts','lottery.sol');

//获取智能合约源代码的内容
const srcContent = fs.readFileSync(srcPath,'utf-8');

//智能合约编译的结果，生成了一套ABI接口(Interface)和一套bytecode，ABI接口给程序员来调用，bytecode要部署在以太坊网络节点上的
let compile_Result = solc.compile(srcContent,1);

//将接口暴露出去给别人调用
module.exports = compile_Result.contracts[':lottery'];