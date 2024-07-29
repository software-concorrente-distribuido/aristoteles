const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

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
        const password = 'admin';

        await unlockAccount(address, password, 600);

        const contract = new web3.eth.Contract(abi);

        // Estimate gas required for contract deployment
        const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas({ from: address });
        console.log(`Estimated gas: ${gasEstimate}`);

        // Get account balance
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        console.log(`Account balance: ${balanceEth} ETH`);

        // Calculate total deployment cost
        const gasPriceWei = web3.utils.toWei('1', 'gwei'); // Lower gas price for testing
        const totalCostWei = BigInt(gasEstimate) * BigInt(gasPriceWei);
        const totalCostEth = web3.utils.fromWei(totalCostWei.toString(), 'ether');
        console.log(`Estimated deployment cost: ${totalCostEth} ETH`);

        // Check if account has sufficient funds
        if (BigInt(balanceWei) < totalCostWei) {
            throw new Error('Insufficient funds for deployment');
        }

        // Deploy the contract with estimated gas
        const deployedContract = await contract.deploy({ data: bytecode })
            .send({
                from: address,
                gas: gasEstimate,
                gasPrice: gasPriceWei
            });

        console.log('Contract deployed at address:', deployedContract.options.address);
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

deploy();
