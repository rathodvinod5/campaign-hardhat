"use client"
// components/ContractInteraction.js
import { useEffect, useState } from "react";
import { getContract } from "../../lib/ether";
import contractABI from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import ethers from "ethers";


const contractAddress = "0x22E72149Cb1562921C3C77510505D8547B926Ca8";

const ContractInteraction = () => {
  const [account, setAccount] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Is ethe present: ', typeof window.ethereum, typeof window.ethereum !== 'undefined', window.ethereum)
    const loadProvider = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum) {
        try {
          console.log('in useEffect')
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
          console.log('accounts: ', accounts[0]);
        } catch (error) {
          console.error("Error connecting to metamask", error);
        }
      }
    };

    loadProvider();
  }, []);

  const fetchData = async () => {
    if(typeof window.ethereum !== 'undefined' && window.ethereum) {
      try {
        console.log('in fetchdata')
      // const contract = getContract(contractAddress, contractABI.abi);
      // const data = await contract.requests();

      const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
      const data = new ethers.Contract(contractAddress, contractABI.abi, provider.getSigner());
      console.log('data: ', data);
    //   setData(data);
    } catch (error) {
      console.error("Error fetching data from contract", error);
    }
    }
  };

  const sendData = async () => {
    try {
      const contract = getContract(contractAddress, contractABI.abi);
      const tx = await contract.someWriteFunction("someValue", {
        from: account,
      });
      await tx.wait();
      console.log("Transaction successful", tx);
    } catch (error) {
      console.error("Error sending data to contract", error);
    }
  };

  return (
    <div>
      <h1>Interact with Contract</h1>
      <button onClick={fetchData}>Fetch Data</button><br />
      <button onClick={sendData}>Send Data</button>
      {data && <p>Data: {data}</p>}
    </div>
  );
};

export default ContractInteraction;
