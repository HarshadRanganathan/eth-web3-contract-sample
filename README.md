# Ethereum Smart Contracts

Sample contract which you can compile and deploy to Rinkeby Network.

This is based on Stephen Grider's Udemy Course.

Packages utilized:
- [Ganache cli](https://www.npmjs.com/package/ganache-cli) - Test RPC
- [Solc](https://www.npmjs.com/package/solc) - Solidity Compiler
- [Web3](https://web3js.readthedocs.io/en/1.0/index.html) - Ethereum JavaScript API
- [Truffle Wallet Provider](https://github.com/trufflesuite/truffle-hdwallet-provider) - HD Wallet-enabled Web3 provider 
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

![LOTTERY-CONTRACT-ETHEREUM](https://i.imgur.com/yTlc0yE.gif)

## Pre-Requisites To Deploying Contracts To Rinkeby Network

### Create Ethereum Account

You must first create an ethereum account to start deploying your contracts. 

1. Install [Metamask](https://metamask.io/) browser extension.
2. Provide a master password and save the 12-word mnemonic (this will be required later).
3. Copy your full account address (e.g. 0x6ed3....) which will be used for getting some ethers.
4. Choose `Rinkeby Test Net` for your account.

### Get Free Ether For Your Account

Deploying your contracts and executing transactions on it will cost you some ethers.

Hence, we need to first add some ethers for your account before proceeding to the next steps.

[Rinkeby Faucet](https://faucet.rinkeby.io/) can be used to get some free ethers to your account in Rinkeby Network.

### Setup Provider

We require a node in the Rinkeby network to deploy our contract.

Register for [Infura](https://infura.io/) and get your API key/provider address which we can use to deploy our contracts to the network.

### Update Config

In the `config.js` file update the following properties:

1. `config.mnemonic` to be updated with the 12-word mnemonic which you got from metamask.
2. `config.provider_uri` to be updated with the Infura provider URL.

## Deploying The Contract In TestRPC & Rinkeby Network
1. Install all the required dependencies
```
npm install
```

2. Compile any of the sample contracts inside the `contracts` folder
```
npm run compile-contract -- --contract=Inbox
```
This will generate the ABI (Application Binary Interface) and the bytecode in the `bin` directory.

3. Run the tests (optional)
```
npm run test
```
This will deploy and test the contract using Ganache TestRPC.

4. Deploy the compiled contract to Rinkeby test network. If the contract expects arguments pass them using `--arguments` option
```
npm run deploy-contract -- --contract=Inbox --arguments=Hi
```

Once the contract is deployed to Rinkeby test network, you can use the contract address shown in the console to explore the block using [Rinkeby EtherScan](https://rinkeby.etherscan.io/).

Alternatively, you can also deploy and interact with your contract using [Remix](https://remix.ethereum.org/). 

Write your own contract and choose `Injected Web3` in the `Run` tab. 

This will use your metamask account to deploy contracts and interact with them.

## Lottery Contract

Interact with the lottery contract deployed in Rinkeby network at address `0x77EFc56DFf33333Fe864e798B847B827d9691288`.

Run the React web app using below command

```
npm run start-app
```

Open `http://localhost:3000/` in the browser where you have installed the metamask extension and then enter into the lottery!

Note: Metamask will ask for your approval to allow React App to connect to your account. You need to approve the same so that we can send transactions using your account.