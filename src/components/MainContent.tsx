import EthGif from '../assets/eth-logo-animated.gif'
// this will load after a successful connection with the Dapp
function MainContent() {
    return (
        <>
            <img src={EthGif} alt="eth animated logo" className="eth" />
            <h2>dApp Successfully connected</h2>
        </>
    )
}

export default MainContent