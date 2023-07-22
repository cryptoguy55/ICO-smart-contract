require('dotenv').config()
const { ethers } = require("ethers");
const Token = require("../artifacts/contracts/Token.sol/Token.json")
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const signer = new ethers.Wallet(process.env.private_key, provider);
const contract = new ethers.Contract(address, Token.abi, provider)
const contractWithSigner = contract.connect(signer);
const main = async () => {
  const data = await contract.name()
  console.log(data);
  await contractWithSigner.removeFromLockWhitelist("0xfB11f69093Fe71B72B9650cb4e1775bD89f19EeC")
  await contractWithSigner.lock()
  console.log(await contract.lockWhiteList("0xfB11f69093Fe71B72B9650cb4e1775bD89f19EeC"));
}
main();
