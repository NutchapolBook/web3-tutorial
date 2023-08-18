const { Web3 } = require('web3');
const { IpcProvider } = require('web3-providers-ipc');

// Connect to the Ethereum network using IPC provider
const ipcPath = '/Users/Book/Library/Ethereum/geth.ipc'; // Replace with your actual IPC path
const ipcProvider = new IpcProvider(ipcPath);

const web3 = new Web3(ipcProvider);

async function main() {
  try {
    console.log(
      'Do the provider supports subscription?:',
      ipcProvider.supportsSubscriptions(),
    );

    // Get the list of accounts in the connected node which is in this case: geth in dev mode.
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);

    // Send a transaction to the network
    const transactionReceipt = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[0], // sending a self-transaction
      value: web3.utils.toWei('0.001', 'ether'),
    });
    console.log('Transaction Receipt:', transactionReceipt);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();