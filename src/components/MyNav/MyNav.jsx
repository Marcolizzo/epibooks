import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "../Link/Link";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { filterBooks } from "../../reducers/books/booksSlice";
import { useDispatch } from "react-redux";

function MyNav() {

  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault();
    if (isActive) {
      dispatch(filterBooks(input)); 
    }
  }

  function handleChange(e) {
    setInput(e.target.value);
    if (input.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

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
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleChange}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default MyNav;
