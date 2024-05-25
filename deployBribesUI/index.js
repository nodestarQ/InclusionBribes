import {ethers} from 'ethers'
window.ethers =ethers

import {default as AntiCensorShipBriberFoundryData} from "../out/AntiCensorShipBriberFactory.sol/AntiCensorShipBriberFactory.json"
const AntiCensorShipBriberFactoryAbi = AntiCensorShipBriberFoundryData.abi
const AntiCensorShipBriberFactoryAddress = "0x9e62b1fff8c312c3ec02264f6936ad5ab3a73516"

import {default as DepositContractMockFoundryData} from "../out/DepositContractMock.sol/DepositContractMock.json"
const DepositContractMockAbi = DepositContractMockFoundryData.abi
console.log(getFunctionSelectors(DepositContractMockAbi))


/**
 * 
 * @param {ethers.provider} provider 
 */
async function getSigner(provider) {
    try {
      return await provider.getSigner()
    } catch (error) {
      console.warn("couldnt connect to browser wallet")
      console.warn(error)
      return false
    }
  }
  
    //-----------------functions------------------
    function getBrowserProvider() {
      try {
        return new ethers.BrowserProvider(window.ethereum)
      } catch (error) {
        console.warn("couldnt connect to browser wallet")
        console.warn(error)
        return false
      }
    }
    function getFunctionSelectors(abi) {
      const iface = new ethers.Interface(abi)
      const selectors = {}

      for (const item of abi) {
        if (item.type === "function") {
          selectors[item.name] = iface.getFunction(item.name).selector

        }

      }
      return selectors
    }
  
  
  
  
  async function connectWallet() {
    //TODO maybe make more efficient by not creating a new provider and etc every time we need it
    const provider = getBrowserProvider()
    const signer = await getSigner(provider)

    const AntiCensorShipBriberContract = new ethers.Contract(
      AntiCensorShipBriberFactoryAddress,
      AntiCensorShipBriberFactoryAbi, 
      signer.provider
    );
    const AntiCensorShipBriberContractSigner = AntiCensorShipBriberContract.connect(signer)

  
    
  
    window.provider = provider
    window.signer = signer
    return {signer, provider, AntiCensorShipBriberContractSigner}
  }

  //event handlers
  async function connectWalletHandler() {
    await connectWallet()
  }

  async function deployButtonHandler() {
    const {signer, provider, AntiCensorShipBriberContractSigner} = await connectWallet()
    const contractAddress = document.getElementById("contractAddress").value
    const funcSelectors = JSON.parse(document.getElementById("funcSelectorsTextInput").value)
    const rewardTokenAddress = document.getElementById("rewardTokenAddress").value
    const rewardPerCall =  Number(document.getElementById("rewardPerCall").value)



    const tx = await AntiCensorShipBriberContractSigner.createBribe(contractAddress, funcSelectors, rewardTokenAddress,rewardPerCall)
    console.log(tx)
    console.log(await tx.wait(1))
    const confirmerdTx= await tx.wait(1)
    const deployedAddressBytes =  confirmerdTx.logs[1].data
    const deployedAddress = ethers.getAddress("0x"+deployedAddressBytes.slice(26))

    localStorage.setItem(deployedAddress, JSON.stringify({contractAddress, funcSelectors, rewardTokenAddress, rewardPerCall}) )
    listDeployments()




  }

  async function getAbi(contractAddress) {
    //TODO make configurable sepolia/mainnet
    const r = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=ZEMX5KWUEYW5UAYAAGEWY2EY5YX3YXPJZS`)
    const rjson = await r.json()
    const abi = rjson.result

    if (abi !== 'Contract source code not verified') {
      console.log(JSON.parse(abi))
      return JSON.parse(abi)
    } else {
      console.warn('Contract source code not verified. using hardcoded abi')
      return DepositContractMockAbi
    }
    
  }

  async function submitContractAddressHandler(event) {
    if (event.key === "Enter") {
      const contractAddress = ethers.getAddress(document.getElementById("contractAddress").value)
      const abi = await getAbi(contractAddress)
      const funcSelectors =  getFunctionSelectors(abi)

      const funcSelectorsListEl = document.getElementById("functionSelectors")
      for (const functionName of Object.keys(funcSelectors)) {
        const option = document.createElement("option")
        option.value = funcSelectors[functionName]
        option.innerText = functionName
        funcSelectorsListEl.append(option)
      }


      
    }

  }
  
  function functionSelectorsSelectorHandler() {
    const funcSelectorsTextInput = document.getElementById("funcSelectorsTextInput")
    const currentSelectors = JSON.parse(funcSelectorsTextInput.value)

    const functionSelectorsSelector = document.getElementById("functionSelectors")
    currentSelectors.push(functionSelectorsSelector.value)
    funcSelectorsTextInput.value = JSON.stringify(currentSelectors)
    functionSelectorsSelector.value = ""
     
  }
  
  function listDeployments() {
    const deployedBribesList = document.getElementById("deployedBribesList")
    deployedBribesList.innerHTML = ""
    console.log(localStorage)

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      const item = document.createElement("li")
      const a = document.createElement("a")
      a.href = `https://sepolia.etherscan.io/address/${key}`
      a.innerText = key
      const div = document.createElement("div")
      console.log(key)
      const {contractAddress, funcSelectors, rewardTokenAddress, rewardPerCall} = JSON.parse(localStorage.getItem(key))
      div.innerText = `target contract: ${contractAddress}, reward token: ${rewardTokenAddress}, rewards per call ${rewardPerCall}`

      item.append(a, div)
      deployedBribesList.append(item)
    }
   
    

  }

  function setEventListeners() {
    const connectWalletBtn = document.getElementById("connectWalletBtn")
    connectWalletBtn.addEventListener("click",async (event)=>await connectWalletHandler())

    const deployButton = document.getElementById("deployButton")
    deployButton.addEventListener("click", () => deployButtonHandler())

    const contractAddress = document.getElementById("contractAddress")
    contractAddress.addEventListener("keyup", async (event)=>await submitContractAddressHandler(event))

    const functionSelectorsSelector = document.getElementById("functionSelectors")
    functionSelectorsSelector.addEventListener("change", ()=>functionSelectorsSelectorHandler())

  }

  async function main() {
    setEventListeners()
    listDeployments()
    // await refreshUiValues()
  
  
  
  }
  window.onload = main