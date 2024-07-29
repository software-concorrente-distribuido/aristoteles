const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to local Ethereum node
const web3 = new Web3('http://localhost:8545');

// Read ABI and Bytecode
const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build/contracts_Voting_sol_Voting.abi'), 'utf8'));
const bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, 'build/contracts_Voting_sol_Voting.bin'), 'utf8');

// Unlock the account
const unlockAccount = async (address, password, duration) => {
    return new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(address, password, duration)
            .then(resolve)
            .catch(reject);
    });
};

async function deploy() {
    try {
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const password = process.env.ACCOUNT_PASSWORD;
        await unlockAccount(address, password, 300);
        const contract = new web3.eth.Contract(abi);

        const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas();

        // Get current gas price and convert to BigInt
        let gasPrice = BigInt(await web3.eth.getGasPrice());

        // Deploy contract
        const deployedContract = await contract.deploy({ data: bytecode })
            .send({ from: address, gas: gasEstimate, gasPrice: gasPrice.toString() });

        console.log('Contract deployed at address:', deployedContract.options.address);

    } catch (e) {
        console.error('Error:', e.message);
    }
}

deploy();
