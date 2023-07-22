require('dotenv').config()
const { ethers } = require("ethers");
const Token = require("../artifacts/contracts/ICO.sol/ICO.json")
const provider = new ethers.providers.InfuraProvider("mainnet");
const address = ""
const signer = new ethers.Wallet(process.env.private_key, provider);
const contract = new ethers.Contract(address, Token.abi, provider)
const contractWithSigner = contract.connect(signer);
let overrides = {
  // To convert Ether to Wei:
  value: ethers.utils.parseEther("0.2")     // ether in this case MUST be a string
};

const main = async () => {
  // await contractWithSigner._setClosingTime(1701356400)
  const data = await contract.closingTime()
  // await contractWithSigner.buyTokens("0xBb8d4f34273Ef13870eBb5f56458D5e63a97dDd0", overrides)
  console.log(new Date(data.toNumber()));
  // await contractWithSigner.removeFromLockWhitelist("0xfB11f69093Fe71B72B9650cb4e1775bD89f19EeC")
  // await contractWithSigner.lock()
  // console.log(await contract.lockWhiteList("0xfB11f69093Fe71B72B9650cb4e1775bD89f19EeC"))
  ;
}
main();
