# Blockchain Deploy Instructions

## Prerequisites

Ensure you have the following installed:
- **Python**: Required for running the Jupyter notebook example.
- **Docker**: Required for containerizing and running the blockchain environment.
- **Node.js**: Required for managing dependencies and running scripts.

## Setting Up the Environment

### 1. **Python Environment**

1. **Create a Virtual Environment:**
   ```bash
   python -m venv .venv
   ```

2. **Activate the Virtual Environment:**
   
   On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. **Install Required Python Packages:**
   Ensure you have a `requirements.txt` file with the necessary packages listed. Install them using:
   ```bash
   pip install -r requirements.txt
   ```

### 2. **Node.js Environment**
   Install all `package.json` required dependencies using:
   ```bash
   npm install
   ```

### 3. **Deploy the Smart Contract**

1. **Run the Deployment Script:**
   ```bash
   sh deploy.sh
   ```

   This script will deploy your smart contract to the blockchain. It takes a while, so please be patient. And get note of the outputs of the script.

## Running the Example

1. **Start Jupyter Notebook:**
   ```bash
   jupyter notebook
   ```

2. **Open `contract_example.ipynb`:**
   Navigate to the notebook in your browser and follow the instructions to interact with the deployed contract.

## Testing

1. **Run Tests:**
   ```bash
   npx hardhat test
   ```

   This command runs the test suite to ensure everything is functioning as expected.

## Modifying Contracts

1. **Compile Contracts:**
   If you need to modify the smart contract or add new features, recompile it using:
   ```bash
   npx solc --optimize --bin --abi ./contracts/Voting.sol -o build/
   ```

   This command will compile the Solidity contract and output the binary and ABI files to the `build/` directory.

## Notes

- Ensure Docker is running and properly configured before deploying the smart contract.
- If you encounter issues, check the logs and configurations in Docker and Node.js.
