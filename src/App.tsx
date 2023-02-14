import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TopNavbar from "./components/Navbar"

interface OnClickFunction {
  (e: React.MouseEvent<HTMLElement>): void;
}

function App() {

  const [loader, setLoader] = useState(false);
  const [currentAddress, setAddress] = useState(null);
  // const [showConnect, setShowConnect] = useState(false);
  const [chainId, setChainId] = useState<number>();
  const [input, setInput] = useState<string>()

  useEffect(() => {
    loadWeb3();
  }, [])

  useEffect(() => {
    window.ethereum.on('chainChanged', async function () {
      window.location.reload()
    })
  }, [])
  useEffect(() => {
    window.ethereum.on('accountsChanged', async function () {
      window.location.reload()
    })
  }, [])

  let connect: OnClickFunction;

  connect = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    // @todo add a loader and conditions for wrong chain id
    let x = await window.ethereum.enable()
  }

  const loadWeb3 = async () => {
    setLoader(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = network.chainId;
      // find chain id
      setChainId(chainId)
      // const signer = provider.getSigner()
      // @todo - address fetching
      // setAddress()
    } catch (err) {
      console.log(err);
      alert('Please install a web3 wallet like metamask!');
    }
    setLoader(false);
  }

  return (
    <>
      <TopNavbar chainId={chainId} connect={connect} />
    </>
  )
}

export default App
