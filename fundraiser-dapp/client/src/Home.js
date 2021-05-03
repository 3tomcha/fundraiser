import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import fundraiserFactoryContract from "./contracts/FundraiserFactory.json";
import detectEtheriumProvider from '@metamask/detect-provider';
import FundraiserCard from "./FundraiserCard";

const Home = () => {
    const { contract, setContract } = useState(null);
    const { accounts, setAccounts } = useState(null);
    const { funds, setFunds } = useState([]);

    useEffect(()=> {
    }, []);

    const displayFundraisers = () => {
      return funds.map((fundraiser) => {
        return <FundraiserCard fundraiser={fundraiser}/>
      });
    };

    const init = async() => {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = fundraiserFactoryContract.networks[networkId];
          const instance = new web3.eth.Contract(
            fundraiserFactoryContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(instance);
          setAccounts(accounts);

          // fundraisersの呼び出しをここに追加
          const funds = await instance.methods.fundraisers(10, 0).call();
          setFunds(funds);

        } catch(error) {
          alert(
            `App.js: Failed to load web3, accounts, or contract.
            Check console for details.`
          )
          console.error(error);
        }
      };

    return (
        <div>
          {displayFundraisers}
        </div>
    );
}

export default Home;