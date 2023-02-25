import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarProps } from '../Helpers/helpers'

function TopNavbar({ connect, address, provider }: NavBarProps) {

    const [toShow, setToShow] = useState<string | undefined>(address)
    useEffect(() => {
        load()
    })
    // ens lookup on the current chain
    const load = async () => {
        if (address && provider) {
            try {
                const name = await provider.lookupAddress(address);
                if (name === null) {
                    setToShow(address);
                } else {
                    setToShow(name);
                }
            } catch (err) {
                console.log(err);
                setToShow(address);
            }
        } else if (address) {
            setToShow(address);
        }
    }

    function DisplayAddressOrEns() {
        return <span className='showAddress'>{toShow}</span>
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Vite DApp Example</Navbar.Brand>
                {
                    address ?
                        <DisplayAddressOrEns /> :
                        <Button onClick={connect} variant="success">
                            CONNECT
                        </Button>
                }
            </Container>
        </Navbar>
    );
}

export default TopNavbar;