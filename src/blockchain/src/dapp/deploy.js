const { Web3 } = require('web3');
const { abi, evm } = require('./artifacts/contracts/Voting.sol/Voting.json'); // Replace with your contract's ABI and bytecode


const web3 = new Web3('http://localhost:8545');
const account = '0x744dd58D79e0B13312A8D9E40e8EC5888bd3Aa7f';
const privateKey = '0xfdaa0e400b0122907c0ce14d62784ea93c3de5e3d8fdcf193ae396ff3064d88b';

const deploy = async () => {
    const contract = new web3.eth.Contract(abi);

    const deployTx = contract.deploy({ data: evm.bytecode.object });
    const gasEstimate = await deployTx.estimateGas();

    const signedTx = await web3.eth.accounts.signTransaction({
        data: deployTx.encodeABI(),
        gas: gasEstimate,
    }, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Contract deployed at address:', receipt.contractAddress);
};

deploy();
