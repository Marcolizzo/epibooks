import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";
import "./MyCard.css";
import React, { useContext, useState } from "react";
import MyModal from "../MyModal/MyModal";
import { selectedCardContext } from "../Context/selected";

function MyCard({ title, img, price, category, id }) {
  const { selectedCard, setSelectedCard } = useContext(selectedCardContext);
  // const [isSelected, setIsSelected] = useState("");
  // const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setSelectedCard(id);
  }

  // const handleShowModal = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  return (
    <Col sm={12} md={6} lg={4} xl={3} xxl={2} className="mb-3">
      <Card
        className={`card ${selectedCard === id ? "changeBorder" : ""}`}
        onClick={handleClick}
      >
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price}$</Card.Text>
          <Card.Text>{category}</Card.Text>
          {/* {isSelected && (
            <Button variant="warning" onClick={handleShowModal}>
              Add Feedback
            </Button>
          )} */}
        </Card.Body>
      </Card>
      {/* <MyModal show={showModal} handleClose={handleCloseModal} elementId={id} /> */}
    </Col>
  );
}

export default MyCard;
