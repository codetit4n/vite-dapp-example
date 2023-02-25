import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TopNavbar from "./components/Navbar"
import Footer from "./components/Footer"
import EthGif from './assets/eth-logo-animated.gif'
import './App.css'
import LoadingSpinner from "./components/LoadingSpinner";
import { OnClickFunction, MetamaskError, hexToDecimal } from './Helpers/helpers'
import MainContent from "./components/MainContent";

function App() {

  const [loader, setLoader] = useState(false);
  const [currentAddress, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<number>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [metamaskNotPresent, setMetamaskNotPresent] = useState(false);

  useEffect(() => {
    loadWeb3Provider();
  }, [])

  useEffect(() => {
    try {
      window.ethereum.on('chainChanged', async function (params: string) {
        setChainId(hexToDecimal(params))
      })
    } catch (err) {
      console.log(err);
      setMetamaskNotPresent(true);
    }
  }, [])

  useEffect(() => {
    try {
      window.ethereum.on('accountsChanged', async function (params: string[]) {
        setAddress(params[0]);
      })
    } catch (err) {
      console.log(err);
      setMetamaskNotPresent(true);
    }
  }, [])

  const connect: OnClickFunction = async (e) => {
    e.preventDefault()
    if (metamaskNotPresent) {
      alert('Please install a web3 wallet like MetaMask!')
    } else {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          setAddress(accounts[0]);
        })
        .catch((error: MetamaskError) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
    }
  }

  const loadWeb3Provider = async () => {
    setLoader(true);
    try {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      const network = await prov.getNetwork();
      const chainId = network.chainId;
      setProvider(prov);
      setChainId(chainId);
      let connectedAccounts = window.ethereum._state.accounts;
      if (connectedAccounts.length > 0) {
        setAddress(connectedAccounts[0])
      }
      setMetamaskNotPresent(false);
    } catch (err) {
      console.log(err);
      setMetamaskNotPresent(true);
    }
    setLoader(false);
  }


  return (
    <>
      <TopNavbar connect={connect} address={currentAddress} chainId={chainId} provider={provider} />
      {
        loader ?
          <LoadingSpinner /> :
          <div>
            {
              currentAddress ?
                <MainContent />
                :
                <>
                  <img src={EthGif} alt="eth animated logo" className="eth" />
                  <h2>Connect to the DApp using the CONNECT button (top right)</h2>
                </>
            }
          </div>
      }
      <Footer />
    </>
  )
}

export default App
