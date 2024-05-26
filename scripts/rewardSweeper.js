import { ethers } from 'ethers'
import { default as inclusionBribeContractFoundryData } from '../out/AntiCensorShipBriber.sol/AntiCensorShipBriber.json'  assert {type: 'json'}


if (process.argv.length < 5) {
    console.log("missing arguments\n usage: node YOUR_PRIVATEKEY INFURA_SEPOLIA_URL INCLUSION_BRIBE_CONTRACT_ADDRESS")
} else {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const INCLUSION_BRIBE_ABI = inclusionBribeContractFoundryData.abi

    const PRIVATE_KEY = process.argv[2]
    const provider = new ethers.JsonRpcProvider(process.argv[3])
    const INCLUSION_BRIBE_CONTRACT = process.argv[4]
    const abicoder = new ethers.AbiCoder();
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const inclusionBribeContractObj = new ethers.Contract(
        INCLUSION_BRIBE_CONTRACT,
        INCLUSION_BRIBE_ABI,
        signer
    );

    while (true) {
        const block = await provider.getBlock("latest")
        console.log(Number(block.number))

        for (const txHash of block.transactions) {
            const tx = await provider.getTransaction(txHash);
            if (tx.to === ethers.getAddress(INCLUSION_BRIBE_CONTRACT)) {

                const txArgs = (abicoder.decode(['bytes', 'uint32', 'bytes32',], ethers.dataSlice(tx.data, 4))).toArray()
                const hash = ethers.solidityPackedKeccak256(["bytes", "uint256", "uint32", "bytes32"], [txArgs[0], tx.value, txArgs[1], txArgs[2]])

                const sweepTx = await inclusionBribeContractObj.sweepReward(hash)
                console.log(`submitted sweeping tx: ${sweepTx.hash}`)
            }

        }

        //is shorter then block time but better be safe and be sure to get the tx
        //await execSync('sleep 5000');
        await delay(5000)
    }
}


