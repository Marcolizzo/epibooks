import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    books: [],
    isLoading: false,
    error: null
}

const url = "https://striveschool-api.herokuapp.com/books";

export const getBooks = createAsyncThunk(
    'books/GETBooks',
    async() => {
        try {
            const res = await axios.get(url)
            return await res.data
        } catch (e) {
            console.log(e)
            throw(e)
        }
    }
)

const booksSlice = createSlice({
    name:'books',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getBooks.fulfilled, (state, action)=>{
                state.isLoading = false
                state.books = action.payload
                state.error = null
            })
            .addCase(getBooks.rejected, (state)=>{
                state.isLoading = false
                state.error = 'Ops, qualcosa è andato storto'
            })
    }
})

export const allBooks = (state) => state.booksData.books

export default booksSlice.reducer