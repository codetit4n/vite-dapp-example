import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarProps } from '../Helpers/helpers'

function TopNavbar({ connect, address }: NavBarProps) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Vite DApp Example</Navbar.Brand>
                {
                    address ?
                        <span className='showAddress'>Connected: {address}</span> :
                        <Button onClick={connect} variant="outline-success">
                            CONNECT
                        </Button>
                }
            </Container>
        </Navbar>
    );
}

export default TopNavbar;