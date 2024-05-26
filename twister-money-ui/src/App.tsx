import { useAccount, useConnect, useDisconnect, useBalance, useReadContract, useWriteContract  } from 'wagmi'
import { useState, ChangeEvent  } from 'react';
import {ethers} from 'ethers'
import { estimateGas, getAccount, writeContract   } from '@wagmi/core'
import { abi } from './abi.tsx'
import { parseEther } from 'viem'
import {abiTwister} from './abiTwister.tsx';
import {abiBribe} from './abiBribe.tsx';
import { config } from './wagmi.ts'

function App() {
  const twisterMoniesContract = "0xc54Bcaf528E27cCE58791DF374aF45c6757905A8";
  const BribeContract = "0xa5e74A8Be391F67B108F0aE945f720E49DF74F59";
  const rewardTokenAddress = "0x9E62b1Fff8C312c3eC02264F6936ad5ab3a73516";
  const randomAddress = "0x9E62b1Fff8C312c3eC02264F6936ad5ab3a73516";
  const iabiTwister = new ethers.Interface(abiTwister)
  console.log(
  `functionSelector DEPOSIT: 
  ${iabiTwister.getFunction("depositFunds").selector}`
  )

  console.log(
    `functionSelector WITHDRAW: 
    ${iabiTwister.getFunction("withdrawFunds").selector}`
    )

  

  console.log(
    `withdraw calldata: 
    ${iabiTwister.encodeFunctionData("withdrawFunds", [2n])}`
    )

  console.log(
  `salt: 
  ${ethers.hexlify(crypto.getRandomValues(new Uint8Array(new Array(32))))}`
  )

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const userBalance = useBalance({
    address: account.addresses![0],
  })
  const [ethAmount, setEthAmount] = useState("");

  //handles change on the input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEthAmount(event.target.value);
    console.log("\n\n\neth amount: "+event.target.value)
  };

  async function handleButton(){
    writeContract(config,{ 
      abi: abiBribe,
      address: BribeContract,
      functionName: 'callFunction',
      args: [
        2000n,
        iabiTwister.encodeFunctionData("withdrawFunds", [2n]),
        ethers.hexlify(crypto.getRandomValues(new Uint8Array(new Array(32))))
      ],
   })
  }

  async function handleDeposit(){
    const result = await writeContract(config,{
      abi: abiBribe,
      address: BribeContract,
      functionName: 'callFunction',
      args:[
        iabiTwister.encodeFunctionData("depositFunds"),
        200000n,
        ethers.hexlify(crypto.getRandomValues(new Uint8Array(new Array(32))))
      ], 
      value: parseEther(ethAmount)
    })
  }
  async function handleWithdraw(){
    console.log(iabiTwister.encodeFunctionData("withdrawFunds", ["0x0"+parseEther(ethAmount).toString(16)]));
    console.log("\n\n\ncalldata: "+iabiTwister.encodeFunctionData("withdrawFunds", [parseEther(ethAmount)]))
    const result = await writeContract(config,{
      abi: abiBribe,
      address: BribeContract,
      functionName: 'callFunction',
      args:[
        iabiTwister.encodeFunctionData("withdrawFunds", ["0x0"+parseEther(ethAmount).toString(16)]),
        200000n,
        ethers.hexlify(crypto.getRandomValues(new Uint8Array(new Array(32))))
      ], 
      value: parseEther("0")
    })
  }
  

  return (
    <>
      <div>
        <h2>Twister.Monies</h2>

        <div>
          <input type="text" placeholder='INPUT' value={ethAmount} onChange={handleChange} />
          <button onClick={async()=>{handleButton()}}>Max</button>
          <br/>
          <br />
          <button onClick={()=>{handleDeposit()}}>Deposit</button>
          <button onClick={()=>{handleWithdraw()}}>Withdraw</button>
        </div>
        <br />

        <div>
          balance: {userBalance.data?.value.toString()}
          <br />
          connected address: {account.addresses?account.addresses[0]:""}
          <br />
          chainId: {account.chainId}
        </div>
        <br />

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
