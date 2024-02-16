import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import classes from "./MyCard.css";

function MyCard({ title, img, price, category, onClick }) {
  return (
    <Col sm={12} md={6} lg={3} className="mb-3">
      <Card className={classes["card"]} onClick={onClick}>
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
