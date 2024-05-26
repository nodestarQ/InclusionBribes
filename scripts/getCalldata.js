import {ethers} from 'ethers'
import {default as tornadocashABI} from './tornadocashRouterAbi.json' assert {type: 'json'}
import {default  as DepositContractMock} from '../out/DepositContractMock.sol/DepositContractMock.json' assert {type: 'json'}

//with real tornadocash router
const ifaceTornadoCash = new ethers.Interface(tornadocashABI)

//get function selector
console.log(
`functionSelector: 
${ifaceTornadoCash.getFunction("deposit").selector}`
)

//get call
//from https://etherscan.io/tx/0xd3bff9bf9622f4a1deda0e86d9904c2ffbc207625360f22d95b22d3869688cac
const _tornado = "0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936" //tornadocash 1 eth
const _commitment = "0x0f7a50681d2753ee21ece9e795f721a375f8d009ffd56ea1652a518f29b58c3d"
const _encryptedNote = "0x00" //is just a onchain backup
console.log(
`calldata: 
${ifaceTornadoCash.encodeFunctionData("deposit", [_tornado , _commitment,  _encryptedNote])}`
)
//salt
console.log(
`salt: 
${ethers.hexlify(crypto.getRandomValues(new Uint8Array(new Array(32))))}`
)


const funcCallData = "0xe2c41dbc"
const value = BigInt(10000000000)
const gasLimit = BigInt(200000)
const salt = "0x2c6745395fe743cfc228e3da309939380f52628a3355a312767be06ab7a77b65"
const abiCoder = new ethers.AbiCoder()
const hash = ethers.solidityPackedKeccak256(["bytes","uint256", "uint32", "bytes32"], [ethers.toBeArray(funcCallData),value, gasLimit, ethers.toBeArray(salt)])
console.log(hash)


