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

const source = fs.readFileSync(contractPath, 'utf-8');
const compiledCode = solc.compile(source, 1).contracts[`:${contractName}`];
delete compiledCode['assembly'];

mkdirp.sync(binPath);

// write the contract's interface definition and bytecode 
fs.writeFileSync(path.resolve(binPath, `${contractName}.json`), JSON.stringify(compiledCode, null, 2), 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.abi`), compiledCode['interface'], 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.bin`), compiledCode['bytecode'], 'utf-8');