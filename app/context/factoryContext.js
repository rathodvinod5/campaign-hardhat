// context/Web3Context.js
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const contractAddress = "0x22E72149Cb1562921C3C77510505D8547B926Ca8";

const FactoryContext = createContext();

export const useFacoryContext = () => useContext(FactoryContext);

const FactoryContextProvider = ({ children }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [factoryContract, setFactoryContract] = useState(null);

  useEffect(() => {
    connectToContract();
  }, []);

  const connectToContract = async () => {
    console.log('in useEffect of factory context')
    if (window.ethereum && !connecting) {
      setConnecting(true);

    //   const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    //   setProvider(newProvider);

    //   await newProvider.send("eth_requestAccounts", []).then(accounts => {
    //     setAccount(accounts[0]);
    //     setSigner(newProvider.getSigner());
    //   });

      try {
        // get accounts associtated with waller
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/b469dd1b571f496b952b45a8bde0f3cf");
        const signer = provider.getSigner();

        // get contract details
        const data = new ethers.Contract(contractAddress, contractABI.abi, signer);
        console.log('contract data: ', data)

        setProvider(provider);
        setSigner(signer);
        setFactoryContract(data);

      } catch (error) {
        console.log("Error fetching data from contract", error);
        setError(error);
      }

      setConnecting(false);
    } 
  }

  return (
    <FactoryContext.Provider value={{ provider, signer, account, factoryContract }}>
        {error ? (
            <div><h1>Error in connecting</h1></div>
        ) : connecting ? (
            <div>
                <Segment>
                  <Dimmer active>
                    <Loader />
                    </Dimmer>
                    {/* <Image src='/images/wireframe/short-paragraph.png' /> */}
                </Segment>
            </div>
        ) : children }
    </FactoryContext.Provider>
  );
};

export default FactoryContextProvider;
