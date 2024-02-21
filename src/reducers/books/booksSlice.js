import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    books: [],
    filteredBooks: [],
    isLoading: false,
    error: null
}

const url = "https://striveschool-api.herokuapp.com/books";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4MTMzZDQyNDc2YzAwMTg3NjUzYmQiLCJpYXQiOjE3MDgxODg1MzUsImV4cCI6MTcwOTM5ODEzNX0.K3EZEBj4BIsIUPc12aMX8eLl06_DRb-24KOqboJ0_co";


export const getBooks = createAsyncThunk(
    'books/GETBooks',
    async () => {
        try {
            const res = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            return await res.data
        } catch (e) {
            console.log(e)
            throw (e)
        }
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        filterBooks: (state, action) => {
            const input = action.payload.toLowerCase()
            if (input === "") {
                state.filteredBooks = [...state.books];
            } else {
                state.filteredBooks = state.books.filter((book => {
                    return book.title.toLowerCase().includes(input);
                }))
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false
                state.books = action.payload
                state.filteredBooks = action.payload
                state.error = null
            })
            .addCase(getBooks.rejected, (state) => {
                state.isLoading = false
                state.error = 'Ops, qualcosa è andato storto'
            })
    }
})

export const allBooks = (state) => state.booksData.filteredBooks
export const isAllBooksLoading = (state) => state.booksData.isLoading
export const isAllBooksError = (state) => state.booksData.error
export const {filterBooks} = booksSlice.actions

export default booksSlice.reducer