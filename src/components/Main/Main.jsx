import React, { useState, useEffect } from "react";
import MyCard from "../MyCard/MyCard";
import { Container, Row, Col } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  allBooks,
  getBooks,
  isAllBooksLoading,
} from "../../reducers/books/booksSlice";

function Main() {

  const books = useSelector(allBooks);
  const isLoading = useSelector(isAllBooksLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  function noBookFound() {
    return (
      <Col>
        <div className="text-center fs-1">No books found.</div>
      </Col>
    );
  }

  function displayBooks(books) {
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
      <Container className="mt-5">
        <Row>
          {isLoading && <div className="text-center fs-1">Loading...</div>}
          {!isLoading &&
            (books.length > 0
              ? displayBooks(books)
              : noBookFound())}
        </Row>
      </Container>
    </>
  );
}

export default Main;
