const { Web3 } = require('web3');
const web3 = new Web3('http://localhost:8545'); // Connect to local Ethereum node

const senderAddress = '0x0000000000000000000000000000000000000001'; // Address with funds
const senderPassword = 'admin'; // Password for the sender account
const transferAmount = web3.utils.toWei('1', 'ether'); // Amount to transfer

// Unlock the sender account
const unlockAccount = async (address, password, duration) => {
    return new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(address, password, duration)
            .then(resolve)
            .catch(reject);
    });
};

const createAndFundAccount = async () => {
    try {
        // Create a new account
        const newAccount = await web3.eth.personal.newAccount('password');
        console.log('New account created:', newAccount);

        // Unlock the sender account
        await unlockAccount(senderAddress, senderPassword, 600);
        // Send Ether to the new account
        const transaction = {
            from: senderAddress,
            to: newAccount,
            value: transferAmount,
            gas: 21000,
            gasPrice: web3.utils.toWei('20', 'gwei')
        };

        const txReceipt = await web3.eth.sendTransaction(transaction);
        console.log('Transaction successful:', txReceipt);

    } catch (error) {
        console.error('Error:', error);
    }
};


createAndFundAccount();
