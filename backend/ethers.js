const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); // e.g., Infura or local Hardhat
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const registryAbi = ;/* copy ABI from artifact */
const registry = new ethers.Contract(process.env.REGISTRY_ADDRESS, registryAbi, wallet);

async function issueCredits(projectId, to, amount) {
  const tx = await registry.verifyAndIssue(projectId, to, amount);
  await tx.wait();
  return tx.hash;
}