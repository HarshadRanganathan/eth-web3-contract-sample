const path = require('path');
const fs = require('fs');
const config = require('./config');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const contractName = 'Inbox';
const binPath = path.resolve(__dirname, 'bin', 'contracts');
const mnemonic = config.mnemonic;
const InboxMsg = 'Hi';

const { interface, bytecode } = JSON.parse(fs.readFileSync(path.resolve(binPath, `${contractName}.json`), 'utf-8'));

const provider = new HDWalletProvider(mnemonic, config.provider_uri);
const web3 = new Web3(provider);

let inbox;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy contract from Account: ' + accounts[0]);
    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode, arguments: [InboxMsg] })
        .send({ from: accounts[0], gas: 1000000 });
    console.log('Contract deployed to address: ' + inbox.options.address);
};

deploy();