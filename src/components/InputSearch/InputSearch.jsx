import React, { useState } from "react";
import {
  FormControl,
  Form,
  Row,
  Button,
  Col,
  Container,
} from "react-bootstrap";

function InputSearch({ onSubmit }) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (isActive) {
      onSubmit(input);
    }
  }

  function handleChange({ target: { value } }) {
    // const inputValue = e.target.value;
    // setInput(inputValue);
    setInput(value);
    if (input.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs md lg="3">
            <FormControl placeholder="Search..." onChange={handleChange} />
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
