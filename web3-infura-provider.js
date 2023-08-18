const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const bip39 = require('bip39');

const mnemonic = bip39.generateMnemonic(); // generates seed phrase
console.log('seed phrase:', mnemonic);

// Connect to the Ethereum network using an HTTP provider and WalletProvider
const provider = new HDWalletProvider(
  mnemonic,
  'https://mainnet.infura.io/v3/600f4a8399d44e3b83e3b3ea564a542a',
);
const web3 = new Web3(provider);

// Get the current block number from the network
web3.eth
  .getBlockNumber()
  .then(function (blockNumber) {
    console.log('Current block number:', blockNumber);
  })
  .catch(function (error) {
    console.log('Error:', error);
  });