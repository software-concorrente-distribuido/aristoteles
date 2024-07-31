# Blockchain Deployment Instructions

## Prerequisites

**Note:** To run the `contract_example` notebook, you must install Python and its dependencies. For testing the app and API, installing Node.js and Docker is sufficient.

Ensure you have the following installed:

- **Python** (Optional): Required for running the Jupyter notebook example.
- **Docker**: Required for containerizing and running the blockchain environment.
- **Node.js**: Required for managing dependencies and running scripts.

## Setting Up the Environment

### 1. Python Environment (Optional)

1. **Create a Virtual Environment:**
   ```bash
   python -m venv .venv
   ```

2. **Activate the Virtual Environment:**
   
   - **On Windows:**
     ```bash
     .venv\Scripts\activate
     ```
   - **On macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```

3. **Install Required Python Packages:**
   Ensure you have a `requirements.txt` file with the necessary packages listed. Install them using:
   ```bash
   pip install -r requirements.txt
   ```

### 2. Node.js Environment

1. **Install Dependencies:**
   ```bash
   npm install
   ```

### 3. Deploy the Smart Contract

1. **Run the Deployment Script:**

   - **On Windows:**
     ```bat
     deploy.bat
     ```
   - **On Linux:**
     ```bash
     sh deploy.sh
     ```

   This script deploys your smart contract to the blockchain. The process may take some time, so please be patient. Take note of the script’s output.

## Running the Example (Optional)

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

   This command runs the test suite to ensure everything is functioning as expected. You won't have to manually compile the contract with `npx solc` for that.

## Modifying Contracts

1. **Compile Contracts:**
   If you need to modify the smart contract or add new features, recompile it using:
   ```bash
   npx solc --optimize --bin --abi ./contracts/Voting.sol -o build/
   ```

   This command compiles the Solidity contract and outputs the binary and ABI files to the `build/` directory.

## Cleanup

1. **Stop and Remove Docker Containers, Networks, Volumes, and Orphans:**
   ```bash
   docker compose down --volumes --remove-orphans
   ```

2. **Remove Docker Images:**
   To remove Docker images associated with your project, use:
   ```bash
   docker image prune -a
   ```

   This command removes all unused Docker images. Ensure that you are not removing images that are still needed.

## Notes

- Ensure Docker is running and properly configured before deploying the smart contract.
- If you encounter issues, check the logs and configurations in Docker and Node.js.
- For allocating more miner nodes in the deployment, check the notes in the `docker-compose.yaml` file.