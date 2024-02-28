import { useParams } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import MyNav from "../MyNav/MyNav";

function BookDetail() {
  const url = "https://striveschool-api.herokuapp.com/books/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4MTMzZDQyNDc2YzAwMTg3NjUzYmQiLCJpYXQiOjE3MDgxODg1MzUsImV4cCI6MTcwOTM5ODEzNX0.K3EZEBj4BIsIUPc12aMX8eLl06_DRb-24KOqboJ0_co";
  const { asin } = useParams();
  const [book, setBook] = useState({});
  const [id, setId] = useState(asin);

  useEffect(() => {
    const getBookByAsin = async () => {
      try {
        const res = await axios.get(url + asin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setId(asin);
        setBook(res.data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    getBookByAsin();
  }, [id, asin]);

  return (
    <>
      <MyNav />
      <Container>
        <Row>
          <Col>
            <h2>{book.title}</h2>
            <img src={book.img} style={{ maxWidth: "500px" }} />
          </Col>
          <Col>
            <CommentSection elementId={id} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookDetail;
