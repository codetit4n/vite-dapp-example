import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface OnClickFunction {
    (e: React.MouseEvent<HTMLElement>): void;
}

interface NavBarProps {
    chainId: number | undefined,
    connect: OnClickFunction
}

function TopNavbar({ chainId, connect }: NavBarProps) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Vite DApp Example</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Button onClick={connect} variant="outline-success">
                            CONNECT
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;