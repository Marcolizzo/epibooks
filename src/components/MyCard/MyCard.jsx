import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";
import "./MyCard.css";
import React, { useState } from "react";
import MyModal from "../MyModal/MyModal";

function MyCard({ title, img, price, category, onClick, id }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setIsSelected(!isSelected);
    // if (onClick) onClick();
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Col sm={12} md={6} lg={3} className="mb-3">
      <Card
        className={`card ${isSelected ? "changeBorder" : ""}`}
        onClick={handleClick}
      >
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price}$</Card.Text>
          <Card.Text>{category}</Card.Text>
          {isSelected && (
            <Button variant="warning" onClick={handleShowModal}>
              Add Feedback
            </Button>
          )}
        </Card.Body>
      </Card>
      <MyModal show={showModal} handleClose={handleCloseModal} elementId={id} />
    </Col>
  );
}

export default MyCard;
