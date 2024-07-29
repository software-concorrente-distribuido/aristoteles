#!/bin/bash

# Start Docker Compose and wait for containers to be ready
docker-compose up --build -d
echo "Starting the Blockchain..."
sleep 5

# Address files generated in Dockerfile to use as reward and distribution source wallets.
ADDRESS_1="ADDRESS_1.txt"
ADDRESS_2="ADDRESS_2.txt"

# Elegant way of getting the miners. You'll have to modify this when adding more services to the docker-compose file
CONTAINERS=($(docker-compose ps -q | xargs docker inspect --format '{{.Name}}' | sed 's/^\/\(\w\+\)$/\1/' | cut -c2-))

# Calculate the midpoint of the containers array
NUM_CONTAINERS=${#CONTAINERS[@]}
MIDPOINT=$((NUM_CONTAINERS / 2))

# Iterate over containers to set the etherbase addresses
for i in "${!CONTAINERS[@]}"; do
    CONTAINER=${CONTAINERS[$i]}

    if [ $i -lt $MIDPOINT ]; then
        ADDRESS_FILE=$ADDRESS_1
    else
        ADDRESS_FILE=$ADDRESS_2
    fi

    ADDRESS=$(docker exec "$CONTAINER" cat "$ADDRESS_FILE" 2>&1)

    # Set Etherbase and capture its status
    OUTPUT=$(docker exec "$CONTAINER" geth attach --exec "miner.setEtherbase('$ADDRESS')" 2>&1)
    STATUS=$?

    # Check the exit status and print appropriate messages
    if [ $STATUS -eq 0 ]; then
        echo "$CONTAINER: Successfully set etherbase to $ADDRESS"
    else
        echo "$CONTAINER: Error setting miner address."
        echo "$OUTPUT" 
    fi
done

sleep 5
echo "Deploying the Smart Contract. This process might take a while."
node --no-deprecation deploy_contract.js
# sleep 5
# echo "Taking down the Blockchain."
# docker compose down --volumes --remove-orphans
