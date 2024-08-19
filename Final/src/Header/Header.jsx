import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-primary">Inventory</Nav.Link>
            <Nav.Link href="/dashboard" className="text-primary">Dashboard</Nav.Link>
            <Nav.Link href="/history" className="text-primary">History</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
