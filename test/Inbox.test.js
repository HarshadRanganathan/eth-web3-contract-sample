const path = require('path');
const fs = require('fs');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const contractName = 'Inbox';
const InboxMsg = 'Hi';
const binPath = path.resolve(__dirname, '..', 'bin', 'contracts');

let accounts;
let inbox;

beforeEach(async () => {
    // Get list of accounts created by ganache
    accounts = await web3.eth.getAccounts();

    // Create the contract instance
    const { interface, bytecode } = JSON.parse(fs.readFileSync(path.resolve(binPath, `${contractName}.json`), 'utf-8'));
    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [InboxMsg] })
        .send({ from: accounts[0], gas: 1000000 });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, InboxMsg);
    });
    
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});