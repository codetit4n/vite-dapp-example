import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarProps } from '../Helpers/helpers'
import { DappContext } from '../App';
import { ethers } from 'ethers';

function TopNavbar({ connect }: NavBarProps) {

    const { connectedAddress, currentChainId } = useContext(DappContext)
    const [toShow, setToShow] = useState<string | undefined>(connectedAddress)

    useEffect(() => {
        load();
    }, [connectedAddress, currentChainId])

    // ens lookup on the current chain
    const load = async () => {
        if (connectedAddress != undefined) {
            try {
                const prov = new ethers.providers.Web3Provider(window.ethereum);
                const name = await prov.lookupAddress(connectedAddress);
                if (name === null) {
                    setToShow(connectedAddress);
                } else {
                    setToShow(name);
                }
            } catch (err) {
                setToShow(connectedAddress);
            }
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Vite dApp Example</Navbar.Brand>
                {
                    connectedAddress != undefined ?
                        <span className='showAddress'>{toShow}</span> :
                        <Button onClick={connect} variant="success">
                            CONNECT
                        </Button>
                }
            </Container>
        </Navbar>
    );
}

export default TopNavbar;