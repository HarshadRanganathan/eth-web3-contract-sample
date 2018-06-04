const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const solc = require('solc');

const contractName = 'Inbox';
const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const binPath = path.resolve(__dirname, 'bin', 'contracts');

const source = fs.readFileSync(contractPath, 'utf-8');
const compiledCode = solc.compile(source, 1).contracts[':Inbox'];
delete compiledCode['assembly'];

mkdirp.sync(binPath);

// write the contract's interface definition and bytecode 
fs.writeFileSync(path.resolve(binPath, `${contractName}.json`), JSON.stringify(compiledCode, null, 2), 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.abi`), compiledCode['interface'], 'utf-8');
fs.writeFileSync(path.resolve(binPath, `${contractName}.bin`), compiledCode['bytecode'], 'utf-8');