import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#">
        
          <span className="text-xl font-semibold text-dark">PointOfSaleFinale</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inventory</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/History">History</Nav.Link>
          </Nav>
          <Nav>
            
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
