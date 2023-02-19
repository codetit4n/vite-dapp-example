import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TopNavbar from "./components/Navbar"
import eth from './assets/eth-logo-animated.gif'
import './App.css'
import LoadingSpinner from "./components/LoadingSpinner";

interface OnClickFunction {
  (e: React.MouseEvent<HTMLElement>): void;
}

class MetamaskError extends Error {
  code: number;
  constructor(msg: string, _code: number) {
    super(msg);
    this.code = _code;
  }
}

const hexToDecimal = (hex: string) => parseInt(hex, 16);


function App() {

  const [loader, setLoader] = useState(true);
  const [currentAddress, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<number>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    loadWeb3Provider();
  }, [])

  useEffect(() => {
    window.ethereum.on('chainChanged', async function (params: string) {
      setLoader(true)
      setChainId(hexToDecimal(params))
      setLoader(false)
    })
  }, [])
  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (params: string[]) {
      setLoader(true);
      setAddress(params[0]);
      setLoader(false);
    })
  }, [])

  let connect: OnClickFunction;

  connect = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
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
    } catch (err) {
      console.log(err);
      alert('Please install a web3 wallet like metamask!');
    }
    setLoader(false);
  }

  return (
    <>
      <TopNavbar connect={connect} address={currentAddress} />
      {
        loader ?
          <LoadingSpinner /> :
          <div>
            {
              currentAddress ?
                <div>
                  {/* @todo - content if connection goes fine */}
                </div> :
                <div>
                  <img src={eth} alt="eth animated logo" className="eth" />
                  <h2>Connect to the DApp using the CONNECT button (top right)</h2>
                </div>
            }
          </div>
      }
    </>
  )
}

export default App
