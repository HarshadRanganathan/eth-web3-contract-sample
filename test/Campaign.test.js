const path = require('path');
const fs = require('fs');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const contractName = 'Campaign';
const campaignMinContribution = 1
const binPath = path.resolve(__dirname, '..', 'bin', 'contracts');

let accounts;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Create the contract instance
    const { abi, evm: { bytecode: { object } } } = JSON.parse(fs.readFileSync(path.resolve(binPath, `${contractName}.json`), 'utf-8'));
    
    campaign = await new web3.eth.Contract(abi)
        .deploy({ data: object, arguments: [campaignMinContribution] })
        .send({ from: accounts[0], gas: 2000000 });
});

describe('Campaign Contract', () => {
    it('deploys a contract', () => {
        assert.ok(campaign.options.address);
    });
    it('has a minimum contribution set', async () => {
        const assignedMinContribution = await campaign.methods.minimumContribution().call({ from: accounts[0] });
        assert.equal(assignedMinContribution, campaignMinContribution);
    });
    it('allows contribution', async () => {
        await campaign.methods.contribute().send({ from: accounts[1], value: web3.utils.toWei('0.2', 'ether') });
        await campaign.methods.contribute().send({ from: accounts[2], value: web3.utils.toWei('0.2', 'ether') });

        const approversCount = await campaign.methods.approversCount().call({ from: accounts[0] });

        assert.ok(await campaign.methods.approvers(accounts[1]).call({ from: accounts[0] }));
        assert.ok(await campaign.methods.approvers(accounts[2]).call({ from: accounts[0] }));
        assert.equal(approversCount, 2);
    });
    it('requires minimum amount of ether to enter', async () => {
        try {
            await campaign.methods.contribute().send({ from: accounts[1], value: web3.utils.toWei('0.001', 'ether') });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });
    it('allows to create a request', async () => {
        await campaign.methods.createRequest('Test', 1, accounts[0]).call({ from: accounts[0] });
    });
});