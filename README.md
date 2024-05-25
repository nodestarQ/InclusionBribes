# antiCensorshipBribes
ETHBerlin Hackathon 2024 entry


ui
## notes
### Smart Contracts
- 0.1eth 0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc
- 1eth 0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936
### ABI Location 
ABIs are stored in d573b16.js
=======
`anvil --fork-url https://mainnet.infura.io/v3/${INSERT_INFURAKEY} --state test/anvilstate/forkedMainetState-24-5-2024.json --chain-id 31337 --base-fee 1000000000 -p 8555`

`foundryup`
`yarn install`
`forge build`
`yarn deploy`

deploy factory
```
forge create --rpc-url <your_rpc_url> \
    --private-key "YOURPRIVATEKEY" \
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/AntiCensorShipBriber.sol:AntiCensorShipBriber
```

```
forge create --rpc-url https://sepolia.infura.io/v3/2LPfLOYBTHSHfLWYSv8xib2Y7OA \
    --private-key "YOURPRIVATEKEY"\
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/AntiCensorShipBriber.sol:AntiCensorShipBriber
```

```
forge create --rpc-url https://sepolia.infura.io/v3/2LPfLOYBTHSHfLWYSv8xib2Y7OA \
    --private-key "YOURPRIVATEKEY" \
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/test/DepositContractMock.sol:DepositContractMock
```
```
forge create --rpc-url https://sepolia.infura.io/v3/2LPfLOYBTHSHfLWYSv8xib2Y7OA \
    --private-key "YOURPRIVATEKEY" \
    --etherscan-api-key "YOURINFURAKEY" \
    --verify \
    contracts/test/RewardToken.sol:RewardToken
```