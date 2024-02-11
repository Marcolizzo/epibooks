import React, { useState, useEffect } from "react";
import MyCard from "../MyCard/MyCard";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { nanoid } from "nanoid";

function Main() {
  const url = "https://epibooks.onrender.com/";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(url);
        const twentyBooks = res.data.slice(0, 20);

        setBooks(twentyBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <Row>
          {books.map((book) => (
            <MyCard
              key={nanoid()}
              title={book.title}
              img={book.img}
              price={book.price}
              category={book.category}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Main;
