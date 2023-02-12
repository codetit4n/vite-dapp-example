import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TopNavbar from "./components/Navbar"

function App() {

  const [loader, setLoader] = useState(false);
  const [currentAddress, setAddress] = useState(null);
  const [showConnect, setShowConnect] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [input, setInput] = useState(null)

  useEffect(() => {
    loadWeb3();
  }, [])

  // as it is
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

  const loadWeb3 = async () => {
    setLoader(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      // find chain id
      setChainId(network.chainId)
      const signer = provider.getSigner()
      setAddress(await signer.getAddress())
      setShowConnect(false)
    } catch (err) {
      console.log(err);
      setShowConnect(true)
    }
    setLoader(false);
  }

  async function connect(e: Event) {
    e.preventDefault()
    setLoader(true);
    let x = await window.ethereum.enable()
    if (x)
      setShowConnect(false)
    setLoader(false);
  }

  if (chainId != '1') {
    return <h1>Switch to Goerli</h1>
  }

  return (
    <>
      <TopNavbar connect={connect} />
    </>
  )
}

export default App
