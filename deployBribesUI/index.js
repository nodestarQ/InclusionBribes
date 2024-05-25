import {ethers} from 'ethers'

import {default as AntiCensorShipBriberFoundryData} from "../out/AntiCensorShipBriberFactory.sol/AntiCensorShipBriberFactory.json"
const AntiCensorShipBriberFactoryAbi = AntiCensorShipBriberFoundryData.abi
const AntiCensorShipBriberFactoryAddress = "0x9b147f9889308a1F98E5621EfAD12fB2d85cb1eE"


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
  
  
  
  
  async function connectWallet() {
    //TODO maybe make more efficient by not creating a new provider and etc every time we need it
    const provider = getBrowserProvider()
    const signer = await getSigner(provider)

    const AntiCensorShipBriberContract = new ethers.Contract(
      AntiCensorShipBriberFactoryAddress,
      AntiCensorShipBriberFactoryAbi, 
      signer.provider
    );
    console.log(AntiCensorShipBriberContract)
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
    const funcSelectors = JSON.parse(document.getElementById("funcSelectors").value)
    const rewardTokenAddress = document.getElementById("rewardTokenAddress").value
    const rewardPerCall =  Number(document.getElementById("rewardPerCall").value)


    console.log(contractAddress, funcSelectors, rewardTokenAddress, rewardPerCall )

    const tx = await AntiCensorShipBriberContractSigner.createBribe(contractAddress, funcSelectors, rewardTokenAddress,rewardPerCall)
    console.log(tx)
    console.log(await tx.wait(1))



  }

  function setEventListeners() {
    const connectWalletBtn = document.getElementById("connectWalletBtn")
    connectWalletBtn.addEventListener("click",async (event)=>await connectWalletHandler())

    const deployButton = document.getElementById("deployButton")
    deployButton.addEventListener("click", () => deployButtonHandler())

  }

  async function main() {
    setEventListeners()
    // await refreshUiValues()
  
  
  
  }
  window.onload = main