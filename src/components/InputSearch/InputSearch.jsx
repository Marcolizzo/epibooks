import React, { useState } from "react";
import {
  FormControl,
  Form,
  Row,
  Button,
  Col,
  Container,
} from "react-bootstrap";

function InputSearch({ filterBooks }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    filterBooks(input);
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs md lg="3">
            <FormControl
              placeholder="Search..."
              value={input}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default InputSearch;
