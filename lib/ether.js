// lib/ethers.js
import { ethers, JsonRpcProvider } from "ethers";

// const provider = new JsonRpcProvider(process.env.SEPOLIA_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);

// const provider = new ethers.providers.web3Provider(window.ethereum);

const getContract = (address, abi) => {
  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};

export { provider, getContract };
