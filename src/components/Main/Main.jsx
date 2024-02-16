import React, { useState, useEffect } from "react";
import MyCard from "../MyCard/MyCard";
import axios from "axios";
import { Alert, Container, Row } from "react-bootstrap";
import { nanoid } from "nanoid";
import InputSearch from "../InputSearch/InputSearch";

function Main() {
  const url = "https://epibooks.onrender.com/";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        const twentyBooks = res.data.slice(0, 20);

        setLoading(false);
        setBooks(twentyBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  function filterBooks(input) {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  return (
    <>
      <InputSearch filterBooks={filterBooks}></InputSearch>
      <Container className="mt-5">
        <Row>
          {loading ? (
            <div className="text-center fs-1">Loading...</div>
          ) : (
            (filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
              <MyCard
                key={nanoid()}
                title={book.title}
                img={book.img}
                price={book.price}
                category={book.category}
              />
            ))
          )}
        </Row>
      </Container>
    </>
  );
}

export default Main;
