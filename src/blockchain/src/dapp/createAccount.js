const { Web3 } = require('web3');
const web3 = new Web3();

const account = web3.eth.accounts.create();
console.log('Address:', account.address);
console.log('Private Key:', account.privateKey);
