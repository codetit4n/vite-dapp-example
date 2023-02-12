import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface navBarProps {
    connect: Function
}

function TopNavbar({ connect }: navBarProps) {

    const handleConnectMetamask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('jnhjfjfj')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Vite DApp Example</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Button onClick={handleConnectMetamask} variant="outline-success">
                            Connect Metamask
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;