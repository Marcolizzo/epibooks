import { useParams } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";

function BookDetail() {
  const url = "https://striveschool-api.herokuapp.com/books/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4MTMzZDQyNDc2YzAwMTg3NjUzYmQiLCJpYXQiOjE3MDgxODg1MzUsImV4cCI6MTcwOTM5ODEzNX0.K3EZEBj4BIsIUPc12aMX8eLl06_DRb-24KOqboJ0_co";
  const { asin } = useParams();
  const [book, setBook] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    async function getBookByAsin() {
      try {
        const res = await axios.get(url + asin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data);
        setId(asin)
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
    getBookByAsin();
    console.log(asin);
  }, []);

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Img variant="top" src={"book.img"} />
          <Card.Body>
            <Card.Title style={{ color: "black" }}>{"book.title"}</Card.Title>
          </Card.Body>
        </Card>
        {/* <CommentArea asin={book.asin} /> */}
      </Col>
    </Row>
  );
}

export default BookDetail;
