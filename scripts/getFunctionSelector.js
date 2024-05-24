import {ethers} from 'ethers'
import {default as tornadocashABI} from './tornadocashRouterAbi.json' assert {type: 'json'}
import {default  as testTornadocashABI} from '../out/testTornadocash.sol/antiCensorShipBriber.json' assert {type: 'json'}

//with real tornadocash router
console.log(testTornadocashABI["abi"])
const ifaceTornadoCash = new ethers.Interface(tornadocashABI)
console.log(ifaceTornadoCash.getFunction("deposit").selector)


//with test contract
console.log(Object.keys(testTornadocashABI.abi))
const ifaceTestTornadoCash = new ethers.Interface(testTornadocashABI["abi"])
console.log(ifaceTestTornadoCash.getFunction("deposit").selector)
console.log(ifaceTestTornadoCash.encodeFunctionData("deposit", [ "message1", "message2" ]))