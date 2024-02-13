import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "../Link/Link";

function MyNav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-5">
      <Container>
        <Nav className="me-auto">
          <Link
            href="#"
            className="text-white-50 text-decoration-none me-4"
            text="Home"
          />
          <Link
            href="#"
            className="text-white-50 text-decoration-none me-4"
            text="About"
          />
          <Link
            href="#"
            className="text-white-50 text-decoration-none me-4"
            text="Browse"
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNav;
