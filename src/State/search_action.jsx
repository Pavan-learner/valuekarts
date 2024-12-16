import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../Components/backend_link/data";


// async thunk for the search action
export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (keyword) => {
      const response = await axios.get(`${url}/api/v2/products/search/${keyword}`);
      return response.data;
    }
  );

const searchSlice = createSlice({
    name: "search",
    initialState:{
        keyword:'',
        results:[],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchSearchResults.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.results = action.payload;
          })
          .addCase(fetchSearchResults.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
})

export const {setKeyword, setResults} = searchSlice.actions
export default searchSlice.reducer