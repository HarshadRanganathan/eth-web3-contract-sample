var argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const solc = require('solc');
const assert = require('assert');

assert(argv.contract, 'Contract needs to be specified. Usage: npm run compile -- --contract=Lottery');
const contractName = argv.contract;
const contractPath = path.resolve(__dirname, 'contracts', `${contractName}.sol`);
const binPath = path.resolve(__dirname, 'bin', 'contracts');

const source = fs.readFileSync(contractPath, 'utf-8').replace(/\r\n/g, "");

var compilerInput = `{
    "language": "Solidity",
    "sources": {
        "${contractName}.sol": {
            "content": "${source}"
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": [ "*" ]
            }
        }
    }
}`

const compiledContract = JSON.parse(solc.compile(compilerInput)).contracts[`${contractName}.sol`][`${contractName}`];

mkdirp.sync(binPath);

// write the contract's interface definition and bytecode 
fs.writeFileSync(path.resolve(binPath, `${contractName}.json`), JSON.stringify(compiledContract, null, 2), 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.abi`), JSON.stringify(compiledContract.abi), 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.bin`), compiledContract.evm.bytecode.object, 'utf-8');