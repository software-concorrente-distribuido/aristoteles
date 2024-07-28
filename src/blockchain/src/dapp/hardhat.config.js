require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    localhost: {
      chainId: 3456,
      allowUnlimitedContractSize: true,
    },
  }
};


