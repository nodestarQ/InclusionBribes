import {ethers} from 'ethers'
import {default as tornadocashABI} from './tornadocashRouterAbi.json' assert {type: 'json'}
import {default  as DepositContractMock} from '../out/DepositContractMock.sol/DepositContractMock.json' assert {type: 'json'}

//with real tornadocash router
const ifaceTornadoCash = new ethers.Interface(tornadocashABI)
console.log(ifaceTornadoCash.getFunction("deposit").selector)


//with test contract
const ifaceDepositContractMock = new ethers.Interface(DepositContractMock["abi"])
console.log(ifaceDepositContractMock.getFunction("deposit").selector)
console.log(ifaceDepositContractMock.encodeFunctionData("deposit", [ "message1", "message2" ]))