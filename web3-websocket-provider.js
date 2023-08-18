const { Web3 } = require('web3');
const ganache = require("ganache");

// Connect to the Ethereum network using WebSocket provider

const ganacheUrl = 'ws://localhost:8545';
const wsProvider = new Web3.providers.WebsocketProvider(ganacheUrl);
// const web3 = new Web3(wsProvider);

// const options = { < namespace >: { <option>: <value>}};
const web3 = new Web3(ganache.provider(options));

async function main() {
  try {
    console.log(
      'Does the provider support subscriptions?:',
      wsProvider.supportsSubscriptions(),
    );

    // Subscribe to new block headers
    const subscription = await web3.eth.subscribe('newBlockHeaders');

    subscription.on('data', async blockhead => {
      console.log('New block header: ', blockhead);

      // You do not need the next line if you like to keep notified for every new block
      await subscription.unsubscribe();
      console.log('Unsubscribed from new block headers.');
    });
    subscription.on('error', error =>
      console.log('Error when subscribing to New block header: ', error),
    );

    // Get the list of accounts in the connected node which is in this case: Ganache.
    const accounts = await web3.eth.getAccounts();
    // Send a transaction to the network
    const transactionReceipt = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei('0.001', 'ether'),
    });
    console.log('Transaction Receipt:', transactionReceipt);
  } catch (error) {
    console.error(error);
  }
}

main();