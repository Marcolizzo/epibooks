import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import classes from "./MyCard.module.css";
import React, { useState } from "react";

function MyCard({ title, img, price, category, onClick }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected(!isSelected);
    if (onClick) onClick();
  }

  return (
    <Col sm={12} md={6} lg={3} className="mb-3">
      <Card
        className={classes[("card", isSelected ? "changeBorder" : "")]}
        onClick={handleClick}
      >
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price}$</Card.Text>
          <Card.Text>{category}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyCard;
