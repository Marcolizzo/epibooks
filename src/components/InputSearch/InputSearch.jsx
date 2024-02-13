import React from "react";
import { FormControl, Row, Button, Col, Container } from "react-bootstrap";

function InputSearch() {
  return (
    <Container>
      <Row>
        <Col xs md lg="3">
          <FormControl placeholder="Search..." />
        </Col>
        <Col>
          <Button variant="primary">Search</Button>{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default InputSearch;
