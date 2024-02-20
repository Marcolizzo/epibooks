import React, { useState, useEffect } from "react";
import MyCard from "../MyCard/MyCard";
import axios from "axios";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { nanoid } from "nanoid";
import InputSearch from "../InputSearch/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  allBooks,
  getBooks,
  isAllBooksLoading,
} from "../../reducers/books/booksSlice";

function Main() {
  const [filteredBooks, setFilteredBooks] = useState([]);

  const books = useSelector(allBooks);
  const isLoading = useSelector(isAllBooksLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    setFilteredBooks(books);
  }, []);

  function filterBooks(input) {
    let filtered;

    if (isInputEmpty(input)) {
      setFilteredBooks(books);
    } else {
      filtered = books.filter((book) =>
        book.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }

  function isInputEmpty(input) {
    return input === "";
  }

  function noBookFound() {
    return (
      <Col>
        <div className="text-center fs-1">No books found.</div>
      </Col>
    );
  }

  function displayCards(books) {
    return books.map((book) => (
      <MyCard
        key={nanoid()}
        title={book.title}
        img={book.img}
        price={book.price}
        category={book.category}
        id={book.asin}
      />
    ));
  }

  return (
    <>
      <InputSearch onSubmit={filterBooks}></InputSearch>
      <Container className="mt-5">
        <Row>
          {isLoading && <div className="text-center fs-1">Loading...</div>}
          {!isLoading &&
            (filteredBooks.length > 0
              ? displayCards(filteredBooks)
              : noBookFound())}
        </Row>
      </Container>
    </>
  );
}

export default Main;
