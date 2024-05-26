# antiCensorshipBribes
ETHBerlin Hackathon 2024 entry


# run sepolia
### install
```
foundryup;
yarn install;
forge build;
```

### run reward sweeper
```
node scripts/rewardSweeper.js YOUR_PRIVATE_KEY https://sepolia.infura.io/v3/YOUR_INFURA_KEY 0xa5e74A8Be391F67B108F0aE945f720E49DF74F59
```

### run ui to create bribe
```
yarn dev
```

# deploy
#### deploy factory
```
forge create --rpc-url <your_rpc_url> \
    --private-key "YOURPRIVATEKEY" \
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/AntiCensorShipBriberFactory.sol:AntiCensorShipBriberFactory
```
#### deploy reward token
```
forge create --rpc-url https://sepolia.infura.io/v3/2LPfLOYBTHSHfLWYSv8xib2Y7OA \
    --private-key "YOURPRIVATEKEY" \
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/test/RewardToken.sol:RewardToken
```


# test
```
forge test
```