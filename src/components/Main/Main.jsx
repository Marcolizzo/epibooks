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
  const url = "https://striveschool-api.herokuapp.com/books";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4MTMzZDQyNDc2YzAwMTg3NjUzYmQiLCJpYXQiOjE3MDgxODg1MzUsImV4cCI6MTcwOTM5ODEzNX0.K3EZEBj4BIsIUPc12aMX8eLl06_DRb-24KOqboJ0_co";
  // const [books, setBooks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const books = useSelector(allBooks);
  const isLoading = useSelector(isAllBooksLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    setFilteredBooks(books);
  }, []);

  // useEffect(() => {
  //   const fetch = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = res.data;

  //       setLoading(false);
  //       setBooks(data);
  //       setFilteredBooks(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetch();
  // }, []);

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
