import {ethers} from 'ethers'
import {default as inclusionBribeContractFoundryData} from '../out/AntiCensorShipBriber.sol/AntiCensorShipBriber.json'  assert {type: 'json'}

const INCLUSION_BRIBE_ABI = inclusionBribeContractFoundryData.abi
const INCLUSION_BRIBE_CONTRACT = "0xa5e74A8Be391F67B108F0aE945f720E49DF74F59"
const PRIVATE_KEY = ""


const provider =  new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/2LPfLOYBTHSHfLWYSv8xib2Y7OA")
const tx = await provider.getTransaction("0x533c42c6849772bf3a7d4fa8c79d68d29faade5e0145ba6c2c1feabd664a81a3");
const abicoder = new ethers.AbiCoder();
const txArgs = (abicoder.decode(['bytes', 'uint32', 'bytes32',],ethers.dataSlice(tx.data,4))).toArray()
const hash = ethers.solidityPackedKeccak256(["bytes","uint256", "uint32", "bytes32"], [txArgs[0],tx.value, txArgs[1], txArgs[2]])
console.log(hash)

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const inclusionBribeContractObj = new ethers.Contract(
    INCLUSION_BRIBE_CONTRACT,
    INCLUSION_BRIBE_ABI, 
    signer
  );

const sweepTx = await inclusionBribeContractObj.sweepReward(hash)
console.log(sweepTx.hash)
console.log(await sweepTx.wait(1))
