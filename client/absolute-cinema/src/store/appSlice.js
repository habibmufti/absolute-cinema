import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Details from "../components/details";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    movies: [],
    isBuy: false,
    qty: 1,
    moviedetails: {},
  },
  reducers: {
    increment: (state) => {
      state.qty += 1;
    },
    decrement: (state) => {
      state.qty -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    fetchSuccess: (state, action) => {
      state.movies = action.payload;
    },
    setIsBuy: (state, action) => {
      state.isBuy = action.payload;
    },
    setQty: (state, action) => {
      state.qty = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, fetchSuccess, setQty, setIsBuy } = appSlice.actions;

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://absolute-cinema.habibmufti.online/movies",
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      dispatch(fetchSuccess(response.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export default appSlice.reducer;
